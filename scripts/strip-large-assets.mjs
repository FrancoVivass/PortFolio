import { rm, stat, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const buildRoot = join(process.cwd(), 'dist', 'portfolio');

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

async function walkAndStrip(dir, maxBytes) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndStrip(fullPath, maxBytes);
    } else {
      await removeIfTooBig(fullPath, maxBytes);
    }
  }));
}

await walkAndStrip(buildRoot, 25 * 1024 * 1024);



