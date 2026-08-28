"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Fondo de nodos flotando en fondos claros: se conectan entre sí y, al
 * acercar el cursor, trazan líneas rojas hacia los nodos cercanos. Evita
 * que las cabeceras blancas queden completamente vacías.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(64, Math.max(18, Math.round((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const linkDist = 128;
      const mouseDist = 170;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx!.strokeStyle = `rgba(32,30,30,${0.09 * (1 - dist / linkDist)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }

        const dxm = nodes[i].x - mouse.x;
        const dym = nodes[i].y - mouse.y;
        const distm = Math.hypot(dxm, dym);
        if (distm < mouseDist) {
          ctx!.strokeStyle = `rgba(227,6,19,${0.4 * (1 - distm / mouseDist)})`;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }

        ctx!.fillStyle = "rgba(32,30,30,0.24)";
        ctx!.beginPath();
        ctx!.arc(nodes[i].x, nodes[i].y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(tick);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x >= 0 && x <= width && y >= 0 && y <= height ? x : -9999;
      mouse.y = x >= 0 && x <= width && y >= 0 && y <= height ? y : -9999;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw();
    } else {
      tick();
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
