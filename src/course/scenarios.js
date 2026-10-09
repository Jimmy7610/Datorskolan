/*
  Scenario structure: language-neutral start state, fixtures and goals.
  Names, contents, titles and descriptions are merged from locales/<lang>/course.js under scenarios[<id>].
*/
(function (global) {
  "use strict";

  global.DatorskolanScenarios = [
    {
      "id": "files-create-folder-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "node-exists",
        "parentId": "documents",
        "nodeType": "folder"
      }
    },
    {
      "id": "notepad-save-file-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "text-file-exists",
        "parentId": "documents",
        "requireContent": true
      }
    },
    {
      "id": "recycle-restore-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "recycleBin.restored"
      }
    },
    {
      "id": "mouse-move-01",
      "start": {
        "mouseMode": "move",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.move.complete"
      }
    },
    {
      "id": "mouse-target-01",
      "start": {
        "mouseMode": "target",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.target.complete"
      }
    },
    {
      "id": "mouse-click-01",
      "start": {
        "mouseMode": "click",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.click.complete"
      }
    },
    {
      "id": "mouse-double-01",
      "start": {
        "mouseMode": "double",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.double.complete"
      }
    },
    {
      "id": "mouse-right-01",
      "start": {
        "mouseMode": "right",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.right.complete"
      }
    },
    {
      "id": "mouse-scroll-01",
      "start": {
        "mouseMode": "scroll",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.scroll.complete"
      }
    },
    {
      "id": "mouse-hold-01",
      "start": {
        "mouseMode": "hold",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.hold.complete"
      }
    },
    {
      "id": "mouse-drag-01",
      "start": {
        "mouseMode": "drag",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.drag.complete"
      }
    },
    {
      "id": "mouse-final-01",
      "start": {
        "mouseMode": "final",
        "openApps": [
          "mouse-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mouse.final.complete"
      }
    },
    {
      "id": "keyboard-letters-01",
      "start": {
        "keyboardMode": "letters",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.letters.complete"
      }
    },
    {
      "id": "keyboard-numbers-01",
      "start": {
        "keyboardMode": "numbers",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.numbers.complete"
      }
    },
    {
      "id": "keyboard-editing-01",
      "start": {
        "keyboardMode": "editing",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.editing.complete"
      }
    },
    {
      "id": "keyboard-shiftcaps-01",
      "start": {
        "keyboardMode": "shift-caps",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.shiftcaps.complete"
      }
    },
    {
      "id": "keyboard-arrows-01",
      "start": {
        "keyboardMode": "arrows",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.arrows.complete"
      }
    },
    {
      "id": "keyboard-tabesc-01",
      "start": {
        "keyboardMode": "tab-esc",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.tabesc.complete"
      }
    },
    {
      "id": "keyboard-modifiers-01",
      "start": {
        "keyboardMode": "modifiers",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.modifiers.complete"
      }
    },
    {
      "id": "keyboard-shortcuts-01",
      "start": {
        "keyboardMode": "shortcuts",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.shortcuts.complete"
      }
    },
    {
      "id": "keyboard-special-01",
      "start": {
        "keyboardMode": "special",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.special.complete"
      }
    },
    {
      "id": "keyboard-final-01",
      "start": {
        "keyboardMode": "final",
        "openApps": [
          "keyboard-lab"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "keyboard.final.complete"
      }
    },
    {
      "id": "windows-start-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "startMenu.opened"
      }
    },
    {
      "id": "windows-open-app-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "app.opened",
        "payload": {
          "appId": "calculator"
        }
      }
    },
    {
      "id": "windows-move-01",
      "start": {
        "openApps": [
          "calculator"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.moved"
      }
    },
    {
      "id": "windows-minimize-01",
      "start": {
        "openApps": [
          "calculator"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.minimized"
      }
    },
    {
      "id": "windows-maximize-01",
      "start": {
        "openApps": [
          "calculator"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.maximized"
      }
    },
    {
      "id": "windows-close-01",
      "start": {
        "openApps": [
          "calculator"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.closed",
        "payload": {
          "appId": "calculator"
        }
      }
    },
    {
      "id": "windows-context-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "contextMenu.opened"
      }
    },
    {
      "id": "windows-final-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "startMenu.opened"
          },
          {
            "type": "event-seen",
            "eventType": "app.opened",
            "payload": {
              "appId": "calculator"
            }
          },
          {
            "type": "event-seen",
            "eventType": "window.moved"
          },
          {
            "type": "event-seen",
            "eventType": "window.minimized"
          },
          {
            "type": "event-seen",
            "eventType": "window.restored"
          },
          {
            "type": "event-seen",
            "eventType": "window.maximized"
          },
          {
            "type": "event-seen",
            "eventType": "window.closed",
            "payload": {
              "appId": "calculator"
            }
          }
        ]
      }
    },
    {
      "id": "files-rename-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.renamed",
        "payload": {}
      }
    },
    {
      "id": "files-copy-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.copied",
        "payload": {
          "parentId": "documents"
        }
      }
    },
    {
      "id": "files-move-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.moved",
        "payload": {
          "parentId": "downloads"
        }
      }
    },
    {
      "id": "files-delete-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "recycleBin.restored"
      }
    },
    {
      "id": "files-saveas-01",
      "start": {
        "openApps": [
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "notepad.saved"
      }
    },
    {
      "id": "files-final-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "folder.created"
          },
          {
            "type": "event-seen",
            "eventType": "file.renamed"
          },
          {
            "type": "event-seen",
            "eventType": "file.moved"
          },
          {
            "type": "event-seen",
            "eventType": "file.deleted"
          },
          {
            "type": "event-seen",
            "eventType": "recycleBin.restored"
          }
        ]
      }
    },
    {
      "id": "internet-address-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.addressUsed"
      }
    },
    {
      "id": "internet-link-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.linkOpened"
      }
    },
    {
      "id": "internet-tab-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.tabOpened"
      }
    },
    {
      "id": "internet-history-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.back"
          },
          {
            "type": "event-seen",
            "eventType": "browser.forward"
          }
        ]
      }
    },
    {
      "id": "internet-download-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.downloaded"
      }
    },
    {
      "id": "internet-form-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.formSubmitted"
      }
    },
    {
      "id": "internet-zoom-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.zoomChanged"
      }
    },
    {
      "id": "internet-final-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.addressUsed"
          },
          {
            "type": "event-seen",
            "eventType": "browser.linkOpened"
          },
          {
            "type": "event-seen",
            "eventType": "browser.tabOpened"
          },
          {
            "type": "event-seen",
            "eventType": "browser.back"
          },
          {
            "type": "event-seen",
            "eventType": "browser.forward"
          },
          {
            "type": "event-seen",
            "eventType": "browser.downloaded"
          }
        ]
      }
    },
    {
      "id": "mail-open-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.opened"
      }
    },
    {
      "id": "mail-reply-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.replied"
      }
    },
    {
      "id": "mail-new-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.sent"
      }
    },
    {
      "id": "mail-attach-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "mail.attachmentAdded"
      }
    },
    {
      "id": "mail-download-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.attachmentDownloaded"
      }
    },
    {
      "id": "security-phishing-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.phishingIdentified"
      }
    },
    {
      "id": "mail-final-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "mail.opened"
          },
          {
            "type": "event-seen",
            "eventType": "mail.attachmentDownloaded"
          },
          {
            "type": "event-seen",
            "eventType": "mail.attachmentAdded"
          },
          {
            "type": "event-seen",
            "eventType": "mail.replied",
            "payload": {
              "attachment": true
            }
          }
        ]
      }
    },
    {
      "id": "windows-resize-01",
      "start": {
        "openApps": [
          "calculator"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.resized"
      }
    },
    {
      "id": "windows-switch-01",
      "start": {
        "openApps": [
          "calculator",
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "window.focused"
      }
    },
    {
      "id": "files-search-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.search",
        "payload": {}
      }
    },
    {
      "id": "internet-bookmark-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.bookmarked"
      }
    },
    {
      "id": "internet-cookie-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.cookieAccepted"
      }
    },
    {
      "id": "internet-upload-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "browser.uploaded"
      }
    },
    {
      "id": "mail-forward-01",
      "start": {
        "mailReset": true,
        "openApps": [
          "mail"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "mail.forwarded"
      }
    },
    {
      "id": "windows-search-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "startMenu.searched",
        "payload": {}
      }
    },
    {
      "id": "files-drag-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "text"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.moved",
        "payload": {
          "via": "drag-drop"
        }
      }
    },
    {
      "id": "internet-refresh-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.refreshed"
      }
    },
    {
      "id": "internet-close-tab-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.tabOpened"
          },
          {
            "type": "event-seen",
            "eventType": "browser.tabClosed"
          }
        ]
      }
    },
    {
      "id": "windows-desktop-open-01",
      "start": {},
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "desktop.item.doubleClicked",
        "payload": {
          "itemId": "documents"
        }
      }
    },
    {
      "id": "internet-search-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "browser.searched"
      }
    },
    {
      "id": "final-independent-01",
      "start": {
        "browserReset": true,
        "mailReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.downloaded",
            "payload": {}
          },
          {
            "type": "event-seen",
            "eventType": "file.renamed",
            "payload": {}
          },
          {
            "type": "event-seen",
            "eventType": "mail.attachmentAdded",
            "payload": {}
          },
          {
            "type": "event-seen",
            "eventType": "mail.sent",
            "payload": {
              "attachment": true
            }
          }
        ]
      }
    },
    {
      "id": "everyday-copy-paste-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser",
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.textCopied"
          },
          {
            "type": "event-seen",
            "eventType": "notepad.pasted"
          }
        ]
      }
    },
    {
      "id": "everyday-undo-redo-01",
      "start": {
        "openApps": [
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "notepad.input"
          },
          {
            "type": "event-seen",
            "eventType": "notepad.undo"
          },
          {
            "type": "event-seen",
            "eventType": "notepad.redo"
          }
        ]
      }
    },
    {
      "id": "everyday-save-location-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.downloaded",
            "payload": {}
          },
          {
            "type": "event-seen",
            "eventType": "folder.opened",
            "payload": {
              "folderId": "downloads"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-pdf-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "pdf"
        }
      ],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "file.opened"
          },
          {
            "type": "event-seen",
            "eventType": "pdf.zoomChanged"
          },
          {
            "type": "event-seen",
            "eventType": "pdf.savedCopy",
            "payload": {}
          }
        ]
      }
    },
    {
      "id": "everyday-screenshot-01",
      "start": {
        "openApps": [
          "snipping"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "screenshot.captured"
          },
          {
            "type": "event-seen",
            "eventType": "screenshot.saved",
            "payload": {
              "parentId": "pictures"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-zip-01",
      "start": {
        "explorerFolderId": "downloads",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "downloads",
          "fileType": "zip"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "archive.extracted",
        "payload": {}
      }
    },
    {
      "id": "everyday-usb-01",
      "start": {
        "usbMounted": true,
        "explorerFolderId": "home",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "file.copied",
            "payload": {
              "parentId": "documents"
            }
          },
          {
            "type": "event-seen",
            "eventType": "device.usbEjected",
            "payload": {
              "id": "usb-drive"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-wifi-01",
      "start": {
        "settingsPage": "network",
        "openApps": [
          "settings"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "settings.wifiConnected",
        "payload": {}
      }
    },
    {
      "id": "everyday-bluetooth-01",
      "start": {
        "settingsPage": "bluetooth",
        "openApps": [
          "settings"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "settings.bluetoothPaired",
        "payload": {}
      }
    },
    {
      "id": "everyday-audio-camera-01",
      "start": {
        "settingsPage": "system",
        "openApps": [
          "settings"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "settings.audioConfigured"
      }
    },
    {
      "id": "everyday-install-01",
      "start": {
        "explorerFolderId": "downloads",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "downloads",
          "fileType": "installer"
        }
      ],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "software.installed",
            "payload": {
              "appId": "exercise-program"
            }
          },
          {
            "type": "event-seen",
            "eventType": "software.uninstalled",
            "payload": {
              "appId": "exercise-program"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-print-pdf-01",
      "start": {
        "openApps": [
          "pdf"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "print.pdfCreated",
        "payload": {
          "printer": "Microsoft Print to PDF"
        }
      }
    },
    {
      "id": "everyday-cloud-01",
      "start": {
        "explorerFolderId": "documents",
        "openApps": [
          "explorer"
        ]
      },
      "fixtures": [
        {
          "kind": "file",
          "parentId": "documents",
          "fileType": "document"
        }
      ],
      "goal": {
        "type": "event",
        "eventType": "file.moved",
        "payload": {
          "parentId": "onedrive"
        }
      }
    },
    {
      "id": "everyday-dialog-01",
      "start": {
        "openApps": [
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "notepad.input"
          },
          {
            "type": "event-seen",
            "eventType": "dialog.unsavedOpened"
          },
          {
            "type": "event-seen",
            "eventType": "dialog.unsavedChoice",
            "payload": {
              "choice": "discard"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-error-01",
      "start": {
        "troubleMode": "error",
        "openApps": [
          "trouble-demo"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "troubleshooting.errorOpened",
            "payload": {
              "code": "FILE_IN_USE"
            }
          },
          {
            "type": "event-seen",
            "eventType": "troubleshooting.errorHandled",
            "payload": {
              "choice": "close"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-restart-01",
      "start": {
        "settingsPage": "update",
        "openApps": [
          "settings"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "settings.updateRestarted"
      }
    },
    {
      "id": "everyday-recovery-01",
      "start": {
        "troubleMode": "frozen",
        "openApps": [
          "trouble-demo"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "troubleshooting.waited"
          },
          {
            "type": "event-seen",
            "eventType": "troubleshooting.closedFrozen"
          },
          {
            "type": "event-seen",
            "eventType": "troubleshooting.restarted"
          }
        ]
      }
    },
    {
      "id": "everyday-pin-taskbar-01",
      "start": {
        "pinnedTaskbar": [
          "explorer"
        ],
        "pinnedStart": [
          "explorer",
          "browser",
          "calculator",
          "notepad",
          "mail"
        ],
        "openApps": []
      },
      "fixtures": [],
      "goal": {
        "type": "event",
        "eventType": "shell.taskbarPinned",
        "payload": {
          "appId": "browser"
        }
      }
    },
    {
      "id": "everyday-snap-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser",
          "notepad"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "window.snapped",
            "payload": {
              "appId": "browser",
              "side": "left"
            }
          },
          {
            "type": "event-seen",
            "eventType": "window.snapped",
            "payload": {
              "appId": "notepad",
              "side": "right"
            }
          }
        ]
      }
    },
    {
      "id": "everyday-link-actions-01",
      "start": {
        "browserReset": true,
        "openApps": [
          "browser"
        ]
      },
      "fixtures": [],
      "goal": {
        "type": "all",
        "goals": [
          {
            "type": "event-seen",
            "eventType": "browser.linkCopied"
          },
          {
            "type": "event-seen",
            "eventType": "browser.linkOpenedInNewTab"
          }
        ]
      }
    }
  ];
})(typeof window !== "undefined" ? window : globalThis);
