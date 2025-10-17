import { rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

const buildRoot = join(process.cwd(), 'dist', 'portfolio');
const candidates = [
  // Angular 18 output structure: dist/portfolio/browser/assets/...
  join(buildRoot, 'browser', 'assets', 'models', 'commodore_64__computer.glb'),
  // Fallback in case structure differs
  join(buildRoot, 'assets', 'models', 'commodore_64__computer.glb')
];

async function removeIfTooBig(filePath, maxBytes = 25 * 1024 * 1024) {
  try {
    const s = await stat(filePath);
    if (s.size > maxBytes) {
      await rm(filePath, { force: true });
      console.log(`[strip-large-assets] Removed large asset: ${filePath} (${s.size} bytes)`);
    }
  } catch (err) {
    // File may not exist; ignore
  }
}

await Promise.all(candidates.map(p => removeIfTooBig(p)));


