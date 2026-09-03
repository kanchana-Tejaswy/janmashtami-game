/* ============================================================
   VRINDAVAN QUEST — station2.js
   Station 2, Activity B: Mystery Boxes.

   Five golden treasure boxes opened sequentially.
   Boxes 1–4 reveal temporal human pursuits (Money, Career,
   Relationships, Experiences). Box 5 reveals "THE QUESTION BEHIND
   EVERYTHING": "Who am I, and what is the purpose of my life?"
   ============================================================ */

const Station2Boxes = (() => {
  const BOX_DATA = [
    {
      id: 1,
      num: "Box I",
      label: "Money & Wealth",
      icon: "🪙",
      tag: "Security & Comfort",
      text: "We spend our energy securing wealth for comfort and safety. Yet no amount of gold can purchase a single extra second of time when life's curtain falls.",
    },
    {
      id: 2,
      num: "Box II",
      label: "Career & Status",
      icon: "🏆",
      tag: "Achievement & Recognition",
      text: "We chase titles, awards, and position to build an identity. Yet every post is temporary, every badge is outgrown, and every position is eventually given to another.",
    },
    {
      id: 3,
      num: "Box III",
      label: "Relationships",
      icon: "🤝",
      tag: "Love & Belonging",
      text: "Family, friends, and social circles give warmth to our days. Yet even the sweetest worldly connections are bound by time and change.",
    },
    {
      id: 4,
      num: "Box IV",
      label: "Experiences",
      icon: "🌟",
      tag: "Pleasure & Adventure",
      text: "Travel, entertainment, and memorable moments fill our years with color. Yet once the moment passes, the inner heart still asks for something eternal.",
    },
    {
      id: 5,
      num: "Box V",
      label: "The Ultimate Inquiry",
      icon: "🦚",
      tag: "The Eternal Question",
      special: true,
      text: "Beyond money, career, bonds, and pleasures lies the true privilege of human birth: asking the eternal question.",
    },
  ];

  const TOTAL_BOXES = BOX_DATA.length;

  const state = {
    opened: new Set(),
    currentlyOpened: null,
    isAnimating: false,
    revealedFinal: false,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("station-2");
    els.grid = document.getElementById("boxes-grid");
    els.counter = document.getElementById("boxes-counter");
    els.detailCard = document.getElementById("box-detail-card");
    els.detailIcon = document.getElementById("box-detail-icon");
    els.detailNum = document.getElementById("box-detail-num");
    els.detailTitle = document.getElementById("box-detail-title");
    els.detailText = document.getElementById("box-detail-text");
    els.detailNextBtn = document.getElementById("box-detail-next-btn");
    els.reveal = document.getElementById("boxes-reveal");
    els.continueBtn = document.getElementById("station2-continue-btn");
  }

  function getBoxEl(id) {
    return els.grid?.querySelector(`.box-card[data-box="${id}"]`);
  }

  function updateCounter() {
    if (!els.counter) return;
    const count = state.opened.size;
    if (count >= TOTAL_BOXES) {
      els.counter.textContent = `Boxes opened: ${TOTAL_BOXES} of ${TOTAL_BOXES} \u00b7 the question behind everything is revealed`;
    } else {
      const nextId = count + 1;
      els.counter.textContent = `Boxes opened: ${count} of ${TOTAL_BOXES} \u00b7 ready for Box ${nextId}`;
    }
  }

  function openBox(id) {
    if (state.isAnimating || state.opened.has(id)) return;

    // Sequential check: cannot open if previous box is not opened
    if (id > 1 && !state.opened.has(id - 1)) return;

    state.isAnimating = true;
    const boxEl = getBoxEl(id);
    const boxData = BOX_DATA.find((b) => b.id === id);
    if (!boxEl || !boxData) return;

    const btn = boxEl.querySelector(".box-card__btn");
    if (btn) btn.disabled = true;

    boxEl.setAttribute("data-state", "opening");

    // Audio SFX for opening box
    if (window.AudioEngine) {
      if (id === 5) {
        AudioEngine.playCelebration();
      } else {
        AudioEngine.playWhoosh({ rising: true, duration: 0.4, volume: 0.18 });
        AudioEngine.playChime({ delay: 0.15, volume: 0.22 });
      }
    }

    // Particle burst from box location
    if (window.ParticleEngine && boxEl) {
      const rect = boxEl.getBoundingClientRect();
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      const particleCount = id === 5 ? 120 : 35;
      ParticleEngine.burst(xRatio, yRatio, { count: particleCount });
    }

    setTimeout(() => {
      state.opened.add(id);
      state.isAnimating = false;
      boxEl.setAttribute("data-state", "opened");

      const lockSpan = boxEl.querySelector(".box-card__lock");
      if (lockSpan) lockSpan.textContent = "✓";

      if (btn) {
        btn.textContent = "✓ Revealed";
        btn.disabled = true;
        btn.setAttribute("aria-disabled", "true");
      }

      updateCounter();

      // Unlock next box if available
      const nextId = id + 1;
      if (nextId <= TOTAL_BOXES) {
        const nextBoxEl = getBoxEl(nextId);
        if (nextBoxEl) {
          nextBoxEl.setAttribute("data-state", "ready");
          const nextBtn = nextBoxEl.querySelector(".box-card__btn");
          if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.removeAttribute("aria-disabled");
            nextBtn.textContent = "Open Box";
            nextBtn.setAttribute("aria-label", `Open Box ${nextId}: ${BOX_DATA[nextId - 1].label}`);
          }
          const nextLockSpan = nextBoxEl.querySelector(".box-card__lock");
          if (nextLockSpan) nextLockSpan.textContent = "🔓";
        }
      }

      // Show reveal detail
      if (id === 5) {
        showFinalReveal();
      } else {
        showDetailCard(boxData);
      }
    }, 550);
  }

  function showDetailCard(data) {
    if (!els.detailCard) return;

    state.currentlyOpened = data.id;

    if (els.detailIcon) els.detailIcon.textContent = data.icon;
    if (els.detailNum) els.detailNum.textContent = `${data.num} Revealed \u00b7 ${data.tag}`;
    if (els.detailTitle) els.detailTitle.textContent = data.label;
    if (els.detailText) els.detailText.textContent = data.text;

    const nextId = data.id + 1;
    if (els.detailNextBtn) {
      if (nextId <= TOTAL_BOXES) {
        const nextData = BOX_DATA[nextId - 1];
        els.detailNextBtn.textContent = `Open ${nextData.num} (${nextData.label}) \u2192`;
      } else {
        els.detailNextBtn.textContent = "Continue \u2192";
      }
    }

    els.detailCard.hidden = false;
    els.detailCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (els.detailNextBtn) els.detailNextBtn.focus();
  }

  function closeDetailCard() {
    if (els.detailCard) els.detailCard.hidden = true;
    const currentId = state.currentlyOpened;
    state.currentlyOpened = null;

    if (currentId) {
      const nextId = currentId + 1;
      if (nextId <= TOTAL_BOXES) {
        const nextBox = getBoxEl(nextId);
        const nextBtn = nextBox?.querySelector(".box-card__btn");
        if (nextBtn && !nextBtn.disabled) {
          nextBtn.focus();
          return;
        }
      }
    }
  }

  function showFinalReveal() {
    if (els.detailCard) els.detailCard.hidden = true;

    state.revealedFinal = true;
    if (els.reveal) {
      els.reveal.hidden = false;
      els.reveal.focus();
      els.reveal.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Call VrindavanQuest.markComplete("2") to mark station 2 complete in nav line!
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("2");
    }
  }

  function bind() {
    // Box button click handlers
    BOX_DATA.forEach((b) => {
      const boxEl = getBoxEl(b.id);
      if (!boxEl) return;
      const btn = boxEl.querySelector(".box-card__btn");
      if (btn) {
        btn.addEventListener("click", () => openBox(b.id));
      }
      // Also allow clicking chest graphic directly if unlocked
      const chest = boxEl.querySelector(".box-card__chest");
      if (chest) {
        chest.addEventListener("click", () => {
          if (boxEl.getAttribute("data-state") === "ready") {
            openBox(b.id);
          }
        });
      }
    });

    if (els.detailNextBtn) {
      els.detailNextBtn.addEventListener("click", () => {
        if (window.AudioEngine) AudioEngine.playClick();
        const currentId = state.currentlyOpened;
        closeDetailCard();
        if (currentId && currentId < TOTAL_BOXES) {
          openBox(currentId + 1);
        }
      });
    }

    if (els.continueBtn) {
      els.continueBtn.addEventListener("click", () => {
        if (window.AudioEngine) AudioEngine.playClick();
        if (window.VrindavanQuest && typeof VrindavanQuest.goToStation === "function") {
          VrindavanQuest.goToStation("3");
        }
      });
    }
  }

  function init() {
    if (!document.getElementById("boxes-grid")) return; // Not on page
    cacheEls();
    bind();
    updateCounter();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", Station2Boxes.init);
