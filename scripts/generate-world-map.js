/**
 * Pre-genera los paths SVG del mapa mundial (sin Antártida).
 * Ejecutar: node scripts/generate-world-map.js
 * Output: app/data/world-map-paths.json
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "app",
  "data",
  "world-map-paths.json"
);

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

function simplifyPath(d, precision = 2) {
  if (!d) return d;
  return d.replace(/(\d+\.\d+)/g, (m) => parseFloat(m).toFixed(precision));
}

async function main() {
  const { geoEqualEarth, geoPath } = await import("d3-geo");
  const { feature, merge } = await import("topojson-client");

  const topology = await fetchJson(GEO_URL);
  const countries = topology.objects.countries;

  const projection = geoEqualEarth()
    .scale(260)
    .translate([600, 300])
    .center([0, 20]);

  const pathGenerator = geoPath().projection(projection);

  const filteredGeometries = countries.geometries.filter(
    (g) => g.properties?.name !== "Antarctica"
  );

  const merged = merge(topology, filteredGeometries);
  const outlinePath = pathGenerator(merged);
  const spherePath = pathGenerator({ type: "Sphere" });

  const output = {
    outline: simplifyPath(outlinePath, 1),
    sphere: simplifyPath(spherePath, 1),
  };

  const dir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output), "utf8");
  const size = (JSON.stringify(output).length / 1024).toFixed(1);
  console.log(`✓ Generated outline + sphere (${size} KB) → ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
