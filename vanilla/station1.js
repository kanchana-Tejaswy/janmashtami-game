/* ============================================================
   VRINDAVAN QUEST — station1.js
   Station 1: Remove the Layers ("Who Am I?").

   Enhanced with GSAP Timeline & Micro-interactions:
   - 6 tactile layer shells wrapping a meditating avatar figure.
   - Smooth 3D rotational dissolve upon peeling.
   - Concentric divine aura expansion and chakra radiance.
   - Soul Reveal transition with staggered typography.
   ============================================================ */

const Station1 = (() => {
  const LAYERS = [
    { key: "body", label: "Body", icon: "👗" },
    { key: "emotions", label: "Emotions", icon: "😊" },
    { key: "profession", label: "Profession", icon: "💼" },
    { key: "name", label: "Name", icon: "🪪" },
    { key: "identity", label: "Identity & Status", icon: "📱" },
    { key: "thoughts", label: "Thoughts & Ego", icon: "🧠" },
  ];
  const LAYER_COUNT = LAYERS.length;

  const state = {
    removed: new Set(),
    revealed: false,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("layers-activity");
    els.stage = document.getElementById("avatar-stage");
    els.figure = document.getElementById("avatar-figure");
    els.shells = Array.from(document.querySelectorAll(".layer-shell"));
    els.chips = Array.from(document.querySelectorAll(".layer-chip"));
    els.counter = document.getElementById("layers-counter");
    els.reveal = document.getElementById("soul-reveal-b");
    els.continueBtn = document.getElementById("station1-continue-btn");
  }

  function shellFor(index) {
    return els.shells.find((el) => Number(el.dataset.layer) === index);
  }
  function chipFor(index) {
    return els.chips.find((el) => Number(el.dataset.layer) === index);
  }

  function removeLayer(index) {
    if (state.revealed || state.removed.has(index) || Number.isNaN(index)) return;
    state.removed.add(index);

    const shell = shellFor(index);
    const chip = chipFor(index);

    if (window.AudioEngine) AudioEngine.playWhoosh({ rising: false, duration: 0.5, volume: 0.18 });

    if (shell) {
      if (window.gsap) {
        gsap.to(shell, {
          scale: 1.55,
          rotation: (Math.random() - 0.5) * 40,
          opacity: 0,
          filter: "blur(12px)",
          duration: 0.65,
          ease: "power2.out",
          onComplete: () => shell.classList.add("layer-shell--removed"),
        });
      } else {
        shell.classList.add("layer-shell--dissolving");
        shell.addEventListener(
          "animationend",
          () => shell.classList.add("layer-shell--removed"),
          { once: true }
        );
      }
    }

    if (chip) {
      chip.classList.add("layer-chip--removed");
      chip.disabled = true;
      if (window.gsap) {
        gsap.fromTo(
          chip,
          { scale: 0.94 },
          { scale: 1, duration: 0.4, ease: "back.out(2)" }
        );
      }
    }

    if (window.ParticleEngine && els.stage) {
      const rect = els.stage.getBoundingClientRect();
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      ParticleEngine.burst(xRatio, yRatio, { count: 32 });
    }

    if (els.stage) {
      els.stage.dataset.removed = String(state.removed.size);
      els.stage.style.setProperty("--glow-level", String(state.removed.size));
    }

    updateCounter();

    if (state.removed.size >= LAYER_COUNT) {
      showReveal();
    }
  }

  function updateCounter() {
    if (!els.counter) return;
    const remaining = LAYER_COUNT - state.removed.size;
    els.counter.textContent =
      remaining > 0
        ? `Layers remaining: ${remaining} of ${LAYER_COUNT} · tap a layer or button to peel`
        : "Layers remaining: 0 of 6 · nothing external is left";
  }

  function showReveal() {
    state.revealed = true;
    if (els.stage) els.stage.classList.add("avatar-stage--radiant");
    if (els.reveal) {
      els.reveal.hidden = false;
      if (window.gsap) {
        gsap.fromTo(
          els.reveal,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
      els.reveal.focus();
    }

    if (window.ParticleEngine) ParticleEngine.burst(0.5, 0.35, { count: 75 });
    if (window.AudioEngine) AudioEngine.playCelebration();
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("1");
    }

    if (els.reveal) {
      els.reveal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function bind() {
    els.chips.forEach((chip) => {
      chip.addEventListener("click", () => removeLayer(Number(chip.dataset.layer)));
    });
    els.shells.forEach((shell) => {
      shell.addEventListener("click", () => removeLayer(Number(shell.dataset.layer)));
    });
    if (els.continueBtn) {
      els.continueBtn.addEventListener("click", () => {
        if (window.AudioEngine) AudioEngine.playClick();
        if (window.VrindavanQuest && typeof VrindavanQuest.goToStation === "function") {
          VrindavanQuest.goToStation("2");
        }
      });
    }
  }

  function init() {
    if (!document.getElementById("avatar-stage")) return;
    cacheEls();
    if (els.stage) els.stage.style.setProperty("--glow-level", "0");
    bind();
    updateCounter();
  }

  return { init, removeLayer };
})();

// Backwards compatibility alias
const Station1Layers = Station1;

document.addEventListener("DOMContentLoaded", () => {
  Station1.init();
});
