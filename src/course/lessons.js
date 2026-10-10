/*
  Course structure: language-neutral lesson definitions (ids, modules, skills, steps, validators).
  All human-readable text lives in locales/<lang>/course.js under lessons[<id>].
*/
(function (global) {
  "use strict";

  global.DatorskolanModuleOrder = [
  "basics",
  "mouse",
  "keyboard",
  "windows",
  "files",
  "programs",
  "internet",
  "mail",
  "security",
  "everyday",
  "devices",
  "troubleshooting",
  "final"
];

  global.DatorskolanLessons = [
    {
      "id": "files-001-create-folder",
      "moduleId": "files",
      "skills": [
        "files.create-folder"
      ],
      "scenarioId": "files-create-folder-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "demonstration",
          "visualTarget": "[data-ui='explorer-new']"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-new']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "checkpoint"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "programs-001-notepad-save",
      "moduleId": "programs",
      "skills": [
        "programs.notepad",
        "files.save"
      ],
      "scenarioId": "notepad-save-file-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "demonstration",
          "visualTarget": "[data-ui='start']"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='notepad-menubar']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-002-recycle-restore",
      "moduleId": "files",
      "skills": [
        "files.delete",
        "files.recycle-restore"
      ],
      "scenarioId": "recycle-restore-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-commandbar']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-001-move",
      "moduleId": "mouse",
      "skills": [
        "mouse.move"
      ],
      "scenarioId": "mouse-move-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "demonstration",
          "visualTarget": ".mouse-lab-stage"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-lab-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-002-target",
      "moduleId": "mouse",
      "skills": [
        "mouse.move",
        "mouse.precision"
      ],
      "scenarioId": "mouse-target-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-target-field",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-003-click",
      "moduleId": "mouse",
      "skills": [
        "mouse.left-click"
      ],
      "scenarioId": "mouse-click-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-mode-click .big-target",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-004-double-click",
      "moduleId": "mouse",
      "skills": [
        "mouse.double-click"
      ],
      "scenarioId": "mouse-double-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-mode-double .big-target",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-005-right-click",
      "moduleId": "mouse",
      "skills": [
        "mouse.right-click"
      ],
      "scenarioId": "mouse-right-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-mode-right .big-target",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-006-scroll",
      "moduleId": "mouse",
      "skills": [
        "mouse.scroll"
      ],
      "scenarioId": "mouse-scroll-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-scroll-box",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-007-hold",
      "moduleId": "mouse",
      "skills": [
        "mouse.hold"
      ],
      "scenarioId": "mouse-hold-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-mode-hold .big-target",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-008-drag",
      "moduleId": "mouse",
      "skills": [
        "mouse.hold",
        "mouse.drag-drop"
      ],
      "scenarioId": "mouse-drag-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-drag-field",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mouse-009-final",
      "moduleId": "mouse",
      "skills": [
        "mouse.move",
        "mouse.left-click",
        "mouse.double-click",
        "mouse.right-click",
        "mouse.scroll",
        "mouse.drag-drop"
      ],
      "scenarioId": "mouse-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mouse-final-grid",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "basics-001-computer",
      "moduleId": "basics",
      "skills": [
        "basics.computer"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "basics-002-power",
      "moduleId": "basics",
      "skills": [
        "basics.power"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "basics-003-audio-usb",
      "moduleId": "basics",
      "skills": [
        "basics.connections"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "basics-004-internet",
      "moduleId": "basics",
      "skills": [
        "basics.internet"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-001-letters",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.letters"
      ],
      "scenarioId": "keyboard-letters-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-002-numbers",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.numbers"
      ],
      "scenarioId": "keyboard-numbers-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-003-editing",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.space",
        "keyboard.enter",
        "keyboard.backspace",
        "keyboard.delete"
      ],
      "scenarioId": "keyboard-editing-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-004-shiftcaps",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.shift",
        "keyboard.capslock"
      ],
      "scenarioId": "keyboard-shiftcaps-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-005-arrows",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.arrows"
      ],
      "scenarioId": "keyboard-arrows-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-006-tabesc",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.tab",
        "keyboard.escape"
      ],
      "scenarioId": "keyboard-tabesc-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-007-modifiers",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.ctrl",
        "keyboard.alt"
      ],
      "scenarioId": "keyboard-modifiers-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-007b-windows-key",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.meta"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-008-shortcuts",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.selectall",
        "keyboard.copy",
        "keyboard.paste"
      ],
      "scenarioId": "keyboard-shortcuts-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-009-special",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.special"
      ],
      "scenarioId": "keyboard-special-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "keyboard-010-final",
      "moduleId": "keyboard",
      "skills": [
        "keyboard.letters",
        "keyboard.enter",
        "keyboard.backspace",
        "keyboard.arrows",
        "keyboard.selectall"
      ],
      "scenarioId": "keyboard-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".keyboard-stage",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-001-start",
      "moduleId": "windows",
      "skills": [
        "windows.start"
      ],
      "scenarioId": "windows-start-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='start']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-002-open-app",
      "moduleId": "windows",
      "skills": [
        "windows.open-app"
      ],
      "scenarioId": "windows-open-app-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='start']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-003-move",
      "moduleId": "windows",
      "skills": [
        "windows.move-window"
      ],
      "scenarioId": "windows-move-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-calculator .fw-titlebar",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-004-minimize",
      "moduleId": "windows",
      "skills": [
        "windows.minimize"
      ],
      "scenarioId": "windows-minimize-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-calculator [data-ui='window-minimize']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-005-maximize",
      "moduleId": "windows",
      "skills": [
        "windows.maximize"
      ],
      "scenarioId": "windows-maximize-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-calculator [data-ui='window-maximize']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-006-close",
      "moduleId": "windows",
      "skills": [
        "windows.close"
      ],
      "scenarioId": "windows-close-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-calculator [data-ui='window-close']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-007-context",
      "moduleId": "windows",
      "skills": [
        "windows.context-menu"
      ],
      "scenarioId": "windows-context-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-desktop",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-008-final",
      "moduleId": "windows",
      "skills": [
        "windows.start",
        "windows.open-app",
        "windows.move-window",
        "windows.minimize",
        "windows.maximize",
        "windows.close"
      ],
      "scenarioId": "windows-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".sim",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-000-concepts",
      "moduleId": "files",
      "skills": [
        "files.concepts"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-003-rename",
      "moduleId": "files",
      "skills": [
        "files.rename"
      ],
      "scenarioId": "files-rename-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-rename']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-004-copy",
      "moduleId": "files",
      "skills": [
        "files.copy"
      ],
      "scenarioId": "files-copy-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-commandbar']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-005-move",
      "moduleId": "files",
      "skills": [
        "files.cut",
        "files.move"
      ],
      "scenarioId": "files-move-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-downloads']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-006-delete",
      "moduleId": "files",
      "skills": [
        "files.delete",
        "files.recycle-restore"
      ],
      "scenarioId": "files-delete-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-recycle-bin']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-007-saveas",
      "moduleId": "files",
      "skills": [
        "files.save",
        "files.save-as"
      ],
      "scenarioId": "files-saveas-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='notepad-menubar']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-008-locations",
      "moduleId": "files",
      "skills": [
        "files.locations"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-009-final",
      "moduleId": "files",
      "skills": [
        "files.create-folder",
        "files.rename",
        "files.move",
        "files.delete",
        "files.recycle-restore"
      ],
      "scenarioId": "files-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".explorer-v2",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-001-address",
      "moduleId": "internet",
      "skills": [
        "internet.address"
      ],
      "scenarioId": "internet-address-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-omnibox']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-002-links",
      "moduleId": "internet",
      "skills": [
        "internet.link"
      ],
      "scenarioId": "internet-link-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-003-tabs",
      "moduleId": "internet",
      "skills": [
        "internet.tab"
      ],
      "scenarioId": "internet-tab-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-new-tab']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-004-history",
      "moduleId": "internet",
      "skills": [
        "internet.back",
        "internet.forward"
      ],
      "scenarioId": "internet-history-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-back']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-005-download",
      "moduleId": "internet",
      "skills": [
        "internet.download"
      ],
      "scenarioId": "internet-download-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-006-form",
      "moduleId": "internet",
      "skills": [
        "internet.form"
      ],
      "scenarioId": "internet-form-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-007-zoom",
      "moduleId": "internet",
      "skills": [
        "internet.zoom"
      ],
      "scenarioId": "internet-zoom-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-menu']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-008-final",
      "moduleId": "internet",
      "skills": [
        "internet.address",
        "internet.link",
        "internet.tab",
        "internet.back",
        "internet.forward",
        "internet.download"
      ],
      "scenarioId": "internet-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".chrome-app",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-001-open",
      "moduleId": "mail",
      "skills": [
        "mail.open"
      ],
      "scenarioId": "mail-open-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mail-list",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-002-reply",
      "moduleId": "mail",
      "skills": [
        "mail.reply"
      ],
      "scenarioId": "mail-reply-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mail-list",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-003-new",
      "moduleId": "mail",
      "skills": [
        "mail.compose",
        "mail.send"
      ],
      "scenarioId": "mail-new-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='mail-new']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-004-attach",
      "moduleId": "mail",
      "skills": [
        "mail.attachment"
      ],
      "scenarioId": "mail-attach-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='mail-new']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-005-download",
      "moduleId": "mail",
      "skills": [
        "mail.download-attachment"
      ],
      "scenarioId": "mail-download-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='mail-item-m1']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-006-final",
      "moduleId": "mail",
      "skills": [
        "mail.open",
        "mail.reply",
        "mail.attachment",
        "mail.download-attachment"
      ],
      "scenarioId": "mail-final-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fake-mail",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-001-passwords",
      "moduleId": "security",
      "skills": [
        "security.password"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-002-personal",
      "moduleId": "security",
      "skills": [
        "security.personal-data"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-003-phishing",
      "moduleId": "security",
      "skills": [
        "security.phishing"
      ],
      "scenarioId": "security-phishing-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='mail-item-m2']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-009-resize",
      "moduleId": "windows",
      "skills": [
        "windows.resize"
      ],
      "scenarioId": "windows-resize-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-calculator .fw-resize-grip",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-010-switch",
      "moduleId": "windows",
      "skills": [
        "windows.switch-app"
      ],
      "scenarioId": "windows-switch-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-tb-center",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-010b-alt-tab",
      "moduleId": "windows",
      "skills": [
        "windows.alt-tab"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-010-search",
      "moduleId": "files",
      "skills": [
        "files.search"
      ],
      "scenarioId": "files-search-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-search']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-009-bookmark",
      "moduleId": "internet",
      "skills": [
        "internet.bookmark"
      ],
      "scenarioId": "internet-bookmark-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-omnibox']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-010-cookie",
      "moduleId": "internet",
      "skills": [
        "internet.cookie"
      ],
      "scenarioId": "internet-cookie-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".chrome-cookie",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-011-upload",
      "moduleId": "internet",
      "skills": [
        "internet.upload"
      ],
      "scenarioId": "internet-upload-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "mail-007-forward",
      "moduleId": "mail",
      "skills": [
        "mail.forward"
      ],
      "scenarioId": "mail-forward-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".mail-list",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-011-search",
      "moduleId": "windows",
      "skills": [
        "windows.search"
      ],
      "scenarioId": "windows-search-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='start']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "files-011-drag",
      "moduleId": "files",
      "skills": [
        "files.drag-drop"
      ],
      "scenarioId": "files-drag-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-downloads']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-012-refresh",
      "moduleId": "internet",
      "skills": [
        "internet.refresh"
      ],
      "scenarioId": "internet-refresh-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-reload']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-013-close-tab",
      "moduleId": "internet",
      "skills": [
        "internet.close-tab"
      ],
      "scenarioId": "internet-close-tab-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-new-tab']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-012-desktop",
      "moduleId": "windows",
      "skills": [
        "windows.desktop-icon"
      ],
      "scenarioId": "windows-desktop-open-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='desktop-documents']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "windows-013-taskbar",
      "moduleId": "windows",
      "skills": [
        "windows.taskbar"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "internet-014-search",
      "moduleId": "internet",
      "skills": [
        "internet.search"
      ],
      "scenarioId": "internet-search-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-search']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-004-mfa",
      "moduleId": "security",
      "skills": [
        "security.mfa"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-005-https",
      "moduleId": "security",
      "skills": [
        "security.https"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-006-updates",
      "moduleId": "security",
      "skills": [
        "security.updates"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-007-wifi",
      "moduleId": "security",
      "skills": [
        "security.public-wifi"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "security-008-support-scam",
      "moduleId": "security",
      "skills": [
        "security.support-scam"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "final-001-independent",
      "moduleId": "final",
      "skills": [
        "internet.download",
        "files.rename",
        "mail.attachment",
        "mail.send"
      ],
      "scenarioId": "final-independent-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".sim",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-001-copy-paste",
      "moduleId": "everyday",
      "skills": [
        "everyday.select-text",
        "everyday.copy-text",
        "everyday.paste-text"
      ],
      "scenarioId": "everyday-copy-paste-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-002-undo-redo",
      "moduleId": "everyday",
      "skills": [
        "everyday.undo",
        "everyday.redo"
      ],
      "scenarioId": "everyday-undo-redo-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='notepad-text']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-003-clipboard",
      "moduleId": "everyday",
      "skills": [
        "everyday.clipboard"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-004-file-extensions",
      "moduleId": "everyday",
      "skills": [
        "everyday.file-extensions"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-005-save-location",
      "moduleId": "everyday",
      "skills": [
        "everyday.save-location"
      ],
      "scenarioId": "everyday-save-location-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-downloads']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-006-pdf",
      "moduleId": "everyday",
      "skills": [
        "everyday.pdf"
      ],
      "scenarioId": "everyday-pdf-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-items']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-007-screenshot",
      "moduleId": "everyday",
      "skills": [
        "everyday.screenshot"
      ],
      "scenarioId": "everyday-screenshot-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='snip-new']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-008-zip",
      "moduleId": "everyday",
      "skills": [
        "everyday.zip"
      ],
      "scenarioId": "everyday-zip-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-items']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-009-browser-vs-app",
      "moduleId": "everyday",
      "skills": [
        "everyday.web-vs-app"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-010-login",
      "moduleId": "everyday",
      "skills": [
        "everyday.login"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-011-password-manager",
      "moduleId": "everyday",
      "skills": [
        "everyday.password-manager"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-012-install",
      "moduleId": "everyday",
      "skills": [
        "everyday.install"
      ],
      "scenarioId": "everyday-install-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='explorer-items']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-013-print-pdf",
      "moduleId": "everyday",
      "skills": [
        "everyday.print"
      ],
      "scenarioId": "everyday-print-pdf-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='pdf-print']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-014-cloud",
      "moduleId": "everyday",
      "skills": [
        "everyday.cloud"
      ],
      "scenarioId": "everyday-cloud-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-onedrive']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-015-dialogs",
      "moduleId": "everyday",
      "skills": [
        "everyday.dialogs"
      ],
      "scenarioId": "everyday-dialog-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-notepad [data-ui='window-close']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-016-notifications",
      "moduleId": "everyday",
      "skills": [
        "everyday.notifications"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-017-recent-files",
      "moduleId": "everyday",
      "skills": [
        "everyday.recent"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-018-drag-text",
      "moduleId": "everyday",
      "skills": [
        "everyday.select-text-methods"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-019-pin-taskbar",
      "moduleId": "everyday",
      "skills": [
        "everyday.pin-taskbar"
      ],
      "scenarioId": "everyday-pin-taskbar-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='start']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-020-snap",
      "moduleId": "everyday",
      "skills": [
        "everyday.snap"
      ],
      "scenarioId": "everyday-snap-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-browser .chrome-drag-space",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-001-usb",
      "moduleId": "devices",
      "skills": [
        "devices.usb"
      ],
      "scenarioId": "everyday-usb-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='nav-usb-drive']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-002-ports",
      "moduleId": "devices",
      "skills": [
        "devices.ports"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-003-wifi",
      "moduleId": "devices",
      "skills": [
        "devices.wifi"
      ],
      "scenarioId": "everyday-wifi-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='wifi-home']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-004-bluetooth",
      "moduleId": "devices",
      "skills": [
        "devices.bluetooth"
      ],
      "scenarioId": "everyday-bluetooth-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='bluetooth-add']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-005-audio-camera",
      "moduleId": "devices",
      "skills": [
        "devices.audio",
        "devices.microphone",
        "devices.camera"
      ],
      "scenarioId": "everyday-audio-camera-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='settings-volume']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-006-printers",
      "moduleId": "devices",
      "skills": [
        "devices.printer"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-007-battery",
      "moduleId": "devices",
      "skills": [
        "devices.battery"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-008-external-screen",
      "moduleId": "devices",
      "skills": [
        "devices.display"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-001-error",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.error"
      ],
      "scenarioId": "everyday-error-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='trouble-file']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-002-restart",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.restart"
      ],
      "scenarioId": "everyday-restart-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='update-restart']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-003-frozen",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.frozen-app"
      ],
      "scenarioId": "everyday-recovery-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": ".fw-app-trouble-demo [data-ui='window-close']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-004-task-manager",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.task-manager"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-005-internet",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.internet"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-006-sound",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.sound"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-007-storage",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.storage"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "everyday-021-link-actions",
      "moduleId": "everyday",
      "skills": [
        "everyday.link-actions"
      ],
      "scenarioId": "everyday-link-actions-01",
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "exercise",
          "visualTarget": "[data-ui='chrome-page']",
          "validator": {
            "type": "scenario-complete"
          }
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "devices-009-hotspot",
      "moduleId": "devices",
      "skills": [
        "devices.hotspot"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-009-before-support",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.support-info"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    },
    {
      "id": "trouble-008-backup",
      "moduleId": "troubleshooting",
      "skills": [
        "troubleshooting.backup"
      ],
      "steps": [
        {
          "type": "instruction"
        },
        {
          "type": "completion"
        }
      ]
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
