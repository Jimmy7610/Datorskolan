(function () {
  "use strict";

  var STORAGE_KEY = "datorskolan.progress.v1";
  var VERSION = 1;
  var STATUSES = ["locked","introduced","practicing","assisted","independent","mastered","needs_review"];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function emptyState() {
    return {
      version: VERSION,
      userProfile: {
        id: "local-user",
        displayName: "",
        mode: "standard",
        createdAt: nowIso(),
        lastSeenAt: nowIso(),
        settings: {
          sound: true,
          animations: true,
          textScale: 1,
          highContrast: false
        }
      },
      skills: {},
      lessons: {},
      events: []
    };
  }

  function ProgressStore(storage) {
    this._storage = storage || null;
    this._state = this._load();
  }

  ProgressStore.prototype._load = function () {
    if (!this._storage) return emptyState();

    try {
      var raw = this._storage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();

      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== VERSION) return emptyState();

      parsed.userProfile.lastSeenAt = nowIso();
      return parsed;
    } catch (error) {
      console.warn("[ProgressStore] Kunde inte läsa sparad progression", error);
      return emptyState();
    }
  };

  ProgressStore.prototype._save = function () {
    if (!this._storage) return;

    try {
      this._state.userProfile.lastSeenAt = nowIso();
      this._storage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (error) {
      console.warn("[ProgressStore] Kunde inte spara progression", error);
    }
  };

  ProgressStore.prototype.snapshot = function () {
    return clone(this._state);
  };

  ProgressStore.prototype.profile = function () {
    return clone(this._state.userProfile);
  };

  ProgressStore.prototype.setMode = function (mode) {
    if (["standard","child","fast"].indexOf(mode) < 0) mode = "standard";
    this._state.userProfile.mode = mode;
    this._save();
    return this.profile();
  };

  ProgressStore.prototype.updateSettings = function (patch) {
    Object.keys(patch || {}).forEach(function (key) {
      this._state.userProfile.settings[key] = patch[key];
    }, this);
    this._save();
    return this.profile();
  };

  ProgressStore.prototype.lesson = function (lessonId) {
    return this._state.lessons[lessonId]
      ? clone(this._state.lessons[lessonId])
      : {
          lessonId: lessonId,
          status: "not_started",
          currentStep: 0,
          attempts: 0,
          completedAt: null
        };
  };

  ProgressStore.prototype.startLesson = function (lessonId) {
    var progress = this._state.lessons[lessonId] || {
      lessonId: lessonId,
      status: "not_started",
      currentStep: 0,
      attempts: 0,
      completedAt: null
    };

    progress.status = "in_progress";
    progress.attempts += 1;
    progress.currentStep = 0;
    progress.startedAt = nowIso();
    progress.completedAt = null;
    this._state.lessons[lessonId] = progress;
    this._save();
    return clone(progress);
  };

  ProgressStore.prototype.setLessonStep = function (lessonId, stepIndex) {
    var progress = this._state.lessons[lessonId] || this.startLesson(lessonId);
    progress.currentStep = stepIndex;
    progress.status = "in_progress";
    this._state.lessons[lessonId] = progress;
    this._save();
  };

  ProgressStore.prototype.completeLesson = function (lessonId) {
    var progress = this._state.lessons[lessonId] || this.startLesson(lessonId);
    progress.status = "completed";
    progress.completedAt = nowIso();
    this._state.lessons[lessonId] = progress;
    this._save();
    return clone(progress);
  };

  ProgressStore.prototype.skill = function (skillId) {
    return this._state.skills[skillId]
      ? clone(this._state.skills[skillId])
      : {
          skillId: skillId,
          status: "locked",
          attempts: 0,
          successes: 0,
          independentSuccesses: 0,
          hintLevelMax: 0,
          lastPracticedAt: null,
          retentionChecks: 0,
          masteryScore: 0
        };
  };

  ProgressStore.prototype._ensureSkill = function (skillId) {
    if (!this._state.skills[skillId]) {
      this._state.skills[skillId] = this.skill(skillId);
      this._state.skills[skillId].status = "introduced";
    }
    return this._state.skills[skillId];
  };

  ProgressStore.prototype.introduceSkill = function (skillId) {
    var skill = this._ensureSkill(skillId);
    if (skill.status === "locked") skill.status = "introduced";
    this._save();
    return clone(skill);
  };

  ProgressStore.prototype.recordSkillAttempt = function (skillId, options) {
    options = options || {};
    var skill = this._ensureSkill(skillId);

    skill.attempts += 1;
    skill.lastPracticedAt = nowIso();
    skill.hintLevelMax = Math.max(skill.hintLevelMax || 0, options.hintLevel || 0);

    if (options.success) {
      skill.successes += 1;
      if ((options.hintLevel || 0) === 0) skill.independentSuccesses += 1;
    }

    var successRate = skill.attempts ? skill.successes / skill.attempts : 0;
    var independence = skill.successes ? skill.independentSuccesses / skill.successes : 0;
    var hintPenalty = Math.min(0.35, (skill.hintLevelMax || 0) * 0.07);

    skill.masteryScore = Math.max(
      0,
      Math.min(1, Math.round((successRate * 0.65 + independence * 0.35 - hintPenalty) * 100) / 100)
    );

    if (!options.success) {
      skill.status = skill.successes ? "practicing" : "introduced";
    } else if ((options.hintLevel || 0) > 0) {
      skill.status = skill.masteryScore >= 0.72 ? "assisted" : "practicing";
    } else if (skill.independentSuccesses >= 3 && skill.successes >= 3 && skill.masteryScore >= 0.82) {
      skill.status = "mastered";
    } else if (skill.independentSuccesses >= 1) {
      skill.status = "independent";
    } else {
      skill.status = "practicing";
    }

    this._save();
    return clone(skill);
  };

  ProgressStore.prototype.recordEvent = function (event) {
    var item = {
      timestamp: nowIso(),
      type: event.type,
      lessonId: event.lessonId || null,
      skillId: event.skillId || null,
      metadata: clone(event.metadata || {})
    };

    this._state.events.push(item);
    if (this._state.events.length > 500) {
      this._state.events = this._state.events.slice(-500);
    }

    this._save();
    return clone(item);
  };

  ProgressStore.prototype.recommendLesson = function (lessons) {
    lessons = lessons || [];

    var reviewCandidate = null;
    Object.keys(this._state.skills).forEach(function (skillId) {
      var skill = this._state.skills[skillId];
      if (
        !reviewCandidate &&
        skill &&
        (skill.status === "needs_review" || (skill.attempts >= 2 && skill.masteryScore < 0.55))
      ) {
        reviewCandidate = lessons.find(function (lesson) {
          return (lesson.skills || []).indexOf(skillId) >= 0;
        }) || null;
      }
    }, this);

    if (reviewCandidate) return clone(reviewCandidate);

    var inProgress = lessons.find(function (lesson) {
      var progress = this._state.lessons[lesson.id];
      return progress && progress.status === "in_progress";
    }, this);
    if (inProgress) return clone(inProgress);

    var next = lessons.find(function (lesson) {
      var progress = this._state.lessons[lesson.id];
      return !progress || progress.status !== "completed";
    }, this);

    return next ? clone(next) : null;
  };

  ProgressStore.prototype.refreshReviewStatus = function (maxAgeDays) {
    var maxAgeMs = (maxAgeDays || 14) * 24 * 60 * 60 * 1000;
    var now = Date.now();

    Object.keys(this._state.skills).forEach(function (skillId) {
      var skill = this._state.skills[skillId];
      if (!skill || !skill.lastPracticedAt) return;

      var age = now - new Date(skill.lastPracticedAt).getTime();
      if (
        age > maxAgeMs &&
        (skill.status === "independent" || skill.status === "mastered")
      ) {
        skill.status = "needs_review";
      }
    }, this);

    this._save();
    return this.snapshot();
  };

  ProgressStore.prototype.recordRetentionSuccess = function (skillId) {
    var skill = this._ensureSkill(skillId);
    skill.retentionChecks = (skill.retentionChecks || 0) + 1;
    skill.lastPracticedAt = nowIso();

    if (skill.retentionChecks >= 2 && skill.masteryScore >= 0.75) {
      skill.status = "mastered";
    } else if (skill.status === "needs_review") {
      skill.status = "independent";
    }

    this._save();
    return clone(skill);
  };

  ProgressStore.prototype.moduleSummary = function (lessons) {
    var groups = {};

    (lessons || []).forEach(function (lesson) {
      var moduleId = lesson.moduleId || "other";
      if (!groups[moduleId]) groups[moduleId] = { moduleId: moduleId, lessons: 0, completed: 0 };
      groups[moduleId].lessons += 1;

      var progress = this._state.lessons[lesson.id];
      if (progress && progress.status === "completed") groups[moduleId].completed += 1;
    }, this);

    return Object.keys(groups).map(function (id) {
      var group = groups[id];
      group.percent = group.lessons ? Math.round(group.completed / group.lessons * 100) : 0;
      return group;
    });
  };

  ProgressStore.prototype.reset = function () {
    this._state = emptyState();
    this._save();
    return this.snapshot();
  };

  ProgressStore.STATUSES = STATUSES;
  ProgressStore.STORAGE_KEY = STORAGE_KEY;
  window.DatorskolanProgressStore = ProgressStore;
})();