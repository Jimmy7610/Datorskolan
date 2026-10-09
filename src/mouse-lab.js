/*
  Mouse practice surface (Datorskolan exercise, opened by the mouse lessons).
  Emits mouse.<mode>.complete when the learner has performed the movement correctly.
*/
(function () {
  "use strict";

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var lab = ctx.state.mouseLab;
    var mode = lab.mode;

    var root = h("div", { class: "practice mouse-lab mouse-mode-" + mode });
    var badge = h("span", { class: "practice-badge" + (lab.completed ? " is-done" : ""), text: lab.completed ? t("practice.done") : t("practice.inProgress") });
    root.appendChild(h("header", { class: "practice-head" }, [h("h2", { text: t("mouse.mode." + mode) }), badge]));

    var stage = h("div", { class: "mouse-lab-stage", data: { ui: "mouse-stage" } });
    var instruction = h("p", { class: "practice-instruction", text: t("mouse.instruction." + mode) });
    var status = h("p", { class: "practice-status", role: "status", aria: { live: "polite" } });
    root.appendChild(instruction);
    root.appendChild(stage);
    root.appendChild(status);

    function setStatus(text) { status.textContent = text; }

    function complete(type, payload) {
      if (lab.completed && lab.mode !== "final") return;
      if (lab.mode !== "final") {
        lab.completed = true;
        badge.textContent = t("practice.done");
        badge.classList.add("is-done");
      }
      ctx.emit(type, payload || {});
    }

    function target(className, label) {
      return h("button", { type: "button", class: "mouse-target " + (className || ""), text: label });
    }

    if (mode === "move") {
      var meter = h("div", { class: "practice-meter", role: "progressbar", aria: { valuemin: "0", valuemax: "100", valuenow: "0", label: t("mouse.progress") } }, [h("i")]);
      stage.appendChild(h("div", { class: "mouse-move-area" }, [h("span", { text: t("mouse.moveHere") })]));
      stage.appendChild(meter);
      setStatus("0 %");
      stage.addEventListener("pointermove", function (e) {
        if (lab.lastX !== null) lab.distance += Math.hypot(e.clientX - lab.lastX, e.clientY - lab.lastY);
        lab.lastX = e.clientX;
        lab.lastY = e.clientY;
        var pct = Math.min(100, Math.round(lab.distance / 1.6));
        meter.firstChild.style.width = pct + "%";
        meter.setAttribute("aria-valuenow", String(pct));
        setStatus(pct + " %");
        if (lab.distance >= 160) complete("mouse.move.complete", { distance: Math.round(lab.distance) });
      });
    }

    if (mode === "target") {
      var field = h("div", { class: "mouse-target-field" });
      setStatus(t("mouse.targetProgress", { n: 1 }));
      [1, 2, 3].forEach(function (n, index) {
        var button = target("target-" + n + (index ? " is-locked" : ""), String(n));
        button.addEventListener("pointerenter", function () {
          if (lab.targetHits !== index) return;
          lab.targetHits += 1;
          button.classList.add("is-hit");
          var next = field.querySelector(".target-" + (n + 1));
          if (next) next.classList.remove("is-locked");
          setStatus(lab.targetHits >= 3 ? t("mouse.targetDone") : t("mouse.targetProgress", { n: lab.targetHits + 1 }));
          if (lab.targetHits >= 3) complete("mouse.target.complete", { hits: 3 });
        });
        field.appendChild(button);
      });
      stage.appendChild(field);
    }

    if (mode === "click") {
      var clickTarget = target("big-target", t("mouse.clickHere"));
      var clickTimer = null;
      setStatus(t("mouse.waitClick"));
      clickTarget.addEventListener("click", function (e) {
        if (e.detail !== 1) return;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          setStatus(t("mouse.goodClick"));
          complete("mouse.click.complete", {});
        }, 300);
      });
      clickTarget.addEventListener("dblclick", function () {
        clearTimeout(clickTimer);
        setStatus(t("mouse.tooManyClicks"));
        ctx.emit("mouse.click.double-error", {});
      });
      stage.appendChild(h("div", { class: "mouse-centered" }, [clickTarget]));
    }

    if (mode === "double") {
      var doubleTarget = target("big-target", t("mouse.doubleHere"));
      setStatus(t("mouse.waitDouble"));
      doubleTarget.addEventListener("dblclick", function (e) {
        e.preventDefault();
        setStatus(t("mouse.goodDouble"));
        complete("mouse.double.complete", {});
      });
      stage.appendChild(h("div", { class: "mouse-centered" }, [doubleTarget]));
    }

    if (mode === "right") {
      var rightTarget = target("big-target", t("mouse.rightHere"));
      setStatus(t("mouse.waitRight"));
      rightTarget.addEventListener("click", function () {
        setStatus(t("mouse.wrongButton"));
        ctx.emit("mouse.right.left-error", {});
      });
      rightTarget.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        e.stopPropagation();
        setStatus(t("mouse.goodRight"));
        complete("mouse.right.complete", {});
      });
      stage.appendChild(h("div", { class: "mouse-centered" }, [rightTarget]));
    }

    if (mode === "scroll") {
      var box = h("div", { class: "mouse-scroll-box", tabindex: "0", aria: { label: t("mouse.scrollBox") } });
      var content = h("ol", { class: "mouse-scroll-content" });
      for (var i = 1; i <= 24; i++) content.appendChild(h("li", { text: t("mouse.row", { n: i }) }));
      box.appendChild(content);
      stage.appendChild(box);
      setStatus(t("mouse.scrollDown"));
      box.addEventListener("scroll", function () {
        if (box.scrollTop > 40) lab.scrollDown = true;
        if (lab.scrollDown && box.scrollTop < 10) lab.scrollUp = true;
        setStatus(lab.scrollDown ? (lab.scrollUp ? t("mouse.scrollDone") : t("mouse.scrollUp")) : t("mouse.scrollDown"));
        if (lab.scrollDown && lab.scrollUp) complete("mouse.scroll.complete", {});
      });
    }

    if (mode === "hold") {
      var holdTarget = target("big-target", t("mouse.holdHere"));
      var holdMeter = h("div", { class: "practice-meter" }, [h("i")]);
      var holdTimer = null;
      var holdStart = 0;
      setStatus(t("mouse.waitHold"));
      holdTarget.addEventListener("pointerdown", function (e) {
        if (e.button !== 0) return;
        holdStart = Date.now();
        holdTarget.setPointerCapture(e.pointerId);
        holdMeter.firstChild.classList.add("is-filling");
        holdTimer = setTimeout(function () {
          setStatus(t("mouse.goodHold"));
          complete("mouse.hold.complete", { durationMs: Date.now() - holdStart });
        }, 900);
      });
      function release() {
        clearTimeout(holdTimer);
        if (!lab.completed) {
          holdMeter.firstChild.classList.remove("is-filling");
          setStatus(t("mouse.holdLonger"));
        }
      }
      holdTarget.addEventListener("pointerup", release);
      holdTarget.addEventListener("pointercancel", release);
      stage.appendChild(h("div", { class: "mouse-centered" }, [holdTarget]));
      stage.appendChild(holdMeter);
    }

    if (mode === "drag") {
      var token = h("div", { class: "mouse-drag-token", draggable: "true", text: t("mouse.dragMe") });
      var drop = h("div", { class: "mouse-drop-zone", text: t("mouse.dropHere") });
      stage.appendChild(h("div", { class: "mouse-drag-field" }, [token, drop]));
      setStatus(t("mouse.dragHow"));
      token.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", "token");
        token.classList.add("is-dragging");
      });
      token.addEventListener("dragend", function () { token.classList.remove("is-dragging"); });
      drop.addEventListener("dragover", function (e) { e.preventDefault(); drop.classList.add("is-over"); });
      drop.addEventListener("dragleave", function () { drop.classList.remove("is-over"); });
      drop.addEventListener("drop", function (e) {
        e.preventDefault();
        drop.classList.remove("is-over");
        drop.appendChild(token);
        token.classList.add("is-dropped");
        setStatus(t("mouse.goodDrag"));
        complete("mouse.drag.complete", {});
      });
    }

    if (mode === "final") {
      var flags = lab.finalFlags;
      var progress = h("ul", { class: "practice-checklist" });

      function mark(name, node) {
        flags[name] = true;
        if (node) node.classList.add("is-done");
        drawProgress();
        if (flags.move && flags.click && flags.double && flags.right && flags.scroll && flags.drag && !lab.completed) {
          lab.completed = true;
          ctx.emit("mouse.final.complete", { flags: Object.assign({}, flags) });
          badge.textContent = t("practice.done");
          badge.classList.add("is-done");
        }
      }

      function drawProgress() {
        progress.replaceChildren();
        ["move", "click", "double", "right", "scroll", "drag"].forEach(function (name) {
          progress.appendChild(h("li", { class: flags[name] ? "is-done" : "", text: t("mouse.final." + name) }));
        });
      }

      var moveCell = h("div", { class: "mouse-final-cell" }, [h("strong", { text: t("mouse.final.move") }), h("span", { text: t("mouse.final.moveHint") })]);
      var distance = 0;
      var last = null;
      moveCell.addEventListener("pointermove", function (e) {
        if (last) distance += Math.hypot(e.clientX - last.x, e.clientY - last.y);
        last = { x: e.clientX, y: e.clientY };
        if (distance >= 100 && !flags.move) mark("move", moveCell);
      });

      var clickCell = h("button", { type: "button", class: "mouse-final-cell" }, [h("strong", { text: t("mouse.final.click") }), h("span", { text: t("mouse.final.clickHint") })]);
      clickCell.addEventListener("click", function (e) { if (e.detail <= 1) mark("click", clickCell); });

      var doubleCell = h("button", { type: "button", class: "mouse-final-cell" }, [h("strong", { text: t("mouse.final.double") }), h("span", { text: t("mouse.final.doubleHint") })]);
      doubleCell.addEventListener("dblclick", function () { mark("double", doubleCell); });

      var rightCell = h("button", { type: "button", class: "mouse-final-cell" }, [h("strong", { text: t("mouse.final.right") }), h("span", { text: t("mouse.final.rightHint") })]);
      rightCell.addEventListener("contextmenu", function (e) { e.preventDefault(); e.stopPropagation(); mark("right", rightCell); });

      var scrollCell = h("div", { class: "mouse-final-cell mouse-final-scroll", tabindex: "0" }, [h("strong", { text: t("mouse.final.scroll") }), h("span", { text: t("mouse.final.scrollHint") })]);
      var scrolledDown = false;
      scrollCell.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) scrolledDown = true;
        if (scrolledDown && e.deltaY < 0 && !flags.scroll) mark("scroll", scrollCell);
      }, { passive: true });

      var finalToken = h("div", { class: "mouse-drag-token is-small", draggable: "true", text: t("mouse.final.drag") });
      var finalDrop = h("div", { class: "mouse-drop-zone is-small", text: t("mouse.dropHere") });
      finalToken.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", "token"); });
      finalDrop.addEventListener("dragover", function (e) { e.preventDefault(); });
      finalDrop.addEventListener("drop", function (e) {
        e.preventDefault();
        finalDrop.appendChild(finalToken);
        mark("drag", dragCell);
      });
      var dragCell = h("div", { class: "mouse-final-cell mouse-final-drag" }, [finalToken, finalDrop]);

      stage.appendChild(h("div", { class: "mouse-final-grid" }, [moveCell, clickCell, doubleCell, rightCell, scrollCell, dragCell]));
      root.appendChild(progress);
      drawProgress();
    }

    return root;
  }

  window.DatorskolanMouseLab = { render: render };
})();
