import { readFileSync } from 'node:fs';

// Load both implementations
import { marked as markedBaseline } from '/root/makefun/markdown-render-speed-02-kit/baselines/vendor/marked/marked.esm.js';
import { parse as parseOptimized } from './parse.js';

const INPUT_DIR = '/root/makefun/markdown-render-speed-02-kit/practice/input';
const cases = JSON.parse(readFileSync(`${INPUT_DIR}/cases.json`, 'utf8'));

function benchmark(name, fn, runs = 10) {
  // Warmup
  for (const c of cases) fn(c.markdown);
  
  const times = [];
  for (let r = 0; r < runs; r++) {
    const start = performance.now();
    for (const c of cases) fn(c.markdown);
    const end = performance.now();
    times.push(end - start);
  }
  
  times.sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)];
  return median;
}

console.log('Warming up...');
benchmark('baseline', (md) => markedBaseline.parse(md));
benchmark('optimized', (md) => parseOptimized(md));

console.log('\nBenchmarking...');
const baselineTime = benchmark('baseline', (md) => markedBaseline.parse(md), 20);
const optimizedTime = benchmark('optimized', (md) => parseOptimized(md), 20);

console.log(`\nBaseline median time: ${baselineTime.toFixed(2)} ms`);
console.log(`Optimized median time: ${optimizedTime.toFixed(2)} ms`);
console.log(`Speedup: ${(baselineTime / optimizedTime).toFixed(2)}x`);