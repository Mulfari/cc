"use client";

import React, { memo } from "react";
import worldMapData from "../data/world-map-paths.json";

const { outline } = worldMapData;

const WorldMap = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
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
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="mapStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient
            id="mapFill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d={outline}
          fill="url(#mapFill)"
          stroke="url(#mapStroke)"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default memo(WorldMap);
