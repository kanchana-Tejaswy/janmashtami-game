'use client';

import React, { useEffect, useRef } from 'react';
import { CoasterPhase } from '@/types';

interface OceanCanvasProps {
  progressRatio: number; // 0 to 1
  phase: CoasterPhase;
}

interface Star {
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

    // Generate static celestial stars
    const stars: Star[] = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.52, // Keep in upper night sky
      size: 0.8 + Math.random() * 1.4,
      baseAlpha: 0.25 + Math.random() * 0.5,
      twinkleSpeed: 1.5 + Math.random() * 3.0,
    }));

    const resize = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 280;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Dynamic wave & atmospheric parameters based on journey phase
    const getWaveParams = (currentPhase: CoasterPhase) => {
      switch (currentPhase) {
        case 'drop':
          // Stormy tempest: High amplitude, choppy, dark slate/obsidian palette
          return {
            amplitude: 24,
            speed: 3.4,
            roughness: 1.6,
            colorBack: '#040d1a',
            colorMid: '#081c30',
            colorFront: '#0f2c4c',
            foamColor: 'rgba(226, 232, 240, 0.5)',
            skyTop: '#020610',
            skyBottom: '#071526',
            moonGlow: 'rgba(254, 240, 138, 0.15)',
          };
        case 'peace':
        case 'divine':
          // Glassy calm & divine illumination: gentle rhythmic bobbing, shimmering teal/emerald
          return {
            amplitude: 7,
            speed: 1.1,
            roughness: 0.6,
            colorBack: '#061a2f',
            colorMid: '#004d40',
            colorFront: '#0d9488',
            foamColor: 'rgba(254, 240, 138, 0.55)',
            skyTop: '#040e1f',
            skyBottom: '#0f2942',
            moonGlow: 'rgba(251, 191, 36, 0.45)',
          };
        case 'rise':
        default:
          // Pleasant rhythmic waves: Peacock blue/teal
          return {
            amplitude: 13,
            speed: 1.9,
            roughness: 1.0,
            colorBack: '#06182e',
            colorMid: '#0a2544',
            colorFront: '#00695c',
            foamColor: 'rgba(20, 184, 166, 0.4)',
            skyTop: '#051124',
            skyBottom: '#0b203a',
            moonGlow: 'rgba(254, 240, 138, 0.3)',
          };
      }
    };

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const params = getWaveParams(phase);
      const baseY = height * 0.64;

      /* ---------------- 1. Night Sky Backdrop ---------------- */
      const skyGrad = ctx.createLinearGradient(0, 0, 0, baseY);
      skyGrad.addColorStop(0, params.skyTop);
      skyGrad.addColorStop(1, params.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, baseY + 14);

      /* ---------------- 2. Twinkling Celestial Stars ---------------- */
      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = Math.max(
          0.1,
          star.baseAlpha + Math.sin(time * star.twinkleSpeed + i) * 0.25
        );
        ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * baseY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      /* ---------------- 3. Radiant Crescent Moon & Ambient Bloom ---------------- */
      ctx.save();
      const moonX = width * 0.84;
      const moonY = baseY * 0.3;

      // Soft ambient golden moon bloom
      const moonBloom = ctx.createRadialGradient(moonX, moonY, 4, moonX, moonY, 42);
      moonBloom.addColorStop(0, params.moonGlow);
      moonBloom.addColorStop(1, 'transparent');
      ctx.fillStyle = moonBloom;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 42, 0, Math.PI * 2);
      ctx.fill();

      // Crescent Moon Body
      ctx.beginPath();
      ctx.arc(moonX, moonY, 17, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = phase === 'divine' ? 22 : 12;
      ctx.fill();

      // Crescent Shadow cutout
      ctx.beginPath();
      ctx.arc(moonX - 4.5, moonY - 2, 14.5, 0, Math.PI * 2);
      ctx.fillStyle = params.skyBottom;
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      /* ---------------- 4. Wave Layer 1: Back Wave (Deep Drift) ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY - 14);
      for (let x = 0; x <= width; x += 10) {
        const y =
          baseY -
          14 +
          Math.sin(x * 0.007 + time * params.speed * 0.75) * (params.amplitude * 0.55);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorBack;
      ctx.fill();

      /* ---------------- 5. Wave Layer 2: Mid Wave (Main Ocean Swell) ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= width; x += 8) {
        const y =
          baseY +
          Math.sin(x * 0.011 - time * params.speed) * params.amplitude +
          Math.cos(x * 0.018 + time * 1.4) * (params.amplitude * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorMid;
      ctx.fill();

      /* ---------------- 6. Boat Physics & Buoyancy Calculation ---------------- */
      const targetX = width * 0.12 + width * 0.76 * progressRatio;
      boatCurrentX += (targetX - boatCurrentX) * 0.08;

      // Exact wave height at boat's horizontal position
      const waveAtBoat =
        baseY +
        Math.sin(boatCurrentX * 0.011 - time * params.speed) * params.amplitude +
        Math.cos(boatCurrentX * 0.018 + time * 1.4) * (params.amplitude * 0.3);

      // Tangent / slope estimation for natural rocking tilt
      const waveAhead =
        baseY +
        Math.sin((boatCurrentX + 12) * 0.011 - time * params.speed) * params.amplitude +
        Math.cos((boatCurrentX + 12) * 0.018 + time * 1.4) * (params.amplitude * 0.3);

      const waveSlope = (waveAhead - waveAtBoat) / 12;
      const targetAngle = Math.atan(waveSlope) * (phase === 'drop' ? 1.25 : 0.85);

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
      reflectionGrad.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
      reflectionGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
      reflectionGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = reflectionGrad;
      ctx.fillRect(boatCurrentX - 10, boatCurrentY + 4, 20, height - boatCurrentY);
      ctx.restore();

      /* ---------------- 8. Crafted Stylized Boat ---------------- */
      ctx.save();
      ctx.translate(boatCurrentX, boatCurrentY - 4);
      ctx.rotate(boatAngle);

      // Boat Hull Gradient (Mahogany to Teak)
      const hullGrad = ctx.createLinearGradient(0, -6, 0, 16);
      hullGrad.addColorStop(0, '#92400e');
      hullGrad.addColorStop(1, '#451a03');

      // Gracefully curved Hull
      ctx.beginPath();
      ctx.moveTo(-32, -4);
      ctx.quadraticCurveTo(-38, 14, -18, 15);
      ctx.lineTo(24, 15);
      ctx.quadraticCurveTo(40, 14, 38, -4);
      ctx.closePath();
      ctx.fillStyle = hullGrad;
      ctx.fill();

      // Fine golden gunwale rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();

      // Deck Trim Line
      ctx.beginPath();
      ctx.moveTo(-28, -2);
      ctx.lineTo(34, -2);
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Slender Wooden Mast
      ctx.beginPath();
      ctx.moveTo(0, -2);
      ctx.lineTo(0, -32);
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Fluttering Silk Sail / Pennant
      const pennantFlutter = Math.sin(time * 3.5) * 3;
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.quadraticCurveTo(18 + pennantFlutter, -22, 2, -8);
      ctx.closePath();
      ctx.fillStyle = phase === 'divine' ? '#fbbf24' : '#14b8a6';
      ctx.shadowColor = phase === 'divine' ? '#f59e0b' : '#0d9488';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Diya (Sacred Oil Lamp) at the Prow
      const diyaX = 32;
      const diyaY = -4;

      // Clay bowl
      ctx.beginPath();
      ctx.ellipse(diyaX, diyaY, 4.5, 2.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#b45309';
      ctx.fill();

      // Flickering Diya Flame & Point-Light Bloom
      const flameFlicker = 1 + Math.sin(time * 8.5) * 0.15;
      const diyaBloom = ctx.createRadialGradient(
        diyaX,
        diyaY - 4,
        1,
        diyaX,
        diyaY - 4,
        18 * flameFlicker
      );
      diyaBloom.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      diyaBloom.addColorStop(0.35, 'rgba(251, 191, 36, 0.45)');
      diyaBloom.addColorStop(1, 'transparent');

      ctx.fillStyle = diyaBloom;
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 4, 18 * flameFlicker, 0, Math.PI * 2);
      ctx.fill();

      // Flame core
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 4, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

      /* ---------------- 9. Wave Layer 3: Foreground Wave & Crest Foam ---------------- */
      ctx.beginPath();
      ctx.moveTo(0, baseY + 10);
      for (let x = 0; x <= width; x += 6) {
        const y =
          baseY +
          10 +
          Math.sin(x * 0.014 + time * params.speed * 1.15) * (params.amplitude * 0.8);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = params.colorFront;
      ctx.fill();

      // Foam Crest line
      ctx.beginPath();
      ctx.moveTo(0, baseY + 10);
      for (let x = 0; x <= width; x += 6) {
        const y =
          baseY +
          10 +
          Math.sin(x * 0.014 + time * params.speed * 1.15) * (params.amplitude * 0.8);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = params.foamColor;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      /* ---------------- 10. Golden Divine Reflection Rays on Calm Phase ---------------- */
      if (phase === 'divine' || phase === 'peace') {
        const divineGrad = ctx.createLinearGradient(moonX, moonY, boatCurrentX, height);
        divineGrad.addColorStop(0, 'rgba(254, 240, 138, 0.18)');
        divineGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = divineGrad;
        ctx.fillRect(0, baseY - 20, width, height - baseY + 20);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [phase, progressRatio]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden backdrop-blur-md border border-white/[0.08] shadow-[0_15px_35px_-10px_rgba(6,16,36,0.8),inset_0_1px_1px_rgba(255,255,255,0.08)]"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
