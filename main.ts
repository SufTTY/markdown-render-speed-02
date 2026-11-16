import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const raw = readFileSync(join(inputDir, 'cases.json'), 'utf8');
const cases: { id: string; markdown: string }[] = JSON.parse(raw);

const results = cases.map(({ markdown }) => parse(markdown));

writeFileSync(join(outputDir, 'html.json'), JSON.stringify(results));