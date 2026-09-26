'use client';

import React, { useEffect, useRef } from 'react';

type ElementType = 'blossom' | 'petal' | 'bud' | 'ember';

interface FloatingElement {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  flipPhase: number;
  flipSpeed: number;
  alpha: number;
  baseAlpha: number;
  type: ElementType;
  layer: 'back' | 'mid' | 'front';
  petalCount?: number;
  color: {
    petal: string;
    center?: string;
    edge?: string;
  };
}

/**
 * ParticlesCanvas: Eye-Pleasing Sacred Lotus & Flower Blossom Floating Animation
 *
 * Implements:
 * - Serene 3D-tumbling lotus petals, delicate 5-petal sacred flower blossoms, and fragrant jasmine buds
 * - Depth of field (3 visual depth layers for cinematic parallax)
 * - Interactive gentle cursor breeze reaction (swirls softly around mouse movement)
 * - Warm, ethereal UJWALA color palette (Soft Blush, Dawn Pink, Muted Gold, Lavender)
 * - High-DPI canvas rendering with clean resets and 60fps performance
 */
export function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let elements: FloatingElement[] = [];

    // Interactive mouse position tracker
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };

    // UJWALA Palette for sacred floral elements
    const PALETTES = [
      {
        petal: '#F3D9DC', // Soft blush
        center: '#D6B15E', // Muted gold
        edge: '#E8B7BE',
      },
      {
        petal: '#FAF2F4', // Warm ivory pink
        center: '#E8D18A', // Light gold
        edge: '#E8B7BE',
      },
      {
        petal: '#E8B7BE', // Rose blush
        center: '#D6B15E',
        edge: '#D998A2',
      },
      {
        petal: '#EEEAF5', // Soft lavender
        center: '#D6B15E',
        edge: '#DDD6EA',
      },
      {
        petal: '#FFFDF9', // Pure ivory petal with gold tip
        center: '#D6B15E',
        edge: '#E8D18A',
      },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const spawnElement = (initialY?: number): FloatingElement => {
      const rand = Math.random();
      const type: ElementType =
        rand < 0.32 ? 'blossom' : rand < 0.72 ? 'petal' : rand < 0.88 ? 'bud' : 'ember';

      const layerRand = Math.random();
      const layer: 'back' | 'mid' | 'front' =
        layerRand < 0.4 ? 'back' : layerRand < 0.85 ? 'mid' : 'front';

      const layerScale = layer === 'back' ? 0.65 : layer === 'mid' ? 1.0 : 1.35;
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];

      const baseAlpha =
        (type === 'blossom'
          ? Math.random() * 0.35 + 0.3
          : type === 'petal'
          ? Math.random() * 0.38 + 0.28
          : type === 'bud'
          ? Math.random() * 0.35 + 0.25
          : Math.random() * 0.4 + 0.25) * (layer === 'back' ? 0.55 : 1.0);

      const baseSize =
        type === 'blossom'
          ? Math.random() * 5 + 7.5 // 7.5-12.5px
          : type === 'petal'
          ? Math.random() * 4.5 + 6.5 // 6.5-11px
          : type === 'bud'
          ? Math.random() * 3 + 4.5 // 4.5-7.5px
          : Math.random() * 1.8 + 1.2; // 1.2-3.0px

      const size = baseSize * layerScale;
      const fallSpeed =
        (Math.random() * 0.35 + 0.25) * (layer === 'back' ? 0.75 : layer === 'mid' ? 1.0 : 1.25);

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -25,
        vx: (Math.random() - 0.5) * 0.2,
        vy: fallSpeed,
        size,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.018,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.6 + 0.35,
        swayAmp: (Math.random() * 1.2 + 0.8) * layerScale,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.8 + 0.45,
        alpha: baseAlpha,
        baseAlpha,
        type,
        layer,
        petalCount: 5,
        color: palette,
      };
    };

    const initElements = () => {
      // Clean, rich density
      const count = Math.min(Math.floor((width * height) / 28000), 42);
      elements = [];
      for (let i = 0; i < count; i++) {
        elements.push(spawnElement(Math.random() * height));
      }
    };

    resize();
    initElements();

    const handleResize = () => {
      resize();
      initElements();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 1. Draw 5-petal sacred flower blossom
    const drawBlossom = (el: FloatingElement, flipScale: number) => {
      const petals = el.petalCount || 5;
      const r = el.size;

      ctx.save();
      ctx.scale(1, flipScale);

      for (let i = 0; i < petals; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / petals);

        const grad = ctx.createLinearGradient(0, 0, 0, -r);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.55, el.color.petal);
        grad.addColorStop(1, el.color.edge || el.color.petal);

        ctx.fillStyle = grad;
        ctx.strokeStyle = 'rgba(214, 177, 94, 0.3)';
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-r * 0.45, -r * 0.45, -r * 0.35, -r * 0.95, 0, -r);
        ctx.bezierCurveTo(r * 0.35, -r * 0.95, r * 0.45, -r * 0.45, 0, 0);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      // Golden core / stamen
      const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.35);
      centerGrad.addColorStop(0, '#FFFDF9');
      centerGrad.addColorStop(0.5, el.color.center || '#D6B15E');
      centerGrad.addColorStop(1, 'rgba(214, 177, 94, 0.3)');

      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#D6B15E';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // 2. Draw organic curved lotus petal
    const drawPetal = (el: FloatingElement, flipScale: number) => {
      const len = el.size * 1.55;
      const width = el.size * 0.85;

      ctx.save();
      ctx.scale(1, flipScale);

      const grad = ctx.createLinearGradient(0, 0, 0, -len);
      grad.addColorStop(0, '#FFFDF9');
      grad.addColorStop(0.5, el.color.petal);
      grad.addColorStop(1, el.color.edge || el.color.petal);

      ctx.fillStyle = grad;
      ctx.strokeStyle = 'rgba(214, 177, 94, 0.28)';
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      ctx.moveTo(0, len * 0.15);
      ctx.bezierCurveTo(-width, 0, -width * 0.8, -len * 0.8, 0, -len);
      ctx.bezierCurveTo(width * 0.8, -len * 0.8, width, 0, 0, len * 0.15);
      ctx.fill();
      ctx.stroke();

      // Subtle center vein line
      ctx.strokeStyle = 'rgba(232, 183, 190, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, len * 0.08);
      ctx.lineTo(0, -len * 0.65);
      ctx.stroke();

      ctx.restore();
    };

    // 3. Draw fragrant delicate flower bud
    const drawBud = (el: FloatingElement, flipScale: number) => {
      const r = el.size;
      ctx.save();
      ctx.scale(1, flipScale);

      const grad = ctx.createLinearGradient(0, r, 0, -r);
      grad.addColorStop(0, '#FAF2F4');
      grad.addColorStop(0.5, el.color.petal);
      grad.addColorStop(1, el.color.center || '#D6B15E');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(214, 177, 94, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    // 4. Draw soft glowing ember
    const drawEmber = (el: FloatingElement) => {
      const glowR = el.size * 3.2;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
      grad.addColorStop(0, 'rgba(232, 209, 138, 0.85)');
      grad.addColorStop(0.4, 'rgba(214, 177, 94, 0.35)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFDF9';
      ctx.beginPath();
      ctx.arc(0, 0, el.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dampen mouse velocity
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        el.swayPhase += dt * el.swaySpeed;
        el.flipPhase += dt * el.flipSpeed;
        el.rotation += el.vRot;

        // Interactive gentle breeze from cursor
        const dx = el.x - mouse.x;
        const dy = el.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 1) {
          const force = (1 - dist / 140) * 0.8;
          el.x += (dx / dist) * force * 2.0;
          el.y += (dy / dist) * force * 1.5;
          el.rotation += force * 0.05;
        }

        el.y += el.vy;
        el.x += el.vx + Math.sin(el.swayPhase) * el.swayAmp;

        // Reset past bottom
        if (el.y > height + 30) {
          elements[i] = spawnElement(-25);
          continue;
        }
        if (el.x < -30) el.x = width + 30;
        if (el.x > width + 30) el.x = -30;

        const flipScale = 0.3 + 0.7 * Math.abs(Math.cos(el.flipPhase));
        const currentAlpha =
          el.baseAlpha * (0.7 + 0.3 * Math.sin(el.swayPhase));

        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

        if (el.type === 'blossom') {
          drawBlossom(el, flipScale);
        } else if (el.type === 'petal') {
          drawPetal(el, flipScale);
        } else if (el.type === 'bud') {
          drawBud(el, flipScale);
        } else {
          drawEmber(el);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
}
