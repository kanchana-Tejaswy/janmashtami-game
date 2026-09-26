'use client';

import React, { useEffect, useRef } from 'react';
import { CoasterPhase } from '@/types';

interface OceanCanvasProps {
  progressRatio: number; // 0 to 1
  phase: CoasterPhase;
}

interface StarOrRay {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

export function OceanCanvas({ progressRatio, phase }: OceanCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    // Smooth boat target coordinates & tilt
    let boatCurrentX = 0;
    let boatCurrentY = 0;
    let boatAngle = 0;

    // Light specks in dawn sky
    const lightSpecks: StarOrRay[] = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      size: 0.8 + Math.random() * 1.5,
      baseAlpha: 0.2 + Math.random() * 0.4,
      twinkleSpeed: 1.2 + Math.random() * 2.5,
    }));

    // Interactive water ripples
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const ripples: Ripple[] = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > height * 0.55) {
        if (Math.random() < 0.25 || 'touches' in e) {
          ripples.push({
            x,
            y,
            radius: 2,
            maxRadius: 28 + Math.random() * 20,
            alpha: 0.6,
          });
          if (ripples.length > 20) ripples.shift();
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    const resize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 280;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Environmental parameters based on journey phase
    const getEnvParams = (currentPhase: CoasterPhase) => {
      switch (currentPhase) {
        case 'drop':
          // Turbulence / Storm: Soft stormy lavender & mist
          return {
            amplitude: 20,
            speed: 2.8,
            colorBack: '#B8A9D1',
            colorMid: '#9B8CB5',
            colorFront: '#7D6D99',
            foamColor: 'rgba(255, 255, 255, 0.75)',
            skyTop: '#DDD6EA',
            skyBottom: '#C8BEDB',
            sunGlow: 'rgba(232, 209, 138, 0.25)',
            sunColor: '#E8D18A',
            sunSize: 22,
          };
        case 'peace':
        case 'divine':
          // Supreme Illumination / Calm: Golden dawn sunlight & crystalline water
          return {
            amplitude: 6,
            speed: 1.0,
            colorBack: '#E8D18A',
            colorMid: '#DEC274',
            colorFront: '#D6B15E',
            foamColor: 'rgba(255, 255, 255, 0.9)',
            skyTop: '#FFFDF9',
            skyBottom: '#FAF0F2',
            sunGlow: 'rgba(214, 177, 94, 0.45)',
            sunColor: '#D6B15E',
            sunSize: 28,
          };
        case 'pause':
          // Contemplative Pause: Soft blush & lavender horizon
          return {
            amplitude: 10,
            speed: 1.3,
            colorBack: '#DDD6EA',
            colorMid: '#E8B7BE',
            colorFront: '#D495A0',
            foamColor: 'rgba(255, 255, 255, 0.7)',
            skyTop: '#FBF7EF',
            skyBottom: '#EEEAF5',
            sunGlow: 'rgba(232, 209, 138, 0.35)',
            sunColor: '#E8D18A',
            sunSize: 24,
          };
        case 'rise':
        default:
          // Dawn Highs: Warm ivory sky, soft lavender-blush water
          return {
            amplitude: 12,
            speed: 1.6,
            colorBack: '#EADCE0',
            colorMid: '#DEC274',
            colorFront: '#D6B15E',
            foamColor: 'rgba(255, 255, 255, 0.75)',
            skyTop: '#FFFDF9',
            skyBottom: '#F6EFE5',
            sunGlow: 'rgba(232, 209, 138, 0.35)',
            sunColor: '#E8D18A',
            sunSize: 24,
          };
      }
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const params = getEnvParams(phase);
      const baseY = height * 0.64;

      /* ---------------- 1. Dawn Sky Backdrop ---------------- */
      const skyGrad = ctx.createLinearGradient(0, 0, 0, baseY);
      skyGrad.addColorStop(0, params.skyTop);
      skyGrad.addColorStop(0.65, params.skyBottom);
      skyGrad.addColorStop(1, '#F3D9DC');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, baseY + 14);

      /* ---------------- 2. Light Specks in Dawn Sky ---------------- */
      ctx.save();
      for (let i = 0; i < lightSpecks.length; i++) {
        const speck = lightSpecks[i];
        const alpha = Math.max(
          0.1,
          speck.baseAlpha + Math.sin(time * speck.twinkleSpeed + i) * 0.2
        );
        ctx.fillStyle = `rgba(214, 177, 94, ${alpha})`;
        ctx.beginPath();
        ctx.arc(speck.x * width, speck.y * baseY, speck.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      /* ---------------- 3. Radiant Dawn Sun & Soft Halo ---------------- */
      ctx.save();
      const sunX = width * 0.82;
      const sunY = baseY * 0.32;

      // Soft ambient diffused golden bloom
      const sunBloom = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 54);
      sunBloom.addColorStop(0, params.sunGlow);
      sunBloom.addColorStop(0.5, 'rgba(243, 217, 220, 0.2)');
      sunBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = sunBloom;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 54, 0, Math.PI * 2);
      ctx.fill();

      // Sun Core Orb
      ctx.beginPath();
      ctx.arc(sunX, sunY, params.sunSize * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.shadowColor = params.sunColor;
      ctx.shadowBlur = 16;
      ctx.fill();

      // Delicate outer ring
      ctx.beginPath();
      ctx.arc(sunX, sunY, params.sunSize * 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = params.sunColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      /* ---------------- 4. Wave Layer 1: Back Wave ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY - 12);
      for (let x = 0; x <= width; x += 10) {
        const y =
          baseY -
          12 +
          Math.sin(x * 0.007 + time * params.speed * 0.75) * (params.amplitude * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorBack;
      ctx.globalAlpha = 0.55;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      /* ---------------- 5. Wave Layer 2: Mid Wave (Main Ocean Swell) ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.011 - time * params.speed) * params.amplitude +
          Math.cos(x * 0.018 + time * 1.3) * (params.amplitude * 0.25);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorMid;
      ctx.globalAlpha = 0.75;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      /* ---------------- 6. Boat Physics & Coordinates ---------------- */
      const targetX = width * 0.12 + width * 0.76 * progressRatio;
      boatCurrentX += (targetX - boatCurrentX) * 0.08;

      const waveAtBoat =
        baseY +
        Math.sin(boatCurrentX * 0.011 - time * params.speed) * params.amplitude +
        Math.cos(boatCurrentX * 0.018 + time * 1.3) * (params.amplitude * 0.25);

      const waveAhead =
        baseY +
        Math.sin((boatCurrentX + 12) * 0.011 - time * params.speed) * params.amplitude +
        Math.cos((boatCurrentX + 12) * 0.018 + time * 1.3) * (params.amplitude * 0.25);

      const waveSlope = (waveAhead - waveAtBoat) / 12;
      const targetAngle = Math.atan(waveSlope) * (phase === 'drop' ? 1.1 : 0.75);

      boatCurrentY += (waveAtBoat - boatCurrentY) * 0.16;
      boatAngle += (targetAngle - boatAngle) * 0.12;

      /* ---------------- 7. Downwelling Diya Reflection Trail ---------------- */
      ctx.save();
      const reflectionGrad = ctx.createLinearGradient(
        boatCurrentX,
        boatCurrentY,
        boatCurrentX,
        height
      );
      reflectionGrad.addColorStop(0, 'rgba(232, 209, 138, 0.45)');
      reflectionGrad.addColorStop(0.5, 'rgba(214, 177, 94, 0.2)');
      reflectionGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = reflectionGrad;
      ctx.fillRect(boatCurrentX - 8, boatCurrentY + 2, 16, height - boatCurrentY);
      ctx.restore();

      /* ---------------- 8. Crafted Minimal Boat (UJWALA Style) ---------------- */
      ctx.save();
      ctx.translate(boatCurrentX, boatCurrentY - 3);
      ctx.rotate(boatAngle);

      // Boat Hull Gradient (Warm Teak to Ivory Trim)
      const hullGrad = ctx.createLinearGradient(0, -6, 0, 15);
      hullGrad.addColorStop(0, '#A67C38');
      hullGrad.addColorStop(1, '#6B4A1D');

      // Gracefully curved Minimal Hull
      ctx.beginPath();
      ctx.moveTo(-30, -3);
      ctx.quadraticCurveTo(-36, 13, -16, 14);
      ctx.lineTo(22, 14);
      ctx.quadraticCurveTo(38, 13, 36, -3);
      ctx.closePath();
      ctx.fillStyle = hullGrad;
      ctx.fill();

      // Fine golden gunwale rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#D6B15E';
      ctx.stroke();

      // Deck Trim Line
      ctx.beginPath();
      ctx.moveTo(-26, -1.5);
      ctx.lineTo(32, -1.5);
      ctx.strokeStyle = '#FAF3DC';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Slender Wooden Mast
      ctx.beginPath();
      ctx.moveTo(0, -1.5);
      ctx.lineTo(0, -30);
      ctx.strokeStyle = '#99752A';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Fluttering Silk Sail / Pennant (Soft Blush / Gold)
      const pennantFlutter = Math.sin(time * 3.2) * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.quadraticCurveTo(16 + pennantFlutter, -20, 2, -7);
      ctx.closePath();
      ctx.fillStyle = phase === 'divine' || phase === 'peace' ? '#D6B15E' : '#E8B7BE';
      ctx.shadowColor = 'rgba(214, 177, 94, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Diya at the Prow (Sacred Inner Light)
      const diyaX = 30;
      const diyaY = -3;

      // Diya Bowl
      ctx.beginPath();
      ctx.ellipse(diyaX, diyaY, 4, 2.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#C49B45';
      ctx.fill();

      // Flickering Diya Flame & Bloom
      const flameFlicker = 1 + Math.sin(time * 8.0) * 0.15;
      const diyaBloom = ctx.createRadialGradient(
        diyaX,
        diyaY - 4,
        1,
        diyaX,
        diyaY - 4,
        16 * flameFlicker
      );
      diyaBloom.addColorStop(0, 'rgba(255, 253, 249, 0.95)');
      diyaBloom.addColorStop(0.4, 'rgba(232, 209, 138, 0.6)');
      diyaBloom.addColorStop(1, 'transparent');

      ctx.fillStyle = diyaBloom;
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 4, 16 * flameFlicker, 0, Math.PI * 2);
      ctx.fill();

      // Flame core
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 4, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      /* ---------------- 9. Wave Layer 3: Foreground Wave & Foam ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY + 8);
      for (let x = 0; x <= width; x += 6) {
        const y =
          baseY +
          8 +
          Math.sin(x * 0.014 + time * params.speed * 1.15) * (params.amplitude * 0.75);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorFront;
      ctx.fill();

      // Foam Crest line
      ctx.beginPath();
      ctx.moveTo(0, baseY + 8);
      for (let x = 0; x <= width; x += 6) {
        const y =
          baseY +
          8 +
          Math.sin(x * 0.014 + time * params.speed * 1.15) * (params.amplitude * 0.75);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = params.foamColor;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      /* ---------------- 10. Golden Sunlight Reflection Rays on Calm/Peace ---------------- */
      if (phase === 'divine' || phase === 'peace') {
        const divineGrad = ctx.createLinearGradient(sunX, sunY, boatCurrentX, height);
        divineGrad.addColorStop(0, 'rgba(232, 209, 138, 0.22)');
        divineGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = divineGrad;
        ctx.fillRect(0, baseY - 18, width, height - baseY + 18);
      }

      /* ---------------- 11. Interactive Water Ripples ---------------- */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.7;
        r.alpha *= 0.94;
        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 209, 138, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [phase, progressRatio]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden backdrop-blur-md border border-gold-400/30 shadow-ujwala-card"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

