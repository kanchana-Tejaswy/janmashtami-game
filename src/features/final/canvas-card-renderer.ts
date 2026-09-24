import { FoilTheme, VedicVerse } from '@/types';

export function renderSoulCardToCanvas(
  canvas: HTMLCanvasElement,
  name: string,
  theme: FoilTheme,
  verse: VedicVerse
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = 1200;
  const h = 1600;
  canvas.width = w;
  canvas.height = h;

  ctx.clearRect(0, 0, w, h);

  // 1. Background Radiant Radial Gradient
  const bgGrad = ctx.createRadialGradient(w / 2, h * 0.38, 120, w / 2, h / 2, 950);
  bgGrad.addColorStop(0, theme.bgCenter);
  bgGrad.addColorStop(0.55, theme.bgMid);
  bgGrad.addColorStop(1, theme.bgEdge);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft luminous aura
  const auraGrad = ctx.createRadialGradient(w / 2, h * 0.42, 30, w / 2, h * 0.42, 480);
  auraGrad.addColorStop(0, theme.auraColor);
  auraGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.05)');
  auraGrad.addColorStop(1, 'transparent');
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
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.accent;
  ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('JANMASHTAMI SACRED KEEPSAKE', w / 2, 135);

  ctx.fillStyle = theme.lightGold;
  ctx.font = "600 52px 'Cinzel', Georgia, serif";
  ctx.fillText('JOURNEY TO THE SOUL', w / 2, 205);

  // Golden Divider Line
  drawGoldenDivider(ctx, w / 2, 245, 420, theme.primaryGold);

  // 4. Recipient Name
  ctx.fillStyle = 'rgba(246, 241, 228, 0.8)';
  ctx.font = "italic 36px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('This keepsake certifies that', w / 2, 325);

  const displayName = name.trim() || 'Sacred Seeker';

  // Dynamic Name Font Size to fit within 960px width
  let nameFontSize = 74;
  ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
  while (ctx.measureText(displayName).width > 950 && nameFontSize > 36) {
    nameFontSize -= 4;
    ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
  }

  // Name Gradient Fill with gold foil
  const nameGrad = ctx.createLinearGradient(0, 385, 0, 445);
  nameGrad.addColorStop(0, theme.lightGold);
  nameGrad.addColorStop(0.5, theme.primaryGold);
  nameGrad.addColorStop(1, theme.darkGold);
  ctx.fillStyle = nameGrad;
  ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
  ctx.shadowBlur = 12;
  ctx.fillText(displayName, w / 2, 415);
  ctx.shadowBlur = 0;

  ctx.fillStyle = 'rgba(246, 241, 228, 0.8)';
  ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('has awakened to the eternal truth of consciousness:', w / 2, 485);

  // 5. Central Sacred Emblem & Declaration
  drawLotusEmblem(ctx, w / 2, 625, theme.primaryGold, theme.lightGold);

  ctx.fillStyle = theme.lightGold;
  ctx.font = "600 76px 'Cinzel', Georgia, serif";
  ctx.shadowColor = 'rgba(245, 158, 11, 0.75)';
  ctx.shadowBlur = 24;
  ctx.fillText('I AM THE SOUL', w / 2, 815);
  ctx.shadowBlur = 0;

  // 6. Selected Vedic Verse Card
  const boxX = 90;
  const boxY = 910;
  const boxW = w - 180;
  const boxH = 475;

  ctx.fillStyle = theme.boxBg;
  ctx.strokeStyle = theme.boxBorder;
  ctx.lineWidth = 2;
  drawRoundRect(ctx, boxX, boxY, boxW, boxH, 24, true, true);

  ctx.fillStyle = theme.accent;
  ctx.font = "italic 30px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(verse.kicker, w / 2, boxY + 55);

  // Sanskrit Verse
  ctx.fillStyle = theme.primaryGold;
  ctx.font = "600 40px 'Mukta', sans-serif";
  ctx.fillText(verse.sanskrit, w / 2, boxY + 125);

  // English Translation
  ctx.fillStyle = theme.textIvory;
  ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
  wrapText(ctx, verse.english, w / 2, boxY + 205, boxW - 80, 44);

  // Verse Citation
  ctx.fillStyle = theme.primaryGold;
  ctx.font = "600 28px 'Cinzel', Georgia, serif";
  ctx.fillText(verse.citation, w / 2, boxY + 340);

  // Spiritual meaning
  ctx.fillStyle = 'rgba(246, 241, 228, 0.75)';
  ctx.font = "28px 'Mukta', sans-serif";
  ctx.fillText(verse.meaning, w / 2, boxY + 415);

  // 7. Footer Seal & Date
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillStyle = 'rgba(246, 241, 228, 0.5)';
  ctx.font = "24px 'Mukta', sans-serif";
  ctx.fillText(`Vrindavan Quest · Janmashtami Keepsake · ${today}`, w / 2, 1495);
}

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strokeColor: string
) {
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

    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(c.x + c.dx * 12, c.y + c.dy * 12, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawGoldenDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  strokeColor: string
) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 30, cy);
  ctx.moveTo(cx + 30, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  ctx.fillStyle = strokeColor;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 8);
  ctx.lineTo(cx + 8, cy);
  ctx.lineTo(cx, cy + 8);
  ctx.lineTo(cx - 8, cy);
  ctx.closePath();
  ctx.fill();
}

function drawLotusEmblem(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  goldColor: string,
  lightColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 80, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 92, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(24, -45, 0, -68);
    ctx.quadraticCurveTo(-24, -45, 0, 0);
    ctx.fillStyle = goldColor;
    ctx.globalAlpha = 0.85;
    ctx.fill();
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fillStyle = lightColor;
  ctx.globalAlpha = 1;
  ctx.fill();

  ctx.restore();
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}
