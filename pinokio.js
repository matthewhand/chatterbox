const path = require('path')
module.exports = {
  version: "3.7",
  title: "Chatterbox",
  description: "",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("tts.js") || info.running("vc.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js"),
      link: info.running("link.js")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let scriptToLink = null;
        let scriptUrl = null;
        let runningTts = info.running("tts.js");
        let runningVc = info.running("vc.js");

        if (runningTts) {
            scriptToLink = "tts.js";
            let local = info.local("tts.js");
            if (local && local.url) {
                scriptUrl = local.url;
            }
        } else if (runningVc) { // Prioritize tts.js if both are running, hence 'else if'
            scriptToLink = "vc.js";
            let local = info.local("vc.js");
            if (local && local.url) {
                scriptUrl = local.url;
            }
        }

        // If running.start is true (outer condition), scriptToLink should be set.
        if (scriptToLink) {
            if (scriptUrl) {
                return [{
                    default: true,
                    icon: "fa-solid fa-rocket",
                    text: "Open Web UI" + (scriptToLink === "tts.js" ? " (TTS)" : " (VC)"),
                    href: scriptUrl,
                }, {
                    icon: 'fa-solid fa-terminal',
                    text: "Terminal" + (scriptToLink === "tts.js" ? " (TTS)" : " (VC)"),
                    href: scriptToLink,
                }];
            } else { // Script is running but no URL yet
                return [{
                    default: true,
                    icon: 'fa-solid fa-terminal',
                    text: "Terminal" + (scriptToLink === "tts.js" ? " (TTS)" : " (VC)"),
                    href: scriptToLink,
                }];
            }
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.js",
        }]
      } else if (running.link) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Deduplicating",
          href: "link.js",
        }]
      } else {
        return [{
          default: false,
          icon: "fa-solid fa-power-off",
          text: "Text To Speech",
          href: "tts.js",
        }, {
          default: false,
          icon: "fa-solid fa-power-off",
          text: "Voice Conversion",
          href: "vc.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "<div><strong>Reset</strong><div>Revert to pre-install state</div></div>",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"

        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
