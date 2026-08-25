import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/logo/logo-lad.png";

await mkdir("src/app", { recursive: true });

const base = sharp(SRC).resize(1704, 1704, {
  fit: "contain",
  background: { r: 0, g: 0, b: 0, alpha: 0 },
});

await base
  .clone()
  .resize(512, 512)
  .png()
  .toFile("src/app/icon.png");

await sharp(SRC)
  .resize(1704, 1704, { fit: "contain", background: "#FEFEFE" })
  .flatten({ background: "#FEFEFE" })
  .resize(180, 180)
  .png()
  .toFile("src/app/apple-icon.png");

console.log("icons generated");
