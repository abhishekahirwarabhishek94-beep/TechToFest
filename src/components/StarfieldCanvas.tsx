import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      color: string;
      pulsing: number;
    }> = [];

    const starColors = ['#00f0ff', '#a855f7', '#38bdf8', '#4ade80', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.4 + 0.15,
        alpha: Math.random() * 0.7 + 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        pulsing: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle grid background
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        star.alpha += star.pulsing;
        if (star.alpha > 0.95 || star.alpha < 0.25) {
          star.pulsing = -star.pulsing;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      if (isRunning) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isRunning) {
      animationFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      <div className="absolute top-20 right-4 pointer-events-auto hidden md:block">
        <button
          onClick={() => setIsRunning(!isRunning)}
          title={isRunning ? "Pause background animation" : "Resume background animation"}
          className="p-1.5 rounded-md bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-cyan-400 transition-colors text-xs flex items-center gap-1.5"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="text-[11px] font-mono">{isRunning ? "Canvas Active" : "Canvas Paused"}</span>
        </button>
      </div>
    </div>
  );
};
