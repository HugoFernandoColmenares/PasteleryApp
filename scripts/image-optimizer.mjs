import sharp from 'sharp';

export const IMAGE_PRESETS = {
  recipe: { maxWidth: 1200, maxHeight: 1200, quality: 82 },
  auth: { maxWidth: 800, maxHeight: 800, quality: 85 },
  hero: { maxWidth: 1400, maxHeight: 1400, quality: 82 },
};

export async function optimizeImageToWebp(inputPath, preset) {
  const image = sharp(inputPath, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();

  const resized = image.resize({
    width: preset.maxWidth,
    height: preset.maxHeight,
    fit: 'inside',
    withoutEnlargement: true,
  });

  const buffer = await resized.webp({ quality: preset.quality, effort: 4 }).toBuffer();
  const outputMetadata = await sharp(buffer).metadata();

  return {
    buffer,
    contentType: 'image/webp',
    width: outputMetadata.width ?? metadata.width ?? preset.maxWidth,
    height: outputMetadata.height ?? metadata.height ?? preset.maxHeight,
  };
}

export function toWebpFileName(fileName) {
  return `${fileName.replace(/\.[^.]+$/, '')}.webp`;
}
