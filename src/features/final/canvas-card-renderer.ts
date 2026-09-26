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

  // 1. Background Warm Ivory Radial Gradient
  const bgGrad = ctx.createRadialGradient(w / 2, h * 0.38, 120, w / 2, h / 2, 950);
  bgGrad.addColorStop(0, theme.bgCenter || '#FAF6ED');
  bgGrad.addColorStop(0.6, theme.bgMid || '#F5ECE0');
  bgGrad.addColorStop(1, theme.bgEdge || '#EFE3D3');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft luminous warm golden aura in the upper center
  const auraGrad = ctx.createRadialGradient(w / 2, h * 0.42, 20, w / 2, h * 0.42, 500);
  auraGrad.addColorStop(0, theme.auraColor || 'rgba(214, 177, 94, 0.25)');
  auraGrad.addColorStop(0.5, 'rgba(232, 183, 190, 0.1)');
  auraGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = auraGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Ornate Double Gold Frame Border
  ctx.lineWidth = 4;
  ctx.strokeStyle = theme.primaryGold || '#D6B15E';
  ctx.strokeRect(48, 48, w - 96, h - 96);

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = theme.borderInner || 'rgba(214, 177, 94, 0.45)';
  ctx.strokeRect(60, 60, w - 120, h - 120);

  // Corner decorative flourishes
  drawCornerAccents(ctx, w, h, theme.primaryGold || '#D6B15E');

  // 3. Header: UJWALA · LET YOUR LIGHT SHINE
  ctx.textAlign = 'center';

  ctx.fillStyle = '#756D66';
  ctx.font = "italic 28px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('A JOURNEY FROM WITHIN', w / 2, 130);

  // Festival Identity Title
  ctx.fillStyle = '#403A35';
  ctx.font = "600 58px 'Cinzel', Georgia, serif";
  ctx.fillText('UJWALA', w / 2, 200);

  ctx.fillStyle = theme.primaryGold || '#D6B15E';
  ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('LET YOUR LIGHT SHINE', w / 2, 245);

  // Golden Divider Line with Diya/Lotus Marker
  drawGoldenDivider(ctx, w / 2, 275, 460, theme.primaryGold || '#D6B15E');

  // 4. Recipient Name Certification
  ctx.fillStyle = '#756D66';
  ctx.font = "italic 34px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('This keepsake certifies that', w / 2, 350);

  const displayName = name.trim() || 'Sacred Seeker';

  // Dynamic Name Font Size to fit within 960px width
  let nameFontSize = 70;
  ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
  while (ctx.measureText(displayName).width > 920 && nameFontSize > 36) {
    nameFontSize -= 4;
    ctx.font = `600 ${nameFontSize}px 'Cinzel', Georgia, serif`;
  }

  // Name Gradient Fill with Gold Foil Sheen
  const nameGrad = ctx.createLinearGradient(0, 390, 0, 450);
  nameGrad.addColorStop(0, '#B8903B');
  nameGrad.addColorStop(0.5, '#D6B15E');
  nameGrad.addColorStop(1, '#8C6820');
  ctx.fillStyle = nameGrad;
  ctx.shadowColor = 'rgba(214, 177, 94, 0.35)';
  ctx.shadowBlur = 8;
  ctx.fillText(displayName, w / 2, 430);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#5A534C';
  ctx.font = "italic 32px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText('has awakened to the eternal radiance of the inner self:', w / 2, 495);

  // 5. Central Lotus Emblem & Declaration
  drawLotusEmblem(ctx, w / 2, 630, theme.primaryGold || '#D6B15E', theme.lightGold || '#E8D18A');

  ctx.fillStyle = '#403A35';
  ctx.font = "600 70px 'Cinzel', Georgia, serif";
  ctx.shadowColor = 'rgba(214, 177, 94, 0.4)';
  ctx.shadowBlur = 16;
  ctx.fillText('I AM THE SOUL', w / 2, 815);
  ctx.shadowBlur = 0;

  // 6. Selected Vedic Verse Card
  const boxX = 100;
  const boxY = 895;
  const boxW = w - 200;
  const boxH = 480;

  ctx.fillStyle = theme.boxBg || 'rgba(251, 247, 239, 0.95)';
  ctx.strokeStyle = theme.boxBorder || 'rgba(214, 177, 94, 0.4)';
  ctx.lineWidth = 1.5;
  drawRoundRect(ctx, boxX, boxY, boxW, boxH, 20, true, true);

  // Verse Kicker
  ctx.fillStyle = '#756D66';
  ctx.font = "600 24px 'Cinzel', 'Trajan Pro', Georgia, serif";
  ctx.fillText(verse.kicker, w / 2, boxY + 50);

  // Sanskrit Verse
  ctx.fillStyle = '#8C6820';
  ctx.font = "600 38px 'Mukta', 'Noto Serif Devanagari', 'Yatra One', Georgia, serif";
  ctx.fillText(verse.sanskrit, w / 2, boxY + 115);

  // English Translation
  ctx.fillStyle = '#403A35';
  ctx.font = "italic 30px 'Cormorant Garamond', 'Garamond', Georgia, serif";
  wrapText(ctx, verse.english, w / 2, boxY + 195, boxW - 80, 42);

  // Verse Citation
  ctx.fillStyle = '#B8903B';
  ctx.font = "600 26px 'Cinzel', 'Trajan Pro', Georgia, serif";
  ctx.fillText(verse.citation, w / 2, boxY + 345);

  // Spiritual Meaning
  ctx.fillStyle = '#756D66';
  ctx.font = "26px 'Mukta', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(verse.meaning, w / 2, boxY + 415);

  // 7. Footer Seal & Date
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillStyle = '#756D66';
  ctx.font = "22px 'Mukta', 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`UJWALA Festival · Let Your Light Shine · ${today}`, w / 2, 1495);
}

function drawCornerAccents(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  strokeColor: string
) {
  const corners = [
    { x: 60, y: 60, dx: 1, dy: 1 },
    { x: w - 60, y: 60, dx: -1, dy: 1 },
    { x: 60, y: h - 60, dx: 1, dy: -1 },
    { x: w - 60, y: h - 60, dx: -1, dy: -1 },
  ];
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 2.5;
  corners.forEach((c) => {
    ctx.beginPath();
    ctx.moveTo(c.x, c.y + c.dy * 32);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(c.x + c.dx * 32, c.y);
    ctx.stroke();

    ctx.fillStyle = strokeColor;
    ctx.beginPath();
    ctx.arc(c.x + c.dx * 10, c.y + c.dy * 10, 3, 0, Math.PI * 2);
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
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - width / 2, cy);
  ctx.lineTo(cx - 24, cy);
  ctx.moveTo(cx + 24, cy);
  ctx.lineTo(cx + width / 2, cy);
  ctx.stroke();

  // Central delicate diamond glyph
  ctx.fillStyle = strokeColor;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx + 6, cy);
  ctx.lineTo(cx, cy + 6);
  ctx.lineTo(cx - 6, cy);
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

  // Outer radiant ring
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 76, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 86, 0, Math.PI * 2);
  ctx.stroke();

  // 8 Petals
  for (let i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(20, -40, 0, -60);
    ctx.quadraticCurveTo(-20, -40, 0, 0);
    ctx.fillStyle = goldColor;
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.restore();
  }

  // Central golden core
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
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
