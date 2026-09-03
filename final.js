/* ============================================================
   VRINDAVAN QUEST — final.js
   Final Station: Mirror Reveal & Soul Card Keepsake.

   Sequentially guides player through:
   1. Mirror Reveal ("Look Within")
   2. Inner Realization ("I am the soul.")
   3. Life's Purpose & Bhagavad Gita 6.22 verse
   4. Name input & HTML5 Canvas Soul Card generation
   5. Card Save & Share actions + Completion state
   ============================================================ */

(() => {
  'use strict';

  const state = {
    mirrorRevealed: false,
    realizationDone: false,
    cardGenerated: false,
    playerName: "",
    isAnimating: false,
  };

  const els = {};

  function cacheEls() {
    els.root = document.getElementById("station-final");
    els.mirrorFrame = document.getElementById("mirror-frame");
    els.mirrorSurface = document.getElementById("mirror-surface");
    els.mirrorPromptText = document.getElementById("mirror-prompt-text");
    els.mirrorRevealBtn = document.getElementById("mirror-reveal-btn");
    els.realizationCard = document.getElementById("final-realization-card");
    els.realizationHeadline = document.getElementById("realization-headline");
    els.realizationLines = document.querySelectorAll(".realization-line");
    els.soulDeclaration = document.getElementById("soul-declaration");
    els.purposeSection = document.getElementById("purpose-section");
    els.verseSection = document.getElementById("verse-section");
    els.cardForm = document.getElementById("soul-card-form");
    els.nameInput = document.getElementById("player-name-input");
    els.createCardBtn = document.getElementById("create-card-btn");
    els.nameFormError = document.getElementById("name-form-error");
    els.cardResult = document.getElementById("soul-card-result");
    els.cardCanvas = document.getElementById("soul-card-canvas");
    els.saveCardBtn = document.getElementById("save-card-btn");
    els.shareCardBtn = document.getElementById("share-card-btn");
    els.actionFeedback = document.getElementById("action-feedback-text");
  }

  function revealMirror() {
    if (state.mirrorRevealed || state.isAnimating) return;
    state.isAnimating = true;
    state.mirrorRevealed = true;

    // SFX & Particles
    if (window.AudioEngine) {
      AudioEngine.playWhoosh({ rising: true, duration: 0.6, volume: 0.2 });
      AudioEngine.playChime({ delay: 0.2, volume: 0.25 });
    }

    if (window.ParticleEngine && els.mirrorFrame) {
      const rect = els.mirrorFrame.getBoundingClientRect();
      const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
      const yRatio = (rect.top + rect.height / 2) / window.innerHeight;
      ParticleEngine.burst(xRatio, yRatio, { count: 45 });
    }

    // Mirror ripple & glow animation
    els.mirrorFrame?.classList.add("mirror-frame--revealed");
    if (els.mirrorPromptText) els.mirrorPromptText.textContent = "✨ The Soul Reflected ✨";
    if (els.mirrorRevealBtn) els.mirrorRevealBtn.hidden = true;

    // Reveal Inner Realization Card
    setTimeout(() => {
      state.isAnimating = false;
      if (els.realizationCard) {
        els.realizationCard.hidden = false;
        els.realizationCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      animateRealizationLines();
    }, 600);
  }

  function animateRealizationLines() {
    const lines = Array.from(els.realizationLines || []);
    let delay = 300;

    lines.forEach((line, idx) => {
      setTimeout(() => {
        line.classList.add("realization-line--visible");
        if (window.AudioEngine) AudioEngine.playTick({ volume: 0.12 });
      }, delay);
      delay += 800;
    });

    // Final Soul Declaration ("I am the soul.")
    setTimeout(() => {
      if (els.soulDeclaration) {
        els.soulDeclaration.hidden = false;
        els.soulDeclaration.classList.add("soul-declaration--visible");
      }
      if (window.AudioEngine) {
        AudioEngine.playFluteNote(523.25, { duration: 1.6, volume: 0.25 });
      }
      if (window.ParticleEngine) {
        ParticleEngine.burst(0.5, 0.45, { count: 50 });
      }
    }, delay + 400);

    // Purpose section & Gita verse section
    setTimeout(() => {
      if (els.purposeSection) els.purposeSection.hidden = false;
      if (els.verseSection) els.verseSection.hidden = false;
      state.realizationDone = true;
      if (els.nameInput) els.nameInput.focus();
    }, delay + 1200);
  }

  function handleCreateCard() {
    const rawName = els.nameInput?.value || "";
    const trimmed = rawName.trim();

    if (!trimmed) {
      if (els.nameFormError) {
        els.nameFormError.hidden = false;
        els.nameFormError.textContent = "Please enter your name to generate your Soul Card.";
      }
      if (els.nameInput) els.nameInput.focus();
      return;
    }

    if (els.nameFormError) els.nameFormError.hidden = true;
    state.playerName = trimmed;

    // SFX & Burst
    if (window.AudioEngine) AudioEngine.playCelebration();
    if (window.ParticleEngine) ParticleEngine.burst(0.5, 0.35, { count: 80 });

    // Draw Canvas Soul Card
    drawSoulCardCanvas(trimmed);

    // Show Result Container
    if (els.cardResult) {
      els.cardResult.hidden = false;
      els.cardResult.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    state.cardGenerated = true;

    // Mark journey complete in VrindavanQuest
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("final");
    }
  }

  function drawSoulCardCanvas(name) {
    const canvas = els.cardCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;  // 1200
    const h = canvas.height; // 1600

    ctx.clearRect(0, 0, w, h);

    // 1. Background Gradient (Deep Peacock Blue)
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.4, 100, w / 2, h / 2, 900);
    bgGrad.addColorStop(0, "#0d2847");
    bgGrad.addColorStop(0.55, "#081a33");
    bgGrad.addColorStop(1, "#061024");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Soft golden central aura
    const auraGrad = ctx.createRadialGradient(w / 2, h * 0.42, 20, w / 2, h * 0.42, 450);
    auraGrad.addColorStop(0, "rgba(254, 240, 138, 0.18)");
    auraGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.08)");
    auraGrad.addColorStop(1, "transparent");
    ctx.fillStyle = auraGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Double Ornate Gold Frame Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#f59e0b";
    ctx.strokeRect(40, 40, w - 80, h - 80);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
    ctx.strokeRect(52, 52, w - 104, h - 104);

    // Corner decorative accents
    drawCornerAccents(ctx, w, h);

    // 3. Header Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#14b8a6";
    ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("JANMASHTAMI QUEST", w / 2, 140);

    ctx.fillStyle = "#fef08a";
    ctx.font = "600 52px 'Cinzel', Georgia, serif";
    ctx.fillText("JOURNEY TO THE SOUL", w / 2, 210);

    // Golden Divider Line
    drawGoldenDivider(ctx, w / 2, 250, 400);

    // 4. Recipient Name
    ctx.fillStyle = "rgba(246, 241, 228, 0.75)";
    ctx.font = "italic 36px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("This keepsake certifies that", w / 2, 330);

    // Dynamic Name Font Size to fit within 1000px width
    let nameFontSize = 72;
    ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
    while (ctx.measureText(name).width > 950 && nameFontSize > 36) {
      nameFontSize -= 4;
      ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
    }

    // Name Gradient Fill
    const nameGrad = ctx.createLinearGradient(0, 390, 0, 450);
    nameGrad.addColorStop(0, "#fef08a");
    nameGrad.addColorStop(0.6, "#fbbf24");
    nameGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = nameGrad;
    ctx.fillText(name, w / 2, 420);

    ctx.fillStyle = "rgba(246, 241, 228, 0.75)";
    ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("has awakened to the eternal realization:", w / 2, 490);

    // 5. Central Sacred Emblem & Declaration
    drawLotusEmblem(ctx, w / 2, 630);

    ctx.fillStyle = "#fef08a";
    ctx.font = "600 76px 'Cinzel', Georgia, serif";
    ctx.shadowColor = "rgba(245, 158, 11, 0.7)";
    ctx.shadowBlur = 24;
    ctx.fillText("I AM THE SOUL", w / 2, 820);
    ctx.shadowBlur = 0; // reset glow

    // 6. Bhagavad Gita Verse Box
    const boxX = 100;
    const boxY = 920;
    const boxW = w - 200;
    const boxH = 460;

    // Card Inner Container
    ctx.fillStyle = "rgba(13, 40, 71, 0.7)";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    ctx.lineWidth = 2;
    roundRect(ctx, boxX, boxY, boxW, boxH, 24, true, true);

    ctx.fillStyle = "#14b8a6";
    ctx.font = "italic 30px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("SACRED REVELATION", w / 2, boxY + 55);

    // Devanagari Sanskrit Verse
    ctx.fillStyle = "#fbbf24";
    ctx.font = "600 42px 'Mukta', sans-serif";
    ctx.fillText("यं लब्ध्वा चापरं लाभं मन्यते नाधिकं ततः", w / 2, boxY + 130);

    // English Translation
    ctx.fillStyle = "#f6f1e4";
    ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText('"Having gained this, one considers no other gain greater than this."', w / 2, boxY + 220);

    // Verse Citation
    ctx.fillStyle = "#f59e0b";
    ctx.font = "600 30px 'Cinzel', Georgia, serif";
    ctx.fillText("— Bhagavad Gita 6.22", w / 2, boxY + 290);

    // Additional spiritual message
    ctx.fillStyle = "rgba(246, 241, 228, 0.7)";
    ctx.font = "30px 'Mukta', sans-serif";
    ctx.fillText("Unshakable joy unaffected by life's ups and downs.", w / 2, boxY + 380);

    // 7. Footer
    ctx.fillStyle = "rgba(246, 241, 228, 0.45)";
    ctx.font = "26px 'Mukta', sans-serif";
    ctx.fillText("Vrindavan Quest · Janmashtami Sacred Keepsake", w / 2, 1490);
  }

  function drawCornerAccents(ctx, w, h) {
    const corners = [
      { x: 52, y: 52, dx: 1, dy: 1 },
      { x: w - 52, y: 52, dx: -1, dy: 1 },
      { x: 52, y: h - 52, dx: 1, dy: -1 },
      { x: w - 52, y: h - 52, dx: -1, dy: -1 },
    ];
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    corners.forEach((c) => {
      ctx.beginPath();
      ctx.moveTo(c.x, c.y + c.dy * 30);
      ctx.lineTo(c.x, c.y);
      ctx.lineTo(c.x + c.dx * 30, c.y);
      ctx.stroke();
    });
  }

  function drawGoldenDivider(ctx, cx, cy, width) {
    ctx.strokeStyle = "rgba(245, 158, 11, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - width / 2, cy);
    ctx.lineTo(cx + width / 2, cy);
    ctx.stroke();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawLotusEmblem(ctx, cx, cy) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(0, -10, 16, 32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-18, 0, 14, 28, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(18, 0, 14, 28, Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function saveSoulCard() {
    const canvas = els.cardCanvas || document.getElementById("soul-card-canvas");
    if (!canvas) {
      console.error("Soul Card canvas not found.");
      return;
    }

    if (window.AudioEngine) AudioEngine.playClick();

    const safeName = (state.playerName || "Keepsake")
      .trim()
      .replace(/[^a-z0-9_-]/gi, "_")
      .slice(0, 40) || "Keepsake";

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create Soul Card PNG.");
        showFeedback("Failed to generate image Blob. Please try again.");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Janmashtami_Soul_Card_${safeName}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      showFeedback("✨ Soul Card downloaded successfully!");
    }, "image/png");
  }

  function shareSoulCard() {
    const canvas = els.cardCanvas || document.getElementById("soul-card-canvas");
    if (!canvas) return;

    if (window.AudioEngine) AudioEngine.playClick();

    const safeName = (state.playerName || "Keepsake")
      .trim()
      .replace(/[^a-z0-9_-]/gi, "_")
      .slice(0, 40) || "Keepsake";

    if (navigator.share && canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (!blob) {
          saveSoulCard();
          return;
        }
        const file = new File([blob], `Janmashtami_Soul_Card_${safeName}.png`, { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              title: "Janmashtami Soul Card",
              text: `I am the soul. — Bhagavad Gita 6.22 (${state.playerName})`,
              files: [file],
            })
            .catch(() => {
              /* User cancelled share */
            });
        } else {
          saveSoulCard();
        }
      }, "image/png");
    } else {
      saveSoulCard();
    }
  }

  function showFeedback(text) {
    if (!els.actionFeedback) return;
    els.actionFeedback.textContent = text;
    els.actionFeedback.hidden = false;
    setTimeout(() => {
      if (els.actionFeedback) els.actionFeedback.hidden = true;
    }, 4000);
  }

  function bind() {
    if (els.mirrorRevealBtn) {
      els.mirrorRevealBtn.addEventListener("click", revealMirror);
    }
    if (els.createCardBtn) {
      els.createCardBtn.addEventListener("click", handleCreateCard);
    }
    if (els.nameInput) {
      els.nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleCreateCard();
        }
      });
    }
    if (els.saveCardBtn) {
      els.saveCardBtn.addEventListener("click", saveSoulCard);
    }
    if (els.shareCardBtn) {
      els.shareCardBtn.addEventListener("click", shareSoulCard);
    }
  }

  function init() {
    if (!document.getElementById("mirror-frame")) return; // Not on page
    cacheEls();
    bind();
  }

  // Expose StationFinal IIFE
  window.StationFinal = { init };
})();

document.addEventListener("DOMContentLoaded", () => {
  if (window.StationFinal) window.StationFinal.init();
});
