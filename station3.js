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
      desc: "New things bring an instant surge of excitement.",
      meter: 65,
      meterLabel: "65%",
      context: "Rising with circumstances…",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 1,
      phase: "rise",
      icon: "📱",
      title: "Likes & Praise",
      desc: "Online validation makes you feel noticed and admired.",
      meter: 80,
      meterLabel: "80%",
      context: "Rising with circumstances…",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 2,
      phase: "rise",
      icon: "💰",
      title: "Money & Security",
      desc: "Financial comfort brings confidence and freedom.",
      meter: 90,
      meterLabel: "90%",
      context: "Rising with circumstances…",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 3,
      phase: "rise",
      icon: "💼",
      title: "Career Success",
      desc: "Achievement feels empowering and celebrated.",
      meter: 95,
      meterLabel: "95%",
      context: "Rising with circumstances…",
      status: "External High",
      sfx: "chime",
    },
    {
      id: 4,
      phase: "rise",
      icon: "❤️",
      title: "Loving Bonds",
      desc: "Surrounded by loved ones, everything feels complete.",
      meter: 98,
      meterLabel: "98%",
      context: "Peak of external circumstances",
      status: "Peak Joy",
      sfx: "flute",
    },

    // Phase 2: Turbulence (Life's Drops)
    {
      id: 5,
      phase: "drop",
      icon: "💥",
      title: "Sudden Loss",
      desc: "A broken device disrupts your day and brings instant stress.",
      meter: 70,
      meterLabel: "70%",
      context: "Circumstances changed…",
      status: "Circumstances Change",
      sfx: "whoosh",
    },
    {
      id: 6,
      phase: "drop",
      icon: "💼",
      title: "Job Uncertainty",
      desc: "The role and identity you relied on suddenly disappear.",
      meter: 45,
      meterLabel: "45%",
      context: "Circumstances changed…",
      status: "Circumstances Change",
      sfx: "whoosh",
    },
    {
      id: 7,
      phase: "drop",
      icon: "💔",
      title: "Heartbreak & Strain",
      desc: "Misunderstandings turn closeness into painful distance.",
      meter: 25,
      meterLabel: "25%",
      context: "Circumstances changed…",
      status: "Circumstances Change",
      sfx: "whoosh",
    },
    {
      id: 8,
      phase: "drop",
      icon: "💸",
      title: "Financial Difficulty",
      desc: "Unexpected losses shake your comfort to the core.",
      meter: 10,
      meterLabel: "10%",
      context: "When external props are shaken…",
      status: "Deepest Dip",
      sfx: "whoosh",
    },

    // Phase 3: Stabilization (The Eternal Anchor)
    {
      id: 9,
      phase: "stable",
      icon: "🧘",
      title: "Inner Peace",
      desc: "Taking a deep breath. Quietly observing life without being shaken.",
      meter: 80,
      meterLabel: "80%",
      context: "Finding steady inner stability…",
      status: "Inner Anchor",
      sfx: "chime",
    },
    {
      id: 10,
      phase: "stable",
      icon: "🪷",
      title: "Spiritual Connection",
      desc: "Anchoring in the eternal soul and Lord Krishna. Joy that never leaves.",
      meter: 100,
      meterLabel: "100%",
      context: "Eternally steady within",
      status: "Unshakable Joy",
      sfx: "celebration",
    },
  ];

  const TOTAL_STEPS = STEPS.length;
  const STEP_DURATION_MS = 1600; // Pacing calibrated for all age groups

  const state = {
    currentStep: -1,
    isRunning: false,
    completed: false,
    timerId: null,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("station-3");
    els.startBtn = document.getElementById("coaster-start-btn");
    els.stepBtn = document.getElementById("coaster-step-btn");
    els.stageCard = document.getElementById("coaster-stage-card");
    els.stageIcon = document.getElementById("coaster-stage-icon");
    els.stageTitle = document.getElementById("coaster-stage-title");
    els.stageDesc = document.getElementById("coaster-stage-desc");
    els.stageStatus = document.getElementById("coaster-stage-status");
    els.meterFill = document.getElementById("coaster-meter-fill");
    els.meterText = document.getElementById("coaster-meter-text");
    els.meterContext = document.getElementById("coaster-meter-context");
    els.pathMarker = document.getElementById("coaster-path-marker");
    els.reveal = document.getElementById("station3-reveal");
    els.continueBtn = document.getElementById("station3-continue-btn");
    els.oceanStage = document.getElementById("ocean-stage");
    els.oceanEventBanner = document.getElementById("ocean-event-banner");
    els.oceanEventText = document.getElementById("ocean-event-text");

    // Journey phase nodes
    els.phaseNodeRise = document.getElementById("phase-node-rise");
    els.phaseNodeDrop = document.getElementById("phase-node-drop");
    els.phaseNodeStable = document.getElementById("phase-node-stable");
    els.phaseLine1 = document.getElementById("phase-line-1");
    els.phaseLine2 = document.getElementById("phase-line-2");
  }

  function updateMeter(stepData) {
    if (!els.meterFill || !els.meterText) return;

    const val = stepData ? stepData.meter : 50;
    const label = stepData ? stepData.meterLabel : "50%";
    const context = stepData ? stepData.context : "Baseline · Gentle waters";

    els.meterFill.style.width = `${val}%`;
    els.meterText.textContent = label;
    if (els.meterContext) els.meterContext.textContent = context;

    // Color gradient based on phase
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
    if (stepIndex < 0) {
      els.pathMarker.style.left = "8%";
      return;
    }
    const pct = 8 + (stepIndex / (TOTAL_STEPS - 1)) * 82;
    els.pathMarker.style.left = `${pct}%`;
  }

  function updatePhaseIndicator(stepData) {
    const riseNode = els.phaseNodeRise;
    const dropNode = els.phaseNodeDrop;
    const stableNode = els.phaseNodeStable;
    const line1 = els.phaseLine1;
    const line2 = els.phaseLine2;

    if (!riseNode || !dropNode || !stableNode) return;

    [riseNode, dropNode, stableNode].forEach((n) => {
      n.classList.remove("is-active", "is-passed");
    });
    if (line1) line1.classList.remove("is-passed");
    if (line2) line2.classList.remove("is-passed");

    if (!stepData || stepData.phase === "rise") {
      riseNode.classList.add("is-active");
    } else if (stepData.phase === "drop") {
      riseNode.classList.add("is-passed");
      if (line1) line1.classList.add("is-passed");
      dropNode.classList.add("is-active");
    } else if (stepData.phase === "stable") {
      riseNode.classList.add("is-passed");
      if (line1) line1.classList.add("is-passed");
      dropNode.classList.add("is-passed");
      if (line2) line2.classList.add("is-passed");
      stableNode.classList.add("is-active");
    }
  }

  function updateOceanScene(stepData) {
    if (!els.oceanStage) return;

    els.oceanStage.classList.remove("ocean--rise", "ocean--drop", "ocean--stable");

    if (!stepData) {
      if (els.oceanEventText) els.oceanEventText.textContent = "Your journey begins…";
      return;
    }

    if (stepData.phase === "rise") {
      els.oceanStage.classList.add("ocean--rise");
    } else if (stepData.phase === "drop") {
      els.oceanStage.classList.add("ocean--drop");
    } else if (stepData.phase === "stable") {
      els.oceanStage.classList.add("ocean--stable");
    }

    if (els.oceanEventText) {
      els.oceanEventText.textContent = `${stepData.icon} ${stepData.title}`;
    }
  }

  function goToStep(index) {
    if (index < 0 || index >= TOTAL_STEPS) return;

    state.currentStep = index;
    const stepData = STEPS[index];

    // Sound effects
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

    // Milestone celebration burst
    if (window.ParticleEngine && els.stageCard) {
      const rect = els.stageCard.getBoundingClientRect();
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      const count = stepData.id === TOTAL_STEPS - 1 ? 120 : stepData.phase === "drop" ? 12 : 25;
      ParticleEngine.burst(xRatio, yRatio, { count });
    }

    // Update Stage Card
    if (els.stageCard) {
      els.stageCard.hidden = false;
      if (els.stageIcon) els.stageIcon.textContent = stepData.icon;
      if (els.stageTitle) els.stageTitle.textContent = stepData.title;
      if (els.stageDesc) els.stageDesc.textContent = stepData.desc;
      if (els.stageStatus) els.stageStatus.textContent = stepData.status;
    }

    updateMeter(stepData);
    updateMarker(index);
    updatePhaseIndicator(stepData);
    updateOceanScene(stepData);
  }

  function startJourney() {
    if (state.isRunning) return;

    if (window.AudioEngine) AudioEngine.playClick();

    state.isRunning = true;

    // Button state
    if (els.startBtn) {
      els.startBtn.disabled = true;
      els.startBtn.setAttribute("aria-disabled", "true");
      els.startBtn.textContent = "The Journey Begins…";
    }
    if (els.stepBtn) {
      els.stepBtn.hidden = true;
    }

    let currentIdx = 0;
    goToStep(currentIdx);

    function nextTick() {
      if (!state.isRunning) return;

      currentIdx++;
      if (currentIdx < TOTAL_STEPS) {
        goToStep(currentIdx);
        state.timerId = setTimeout(nextTick, STEP_DURATION_MS);
      } else {
        finishJourney();
      }
    }

    state.timerId = setTimeout(nextTick, STEP_DURATION_MS);
  }

  function finishJourney() {
    state.isRunning = false;

    // Reset button to allow replay
    if (els.startBtn) {
      els.startBtn.disabled = false;
      els.startBtn.removeAttribute("aria-disabled");
      els.startBtn.textContent = "Replay Journey \u21BA";
    }

    // Emotional Climax statement inside the visualization
    if (els.oceanEventText) {
      els.oceanEventText.textContent = "\u2728 The waves changed. The boat remained.";
    }

    // Reveal Station 3 reflection card
    showFinalReveal();
  }

  function resetJourney() {
    if (state.timerId) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }
    state.isRunning = false;
    state.currentStep = -1;

    updateMeter(null);
    updateMarker(-1);
    updatePhaseIndicator(null);
    updateOceanScene(null);

    if (els.startBtn) {
      els.startBtn.disabled = false;
      els.startBtn.removeAttribute("aria-disabled");
      els.startBtn.textContent = "Start the Coaster \u2192";
    }
    if (els.stageCard) {
      els.stageCard.hidden = true;
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
      els.startBtn.addEventListener("click", () => {
        if (state.completed && state.currentStep >= TOTAL_STEPS - 1) {
          resetJourney();
          setTimeout(startJourney, 150);
        } else {
          startJourney();
        }
      });
    }

    if (els.stepBtn) {
      els.stepBtn.addEventListener("click", () => {
        if (state.currentStep < TOTAL_STEPS - 1) {
          goToStep(state.currentStep + 1);
        }
      });
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
      updatePhaseIndicator(null);
      updateOceanScene(null);
    }
  }

  return { init, startJourney, resetJourney, state };
})();

document.addEventListener("DOMContentLoaded", Station3.init);
