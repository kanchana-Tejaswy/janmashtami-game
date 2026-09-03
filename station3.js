/* ============================================================
   VRINDAVAN QUEST — station3.js
   Station 3: Happiness Roller Coaster.

   Demonstrates that material/external happiness rises and falls
   with circumstance (Shopping, Likes, Money, Success, Relationships
   vs. Phone Break, Job Loss, Heartbreak, Financial Drop),
   while Inner Peace and Spiritual Connection provide eternal stability.
   ============================================================ */

const Station3 = (() => {
  const STEPS = [
    // Phase 1: The Rise (External Highs)
    {
      id: 0,
      phase: "rise",
      icon: "🛍️",
      title: "Shopping & Gadgets",
      desc: "New clothes and gadgets bring a instant surge of excitement and joy!",
      meter: 65,
      meterLabel: "65% — Material Surge",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 1,
      phase: "rise",
      icon: "📱",
      title: "Likes & Social Media",
      desc: "The notification bell rings! Online validation and praise fill your screen.",
      meter: 80,
      meterLabel: "80% — Social Validation",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 2,
      phase: "rise",
      icon: "💰",
      title: "Money & Wealth",
      desc: "Bank balance grows. Financial security brings confidence and comfort.",
      meter: 90,
      meterLabel: "90% — Wealth Security",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 3,
      phase: "rise",
      icon: "💼",
      title: "Career Success",
      desc: "Promotion achieved! Recognition and status among peers feel empowering.",
      meter: 95,
      meterLabel: "95% — Peak Status",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 4,
      phase: "rise",
      icon: "❤️",
      title: "Relationships & Family",
      desc: "Surrounded by loved ones at the top of the coaster. Everything feels perfect!",
      meter: 98,
      meterLabel: "98% — Material Peak!",
      status: "Coaster Peak",
      sfx: "flute",
    },

    // Phase 2: Turbulence (Life's Drops)
    {
      id: 5,
      phase: "drop",
      icon: "💥",
      title: "Phone Breaks & Tech Glitch",
      desc: "CRASH! Screen shatters, digital connection vanishes. Instant anxiety sets in.",
      meter: 70,
      meterLabel: "70% — Sudden Glitch",
      status: "Turbulence",
      sfx: "whoosh",
    },
    {
      id: 6,
      phase: "drop",
      icon: "💼",
      title: "Corporate Layoff / Job Loss",
      desc: "Restructuring notice arrives. The position and badge you relied on are gone.",
      meter: 45,
      meterLabel: "45% — Status Lost",
      status: "Turbulence",
      sfx: "whoosh",
    },
    {
      id: 7,
      phase: "drop",
      icon: "💔",
      title: "Relationship Strain",
      desc: "Misunderstanding strikes. Warmth turns into distance and emotional conflict.",
      meter: 25,
      meterLabel: "25% — Heartbreak",
      status: "Turbulence",
      sfx: "whoosh",
    },
    {
      id: 8,
      phase: "drop",
      icon: "💸",
      title: "Financial Difficulty",
      desc: "Market dip and unexpected expenses! The coaster plummets to near zero.",
      meter: 10,
      meterLabel: "10% — Coaster Drop!",
      status: "Bottom Dip",
      sfx: "whoosh",
    },

    // Phase 3: Stabilization (The Eternal Anchor)
    {
      id: 9,
      phase: "stable",
      icon: "🧘",
      title: "Inner Peace (Equanimity)",
      desc: "Taking a deep breath. Stepping back to observe life's ups and downs without being defined by them.",
      meter: 80,
      meterLabel: "80% — Stabilizing...",
      status: "Inner Anchor",
      sfx: "chime",
    },
    {
      id: 10,
      phase: "stable",
      icon: "🪷",
      title: "Spiritual Connection",
      desc: "Reconnecting with the eternal soul within and Lord Krishna. Unshakable, steady joy that never moves.",
      meter: 100,
      meterLabel: "100% — Eternally Stable",
      status: "Unshakable Joy",
      sfx: "celebration",
    },
  ];

  const TOTAL_STEPS = STEPS.length;

  const state = {
    currentStep: -1, // -1 means not started yet
    isAnimating: false,
    completed: false,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("station-3");
    els.startBtn = document.getElementById("coaster-start-btn");
    els.stepBtn = document.getElementById("coaster-step-btn");
    els.resetBtn = document.getElementById("coaster-reset-btn");
    els.stageCard = document.getElementById("coaster-stage-card");
    els.stageIcon = document.getElementById("coaster-stage-icon");
    els.stageTitle = document.getElementById("coaster-stage-title");
    els.stageDesc = document.getElementById("coaster-stage-desc");
    els.stageStatus = document.getElementById("coaster-stage-status");
    els.meterFill = document.getElementById("coaster-meter-fill");
    els.meterText = document.getElementById("coaster-meter-text");
    els.pathMarker = document.getElementById("coaster-path-marker");
    els.reveal = document.getElementById("station3-reveal");
    els.continueBtn = document.getElementById("station3-continue-btn");
    els.stepCounter = document.getElementById("coaster-counter");
  }

  function updateMeter(stepData) {
    if (!els.meterFill || !els.meterText) return;

    const val = stepData ? stepData.meter : 50;
    const label = stepData ? stepData.meterLabel : "50% — Baseline";

    els.meterFill.style.width = `${val}%`;
    els.meterText.textContent = label;

    // Color feedback based on phase
    if (!stepData) {
      els.meterFill.style.background = "linear-gradient(90deg, var(--gold-500), var(--gold-300))";
    } else if (stepData.phase === "rise") {
      els.meterFill.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
    } else if (stepData.phase === "drop") {
      els.meterFill.style.background = "linear-gradient(90deg, #ff7a4d, #ef4444)";
    } else if (stepData.phase === "stable") {
      els.meterFill.style.background = "linear-gradient(90deg, #14b8a6, #fef08a)";
    }
  }

  function updateMarker(stepIndex) {
    if (!els.pathMarker) return;
    // Map 0..10 step index to percentage offset along the coaster path
    const pct = stepIndex < 0 ? 0 : Math.min(100, (stepIndex / (TOTAL_STEPS - 1)) * 100);
    els.pathMarker.style.left = `${pct}%`;
  }

  function updateCounter(stepIndex) {
    if (!els.stepCounter) return;
    if (stepIndex < 0) {
      els.stepCounter.textContent = "Click 'Ride the Coaster' to experience the journey";
    } else {
      els.stepCounter.textContent = `Stage ${stepIndex + 1} of ${TOTAL_STEPS} \u00b7 ${STEPS[stepIndex].status}`;
    }
  }

  function goToStep(index) {
    if (index < 0 || index >= TOTAL_STEPS || state.isAnimating) return;

    state.isAnimating = true;
    state.currentStep = index;
    const stepData = STEPS[index];

    // Play SFX
    if (window.AudioEngine) {
      if (stepData.sfx === "celebration") {
        AudioEngine.playCelebration();
      } else if (stepData.sfx === "whoosh") {
        AudioEngine.playWhoosh({ rising: false, duration: 0.4, volume: 0.2 });
      } else if (stepData.sfx === "flute") {
        AudioEngine.playFluteNote(523.25, { duration: 1.2, volume: 0.2 });
      } else {
        AudioEngine.playChime({ volume: 0.18 });
      }
    }

    // Particle burst
    if (window.ParticleEngine && els.stageCard) {
      const rect = els.stageCard.getBoundingClientRect();
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      const count = stepData.id === TOTAL_STEPS - 1 ? 120 : stepData.phase === "drop" ? 15 : 30;
      ParticleEngine.burst(xRatio, yRatio, { count });
    }

    // Update UI Card
    if (els.stageCard) els.stageCard.hidden = false;
    if (els.stageIcon) els.stageIcon.textContent = stepData.icon;
    if (els.stageTitle) els.stageTitle.textContent = stepData.title;
    if (els.stageDesc) els.stageDesc.textContent = stepData.desc;
    if (els.stageStatus) els.stageStatus.textContent = stepData.status;

    updateMeter(stepData);
    updateMarker(index);
    updateCounter(index);

    // Update button text for next step
    const nextIdx = index + 1;
    if (els.stepBtn) {
      if (nextIdx < TOTAL_STEPS) {
        const nextStep = STEPS[nextIdx];
        if (nextStep.phase === "drop" && stepData.phase === "rise") {
          els.stepBtn.textContent = "Enter Life's Turbulence \u2192";
        } else if (nextStep.phase === "stable" && stepData.phase === "drop") {
          els.stepBtn.textContent = "Find the Eternal Anchor \u2192";
        } else {
          els.stepBtn.textContent = `Step ${nextIdx + 1}: ${nextStep.title} \u2192`;
        }
        els.stepBtn.hidden = false;
      } else {
        els.stepBtn.hidden = true; // All steps done
      }
    }

    if (els.startBtn) els.startBtn.hidden = true;

    setTimeout(() => {
      state.isAnimating = false;

      // Final step complete -> show reveal
      if (index === TOTAL_STEPS - 1 && !state.completed) {
        showFinalReveal();
      }
    }, 450);
  }

  function startCoaster() {
    if (window.AudioEngine) AudioEngine.playClick();
    goToStep(0);
  }

  function stepForward() {
    if (window.AudioEngine) AudioEngine.playClick();
    if (state.currentStep < TOTAL_STEPS - 1) {
      goToStep(state.currentStep + 1);
    }
  }

  function showFinalReveal() {
    state.completed = true;
    if (els.reveal) {
      els.reveal.hidden = false;
      els.reveal.focus();
      els.reveal.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Call VrindavanQuest.markComplete("3") to update river nav!
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("3");
    }
  }

  function bind() {
    if (els.startBtn) {
      els.startBtn.addEventListener("click", startCoaster);
    }
    if (els.stepBtn) {
      els.stepBtn.addEventListener("click", stepForward);
    }
    if (els.continueBtn) {
      els.continueBtn.addEventListener("click", () => {
        if (window.AudioEngine) AudioEngine.playClick();
        if (window.VrindavanQuest && typeof VrindavanQuest.goToStation === "function") {
          VrindavanQuest.goToStation("final");
        }
      });
    }
  }

  function init() {
    cacheEls();
    bind();
    if (els.meterFill) {
      updateMeter(null);
      updateMarker(-1);
      updateCounter(-1);
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", Station3.init);
