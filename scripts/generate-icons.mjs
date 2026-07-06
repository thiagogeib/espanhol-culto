import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = readFileSync(new URL("../public/favicon.svg", import.meta.url));

const targets = [
  { file: "icon-192.png", size: 192 },
  { file: "icon-512.png", size: 512 },
  { file: "apple-touch-icon.png", size: 180 },
];

for (const { file, size } of targets) {
  const outPath = fileURLToPath(new URL(`../public/icons/${file}`, import.meta.url));
  await sharp(svg, { density: 384 }).resize(size, size).png().toFile(outPath);
  console.log(`gerado ${file} (${size}x${size})`);
}
