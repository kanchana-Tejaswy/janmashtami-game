/* ============================================================
   VRINDAVAN QUEST — station3.js
   Station 3: What Really Makes Me Happy?
   The Happiness Roller Coaster of Life.

   Master UX + Story + Gameplay Implementation:
   - A visual metaphor for life's changing circumstances.
   - 13 emotional moments across 5 chapters:
     1. The Ride Begins (Start the Ride)
     2. Temporary Happiness (Shopping, Likes, Money, Success, Love)
     3. Life Changes (Phone Breaks, Job Setback, Heartbreak, Financial Drop)
     4. The Important Pause (Life has ups and downs...)
     5. Inner Peace (A happiness that begins inside us...)
     6. Spiritual Connection (Connected to something greater...)
     7. Final Realization ("Which happiness survives life's ups and downs?")
   - STRICT user-controlled pacing: Every message pauses completely.
     NO automatic timers. Advances ONLY on explicit user confirmation.
   ============================================================ */

const Station3 = (() => {
  const STEPS = [
    // ------------------------------------------------------------
    // CHAPTER 1: TEMPORARY HAPPINESS (External Highs)
    // ------------------------------------------------------------
    {
      id: 0,
      phase: "rise",
      phaseLabel: "Temporary Happiness",
      badge: "Excitement",
      badgeClass: "badge--rise",
      icon: "🛍️",
      title: "Shopping & New Things",
      quotes: [
        "A new thing can make us happy."
      ],
      highlightQuote: null,
      sub: "When we get something new, an instant rush of joy lifts our mood.",
      meter: 65,
      meterLabel: "65%",
      context: "Rising · Excited by new things",
      boatLeft: "15%",
      bannerText: "🛍️ Shopping · A new thing brings joy",
      sfx: "chime",
      oceanClass: "ocean--rise",
    },
    {
      id: 1,
      phase: "rise",
      phaseLabel: "Temporary Happiness",
      badge: "Pleasure",
      badgeClass: "badge--rise",
      icon: "📱",
      title: "Likes & Attention",
      quotes: [
        "Being noticed can make us feel good."
      ],
      highlightQuote: null,
      sub: "Validation, likes, and compliments make us feel admired and special.",
      meter: 78,
      meterLabel: "78%",
      context: "Rising · Feeling noticed and admired",
      boatLeft: "23%",
      bannerText: "📱 Attention · Being noticed feels good",
      sfx: "chime",
      oceanClass: "ocean--rise",
    },
    {
      id: 2,
      phase: "rise",
      phaseLabel: "Temporary Happiness",
      badge: "Security",
      badgeClass: "badge--rise",
      icon: "💰",
      title: "Money & Comfort",
      quotes: [
        "Money can make life easier."
      ],
      highlightQuote: null,
      sub: "Financial ease brings confidence, comfort, and peace of mind.",
      meter: 88,
      meterLabel: "88%",
      context: "Rising · Life feels easier and comfortable",
      boatLeft: "31%",
      bannerText: "💰 Money · Financial comfort",
      sfx: "chime",
      oceanClass: "ocean--rise",
    },
    {
      id: 3,
      phase: "rise",
      phaseLabel: "Temporary Happiness",
      badge: "Pride",
      badgeClass: "badge--rise",
      icon: "💼",
      title: "Success & Achievement",
      quotes: [
        "Success can make us proud."
      ],
      highlightQuote: null,
      sub: "Reaching our goals makes us feel capable, important, and strong.",
      meter: 94,
      meterLabel: "94%",
      context: "Rising · Proud of our achievement",
      boatLeft: "39%",
      bannerText: "💼 Success · Reaching our goals",
      sfx: "chime",
      oceanClass: "ocean--rise",
    },
    {
      id: 4,
      phase: "rise",
      phaseLabel: "Temporary Happiness",
      badge: "Peak Joy",
      badgeClass: "badge--rise",
      icon: "❤️",
      title: "Relationships & Love",
      quotes: [
        "Love can bring great happiness."
      ],
      highlightQuote: null,
      sub: "Surrounded by loved ones, everything feels warm and complete.",
      meter: 98,
      meterLabel: "98%",
      context: "Peak Joy · Everything feels complete",
      boatLeft: "47%",
      bannerText: "❤️ Love · Great happiness",
      sfx: "flute",
      oceanClass: "ocean--rise",
    },

    // ------------------------------------------------------------
    // CHAPTER 2: LIFE CHANGES (Inevitable Drops)
    // ------------------------------------------------------------
    {
      id: 5,
      phase: "drop",
      phaseLabel: "Life Changes",
      badge: "Uncertainty",
      badgeClass: "badge--drop",
      icon: "💥",
      title: "Phone Breaks",
      quotes: [
        "But what happens when the thing we enjoy is gone?"
      ],
      highlightQuote: null,
      sub: "A broken device or lost item brings instant frustration and stress.",
      meter: 70,
      meterLabel: "70%",
      context: "Falling · When possessions break",
      boatLeft: "55%",
      bannerText: "⛈️ Life changes · Winds begin to shift",
      sfx: "whoosh",
      oceanClass: "ocean--drop",
    },
    {
      id: 6,
      phase: "drop",
      phaseLabel: "Life Changes",
      badge: "Setback",
      badgeClass: "badge--drop",
      icon: "💼",
      title: "Career / Job Setback",
      quotes: [
        "What happens when success does not go our way?"
      ],
      highlightQuote: null,
      sub: "When plans fall apart or recognition fades, pride quickly turns to doubt.",
      meter: 45,
      meterLabel: "45%",
      context: "Falling · When plans do not work out",
      boatLeft: "63%",
      bannerText: "⛈️ Setbacks · Success does not go our way",
      sfx: "whoosh",
      oceanClass: "ocean--drop",
    },
    {
      id: 7,
      phase: "drop",
      phaseLabel: "Life Changes",
      badge: "Emotional Pain",
      badgeClass: "badge--drop",
      icon: "💔",
      title: "Relationship Problem",
      quotes: [
        "What happens when someone we love hurts us?"
      ],
      highlightQuote: null,
      sub: "Misunderstandings turn closeness into painful distance and heartache.",
      meter: 25,
      meterLabel: "25%",
      context: "Falling · Conflict and emotional distance",
      boatLeft: "71%",
      bannerText: "⛈️ Friction · Emotional distance",
      sfx: "whoosh",
      oceanClass: "ocean--drop",
    },
    {
      id: 8,
      phase: "drop",
      phaseLabel: "Life Changes",
      badge: "Loss",
      badgeClass: "badge--drop",
      icon: "💸",
      title: "Financial Difficulty",
      quotes: [
        "What happens when money becomes difficult?"
      ],
      highlightQuote: null,
      sub: "When unexpected losses happen, the ground beneath our comfort shakes.",
      meter: 10,
      meterLabel: "10%",
      context: "Deepest Dip · When external props are shaken",
      boatLeft: "78%",
      bannerText: "⛈️ Loss · Money becomes difficult",
      sfx: "whoosh",
      oceanClass: "ocean--drop",
    },

    // ------------------------------------------------------------
    // CHAPTER 3: THE IMPORTANT PAUSE (Quiet Reflection)
    // ------------------------------------------------------------
    {
      id: 9,
      phase: "pause",
      phaseLabel: "A Quiet Moment",
      badge: "The Realization",
      badgeClass: "badge--drop",
      icon: "⏸️",
      title: "Life Has Ups and Downs",
      quotes: [
        "Life has ups and downs.",
        "If our happiness depends only on what happens around us…",
        "…our happiness will rise and fall with it."
      ],
      highlightQuote: null,
      sub: "When we tie our peace completely to changing circumstances, our heart rides an endless roller coaster.",
      meter: 15,
      meterLabel: "15%",
      context: "Stillness · Observing life's pattern",
      boatLeft: "82%",
      bannerText: "⏸️ Life has ups and downs…",
      sfx: "chime",
      oceanClass: "ocean--drop",
    },

    // ------------------------------------------------------------
    // CHAPTER 4: INNER PEACE (Calm within)
    // ------------------------------------------------------------
    {
      id: 10,
      phase: "stable",
      phaseLabel: "Inner Peace",
      badge: "Inner Sanctuary",
      badgeClass: "badge--stable",
      icon: "🧘",
      title: "Inner Peace",
      quotes: [
        "But there is another kind of happiness.",
        "A happiness that begins inside us."
      ],
      highlightQuote: null,
      sub: "Taking a deep, quiet breath. A steady calmness that does not shake with external waves.",
      meter: 75,
      meterLabel: "75%",
      context: "Calming · A happiness that begins inside us",
      boatLeft: "87%",
      bannerText: "🧘 A happiness that begins inside us",
      sfx: "flute",
      oceanClass: "ocean--stable",
    },

    // ------------------------------------------------------------
    // CHAPTER 5: SPIRITUAL CONNECTION (Eternal Anchor)
    // ------------------------------------------------------------
    {
      id: 11,
      phase: "stable",
      phaseLabel: "Spiritual Connection",
      badge: "Eternal Anchor",
      badgeClass: "badge--stable",
      icon: "🪷",
      title: "Spiritual Connection",
      quotes: [
        "When we find peace within…",
        "…and feel connected to something greater…",
        "…life's ups and downs cannot control our heart so easily."
      ],
      highlightQuote: null,
      sub: "Anchored in the eternal soul and Lord Krishna. The ride is no longer chaotic — it becomes peaceful.",
      meter: 100,
      meterLabel: "100%",
      context: "Steady & Unshakable · Anchored in something greater",
      boatLeft: "91%",
      bannerText: "✨ The waves changed. The boat remained.",
      sfx: "celebration",
      oceanClass: "ocean--stable",
    },

    // ------------------------------------------------------------
    // FINAL REALIZATION: THE QUESTION
    // ------------------------------------------------------------
    {
      id: 12,
      phase: "realization",
      phaseLabel: "Final Realization",
      badge: "The Question",
      badgeClass: "badge--stable",
      icon: "✨",
      title: "Which Happiness Survives?",
      quotes: [
        "Shopping can change.",
        "Money can change.",
        "Success can change.",
        "Relationships can change.",
        "Life can change."
      ],
      highlightQuote: "Which happiness survives life's ups and downs?",
      sub: "Maybe real happiness is not only about what I have. Maybe it is also about the peace I carry within.",
      meter: 100,
      meterLabel: "100%",
      context: "Unshakable Peace · What we carry inside",
      boatLeft: "94%",
      bannerText: "✨ Which happiness survives life's ups and downs?",
      sfx: "celebration",
      oceanClass: "ocean--stable",
      isFinal: true,
    },
  ];

  const TOTAL_STEPS = STEPS.length;
  const TRANSITION_DURATION_MS = 650; // Smooth boat glide & meter transition

  const state = {
    currentStepIndex: -1, // -1 = unstarted
    isTransitioning: false,
    completed: false,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("station-3");
    els.startBtn = document.getElementById("coaster-start-btn");
    els.stepCounter = document.getElementById("journey-phase-step-counter");
    els.stageCard = document.getElementById("coaster-stage-card");
    els.stageIcon = document.getElementById("coaster-stage-icon");
    els.stageTitle = document.getElementById("coaster-stage-title");
    els.stageStatus = document.getElementById("coaster-stage-status");
    els.stageQuotes = document.getElementById("coaster-stage-quotes");
    els.stageSub = document.getElementById("coaster-stage-sub");
    els.meterFill = document.getElementById("coaster-meter-fill");
    els.meterText = document.getElementById("coaster-meter-text");
    els.meterContext = document.getElementById("coaster-meter-context");
    els.pathMarker = document.getElementById("coaster-path-marker");
    els.reveal = document.getElementById("station3-reveal");
    els.continueBtn = document.getElementById("station3-continue-btn");
    els.oceanStage = document.getElementById("ocean-stage");
    els.oceanEventBanner = document.getElementById("ocean-event-banner");
    els.oceanEventText = document.getElementById("ocean-event-text");

    // Phase Indicator track nodes
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

    if (!stepData) {
      els.meterFill.style.background = "linear-gradient(90deg, var(--gold-500), var(--gold-300))";
    } else if (stepData.phase === "rise") {
      els.meterFill.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
    } else if (stepData.phase === "drop") {
      els.meterFill.style.background = "linear-gradient(90deg, #ff7a4d, #ef4444)";
    } else if (stepData.phase === "pause") {
      els.meterFill.style.background = "linear-gradient(90deg, #b45309, #d97706)";
    } else {
      els.meterFill.style.background = "linear-gradient(90deg, #14b8a6, #fef08a)";
    }
  }

  function updateMarker(stepData) {
    if (!els.pathMarker) return;
    if (!stepData) {
      els.pathMarker.style.left = "8%";
      return;
    }
    els.pathMarker.style.left = stepData.boatLeft;
  }

  function updatePhaseIndicator(stepData, index) {
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

    if (!stepData) {
      riseNode.classList.add("is-active");
      if (els.stepCounter) els.stepCounter.textContent = "YOUR RIDE";
      return;
    }

    if (els.stepCounter) {
      els.stepCounter.textContent = `MOMENT ${index + 1} OF ${TOTAL_STEPS} \u00B7 ${stepData.phaseLabel.toUpperCase()}`;
    }

    if (stepData.phase === "rise") {
      riseNode.classList.add("is-active");
    } else if (stepData.phase === "drop" || stepData.phase === "pause") {
      riseNode.classList.add("is-passed");
      if (line1) line1.classList.add("is-passed");
      dropNode.classList.add("is-active");
    } else {
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
      if (els.oceanEventText) els.oceanEventText.textContent = "Your ride begins…";
      return;
    }

    els.oceanStage.classList.add(stepData.oceanClass);

    if (els.oceanEventText) {
      els.oceanEventText.textContent = stepData.bannerText;
    }
  }

  function renderCardQuotes(quotes, highlightQuote) {
    if (!els.stageQuotes) return;
    els.stageQuotes.innerHTML = "";

    quotes.forEach((q) => {
      const p = document.createElement("p");
      p.className = "coaster-stage-card__quote-line";
      p.textContent = `\u201C${q}\u201D`;
      els.stageQuotes.appendChild(p);
    });

    if (highlightQuote) {
      const h = document.createElement("p");
      h.className = "coaster-stage-card__quote-line highlight";
      h.textContent = `\u201C${highlightQuote}\u201D`;
      els.stageQuotes.appendChild(h);
    }
  }

  function playStepAudio(stepData) {
    if (!window.AudioEngine || !stepData) return;

    if (stepData.sfx === "chime") {
      AudioEngine.playChime({ volume: 0.22 });
    } else if (stepData.sfx === "flute") {
      AudioEngine.playFluteNote(523.25, { duration: 1.2, volume: 0.22 });
    } else if (stepData.sfx === "whoosh") {
      AudioEngine.playWhoosh({ rising: false, duration: 0.45, volume: 0.25 });
    } else if (stepData.sfx === "celebration") {
      AudioEngine.playCelebration();
      AudioEngine.playFluteNote(659.25, { duration: 1.5, volume: 0.22 });
    }
  }

  function triggerStepParticles(stepData) {
    if (!window.ParticleEngine || !els.stageCard) return;
    const rect = els.stageCard.getBoundingClientRect();
    const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
    const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

    let count = 25;
    if (stepData.isFinal) count = 120;
    else if (stepData.phase === "drop") count = 10;
    else if (stepData.phase === "stable") count = 60;

    ParticleEngine.burst(xRatio, yRatio, { count });
  }

  /* Transition to a specific step with strict explicit user control */
  function goToStep(targetIndex) {
    if (state.isTransitioning) return;
    state.isTransitioning = true;

    const stepData = STEPS[targetIndex];
    if (!stepData) {
      state.isTransitioning = false;
      return;
    }

    // Temporarily disable button to prevent double triggering
    if (els.startBtn) {
      els.startBtn.disabled = true;
      els.startBtn.setAttribute("aria-disabled", "true");
      els.startBtn.textContent = "Moving along the ride…";
    }

    // Audio & Particle Effects
    playStepAudio(stepData);
    triggerStepParticles(stepData);

    // Update Visualization Scene, Marker & Meter
    updateMeter(stepData);
    updateMarker(stepData);
    updatePhaseIndicator(stepData, targetIndex);
    updateOceanScene(stepData);

    // Update Dedicated Message Card with breathing room
    if (els.stageCard) {
      els.stageCard.hidden = false;
      if (els.stageIcon) els.stageIcon.textContent = stepData.icon;
      if (els.stageTitle) els.stageTitle.textContent = stepData.title;
      if (els.stageStatus) {
        els.stageStatus.textContent = `${stepData.phaseLabel} \u00B7 ${stepData.badge}`;
        els.stageStatus.className = `coaster-stage-card__badge ${stepData.badgeClass}`;
      }
      renderCardQuotes(stepData.quotes, stepData.highlightQuote);
      if (els.stageSub) els.stageSub.textContent = stepData.sub;
    }

    // Allow the boat and meter ease to settle smoothly
    setTimeout(() => {
      state.currentStepIndex = targetIndex;
      state.isTransitioning = false;

      // Enable the button and display the required call to action
      if (els.startBtn) {
        els.startBtn.disabled = false;
        els.startBtn.removeAttribute("aria-disabled");

        if (stepData.isFinal) {
          // On final realization, display: "CONTINUE THE JOURNEY →"
          els.startBtn.textContent = "CONTINUE THE JOURNEY \u2192";
        } else {
          // On intermediate moments, display: "CONTINUE →"
          els.startBtn.textContent = "CONTINUE \u2192";
        }
        els.startBtn.focus();
      }

      // CRITICAL UX MANDATE:
      // ZERO automatic timers! The experience completely PAUSES here
      // until the user explicitly clicks the button.
    }, TRANSITION_DURATION_MS);
  }

  /* Conclude the ride after the final realization */
  function finishJourney() {
    state.completed = true;
    state.isTransitioning = false;

    // Button allows replaying the experience anytime
    if (els.startBtn) {
      els.startBtn.disabled = false;
      els.startBtn.removeAttribute("aria-disabled");
      els.startBtn.textContent = "REPLAY THE RIDE \u21BA";
    }

    // In-scene emotional climax statement
    if (els.oceanEventText) {
      els.oceanEventText.textContent = "\u2728 The waves changed. The boat remained.";
    }

    // Reveal Station 3 reflection card
    showFinalReveal();
  }

  function resetJourney() {
    state.isTransitioning = false;
    state.currentStepIndex = -1;

    updateMeter(null);
    updateMarker(null);
    updatePhaseIndicator(null, -1);
    updateOceanScene(null);

    if (els.startBtn) {
      els.startBtn.disabled = false;
      els.startBtn.removeAttribute("aria-disabled");
      els.startBtn.textContent = "START THE RIDE \u2192";
    }
    if (els.stageCard) {
      els.stageCard.hidden = true;
    }
  }

  function showFinalReveal() {
    if (els.reveal) {
      els.reveal.hidden = false;
      els.reveal.focus();
      els.reveal.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Update quest progress in the river nav
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("3");
    }
  }

  /* Master click handler enforcing strict user confirmation */
  function handleJourneyAction() {
    if (state.isTransitioning) return;

    if (window.AudioEngine) AudioEngine.playClick();

    if (state.currentStepIndex === -1) {
      // Unstarted -> Enter Phase 1 / Step 0 (Shopping)
      goToStep(0);
    } else if (state.currentStepIndex < TOTAL_STEPS - 1) {
      // Step through each moment on explicit user click
      goToStep(state.currentStepIndex + 1);
    } else if (state.currentStepIndex === TOTAL_STEPS - 1 && !state.completed) {
      // At final realization -> User clicks "CONTINUE THE JOURNEY →"
      finishJourney();
    } else {
      // Replay requested -> Reset and restart smoothly
      resetJourney();
      setTimeout(() => {
        goToStep(0);
      }, 150);
    }
  }

  function bind() {
    if (els.startBtn) {
      els.startBtn.addEventListener("click", handleJourneyAction);
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
      updateMarker(null);
      updatePhaseIndicator(null, -1);
      updateOceanScene(null);
    }
  }

  return { init, handleJourneyAction, resetJourney, state, STEPS };
})();

document.addEventListener("DOMContentLoaded", Station3.init);

