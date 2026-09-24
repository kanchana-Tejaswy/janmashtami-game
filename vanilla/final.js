/* ============================================================
   VRINDAVAN QUEST — final.js
   Final Station: Mirror Reveal & Hallmark-Grade Soul Card Keepsake.

   Features:
   1. Mirror Reveal ("Look Within") with GSAP pulse & particle burst
   2. Inner Realization Sequence ("I am the soul.") with staggered reveals
   3. Hallmark-Grade Customizable Keepsake Suite:
      - 3 Sacred Foil Themes (Vrindavan Gold 🦚, Lotus Crimson 🪷, Yamuna Sapphire 🌊)
      - 4 Guiding Vedic Verses (Gita 6.22, Gita 2.13, Gita 2.20, Gita 9.22)
      - Interactive 3D Holographic Card View with GSAP pointer tilt & dynamic glare sheen
      - High-DPI 1200x1600 Canvas rendering with intricate Vedic borders & gold filigree
      - 1-Click PNG Download with customized filename
      - 1-Click Sacred Verse Clipboard Copy
      - 1-Click Web Share API integration
   ============================================================ */

(() => {
  'use strict';

  const THEMES = {
    vrindavan: {
      id: "vrindavan",
      name: "Vrindavan Gold",
      bgCenter: "#0d2847",
      bgMid: "#081a33",
      bgEdge: "#061024",
      primaryGold: "#f59e0b",
      lightGold: "#fef08a",
      darkGold: "#b45309",
      accent: "#14b8a6",
      textIvory: "#f6f1e4",
      auraColor: "rgba(254, 240, 138, 0.18)",
      borderInner: "rgba(251, 191, 36, 0.45)",
      boxBg: "rgba(13, 40, 71, 0.7)",
      boxBorder: "rgba(245, 158, 11, 0.35)",
    },
    radha: {
      id: "radha",
      name: "Lotus Crimson",
      bgCenter: "#2b0a1a",
      bgMid: "#1a0510",
      bgEdge: "#0d0208",
      primaryGold: "#fbbf24",
      lightGold: "#ffe4e6",
      darkGold: "#e11d48",
      accent: "#f43f5e",
      textIvory: "#fff1f2",
      auraColor: "rgba(251, 113, 133, 0.22)",
      borderInner: "rgba(244, 63, 94, 0.45)",
      boxBg: "rgba(59, 7, 26, 0.7)",
      boxBorder: "rgba(251, 113, 133, 0.4)",
    },
    yamuna: {
      id: "yamuna",
      name: "Yamuna Sapphire",
      bgCenter: "#0c1b33",
      bgMid: "#061024",
      bgEdge: "#020617",
      primaryGold: "#facc15",
      lightGold: "#e0f2fe",
      darkGold: "#0284c7",
      accent: "#38bdf8",
      textIvory: "#f8fafc",
      auraColor: "rgba(56, 189, 248, 0.2)",
      borderInner: "rgba(56, 189, 248, 0.45)",
      boxBg: "rgba(12, 27, 51, 0.7)",
      boxBorder: "rgba(56, 189, 248, 0.35)",
    },
  };

  const VERSES = {
    gita6_22: {
      id: "gita6_22",
      kicker: "SACRED REVELATION",
      sanskrit: "यं लब्ध्वा चापरं लाभं मन्यते नाधिकं ततः",
      english: '"Having gained this, one considers no other gain greater than this."',
      citation: "— Bhagavad Gita 6.22",
      meaning: "Supreme joy unaffected by life's ups and downs.",
    },
    gita2_13: {
      id: "gita2_13",
      kicker: "ETERNAL REALIZATION",
      sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा",
      english: '"As the embodied soul passes through childhood, youth and old age, so it passes into another body."',
      citation: "— Bhagavad Gita 2.13",
      meaning: "The conscious observer remains unchanging through all bodily transitions.",
    },
    gita2_20: {
      id: "gita2_20",
      kicker: "THE IMPERISHABLE SOUL",
      sanskrit: "न जायते म्रियते वा कदाचिन्",
      english: '"For the soul there is neither birth nor death at any time."',
      citation: "— Bhagavad Gita 2.20",
      meaning: "Unborn, eternal, ever-existing, undying and primeval.",
    },
    gita9_22: {
      id: "gita9_22",
      kicker: "DIVINE SANCTUARY",
      sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते",
      english: '"To those who always remember Me with pure devotion, I carry what they lack and preserve what they have."',
      citation: "— Bhagavad Gita 9.22",
      meaning: "Anchored in unconditional divine love and spiritual refuge.",
    },
  };

  const state = {
    mirrorRevealed: false,
    realizationDone: false,
    cardGenerated: false,
    playerName: "",
    selectedTheme: "vrindavan",
    selectedVerse: "gita6_22",
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
    els.card3dWrap = document.getElementById("soul-card-3d-wrap");
    els.card3dCard = document.getElementById("soul-card-3d-card");
    els.cardGlare = document.getElementById("soul-card-glare");
    els.cardCanvas = document.getElementById("soul-card-canvas");
    els.saveCardBtn = document.getElementById("save-card-btn");
    els.copyVerseBtn = document.getElementById("copy-verse-btn");
    els.shareCardBtn = document.getElementById("share-card-btn");
    els.recustomizeBtn = document.getElementById("recustomize-card-btn");
    els.actionFeedback = document.getElementById("action-feedback-text");
    els.themeButtons = Array.from(document.querySelectorAll(".foil-theme-btn"));
    els.verseButtons = Array.from(document.querySelectorAll(".verse-choice-btn"));
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
      ParticleEngine.burst(xRatio, yRatio, { count: 50 });
    }

    if (window.gsap) {
      gsap.to(els.mirrorFrame, {
        scale: 1.06,
        boxShadow: "0 0 50px rgba(254, 240, 138, 0.8), inset 0 0 35px rgba(20, 184, 166, 0.5)",
        duration: 0.8,
        ease: "power2.out",
      });
    } else {
      els.mirrorFrame?.classList.add("mirror-frame--revealed");
    }

    if (els.mirrorPromptText) els.mirrorPromptText.textContent = "✨ The Soul Reflected ✨";
    if (els.mirrorRevealBtn) els.mirrorRevealBtn.hidden = true;

    // Reveal Inner Realization Card with smooth GSAP animation
    setTimeout(() => {
      state.isAnimating = false;
      if (els.realizationCard) {
        els.realizationCard.hidden = false;
        if (window.gsap) {
          gsap.fromTo(
            els.realizationCard,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
          );
        }
        els.realizationCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      animateRealizationLines();
    }, 600);
  }

  function animateRealizationLines() {
    const lines = Array.from(els.realizationLines || []);

    if (window.gsap) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (els.purposeSection) els.purposeSection.hidden = false;
          if (els.verseSection) els.verseSection.hidden = false;
          state.realizationDone = true;
          if (els.nameInput) els.nameInput.focus();
        },
      });

      lines.forEach((line) => {
        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          onStart: () => {
            line.classList.add("realization-line--visible");
            if (window.AudioEngine) AudioEngine.playTick({ volume: 0.12 });
          },
        }, "+=0.35");
      });

      tl.call(() => {
        if (els.soulDeclaration) {
          els.soulDeclaration.hidden = false;
          els.soulDeclaration.classList.add("soul-declaration--visible");
        }
        if (window.AudioEngine) AudioEngine.playFluteNote(523.25, { duration: 1.8, volume: 0.28 });
        if (window.ParticleEngine) ParticleEngine.burst(0.5, 0.42, { count: 65 });
      }, null, "+=0.4");

      tl.fromTo(
        els.soulDeclaration,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(1.5)" }
      );
    } else {
      let delay = 300;
      lines.forEach((line) => {
        setTimeout(() => {
          line.classList.add("realization-line--visible");
          if (window.AudioEngine) AudioEngine.playTick({ volume: 0.12 });
        }, delay);
        delay += 800;
      });

      setTimeout(() => {
        if (els.soulDeclaration) {
          els.soulDeclaration.hidden = false;
          els.soulDeclaration.classList.add("soul-declaration--visible");
        }
        if (window.AudioEngine) AudioEngine.playFluteNote(523.25, { duration: 1.6, volume: 0.25 });
        if (window.ParticleEngine) ParticleEngine.burst(0.5, 0.45, { count: 50 });
      }, delay + 400);

      setTimeout(() => {
        if (els.purposeSection) els.purposeSection.hidden = false;
        if (els.verseSection) els.verseSection.hidden = false;
        state.realizationDone = true;
        if (els.nameInput) els.nameInput.focus();
      }, delay + 1200);
    }
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
    if (window.ParticleEngine) ParticleEngine.burst(0.5, 0.35, { count: 90 });

    // Render Hallmark Canvas Card
    drawSoulCardCanvas(trimmed, state.selectedTheme, state.selectedVerse);

    // Show Result Container with GSAP spring
    if (els.cardResult) {
      els.cardResult.hidden = false;
      if (window.gsap) {
        gsap.fromTo(
          els.cardResult,
          { opacity: 0, scale: 0.94, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }
        );
      }
      els.cardResult.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    state.cardGenerated = true;

    // Mark complete in VrindavanQuest
    if (window.VrindavanQuest && typeof VrindavanQuest.markComplete === "function") {
      VrindavanQuest.markComplete("final");
    }
  }

  /* ---------------- Hallmark Canvas Renderer (1200 x 1600) ---------------- */
  function drawSoulCardCanvas(name, themeKey = "vrindavan", verseKey = "gita6_22") {
    const canvas = els.cardCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;  // 1200
    const h = canvas.height; // 1600

    const theme = THEMES[themeKey] || THEMES.vrindavan;
    const verse = VERSES[verseKey] || VERSES.gita6_22;

    ctx.clearRect(0, 0, w, h);

    // 1. Background Gradient
    const bgGrad = ctx.createRadialGradient(w / 2, h * 0.38, 120, w / 2, h / 2, 950);
    bgGrad.addColorStop(0, theme.bgCenter);
    bgGrad.addColorStop(0.55, theme.bgMid);
    bgGrad.addColorStop(1, theme.bgEdge);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Soft luminous aura
    const auraGrad = ctx.createRadialGradient(w / 2, h * 0.42, 30, w / 2, h * 0.42, 480);
    auraGrad.addColorStop(0, theme.auraColor);
    auraGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.05)");
    auraGrad.addColorStop(1, "transparent");
    ctx.fillStyle = auraGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Ornate Double Gold Frame Border
    ctx.lineWidth = 6;
    ctx.strokeStyle = theme.primaryGold;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    ctx.lineWidth = 2;
    ctx.strokeStyle = theme.borderInner;
    ctx.strokeRect(52, 52, w - 104, h - 104);

    // Corner decorative accents
    drawCornerAccents(ctx, w, h, theme.primaryGold);

    // 3. Header Title & Sacred Glyph
    ctx.textAlign = "center";
    ctx.fillStyle = theme.accent;
    ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("JANMASHTAMI SACRED KEEPSAKE", w / 2, 135);

    ctx.fillStyle = theme.lightGold;
    ctx.font = "600 52px 'Cinzel', Georgia, serif";
    ctx.fillText("JOURNEY TO THE SOUL", w / 2, 205);

    // Golden Divider Line
    drawGoldenDivider(ctx, w / 2, 245, 420, theme.primaryGold);

    // 4. Recipient Name
    ctx.fillStyle = "rgba(246, 241, 228, 0.8)";
    ctx.font = "italic 36px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("This keepsake certifies that", w / 2, 325);

    // Dynamic Name Font Size to fit within 960px width
    let nameFontSize = 74;
    ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
    while (ctx.measureText(name).width > 950 && nameFontSize > 36) {
      nameFontSize -= 4;
      ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
    }

    // Name Gradient Fill with 3-stop gold foil
    const nameGrad = ctx.createLinearGradient(0, 385, 0, 445);
    nameGrad.addColorStop(0, theme.lightGold);
    nameGrad.addColorStop(0.5, theme.primaryGold);
    nameGrad.addColorStop(1, theme.darkGold);
    ctx.fillStyle = nameGrad;
    ctx.shadowColor = "rgba(245, 158, 11, 0.4)";
    ctx.shadowBlur = 12;
    ctx.fillText(name, w / 2, 415);
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(246, 241, 228, 0.8)";
    ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("has awakened to the eternal truth of consciousness:", w / 2, 485);

    // 5. Central Sacred Emblem & Declaration
    drawLotusEmblem(ctx, w / 2, 625, theme.primaryGold, theme.lightGold);

    ctx.fillStyle = theme.lightGold;
    ctx.font = "600 76px 'Cinzel', Georgia, serif";
    ctx.shadowColor = "rgba(245, 158, 11, 0.75)";
    ctx.shadowBlur = 24;
    ctx.fillText("I AM THE SOUL", w / 2, 815);
    ctx.shadowBlur = 0;

    // 6. Selected Vedic Verse Card
    const boxX = 90;
    const boxY = 910;
    const boxW = w - 180;
    const boxH = 475;

    // Card Inner Container
    ctx.fillStyle = theme.boxBg;
    ctx.strokeStyle = theme.boxBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, boxX, boxY, boxW, boxH, 24, true, true);

    ctx.fillStyle = theme.accent;
    ctx.font = "italic 30px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(verse.kicker, w / 2, boxY + 55);

    // Devanagari Sanskrit Verse
    ctx.fillStyle = theme.primaryGold;
    ctx.font = "600 42px 'Mukta', sans-serif";
    ctx.fillText(verse.sanskrit, w / 2, boxY + 130);

    // English Translation (word wrap if needed)
    ctx.fillStyle = theme.textIvory;
    ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
    wrapText(ctx, verse.english, w / 2, boxY + 215, boxW - 80, 46);

    // Verse Citation
    ctx.fillStyle = theme.primaryGold;
    ctx.font = "600 30px 'Cinzel', Georgia, serif";
    ctx.fillText(verse.citation, w / 2, boxY + 335);

    // Spiritual meaning note
    ctx.fillStyle = "rgba(246, 241, 228, 0.75)";
    ctx.font = "30px 'Mukta', sans-serif";
    ctx.fillText(verse.meaning, w / 2, boxY + 410);

    // 7. Footer Seal & Date
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillStyle = "rgba(246, 241, 228, 0.5)";
    ctx.font = "26px 'Mukta', sans-serif";
    ctx.fillText(`Vrindavan Quest · Janmashtami Keepsake · ${today}`, w / 2, 1495);
  }

  function drawCornerAccents(ctx, w, h, strokeColor) {
    const corners = [
      { x: 52, y: 52, dx: 1, dy: 1 },
      { x: w - 52, y: 52, dx: -1, dy: 1 },
      { x: 52, y: h - 52, dx: 1, dy: -1 },
      { x: w - 52, y: h - 52, dx: -1, dy: -1 },
    ];
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3.5;
    corners.forEach((c) => {
      ctx.beginPath();
      ctx.moveTo(c.x, c.y + c.dy * 36);
      ctx.lineTo(c.x, c.y);
      ctx.lineTo(c.x + c.dx * 36, c.y);
      ctx.stroke();

      // Corner diamond dot
      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(c.x + c.dx * 12, c.y + c.dy * 12, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawGoldenDivider(ctx, cx, cy, width, strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - width / 2, cy);
    ctx.lineTo(cx - 30, cy);
    ctx.moveTo(cx + 30, cy);
    ctx.lineTo(cx + width / 2, cy);
    ctx.stroke();

    // Center Diamond
    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx + 8, cy);
    ctx.lineTo(cx, cy + 8);
    ctx.lineTo(cx - 8, cy);
    ctx.closePath();
    ctx.fill();
  }

  function drawLotusEmblem(ctx, cx, cy, goldColor, lightColor) {
    ctx.save();
    ctx.translate(cx, cy);

    // Glowing circle
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(254, 240, 138, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 92, 0, Math.PI * 2);
    ctx.stroke();

    // 8 Golden Lotus Petals
    const numPetals = 8;
    for (let i = 0; i < numPetals; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / numPetals);
      ctx.fillStyle = goldColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(24, -40, 0, -68);
      ctx.quadraticCurveTo(-24, -40, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    // Inner bright gem
    ctx.fillStyle = lightColor;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
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

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + " ";
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
  }

  /* ---------------- Interactive 3D Holographic Card Tilt (GSAP) ---------------- */
  function init3DCardTilt() {
    const wrap = els.card3dWrap;
    const card = els.card3dCard;
    const glare = els.cardGlare;
    if (!wrap || !card) return;

    let isHovering = false;

    wrap.addEventListener("pointermove", (e) => {
      isHovering = true;
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relX = (x / rect.width) - 0.5;   // -0.5 to +0.5
      const relY = (y / rect.height) - 0.5;  // -0.5 to +0.5

      const rotateY = relX * 22; // max 22deg
      const rotateX = -relY * 22;

      if (window.gsap) {
        gsap.to(card, {
          rotateY: rotateY,
          rotateX: rotateX,
          duration: 0.2,
          ease: "power1.out",
          transformPerspective: 1200,
        });
      }

      if (glare) {
        const glareX = (relX * 100 + 50).toFixed(1);
        const glareY = (relY * 100 + 50).toFixed(1);
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.42) 0%, rgba(245, 158, 11, 0.22) 30%, transparent 68%)`;
        glare.style.opacity = "1";
      }
    });

    wrap.addEventListener("pointerleave", () => {
      isHovering = false;
      if (window.gsap) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.4)",
        });
      }
      if (glare) {
        glare.style.opacity = "0";
      }
    });
  }

  /* ---------------- Feedback Toast ---------------- */
  let feedbackTimeout = null;
  function showFeedback(text) {
    if (!els.actionFeedback) return;
    els.actionFeedback.textContent = text;
    els.actionFeedback.hidden = false;
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      els.actionFeedback.hidden = true;
    }, 3500);
  }

  /* ---------------- Card Actions ---------------- */
  function handleDownloadCard() {
    const canvas = els.cardCanvas;
    if (!canvas) return;

    if (window.AudioEngine) AudioEngine.playClick();
    const safeName = (state.playerName || "Seeker").replace(/[^a-zA-Z0-9_-]/g, "_");
    const link = document.createElement("a");
    link.download = `Janmashtami_Soul_Card_${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showFeedback("✨ Keepsake image saved successfully!");
  }

  function handleCopyVerse() {
    const verse = VERSES[state.selectedVerse] || VERSES.gita6_22;
    const text = `✨ Janmashtami Soul Keepsake ✨\nRecipient: ${state.playerName || "Seeker"}\n\n"${verse.sanskrit}"\n${verse.english}\n${verse.citation}\n\nRealization: I am the soul — unaffected by life's temporary ups and downs.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (window.AudioEngine) AudioEngine.playChime({ volume: 0.2 });
        showFeedback("📋 Sacred verse copied to clipboard!");
      }).catch(() => {
        showFeedback("Failed to copy verse.");
      });
    } else {
      showFeedback("Clipboard not supported.");
    }
  }

  function handleShareCard() {
    if (window.AudioEngine) AudioEngine.playClick();
    const verse = VERSES[state.selectedVerse] || VERSES.gita6_22;
    const shareData = {
      title: "My Janmashtami Soul Card",
      text: `I completed the Vrindavan Quest and awakened to the realization: I am the eternal soul! "${verse.sanskrit}" — ${verse.citation}`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      handleCopyVerse();
    }
  }

  function handleRecustomize() {
    if (window.AudioEngine) AudioEngine.playClick();
    if (els.cardForm) {
      els.cardForm.scrollIntoView({ behavior: "smooth", block: "center" });
      if (els.nameInput) els.nameInput.focus();
    }
  }

  function bind() {
    if (els.mirrorRevealBtn) {
      els.mirrorRevealBtn.addEventListener("click", revealMirror);
    }
    if (els.mirrorFrame) {
      els.mirrorFrame.addEventListener("click", revealMirror);
    }
    if (els.createCardBtn) {
      els.createCardBtn.addEventListener("click", handleCreateCard);
    }
    if (els.nameInput) {
      els.nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCreateCard();
      });
    }
    if (els.saveCardBtn) {
      els.saveCardBtn.addEventListener("click", handleDownloadCard);
    }
    if (els.copyVerseBtn) {
      els.copyVerseBtn.addEventListener("click", handleCopyVerse);
    }
    if (els.shareCardBtn) {
      els.shareCardBtn.addEventListener("click", handleShareCard);
    }
    if (els.recustomizeBtn) {
      els.recustomizeBtn.addEventListener("click", handleRecustomize);
    }

    // Foil Theme Selector Buttons
    els.themeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        els.themeButtons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-checked", "true");
        state.selectedTheme = btn.dataset.theme || "vrindavan";
        if (window.AudioEngine) AudioEngine.playTick({ volume: 0.1 });
        if (state.cardGenerated) {
          drawSoulCardCanvas(state.playerName || "Seeker", state.selectedTheme, state.selectedVerse);
        }
      });
    });

    // Verse Choice Selector Buttons
    els.verseButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        els.verseButtons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-checked", "true");
        state.selectedVerse = btn.dataset.verse || "gita6_22";
        if (window.AudioEngine) AudioEngine.playTick({ volume: 0.1 });
        if (state.cardGenerated) {
          drawSoulCardCanvas(state.playerName || "Seeker", state.selectedTheme, state.selectedVerse);
        }
      });
    });

    init3DCardTilt();
  }

  function init() {
    if (!document.getElementById("station-final")) return;
    cacheEls();
    bind();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
