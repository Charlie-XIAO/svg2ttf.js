#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs/promises";
import { Command } from "commander";
import tmp from "tmp";
import svgtofont from "svgtofont";
import SVGFixer from "oslllo-svg-fixer";

tmp.setGracefulCleanup();

const program = new Command();

program
  .name("svg2ttf")
  .description("Fix SVGs and generate icon fonts")
  .requiredOption("-i, --input <dir>", "input SVGs directory")
  .requiredOption("-o, --output <dir>", "output fonts directory")
  .requiredOption("-n, --font-name <name>", "font name")
  .option(
    "--trace-resolution [n]",
    "svg fixer trace resolution",
    (v) => {
      const n = Number(v);
      if (!Number.isFinite(n) || n <= 0)
        throw new Error("trace-resolution must be a positive number");
      return n;
    },
    800,
  );

program.parse(process.argv);
const opts = program.opts();

const inputDir = path.resolve(process.cwd(), opts.input);
const outputDir = path.resolve(process.cwd(), opts.output);

async function main() {
  try {
    await fs.access(inputDir);
  } catch (err) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  const outlinedDir = tmp.dirSync({ unsafeCleanup: true });

  await SVGFixer(inputDir, outlinedDir.name, {
    showProgressBar: true,
    traceResolution: opts.traceResolution,
  }).fix();

  await svgtofont({
    src: outlinedDir.name,
    dist: outputDir,
    emptyDist: true,
    fontName: opts.fontName,
    css: false,
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: false,
    },
    generateInfoData: true,
    excludeFormat: ["eot", "svg", "symbol.svg", "woff", "woff2"],
  });

  outlinedDir.removeCallback();

  process.stdout.write(`Done: ${outputDir}\n`);
}

await main();
