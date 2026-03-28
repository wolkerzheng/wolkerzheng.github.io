import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'legacy-hexo');
const staticDir = path.join(root, 'static');
const targetDir = path.join(staticDir, 'legacy-hexo');

if (!fs.existsSync(sourceDir)) {
  console.warn('No legacy-hexo folder found. Skip legacy sync.');
  process.exit(0);
}

fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });

console.log('Synced legacy site to /static/legacy-hexo');
