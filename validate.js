import { readFileSync } from 'node:fs';
import { parse } from './parse.js';

const INPUT_DIR = '/root/makefun/markdown-render-speed-02-kit/practice/input';
const REFERENCE_DIR = '/root/makefun/markdown-render-speed-02-kit/practice/reference';

const cases = JSON.parse(readFileSync(`${INPUT_DIR}/cases.json`, 'utf8'));
const expected = JSON.parse(readFileSync(`${REFERENCE_DIR}/expected.json`, 'utf8'));

let mismatches = 0;
for (let i = 0; i < cases.length; i++) {
  const result = parse(cases[i].markdown);
  if (result !== expected.cases[i].html) {
    console.log(`Mismatch at index ${i}: id=${cases[i].id}`);
    console.log(`  Expected: ${JSON.stringify(expected.cases[i].html)}`);
    console.log(`  Got:      ${JSON.stringify(result)}`);
    mismatches++;
  }
}
console.log(`Practice set: ${mismatches} mismatches out of ${cases.length} cases`);
process.exit(mismatches > 0 ? 1 : 0);