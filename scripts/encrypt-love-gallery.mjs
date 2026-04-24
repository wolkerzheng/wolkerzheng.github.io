import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const password = process.argv[2];
const workspaceRoot = process.cwd();
const sourceDir = path.join(workspaceRoot, "imgs");
const outputDir = path.join(workspaceRoot, "data", "love-gallery");
const manifestPath = path.join(workspaceRoot, "data", "love-gallery.json");
const iterations = 180000;
const verifierValue = "love-daily-access-v1";

if (!password) {
  console.error("Usage: node scripts/encrypt-love-gallery.mjs <password>");
  process.exit(1);
}

const mimeTypes = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp"
};

function toBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

function encryptBuffer(buffer, key) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv,
    payload: Buffer.concat([encrypted, tag])
  };
}

async function main() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const imageEntries = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => mimeTypes[path.extname(entry.name).toLowerCase()])
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

  if (!imageEntries.length) {
    throw new Error("No source images found in imgs/");
  }

  const salt = randomBytes(16);
  const key = pbkdf2Sync(password, salt, iterations, 32, "sha256");

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    kdf: {
      algorithm: "PBKDF2",
      hash: "SHA-256",
      iterations,
      salt: toBase64(salt)
    },
    verifier: {
      value: verifierValue,
      iv: "",
      data: ""
    },
    files: []
  };

  const encryptedVerifier = encryptBuffer(Buffer.from(verifierValue, "utf8"), key);
  manifest.verifier.iv = toBase64(encryptedVerifier.iv);
  manifest.verifier.data = toBase64(encryptedVerifier.payload);

  for (const [index, entry] of imageEntries.entries()) {
    const sourcePath = path.join(sourceDir, entry.name);
    const sourceBuffer = await fs.readFile(sourcePath);
    const encryptedImage = encryptBuffer(sourceBuffer, key);
    const fileName = `image-${String(index + 1).padStart(2, "0")}.bin`;
    const outputPath = path.join(outputDir, fileName);
    await fs.writeFile(outputPath, encryptedImage.payload);

    manifest.files.push({
      name: entry.name,
      path: `data/love-gallery/${fileName}`,
      type: mimeTypes[path.extname(entry.name).toLowerCase()],
      size: sourceBuffer.length,
      caption: `甜心合照 ${String(index + 1).padStart(2, "0")}`,
      iv: toBase64(encryptedImage.iv)
    });
  }

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Encrypted ${manifest.files.length} image(s) into data/love-gallery/`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
