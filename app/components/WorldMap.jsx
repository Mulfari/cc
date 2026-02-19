"use client";

import React, { memo, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "@vnedyalk0v/react19-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Estilos fuera del componente → no se recrean en cada render
const geographyStyle = {
  default: {
    fill: "url(#dotsPattern)",
    stroke: "rgba(30,64,175,0.18)",
    strokeWidth: 0.2,
    outline: "none",
    filter: "url(#glow)",
  },
  hover: {
    fill: "url(#dotsPattern)",
    outline: "none",
  },
  pressed: {
    fill: "url(#dotsPattern)",
    outline: "none",
  },
};

// Componente memoizado → solo re-render si cambian props
const Countries = memo(({ geographies }) => {
  const filteredGeographies = useMemo(
    () =>
      geographies.filter(
        (geo) => geo.properties?.name !== "Antarctica"
      ),
    [geographies]
  );

  return (
    <>
      {filteredGeographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          style={geographyStyle}
        />
      ))}
    </>
  );
});

Countries.displayName = "Countries";

const WorldMap = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        background:
          "radial-gradient(1200px 560px at 50% 4%, rgba(59,130,246,0.12), rgba(59,130,246,0.03) 42%, transparent 72%), linear-gradient(180deg, #f7faff 0%, #ffffff 55%, #f3f7ff 100%)",
      }}
    >
      {/* Defs SVG */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <pattern
            id="dotsPattern"
            x="0"
            y="0"
            width="3"
            height="3"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="1"
              cy="1"
              r="0.6"
              fill="rgba(51,65,85,0.24)"
            />
          </pattern>

          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            />
          </filter>
        </defs>
      </svg>

      {/* Mapa */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "6px",
        }}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 280,
            center: [0, 15],
          }}
          style={{
            width: "115%",
            height: "115%",
            maxWidth: "none",
            marginTop: "-40px",
          }}
        >
          <Sphere
            stroke="rgba(30,64,175,0.08)"
            strokeWidth={0.4}
            fill="transparent"
          />

          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <Countries geographies={geographies} />
            )}
          </Geographies>
        </ComposableMap>
      </div>

      {/* Overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.72) 30%, rgba(255,255,255,0.2) 58%, rgba(255,255,255,0.7) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 62%, transparent 44%, rgba(15,23,42,0.09) 100%)",
        }}
      />
    </div>
  );
};

export default memo(WorldMap);
