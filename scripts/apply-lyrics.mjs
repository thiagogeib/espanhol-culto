#!/usr/bin/env node
// Pega um .txt com linhas alternadas (es, pt, es, pt, ...) e injeta no array
// `linhas` da música indicada, dentro de um ou mais arquivos songs.ts.
import { readFileSync, writeFileSync } from "node:fs";

const [, , txtPath, songId, ...targets] = process.argv;

if (!txtPath || !songId || targets.length === 0) {
  console.error(
    "Uso: node apply-lyrics.mjs <arquivo.txt> <song-id> <songs.ts> [songs.ts ...]"
  );
  process.exit(1);
}

const raw = readFileSync(txtPath, "utf8");
const lines = raw
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l.length > 0);

if (lines.length === 0) {
  console.error(`Arquivo "${txtPath}" está vazio.`);
  process.exit(1);
}

if (lines.length % 2 !== 0) {
  console.error(
    `O arquivo tem ${lines.length} linhas não vazias (número ímpar) — não dá pra formar pares es/pt. Confira se cada linha em espanhol tem sua tradução logo em seguida, sem linha em branco entre elas.`
  );
  process.exit(1);
}

function escape(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const pairs = [];
for (let i = 0; i < lines.length; i += 2) {
  pairs.push({ es: lines[i], pt: lines[i + 1] });
}

const arrayBody = pairs
  .map((p) => `      { es: "${escape(p.es)}", pt: "${escape(p.pt)}" },`)
  .join("\n");

const newBlock = `    linhas: [\n${arrayBody}\n    ],`;

for (const target of targets) {
  const content = readFileSync(target, "utf8");
  const idMarker = `id: "${songId}"`;
  const idIndex = content.indexOf(idMarker);
  if (idIndex === -1) {
    console.error(`Música com id "${songId}" não encontrada em ${target}`);
    continue;
  }

  const linhasStart = content.indexOf("linhas: [", idIndex);
  if (linhasStart === -1) {
    console.error(`Campo "linhas" não encontrado para "${songId}" em ${target}`);
    continue;
  }

  const closeMarker = "\n    ],";
  const linhasEnd = content.indexOf(closeMarker, linhasStart);
  if (linhasEnd === -1) {
    console.error(`Fechamento do array "linhas" não encontrado para "${songId}" em ${target}`);
    continue;
  }

  const before = content.slice(0, linhasStart);
  const after = content.slice(linhasEnd + closeMarker.length);
  writeFileSync(target, `${before}${newBlock}${after}`, "utf8");
  console.log(`Atualizado: ${target} (${pairs.length} linhas)`);
}
