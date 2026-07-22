import { Injectable, inject } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import {
  IMAGE_DEFAULTS,
  ImageUploadOptions,
  OptimizedImage,
} from '@core/models/image-upload.model';
import { SupabaseService } from '@core/services/supabase.service';
import { resolveStorageUrl } from '@core/utils/storage-url.util';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private supabase = inject(SupabaseService).client;

  getPublicUrl(storagePath: string | null | undefined): string {
    return resolveStorageUrl(storagePath);
  }

  async optimizeToWebp(file: File, options?: Partial<ImageUploadOptions>): Promise<OptimizedImage> {
    const maxWidth = options?.maxWidth ?? IMAGE_DEFAULTS.maxWidth;
    const maxHeight = options?.maxHeight ?? IMAGE_DEFAULTS.maxHeight;
    const quality = options?.quality ?? IMAGE_DEFAULTS.quality;

    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas context is not available.');
    }

    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error('WebP conversion failed.'));
            return;
          }

          resolve(result);
        },
        'image/webp',
        quality,
      );
    });

    const baseName = (options?.fileName ?? file.name).replace(/\.[^.]+$/, '');
    const fileName = `${baseName}.webp`;

    return {
      blob,
      fileName,
      contentType: 'image/webp',
      width,
      height,
    };
  }

  uploadOptimized(file: File, options: ImageUploadOptions): Observable<string> {
    return from(this.optimizeToWebp(file, options)).pipe(
      switchMap((optimized) => this.uploadBlob(optimized, options.folder)),
    );
  }

  uploadBlob(optimized: OptimizedImage, folder: string): Observable<string> {
    const storagePath = `${folder.replace(/\/+$/, '')}/${optimized.fileName}`;

    return from(
      this.supabase.storage.from(IMAGE_DEFAULTS.bucket).upload(storagePath, optimized.blob, {
        contentType: optimized.contentType,
        upsert: true,
        cacheControl: '31536000',
      }),
    ).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }

        return storagePath;
      }),
    );
  }

  deleteImage(storagePath: string): Observable<void> {
    return from(
      this.supabase.storage.from(IMAGE_DEFAULTS.bucket).remove([storagePath.replace(/^\/+/, '')]),
    ).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
      }),
    );
  }
}
