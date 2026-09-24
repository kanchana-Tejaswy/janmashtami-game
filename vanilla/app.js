/* ============================================================
   VRINDAVAN QUEST — app.js
   Core state coordinator & GSAP navigation orchestrator.
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

    if (window.gsap) {
      gsap.fromTo(
        toast,
        { y: -20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }

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
    if (stationId === "1" || stationId === "2") {
      return { allowed: true };
    }

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

    // Progression Guard
    const check = canEnterStation(stationId);
    if (!check.allowed) {
      showToast(check.title, check.sub);
      return false;
    }

    state.activeStation = stationId;

    els.panels.forEach((panel) => {
      const isTarget = panel.id === `station-${stationId}`;
      panel.dataset.active = isTarget ? "true" : "false";
      if (isTarget && window.gsap) {
        gsap.fromTo(
          panel.querySelectorAll(".panel__kicker, .panel__title, .panel__intro, .panel__body"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
      }
    });

    els.nodes.forEach((node) => {
      const isActive = node.dataset.station === stationId;
      if (isActive) {
        node.setAttribute("aria-current", "step");
        if (window.gsap) {
          gsap.fromTo(node.querySelector(".node__dot"), { scale: 0.8 }, { scale: 1.15, duration: 0.4, yoyo: true, repeat: 1, ease: "power2.out" });
        }
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
    if (node) {
      node.classList.add("is-complete");
      if (window.gsap) {
        gsap.fromTo(node, { scale: 1.15 }, { scale: 1, duration: 0.5, ease: "back.out(2)" });
      }
    }
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

    if (window.gsap) {
      gsap.to(els.riverProgress, {
        strokeDashoffset: offset,
        duration: 0.8,
        ease: "power2.out",
      });
    } else {
      els.riverProgress.style.strokeDashoffset = String(offset);
    }
  }

  function bindMagneticButtons() {
    if (!window.gsap) return;
    const buttons = document.querySelectorAll(".btn-primary, .btn-outline");
    buttons.forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
        gsap.to(btn, { x, y, duration: 0.2, ease: "power1.out" });
      });
      btn.addEventListener("pointerleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
      });
    });
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
      if (window.gsap) {
        gsap.fromTo(els.ambientToggle, { scale: 0.92 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      }
    });
  }

  function init() {
    cacheEls();
    bindNav();
    bindAmbientToggle();
    bindMagneticButtons();
    goToStation(state.activeStation);

    // Development override
    if (new URLSearchParams(window.location.search).get("debug") === "true") {
      const devAudio = document.querySelector(".dev-audio");
      if (devAudio) devAudio.style.setProperty("display", "block", "important");
    }

    // Direct deep linking
    const stationParam = new URLSearchParams(window.location.search).get("station");
    if (stationParam && STATIONS.includes(stationParam)) {
      if (stationParam === "3" || stationParam === "final") {
        state.completed.add("1");
        state.completed.add("2");
        if (stationParam === "final") state.completed.add("3");
      }
      goToStation(stationParam);
    }
  }

  return { init, goToStation, markComplete, state };
})();

window.VrindavanQuest = VrindavanQuest;

document.addEventListener("DOMContentLoaded", VrindavanQuest.init);
