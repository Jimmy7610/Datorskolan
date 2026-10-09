(function () {
  "use strict";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  /*
    options.seed(vfs)      – creates the sample files after a reset (texts come from the active language)
    options.locale         – Intl locale used for sorting names, e.g. "sv-SE"
    options.newFolderName  – default name for new folders
    options.copySuffix     – suffix for a copy pasted into the same folder, e.g. " - Kopia"
  */
  function VirtualFileSystem(options) {
    this._options = options || {};
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

    // System folders keep a stable id; their visible name is translated through labelKey.
    this._add({ id: "home", name: "Home", labelKey: "vfs.home", type: "folder", parentId: null, system: true });
    this._add({ id: "documents", name: "Documents", labelKey: "vfs.documents", type: "folder", parentId: "home", system: true });
    this._add({ id: "pictures", name: "Pictures", labelKey: "vfs.pictures", type: "folder", parentId: "home", system: true });
    this._add({ id: "downloads", name: "Downloads", labelKey: "vfs.downloads", type: "folder", parentId: "home", system: true });
    this._add({ id: "onedrive", name: "OneDrive", labelKey: "vfs.onedrive", type: "folder", parentId: null, system: true, cloud: true });
    this._add({ id: "recycle-bin", name: "Recycle Bin", labelKey: "vfs.recycleBin", type: "folder", parentId: null, system: true, recycleBin: true });

    if (typeof this._options.seed === "function") this._options.seed(this);
  };

  VirtualFileSystem.prototype.mountDrive = function (id, name) {
    id = id || "usb-drive";
    if (this.get(id)) return this.get(id);
    return this._add({
      id: id,
      name: name || "USB",
      labelKey: "vfs.usbDrive",
      type: "folder",
      parentId: null,
      system: true,
      removable: true
    });
  };

  VirtualFileSystem.prototype.unmountDrive = function (id) {
    var drive = this.get(id);
    if (!drive || !drive.removable) return false;
    this.list(id).forEach(function (node) {
      this.permanentDelete(node.id);
    }, this);
    delete this._nodes[id];
    return true;
  };

  VirtualFileSystem.prototype.get = function (id) {
    return this._nodes[id] || null;
  };

  VirtualFileSystem.prototype.list = function (parentId) {
    var locale = this._options.locale || undefined;
    return Object.keys(this._nodes)
      .map(function (id) { return this._nodes[id]; }, this)
      .filter(function (node) { return node.parentId === parentId; })
      .sort(function (a, b) {
        if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name, locale, { numeric: true });
      });
  };

  // Splits "Report.txt" into ["Report", ".txt"]; folders and dot-files have no extension.
  function splitExtension(name, isFolder) {
    var dot = name.lastIndexOf(".");
    if (isFolder || dot <= 0) return [name, ""];
    return [name.slice(0, dot), name.slice(dot)];
  }

  // Like Windows: "Ny mapp" → "Ny mapp (2)", "Rapport.txt" → "Rapport (2).txt".
  VirtualFileSystem.prototype.uniqueName = function (parentId, desired, excludeId, isFolder) {
    var fallback = this._options.newFolderName || "New folder";
    var base = (desired || fallback).trim() || fallback;
    var names = this.list(parentId)
      .filter(function (n) { return n.id !== excludeId; })
      .map(function (n) { return n.name.toLowerCase(); });

    if (names.indexOf(base.toLowerCase()) === -1) return base;

    var parts = splitExtension(base, isFolder);
    var stem = parts[0].replace(/ \(\d+\)$/, "");
    var i = 2;
    var candidate;
    do {
      candidate = stem + " (" + i++ + ")" + parts[1];
    } while (names.indexOf(candidate.toLowerCase()) !== -1);
    return candidate;
  };

  VirtualFileSystem.prototype.createFolder = function (parentId, name) {
    if (!this.get(parentId)) throw new Error("Unknown parent folder: " + parentId);
    var node = {
      id: this._id("folder"),
      name: this.uniqueName(parentId, name, null, true),
      type: "folder",
      parentId: parentId,
      createdAt: Date.now()
    };
    return this._add(node);
  };

  VirtualFileSystem.prototype.createFile = function (parentId, name, fileType, content) {
    if (!this.get(parentId)) throw new Error("Unknown parent folder: " + parentId);
    var node = {
      id: this._id("file"),
      name: this.uniqueName(parentId, name),
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
    node.name = this.uniqueName(node.parentId, newName, node.id, node.type === "folder");
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
    node.name = this.uniqueName(targetParentId, node.name, node.id, node.type === "folder");
    delete node.deletedFrom;
    return node;
  };

  // Pasting into the same folder names the copy like Windows: "Rapport - Kopia.txt".
  VirtualFileSystem.prototype._copyName = function (source, targetParentId) {
    var taken = this.list(targetParentId).some(function (n) { return n.name.toLowerCase() === source.name.toLowerCase(); });
    if (!taken) return source.name;
    var parts = splitExtension(source.name, source.type === "folder");
    return parts[0] + (this._options.copySuffix || " - Copy") + parts[1];
  };

  VirtualFileSystem.prototype._copyRecursive = function (id, targetParentId) {
    var source = this.get(id);
    if (!source) return null;

    var copy;
    var name = this._copyName(source, targetParentId);
    if (source.type === "folder") {
      copy = this.createFolder(targetParentId, name);
      this.list(source.id).forEach(function (child) {
        this._copyRecursive(child.id, copy.id);
      }, this);
    } else {
      copy = this.createFile(targetParentId, name, source.fileType, source.content);
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
    node.name = this.uniqueName(target, node.name, node.id, node.type === "folder");
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

  // Ancestors from the root down to (and including) the node, used for breadcrumbs.
  VirtualFileSystem.prototype.ancestry = function (id) {
    var chain = [];
    var current = this.get(id);
    while (current) {
      chain.unshift(current);
      current = current.parentId ? this.get(current.parentId) : null;
    }
    return chain;
  };

  VirtualFileSystem.prototype.path = function (id) {
    return this.ancestry(id).map(function (node) { return node.name; }).join(" > ");
  };

  VirtualFileSystem.prototype.snapshot = function () {
    return clone({
      nextId: this._nextId,
      nodes: this._nodes
    });
  };

  window.VirtualFileSystem = VirtualFileSystem;
})();