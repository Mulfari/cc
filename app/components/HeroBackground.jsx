"use client";

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import worldMapData from "../data/world-map-paths.json";

const { outline } = worldMapData;

/** Nodos: coords geoEqualEarth (scale 260, translate [600,300], center [0,20]) */
const NODES = {
  venezuela: { cx: 341, cy: 362 },
  portugal: { cx: 582, cy: 205 },
  alemania: { cx: 633, cy: 155 },
  estadosUnidos: { cx: 242, cy: 192 },
  colombia: { cx: 315, cy: 384 },
  mexico: { cx: 217, cy: 281 },
  brasil: { cx: 395, cy: 459 },
  argentina: { cx: 369, cy: 580 },
  china: { cx: 966, cy: 223 },
};

const NODE_KEYS = Object.keys(NODES);

const getRandomPair = () => {
  const i = Math.floor(Math.random() * NODE_KEYS.length);
  let j = Math.floor(Math.random() * NODE_KEYS.length);
  while (j === i) j = Math.floor(Math.random() * NODE_KEYS.length);
  return [NODES[NODE_KEYS[i]], NODES[NODE_KEYS[j]]];
};

const DURATION_MS = 1800;
const MIN_DELAY_MS = 4000;
const MAX_DELAY_MS = 8000;

const HeroBackground = () => {
  const [particle, setParticle] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const startAnimation = useCallback(() => {
    const [from, to] = getRandomPair();
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / DURATION_MS);
      setParticle({ from, to, progress });
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setParticle(null);
        const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
        timeoutRef.current = setTimeout(startAnimation, delay);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const initialDelay = 2000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(startAnimation, initialDelay);
    return () => {
      clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startAnimation, prefersReducedMotion]);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* 1. Base gradient - fondo principal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(165deg, #dde3ea 0%, #e2e8f0 25%, #e5e9ef 50%, #d8dfe6 75%, #d1d9e2 100%)",
        }}
      />

      {/* 2. Soft radial orbs for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(249, 115, 22, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 85% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 52%)",
        }}
      />

      {/* 3. World map */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          maskImage:
            "radial-gradient(ellipse 108% 98% at 50% 48%, black 18%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 108% 98% at 50% 48%, black 18%, transparent 82%)",
        }}
      >
        <svg
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <filter id="heroNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="heroNodeFill" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="heroMapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#334155" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="heroMapGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#334155" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="heroMapFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#64748b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.28" />
            </linearGradient>
          </defs>

          {/* Nodos con glow, gradiente y pulse sutil */}
          {NODE_KEYS.map((key) => {
            const { cx, cy } = NODES[key];
            return (
              <g key={key} filter="url(#heroNodeGlow)" className="hero-node-pulse">
                <circle cx={cx} cy={cy} r="7" fill="none" stroke="#1d4ed8" strokeWidth="1.5" opacity="0.45" />
                <circle cx={cx} cy={cy} r="5" fill="none" stroke="#1d4ed8" strokeWidth="2" opacity="0.8" />
                <circle cx={cx} cy={cy} r="3" fill="url(#heroNodeFill)" opacity="0.95" />
              </g>
            );
          })}

          {/* Partícula con estela (respetando prefers-reduced-motion) */}
          {!prefersReducedMotion && particle && (() => {
            const { from, to, progress } = particle;
            const progressEased = 1 - (1 - progress) ** 2;
            const x = from.cx + (to.cx - from.cx) * progressEased;
            const y = from.cy + (to.cy - from.cy) * progressEased;
            const smoothstep = (t) => t * t * (3 - 2 * t);
            const fadeStart = 0.82;
            const fadeT = progress < fadeStart ? 0 : (progress - fadeStart) / (1 - fadeStart);
            const particleOpacity = 0.9 * (1 - smoothstep(fadeT));
            const retractStart = 0.78;
            const retractT = progress < retractStart ? 0 : smoothstep((progress - retractStart) / (1 - retractStart));
            const trailStartX = from.cx + (x - from.cx) * retractT * 0.92;
            const trailStartY = from.cy + (y - from.cy) * retractT * 0.92;
            const trailFadeStart = 0.75;
            const trailFadeT = progress < trailFadeStart ? 0 : (progress - trailFadeStart) / (1 - trailFadeStart);
            const trailOpacity = 1 - 0.9 * smoothstep(trailFadeT);
            const trailGradientId = "heroTrailGradient";
            return (
              <g opacity={trailOpacity}>
                <defs>
                  <linearGradient
                    id={trailGradientId}
                    x1={trailStartX}
                    y1={trailStartY}
                    x2={x}
                    y2={y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
                    <stop offset="50%" stopColor="#1d4ed8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <line
                  x1={trailStartX}
                  y1={trailStartY}
                  x2={x}
                  y2={y}
                  stroke={`url(#${trailGradientId})`}
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#1d4ed8"
                  opacity={particleOpacity}
                  style={{ filter: "drop-shadow(0 0 4px rgba(29,78,216,0.5))" }}
                />
              </g>
            );
          })()}

          {/* Mapa mundial */}
          <path
            d={outline}
            fill="none"
            stroke="url(#heroMapGlow)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={outline}
            fill="url(#heroMapFill)"
            stroke="url(#heroMapStroke)"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 4. Subtle dot pattern for texture */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.25,
          zIndex: 0,
        }}
      >
        <defs>
          <pattern
            id="heroDots"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="0.4" fill="#f97316" fillOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroDots)" />
      </svg>

      {/* 5. Top/bottom fade for seamless blend */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(to bottom, rgba(226,232,240,0.4) 0%, transparent 18%, transparent 82%, rgba(203,213,225,0.35) 100%)",
        }}
      />
    </div>
  );
};

export default memo(HeroBackground);
