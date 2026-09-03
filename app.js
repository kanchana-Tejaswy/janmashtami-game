/* ============================================================
   VRINDAVAN QUEST — app.js
   Core state manager. Chunk 1: station navigation shell only.
   Later chunks hang activity logic, meter state, and Firestore
   calls off this same VrindavanQuest object.
   ============================================================ */

const VrindavanQuest = (() => {
  const STATIONS = ["1", "2", "3", "final"];

  const state = {
    activeStation: "1",
    completed: new Set(),
    soundOn: false,
  };

  const els = {};

  function cacheEls() {
    els.nodes = Array.from(document.querySelectorAll(".node"));
    els.panels = Array.from(document.querySelectorAll(".panel"));
    els.riverProgress = document.getElementById("river-progress");
    els.ambientToggle = document.getElementById("ambient-toggle");
  }

  let toastTimeout = null;

  function showToast(title, sub) {
    const toast = document.getElementById("quest-toast");
    const titleEl = document.getElementById("quest-toast-title");
    const subEl = document.getElementById("quest-toast-sub");
    if (!toast) return;

    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = sub || "";

    toast.hidden = false;
    toast.classList.remove("quest-toast--hide");
    toast.classList.add("quest-toast--show");

    if (window.AudioEngine && typeof AudioEngine.playTick === "function") {
      AudioEngine.playTick({ volume: 0.15 });
    }

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("quest-toast--show");
      toast.classList.add("quest-toast--hide");
      setTimeout(() => {
        toast.hidden = true;
      }, 350);
    }, 3500);
  }

  function canEnterStation(stationId) {
    // Level 1 (Station 1) and Level 2 (Station 2) are freely accessible
    if (stationId === "1" || stationId === "2") {
      return { allowed: true };
    }

    // Level 3 (Station 3) requires Station 2 completion (all 5 Mystery Boxes opened)
    if (stationId === "3") {
      if (!state.completed.has("2")) {
        return {
          allowed: false,
          title: "Complete Level 2 first to continue your journey.",
          sub: "Reveal all 5 Mystery Boxes to unlock the next level.",
        };
      }
      return { allowed: true };
    }

    // Final Station requires Station 3 completion (Happiness Roller Coaster finished)
    if (stationId === "final") {
      if (!state.completed.has("3")) {
        return {
          allowed: false,
          title: "Complete Level 3 first to continue your journey.",
          sub: "Finish the Happiness Roller Coaster to unlock the final reveal.",
        };
      }
      return { allowed: true };
    }

    return { allowed: true };
  }

  function updateNodeStates() {
    els.nodes.forEach((node) => {
      const sid = node.dataset.station;
      const check = canEnterStation(sid);
      if (!check.allowed) {
        node.classList.add("is-locked");
        node.setAttribute("aria-disabled", "true");
      } else {
        node.classList.remove("is-locked");
        node.removeAttribute("aria-disabled");
      }
    });
  }

  function goToStation(stationId) {
    if (!STATIONS.includes(stationId)) return false;

    // Progression Guard: prevent skipping forward past uncompleted levels
    const check = canEnterStation(stationId);
    if (!check.allowed) {
      showToast(check.title, check.sub);
      return false;
    }

    state.activeStation = stationId;

    els.panels.forEach((panel) => {
      panel.dataset.active = panel.id === `station-${stationId}` ? "true" : "false";
    });

    els.nodes.forEach((node) => {
      const isActive = node.dataset.station === stationId;
      if (isActive) {
        node.setAttribute("aria-current", "step");
      } else {
        node.removeAttribute("aria-current");
      }
    });

    updateRiverProgress();
    updateNodeStates();

    window.scrollTo({ top: 0, behavior: "smooth" });
    const panel = document.getElementById(`station-${stationId}`);
    if (panel) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      panel.focus?.();
    }
    return true;
  }

  function markComplete(stationId) {
    state.completed.add(stationId);
    const node = els.nodes.find((n) => n.dataset.station === stationId);
    if (node) node.classList.add("is-complete");
    updateRiverProgress();
    updateNodeStates();
  }

  function updateRiverProgress() {
    if (!els.riverProgress) return;
    const idx = STATIONS.indexOf(state.activeStation);
    const total = els.riverProgress.getTotalLength ? els.riverProgress.getTotalLength() : 1400;
    const completedCount = Math.max(state.completed.size, idx);
    const ratio = completedCount / (STATIONS.length - 1);
    const offset = total - total * Math.min(ratio, 1);
    els.riverProgress.style.strokeDasharray = String(total);
    els.riverProgress.style.strokeDashoffset = String(offset);
    els.riverProgress.style.transition = "stroke-dashoffset 0.8s cubic-bezier(0.22,1,0.36,1)";
  }

  function bindNav() {
    els.nodes.forEach((node) => {
      node.addEventListener("click", () => goToStation(node.dataset.station));
    });
  }

  function bindAmbientToggle() {
    if (!els.ambientToggle) return;
    els.ambientToggle.addEventListener("click", () => {
      const isRunning = window.AudioEngine ? window.AudioEngine.toggle() : (state.soundOn = !state.soundOn);
      state.soundOn = isRunning;
      els.ambientToggle.setAttribute("aria-pressed", String(state.soundOn));
      els.ambientToggle.querySelector(".ambient-toggle__label").textContent = state.soundOn ? "Sound On" : "Sound";
    });
  }

  function init() {
    cacheEls();
    bindNav();
    bindAmbientToggle();
    goToStation(state.activeStation);

    // Development override: reveal dev audio test panel if ?debug=true is in URL
    if (new URLSearchParams(window.location.search).get("debug") === "true") {
      const devAudio = document.querySelector(".dev-audio");
      if (devAudio) devAudio.style.setProperty("display", "block", "important");
    }
  }

  return { init, goToStation, markComplete, state };
})();

window.VrindavanQuest = VrindavanQuest;

document.addEventListener("DOMContentLoaded", VrindavanQuest.init);
