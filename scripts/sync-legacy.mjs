import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const outputDirArg = process.argv[2] || 'public';
const outputDir = path.resolve(rootDir, outputDirArg);

const legacyEntries = [
  '2016',
  '2017',
  'archives',
  'categories',
  'css',
  'fancybox',
  'img',
  'js',
  'page',
  'tags'
];

fs.mkdirSync(outputDir, { recursive: true });

for (const entry of legacyEntries) {
  const source = path.join(rootDir, entry);
  const destination = path.join(outputDir, entry);

  if (!fs.existsSync(source)) {
    continue;
  }

  fs.rmSync(destination, { recursive: true, force: true });
  fs.cpSync(source, destination, { recursive: true });
  console.log(`Synced legacy content: ${entry}`);
}
