(function () {
  "use strict";

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

    var profile = this._progress.profile ? this._progress.profile() : { mode: "standard" };
    var alreadyStrong = lesson.skills.length > 0 && lesson.skills.every(function (skillId) {
      var skill = this._progress.skill(skillId);
      return skill.status === "independent" || skill.status === "mastered";
    }, this);

    var startIndex = 0;
    if (profile.mode === "fast" || alreadyStrong) {
      var firstExercise = lesson.steps.findIndex(function (step) {
        return step.type === "exercise";
      });
      if (firstExercise >= 0) startIndex = firstExercise;
    }

    this._active = {
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      stepIndex: startIndex,
      hintLevel: 0,
      attemptsOnStep: 0,
      validatorPassed: false,
      feedback: null,
      status: "running",
      startedAt: Date.now()
    };

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

    this._active = {
      id: lesson.id,
      title: lesson.title,
      moduleId: lesson.moduleId,
      stepIndex: stepIndex,
      hintLevel: 0,
      attemptsOnStep: 0,
      validatorPassed: false,
      feedback: { kind: "resumed", messageKey: "learn.feedback.resumed" },
      status: "running",
      startedAt: Date.now()
    };

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
      var retryProfile = this._progress.profile ? this._progress.profile() : { mode: "standard" };
      this._active.feedback = {
        kind: "try-again",
        messageKey: retryProfile.mode === "child" ? "learn.feedback.tryAgainChild" : "learn.feedback.tryAgain"
      };

      lesson.skills.forEach(function (skillId) {
        this._progress.recordSkillAttempt(skillId, {
          success: false,
          hintLevel: this._active.hintLevel
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
    this._active.hintLevel = 0;
    this._active.attemptsOnStep = 0;
    this._active.validatorPassed = false;
    this._active.feedback = null;
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
      this._active.hintLevel = 0;
      this._active.validatorPassed = false;
      this._active.feedback = null;
      this._progress.setLessonStep(this._active.id, this._active.stepIndex);
      this._notify();
    }
    return this.active();
  };

  LessonEngine.prototype.requestHint = function () {
    if (!this._active) return null;
    var step = this.currentStep();
    if (!step || step.type !== "exercise") return null;

    this._active.hintLevel = Math.min(5, this._active.hintLevel + 1);

    var hintText = "";
    if (Array.isArray(step.hints) && step.hints.length) {
      hintText = step.hints[Math.min(this._active.hintLevel - 1, step.hints.length - 1)];
    }

    this._active.feedback = {
      kind: "hint",
      level: this._active.hintLevel,
      text: hintText
    };

    this._progress.recordEvent({
      type: "hint.used",
      lessonId: this._active.id,
      skillId: this._definitions[this._active.id].skills[0] || null,
      metadata: {
        stepIndex: this._active.stepIndex,
        hintLevel: this._active.hintLevel
      }
    });

    if (this._runtime && this._runtime.setLearningHighlight) {
      this._runtime.setLearningHighlight(this._active.hintLevel >= 4 ? step.visualTarget || null : null);
    }

    this._notify();
    return clone(this._active.feedback);
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
        hintLevel: this._active.hintLevel
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
    var completionProfile = this._progress.profile ? this._progress.profile() : { mode: "standard" };
    this._active.feedback = {
      kind: "lesson-complete",
      messageKey: completionProfile.mode === "child" ? "learn.feedback.completeChild" : "learn.feedback.complete"
    };

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