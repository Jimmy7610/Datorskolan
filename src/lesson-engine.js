(function () {
  "use strict";

  var Pedagogy = window.DatorskolanPedagogy;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function LessonEngine(definitions, progressStore) {
    this._definitions = {};
    this._progress = progressStore;
    this._active = null;
    this._listeners = [];
    this._runtime = null;

    (definitions || []).forEach(function (lesson) {
      this._definitions[lesson.id] = clone(lesson);
    }, this);
  }

  LessonEngine.prototype.list = function () {
    return Object.keys(this._definitions).map(function (id) {
      return clone(this._definitions[id]);
    }, this);
  };

  LessonEngine.prototype.get = function (id) {
    return this._definitions[id] ? clone(this._definitions[id]) : null;
  };

  LessonEngine.prototype.active = function () {
    return this._active ? clone(this._active) : null;
  };

  LessonEngine.prototype.onChange = function (listener) {
    this._listeners.push(listener);
    return function () {
      var i = this._listeners.indexOf(listener);
      if (i >= 0) this._listeners.splice(i, 1);
    }.bind(this);
  };

  // The learner's settings (audience, support, depth). A "clearer help" offer accepted on an exercise
  // raises the support for that exercise only; the saved setting never changes by itself.
  LessonEngine.prototype.profile = function () {
    var profile = this._progress.learningProfile ? this._progress.learningProfile() : Pedagogy.normalizeProfile(null);
    if (this._active && this._active.supportOverride) profile.support = this._active.supportOverride;
    return profile;
  };

  function freshStepState(active) {
    active.hintLevel = 0;
    active.hintRung = -1;
    active.attemptsOnStep = 0;
    active.validatorPassed = false;
    active.feedback = null;
    active.supportOverride = null;
    active.helpOfferDismissed = false;
    active.stepStartedAt = Date.now();
  }

  function newActive(lesson, stepIndex) {
    var active = { id: lesson.id, title: lesson.title, moduleId: lesson.moduleId, stepIndex: stepIndex, status: "running", startedAt: Date.now() };
    freshStepState(active);
    return active;
  }

  // How much help the learner had on this exercise, for the skill model (0 = none, 5 = full solution).
  LessonEngine.prototype._assistLevel = function () {
    var rung = this._active.hintRung;
    var used = rung < 0 ? 0 : Math.max(1, rung);
    return this.profile().support === "guided" ? Math.max(3, used) : used;
  };

  LessonEngine.prototype._notify = function () {
    var snapshot = this.active();
    this._listeners.slice().forEach(function (fn) { fn(snapshot); });
  };

  LessonEngine.prototype.start = function (lessonId, runtime) {
    var lesson = this._definitions[lessonId];
    if (!lesson) throw new Error("Unknown lesson: " + lessonId);
    if (!runtime) throw new Error("Lesson runtime missing");

    this._runtime = runtime;
    if (lesson.scenarioId && runtime.loadScenario) runtime.loadScenario(lesson.scenarioId);

    this._progress.startLesson(lessonId);
    lesson.skills.forEach(function (skillId) {
      this._progress.introduceSkill(skillId);
    }, this);

    var alreadyStrong = lesson.skills.length > 0 && lesson.skills.every(function (skillId) {
      var skill = this._progress.skill(skillId);
      return skill.status === "independent" || skill.status === "mastered";
    }, this);

    // Someone who already masters every skill in the lesson goes straight to the exercise.
    var startIndex = 0;
    if (alreadyStrong) {
      var firstExercise = lesson.steps.findIndex(function (step) {
        return step.type === "exercise";
      });
      if (firstExercise >= 0) startIndex = firstExercise;
    }

    this._active = newActive(lesson, startIndex);

    if (startIndex > 0) {
      this._progress.setLessonStep(lesson.id, startIndex);
    }

    this._progress.recordEvent({
      type: "lesson.started",
      lessonId: lesson.id,
      metadata: { scenarioId: lesson.scenarioId || null, adaptiveSkip: startIndex > 0 }
    });

    this._notify();
    return this.active();
  };

  // Continue the lesson that was in progress before a reload. Each lesson has at most one exercise and
  // its scenario is loaded fresh, so continuing at the saved step always starts from a valid state.
  LessonEngine.prototype.resume = function (runtime) {
    var saved = this._progress.activeLesson ? this._progress.activeLesson() : null;
    if (!saved) return null;
    var lesson = this._definitions[saved.lessonId];
    if (!lesson || !runtime) {
      if (this._progress.clearActiveLesson) this._progress.clearActiveLesson();
      return null;
    }

    this._runtime = runtime;
    if (lesson.scenarioId && runtime.loadScenario) runtime.loadScenario(lesson.scenarioId);

    var stepIndex = Math.max(0, Math.min(saved.stepIndex, lesson.steps.length - 1));
    if (lesson.steps[stepIndex].type === "completion" && stepIndex > 0) stepIndex -= 1;

    this._active = newActive(lesson, stepIndex);
    this._active.feedback = { kind: "resumed", messageKey: "learn.feedback.resumed" };

    this._progress.recordEvent({
      type: "lesson.resumed",
      lessonId: lesson.id,
      metadata: { stepIndex: stepIndex, scenarioId: lesson.scenarioId || null }
    });

    this._notify();
    return this.active();
  };

  LessonEngine.prototype.stop = function () {
    if (this._progress.clearActiveLesson) this._progress.clearActiveLesson();
    if (this._active) {
      this._progress.recordEvent({
        type: "lesson.stopped",
        lessonId: this._active.id,
        metadata: { stepIndex: this._active.stepIndex }
      });
    }
    this._active = null;
    this._runtime = null;
    this._notify();
  };

  LessonEngine.prototype.currentStep = function () {
    if (!this._active) return null;
    var lesson = this._definitions[this._active.id];
    if (!lesson || !lesson.steps[this._active.stepIndex]) return null;

    return clone(lesson.steps[this._active.stepIndex]);
  };

  LessonEngine.prototype.next = function () {
    if (!this._active) return null;

    var lesson = this._definitions[this._active.id];
    var step = lesson.steps[this._active.stepIndex];
    if (!step) return null;

    if (step.type === "exercise" && !this._isCurrentExerciseComplete()) {
      this._active.attemptsOnStep += 1;
      // The panel picks the wording for the learner's audience and help level (learn.feedback.tryAgain.*).
      this._active.feedback = { kind: "try-again", messageKey: "learn.feedback.tryAgain" };

      lesson.skills.forEach(function (skillId) {
        this._progress.recordSkillAttempt(skillId, {
          success: false,
          hintLevel: this._assistLevel()
        });
      }, this);

      this._progress.recordEvent({
        type: "exercise.retry",
        lessonId: lesson.id,
        skillId: lesson.skills[0] || null,
        metadata: {
          stepIndex: this._active.stepIndex,
          hintLevel: this._active.hintLevel
        }
      });

      this._notify();
      return this.active();
    }

    if (step.type === "exercise") {
      this._recordExerciseSuccess();
    }

    if (this._active.stepIndex >= lesson.steps.length - 1) {
      this._completeLesson();
      return this.active();
    }

    this._active.stepIndex += 1;
    freshStepState(this._active);
    this._progress.setLessonStep(lesson.id, this._active.stepIndex);

    var nextStep = lesson.steps[this._active.stepIndex];
    if (nextStep.type === "completion") {
      this._completeLesson();
    }

    this._notify();
    return this.active();
  };

  LessonEngine.prototype.previous = function () {
    if (!this._active) return null;
    if (this._active.stepIndex > 0) {
      this._active.stepIndex -= 1;
      freshStepState(this._active);
      this._progress.setLessonStep(this._active.id, this._active.stepIndex);
      this._notify();
    }
    return this.active();
  };

  // Next rung on the hint ladder for the learner's help level (see src/pedagogy.js). The panel resolves
  // the text from the rung, so it follows the learner's audience setting.
  LessonEngine.prototype.requestHint = function () {
    if (!this._active) return null;
    var step = this.currentStep();
    if (!step || step.type !== "exercise") return null;

    var support = this.profile().support;
    var ladder = Pedagogy.ladder(support);
    if (this._active.hintLevel >= ladder.length) return clone(this._active.feedback);

    var rung = ladder[this._active.hintLevel];
    this._active.hintLevel += 1;
    this._active.hintRung = Math.max(this._active.hintRung, rung);
    this._active.feedback = { kind: "hint", rung: rung, level: this._active.hintLevel, max: ladder.length };

    this._progress.recordEvent({
      type: "hint.used",
      lessonId: this._active.id,
      skillId: this._definitions[this._active.id].skills[0] || null,
      metadata: { stepIndex: this._active.stepIndex, hintLevel: this._active.hintLevel, rung: rung, support: support }
    });

    this._applyHighlight();
    this._notify();
    return clone(this._active.feedback);
  };

  LessonEngine.prototype.hintsRemaining = function () {
    if (!this._active) return 0;
    return Math.max(0, Pedagogy.ladder(this.profile().support).length - this._active.hintLevel);
  };

  // Show or hide the yellow frame for the current step and help level.
  LessonEngine.prototype._applyHighlight = function () {
    if (!this._runtime || !this._runtime.setLearningHighlight || !this._active) return;
    var step = this.currentStep();
    var visible = step && this._active.status === "running" &&
      Pedagogy.highlightVisible(step.type, this.profile().support, this._active.hintRung);
    this._runtime.setLearningHighlight(visible ? step.visualTarget || null : null);
  };

  /* ---------- Adaptive help: offered, never forced ---------- */

  LessonEngine.prototype.shouldOfferMoreHelp = function (now) {
    var step = this.currentStep();
    if (!step || step.type !== "exercise") return false;
    return Pedagogy.shouldOfferMoreHelp(this._active, this.profile().support, now || Date.now());
  };

  // "Yes, show me clearer help": guided help for this exercise only.
  LessonEngine.prototype.acceptMoreHelp = function () {
    if (!this._active) return null;
    this._active.supportOverride = "guided";
    this._active.hintLevel = 0;
    this._active.feedback = { kind: "help", messageKey: "learn.help.accepted" };
    this._progress.recordEvent({ type: "help.accepted", lessonId: this._active.id, metadata: { stepIndex: this._active.stepIndex } });
    this._applyHighlight();
    this._notify();
    return this.active();
  };

  LessonEngine.prototype.declineMoreHelp = function () {
    if (!this._active) return null;
    this._active.helpOfferDismissed = true;
    this._progress.recordEvent({ type: "help.declined", lessonId: this._active.id, metadata: { stepIndex: this._active.stepIndex } });
    this._notify();
    return this.active();
  };

  LessonEngine.prototype.observe = function (type, payload) {
    if (!this._active || this._active.status !== "running") return;

    var step = this.currentStep();
    if (
      step &&
      step.type === "exercise" &&
      step.validator &&
      step.validator.type === "scenario-complete" &&
      this._runtime &&
      this._runtime.getScenarioStatus &&
      this._runtime.getScenarioStatus() === "completed"
    ) {
      this._active.feedback = {
        kind: "success",
        messageKey: "learn.feedback.success"
      };
      this._notify();
    }

    if (
      step &&
      step.type === "exercise" &&
      step.validator &&
      step.validator.type === "event" &&
      type === step.validator.eventType
    ) {
      var matches = true;
      var expected = step.validator.payload || {};
      Object.keys(expected).forEach(function (key) {
        if (!payload || payload[key] !== expected[key]) matches = false;
      });

      if (matches) {
        this._active.validatorPassed = true;
        this._active.feedback = {
          kind: "success",
          messageKey: "learn.feedback.success"
        };
        this._notify();
      }
    }

    this._progress.recordEvent({
      type: "simulator." + type,
      lessonId: this._active.id,
      skillId: this._definitions[this._active.id].skills[0] || null,
      metadata: payload || {}
    });
  };

  LessonEngine.prototype._isCurrentExerciseComplete = function () {
    var step = this.currentStep();
    if (!step || step.type !== "exercise") return true;
    if (!step.validator) return true;

    if (step.validator.type === "scenario-complete") {
      return !!(
        this._runtime &&
        this._runtime.getScenarioStatus &&
        this._runtime.getScenarioStatus() === "completed"
      );
    }

    if (step.validator.type === "event") {
      return !!this._active.validatorPassed;
    }

    return false;
  };

  LessonEngine.prototype._recordExerciseSuccess = function () {
    var lesson = this._definitions[this._active.id];
    var durationMs = Date.now() - this._active.startedAt;

    lesson.skills.forEach(function (skillId) {
      var before = this._progress.skill(skillId);
      this._progress.recordSkillAttempt(skillId, {
        success: true,
        hintLevel: this._assistLevel()
      });

      if (before.status === "needs_review" && this._progress.recordRetentionSuccess) {
        this._progress.recordRetentionSuccess(skillId);
      }
    }, this);

    this._progress.recordEvent({
      type: "exercise.success",
      lessonId: lesson.id,
      skillId: lesson.skills[0] || null,
      metadata: {
        stepIndex: this._active.stepIndex,
        hintLevel: this._active.hintLevel,
        durationMs: durationMs
      }
    });
  };

  LessonEngine.prototype._completeLesson = function () {
    var lesson = this._definitions[this._active.id];
    this._active.status = "completed";
    this._active.feedback = { kind: "lesson-complete", messageKey: "learn.feedback.complete" };

    this._progress.completeLesson(lesson.id);
    this._progress.recordEvent({
      type: "lesson.completed",
      lessonId: lesson.id,
      skillId: lesson.skills[0] || null,
      metadata: {
        hintLevelMax: this._active.hintLevel,
        durationMs: Date.now() - this._active.startedAt
      }
    });

    if (this._runtime && this._runtime.setLearningHighlight) {
      this._runtime.setLearningHighlight(null);
    }
  };

  window.DatorskolanLessonEngine = LessonEngine;
})();