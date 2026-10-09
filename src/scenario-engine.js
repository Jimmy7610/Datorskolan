(function () {
  "use strict";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function ScenarioEngine(definitions) {
    this._definitions = {};
    this._active = null;
    this._listeners = [];

    (definitions || []).forEach(function (scenario) {
      this._definitions[scenario.id] = clone(scenario);
    }, this);
  }

  ScenarioEngine.prototype.list = function () {
    return Object.keys(this._definitions).map(function (id) {
      return clone(this._definitions[id]);
    }, this);
  };

  ScenarioEngine.prototype.get = function (id) {
    return this._definitions[id] ? clone(this._definitions[id]) : null;
  };

  ScenarioEngine.prototype.active = function () {
    return this._active ? clone(this._active) : null;
  };

  ScenarioEngine.prototype.onChange = function (listener) {
    this._listeners.push(listener);
    return function () {
      var index = this._listeners.indexOf(listener);
      if (index >= 0) this._listeners.splice(index, 1);
    }.bind(this);
  };

  ScenarioEngine.prototype._notify = function () {
    var snapshot = this.active();
    this._listeners.slice().forEach(function (listener) {
      listener(snapshot);
    });
  };

  ScenarioEngine.prototype._applyFixtures = function (scenario, runtime) {
    (scenario.fixtures || []).forEach(function (fixture) {
      if (fixture.kind === "folder") {
        runtime.vfs.createFolder(fixture.parentId, fixture.name);
      } else if (fixture.kind === "file") {
        runtime.vfs.createFile(
          fixture.parentId,
          fixture.name,
          fixture.fileType || "text",
          fixture.content || ""
        );
      }
    });
  };

  ScenarioEngine.prototype.load = function (id, runtime) {
    var scenario = this._definitions[id];
    if (!scenario) throw new Error("Unknown scenario: " + id);
    if (!runtime || typeof runtime.resetForScenario !== "function" || !runtime.vfs) {
      throw new Error("Scenario runtime missing");
    }

    runtime.resetForScenario();
    this._applyFixtures(scenario, runtime);

    if (scenario.start && scenario.start.explorerFolderId) {
      runtime.setExplorerFolder(scenario.start.explorerFolderId);
    }

    if (scenario.start && scenario.start.mouseMode && typeof runtime.setMouseMode === "function") {
      runtime.setMouseMode(scenario.start.mouseMode);
    }

    if (scenario.start && typeof runtime.applyStartState === "function") {
      runtime.applyStartState(scenario.start);
    }

    if (scenario.start && Array.isArray(scenario.start.openApps)) {
      scenario.start.openApps.forEach(function (appId) {
        if (typeof runtime.openApp === "function") runtime.openApp(appId);
      });
    }

    this._active = {
      id: scenario.id,
      title: scenario.title,
      description: scenario.description,
      status: "running",
      eventLog: [],
      startedSequence: (this._active ? this._active.startedSequence + 1 : 1)
    };

    this._checkGoal(runtime);
    this._notify();
    return this.active();
  };

  ScenarioEngine.prototype.reset = function (runtime) {
    if (!this._active) return null;
    return this.load(this._active.id, runtime);
  };

  ScenarioEngine.prototype.stop = function () {
    this._active = null;
    this._notify();
  };

  ScenarioEngine.prototype.observe = function (type, payload, runtime) {
    if (!this._active || this._active.status !== "running") return;

    var entry = {
      index: this._active.eventLog.length + 1,
      type: type,
      payload: clone(payload || {})
    };

    this._active.eventLog.push(entry);
    this._checkGoal(runtime, entry);
    this._notify();
  };

  ScenarioEngine.prototype._findNode = function (runtime, goal) {
    return runtime.vfs.list(goal.parentId).find(function (node) {
      return (!goal.nodeType || node.type === goal.nodeType) &&
        node.name.toLocaleLowerCase() === goal.name.toLocaleLowerCase();
    }) || null;
  };

  ScenarioEngine.prototype._eventMatches = function (entry, goal, runtime) {
    if (!entry || entry.type !== goal.eventType) return false;

    if (goal.nodeName) {
      var node = entry.payload && entry.payload.id ? runtime.vfs.get(entry.payload.id) : null;
      if (!node || node.name.toLocaleLowerCase() !== goal.nodeName.toLocaleLowerCase()) return false;
    }

    var expected = goal.payload || {};
    var payload = entry.payload || {};
    return Object.keys(expected).every(function (key) {
      return payload[key] === expected[key];
    });
  };

  ScenarioEngine.prototype._goalComplete = function (goal, runtime, eventEntry) {
    if (!goal) return false;

    if (goal.type === "node-exists") {
      return !!this._findNode(runtime, goal);
    }

    if (goal.type === "text-file-exists") {
      var node = this._findNode(runtime, {
        parentId: goal.parentId,
        nodeType: "file",
        name: goal.name
      });
      return !!node &&
        node.fileType === "text" &&
        (!goal.requireContent || String(node.content || "").trim().length > 0);
    }

    if (goal.type === "event") {
      return this._eventMatches(eventEntry, goal, runtime);
    }

    if (goal.type === "event-seen") {
      return this._active.eventLog.some(function (entry) {
        return this._eventMatches(entry, goal, runtime);
      }, this);
    }

    if (goal.type === "all") {
      return (goal.goals || []).every(function (childGoal) {
        return this._goalComplete(childGoal, runtime, eventEntry);
      }, this);
    }

    if (goal.type === "any") {
      return (goal.goals || []).some(function (childGoal) {
        return this._goalComplete(childGoal, runtime, eventEntry);
      }, this);
    }

    return false;
  };

  ScenarioEngine.prototype._checkGoal = function (runtime, eventEntry) {
    if (!this._active) return false;

    var scenario = this._definitions[this._active.id];
    var complete = this._goalComplete(scenario.goal, runtime, eventEntry);

    if (complete && this._active.status !== "completed") {
      this._active.status = "completed";
      this._active.completedAfterEvents = this._active.eventLog.length;
    }

    return complete;
  };

  window.DatorskolanScenarioEngine = ScenarioEngine;
})();