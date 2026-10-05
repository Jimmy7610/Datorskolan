(function () {
  "use strict";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function VirtualFileSystem() {
    this._nextId = 1;
    this._nodes = {};
    this.reset();
  }

  VirtualFileSystem.prototype._id = function (prefix) {
    return prefix + "-" + this._nextId++;
  };

  VirtualFileSystem.prototype._add = function (node) {
    this._nodes[node.id] = node;
    return node;
  };

  VirtualFileSystem.prototype.reset = function () {
    this._nextId = 1;
    this._nodes = {};

    this._add({ id: "home", name: "Home", type: "folder", parentId: null, system: true });
    this._add({ id: "documents", name: "Documents", type: "folder", parentId: "home", system: true });
    this._add({ id: "pictures", name: "Pictures", type: "folder", parentId: "home", system: true });
    this._add({ id: "downloads", name: "Downloads", type: "folder", parentId: "home", system: true });
    this._add({ id: "recycle-bin", name: "Recycle Bin", type: "folder", parentId: null, system: true, recycleBin: true });

    this.createFile("documents", "Välkommen.txt", "text", "Det här är en virtuell fil i Datorskolan.");
    this.createFile("pictures", "Semesterbild.jpg", "image", "");
    this.createFile("downloads", "Läs mig.txt", "text", "Allt här är simulerat och påverkar inte din riktiga dator.");
  };

  VirtualFileSystem.prototype.get = function (id) {
    return this._nodes[id] || null;
  };

  VirtualFileSystem.prototype.list = function (parentId) {
    return Object.keys(this._nodes)
      .map(function (id) { return this._nodes[id]; }, this)
      .filter(function (node) { return node.parentId === parentId; })
      .sort(function (a, b) {
        if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name, "sv");
      });
  };

  VirtualFileSystem.prototype.uniqueName = function (parentId, desired, excludeId) {
    var base = (desired || "Ny mapp").trim() || "Ny mapp";
    var names = this.list(parentId)
      .filter(function (n) { return n.id !== excludeId; })
      .map(function (n) { return n.name.toLowerCase(); });

    if (names.indexOf(base.toLowerCase()) === -1) return base;

    var match = base.match(/^(.*?)(?: \((\d+)\))?$/);
    var stem = match ? match[1] : base;
    var i = 2;
    var candidate;
    do {
      candidate = stem + " (" + i++ + ")";
    } while (names.indexOf(candidate.toLowerCase()) !== -1);
    return candidate;
  };

  VirtualFileSystem.prototype.createFolder = function (parentId, name) {
    if (!this.get(parentId)) throw new Error("Parent folder saknas");
    var node = {
      id: this._id("folder"),
      name: this.uniqueName(parentId, name || "Ny mapp"),
      type: "folder",
      parentId: parentId,
      createdAt: Date.now()
    };
    return this._add(node);
  };

  VirtualFileSystem.prototype.createFile = function (parentId, name, fileType, content) {
    if (!this.get(parentId)) throw new Error("Parent folder saknas");
    var node = {
      id: this._id("file"),
      name: this.uniqueName(parentId, name || "Ny fil.txt"),
      type: "file",
      fileType: fileType || "text",
      content: content || "",
      parentId: parentId,
      createdAt: Date.now()
    };
    return this._add(node);
  };

  VirtualFileSystem.prototype.rename = function (id, newName) {
    var node = this.get(id);
    if (!node || node.system) return null;
    node.name = this.uniqueName(node.parentId, newName, node.id);
    return node;
  };

  VirtualFileSystem.prototype.isDescendant = function (possibleChildId, possibleParentId) {
    var current = this.get(possibleChildId);
    while (current && current.parentId) {
      if (current.parentId === possibleParentId) return true;
      current = this.get(current.parentId);
    }
    return false;
  };

  VirtualFileSystem.prototype.move = function (id, targetParentId) {
    var node = this.get(id);
    var target = this.get(targetParentId);
    if (!node || !target || target.type !== "folder" || node.system) return null;
    if (id === targetParentId || this.isDescendant(targetParentId, id)) return null;

    node.parentId = targetParentId;
    node.name = this.uniqueName(targetParentId, node.name, node.id);
    delete node.deletedFrom;
    return node;
  };

  VirtualFileSystem.prototype._copyRecursive = function (id, targetParentId) {
    var source = this.get(id);
    if (!source) return null;

    var copy;
    if (source.type === "folder") {
      copy = this.createFolder(targetParentId, source.name);
      this.list(source.id).forEach(function (child) {
        this._copyRecursive(child.id, copy.id);
      }, this);
    } else {
      copy = this.createFile(targetParentId, source.name, source.fileType, source.content);
    }
    return copy;
  };

  VirtualFileSystem.prototype.copy = function (id, targetParentId) {
    var source = this.get(id);
    if (!source || source.system) return null;
    return this._copyRecursive(id, targetParentId);
  };

  VirtualFileSystem.prototype.delete = function (id) {
    var node = this.get(id);
    if (!node || node.system) return null;
    if (node.parentId === "recycle-bin") return this.permanentDelete(id);

    node.deletedFrom = node.parentId;
    node.parentId = "recycle-bin";
    return node;
  };

  VirtualFileSystem.prototype.restore = function (id) {
    var node = this.get(id);
    if (!node || node.parentId !== "recycle-bin") return null;
    var target = this.get(node.deletedFrom) ? node.deletedFrom : "home";
    node.parentId = target;
    node.name = this.uniqueName(target, node.name, node.id);
    delete node.deletedFrom;
    return node;
  };

  VirtualFileSystem.prototype.permanentDelete = function (id) {
    var node = this.get(id);
    if (!node || node.system) return null;
    if (node.type === "folder") {
      this.list(id).forEach(function (child) {
        this.permanentDelete(child.id);
      }, this);
    }
    delete this._nodes[id];
    return node;
  };

  VirtualFileSystem.prototype.emptyRecycleBin = function () {
    this.list("recycle-bin").forEach(function (node) {
      this.permanentDelete(node.id);
    }, this);
  };

  VirtualFileSystem.prototype.path = function (id) {
    var parts = [];
    var current = this.get(id);
    while (current) {
      if (current.id !== "home") parts.unshift(current.name);
      current = current.parentId ? this.get(current.parentId) : null;
    }
    return ["Home"].concat(parts).join(" > ");
  };

  VirtualFileSystem.prototype.snapshot = function () {
    return clone({
      nextId: this._nextId,
      nodes: this._nodes
    });
  };

  window.VirtualFileSystem = VirtualFileSystem;
})();