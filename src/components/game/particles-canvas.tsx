'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  phase: number;
  type: 'sparkle' | 'petal' | 'feather';
  rotation: number;
  vRot: number;
}

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
    let particles: Particle[] = [];

    const colors = {
      gold: ['#fef08a', '#fbbf24', '#f59e0b'],
      teal: ['#14b8a6', '#0d9488', '#00695c'],
      petal: ['#fda4af', '#f43f5e', '#fb7185'],
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 28000), 55);
      particles = [];
      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        const type: 'sparkle' | 'petal' | 'feather' =
          rand < 0.65 ? 'sparkle' : rand < 0.85 ? 'petal' : 'feather';

        let color = colors.gold[Math.floor(Math.random() * colors.gold.length)];
        let size = Math.random() * 2.5 + 1.2;

        if (type === 'petal') {
          color = colors.petal[Math.floor(Math.random() * colors.petal.length)];
          size = Math.random() * 4 + 3;
        } else if (type === 'feather') {
          color = colors.teal[Math.floor(Math.random() * colors.teal.length)];
          size = Math.random() * 6 + 5;
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: Math.random() * 0.4 + 0.15,
          size,
          color,
          alpha: Math.random() * 0.5 + 0.2,
          baseAlpha: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          type,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    resize();
    initParticles();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += dt * 1.5;
        p.rotation += p.vRot;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.phase) * 0.3;

        // Wrap around
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const currentAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(p.phase));
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));

        if (p.type === 'sparkle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'petal') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Feather vane
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.stroke();
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, -p.size * 0.3, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
