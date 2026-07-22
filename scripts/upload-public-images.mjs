import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { IMAGE_PRESETS, optimizeImageToWebp, toWebpFileName } from './image-optimizer.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');
const manifestPath = resolve(root, 'supabase/seeds/image-manifest.json');

function loadEnvFile() {
  const envPath = resolve(root, '.env');

  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^(['"])(.*)\1$/, '$2');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function resolveUploadTarget(fileName) {
  if (fileName.startsWith('login_')) {
    return {
      folder: 'auth',
      preset: IMAGE_PRESETS.auth,
    };
  }

  if (fileName === 'hero.png') {
    return {
      folder: 'recipes',
      preset: IMAGE_PRESETS.hero,
    };
  }

  if (fileName.startsWith('bread-') || fileName.startsWith('dessert_')) {
    return {
      folder: 'recipes',
      preset: IMAGE_PRESETS.recipe,
    };
  }

  return null;
}

async function main() {
  loadEnvFile();

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env. The service role key is required for admin upload scripts only.',
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const manifest = {};
  const files = readdirSync(publicDir).filter((file) => /\.(png|jpe?g)$/i.test(file));

  for (const fileName of files) {
    const target = resolveUploadTarget(fileName);

    if (!target) {
      console.log(`Skipping ${fileName}`);
      continue;
    }

    const inputPath = resolve(publicDir, fileName);
    const optimized = await optimizeImageToWebp(inputPath, target.preset);
    const webpName = toWebpFileName(fileName);
    const storagePath = `${target.folder}/${webpName}`;

    const { error } = await supabase.storage.from('assets').upload(storagePath, optimized.buffer, {
      contentType: optimized.contentType,
      upsert: true,
      cacheControl: '31536000',
    });

    if (error) {
      throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
    }

    manifest[fileName] = {
      storagePath,
      publicUrl: `${supabaseUrl}/storage/v1/object/public/assets/${storagePath}`,
      width: optimized.width,
      height: optimized.height,
      bytes: optimized.buffer.length,
    };

    console.log(`Uploaded ${fileName} -> assets/${storagePath} (${optimized.buffer.length} bytes)`);
  }

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Manifest written to ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
