/*
  Everyday practice surface: "Where does the file end up?" (save location quiz).
*/
(function () {
  "use strict";

  function render(ctx) {
    var t = ctx.t;
    var h = ctx.h;
    var lab = ctx.state.everydayLab;
    var root = h("div", { class: "practice everyday-lab" });
    var badge = h("span", { class: "practice-badge" + (lab.completed ? " is-done" : ""), text: lab.completed ? t("practice.done") : t("practice.inProgress") });
    root.appendChild(h("header", { class: "practice-head" }, [h("h2", { text: t("everyday.saveLocation.title") }), badge]));
    root.appendChild(h("p", { class: "practice-instruction", text: t("everyday.saveLocation.text") }));

    var feedback = h("p", { class: "practice-status", role: "status", aria: { live: "polite" } });
    var grid = h("div", { class: "everyday-choices" });
    [["documents", "folder-documents"], ["downloads", "download"], ["pictures", "pictures"]].forEach(function (entry) {
      grid.appendChild(h("button", {
        type: "button",
        class: "everyday-choice",
        on: { click: function (e) {
          if (entry[0] === "downloads") {
            e.currentTarget.classList.add("is-correct");
            feedback.textContent = t("everyday.saveLocation.correct");
            if (!lab.completed) {
              lab.completed = true;
              badge.textContent = t("practice.done");
              badge.classList.add("is-done");
              ctx.emit("everyday.saveLocation.complete", { folder: "downloads" });
            }
          } else {
            e.currentTarget.classList.add("is-wrong");
            feedback.textContent = t("everyday.saveLocation.wrong");
          }
        } }
      }, [h("span", { html: ctx.icon(entry[1], 32) }), h("span", { text: t("vfs." + entry[0]) })]));
    });
    root.appendChild(grid);
    root.appendChild(feedback);
    return root;
  }

  window.DatorskolanEverydayApps = { render: render };
})();
