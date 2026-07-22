export interface ImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  folder: string;
  fileName?: string;
}

export interface OptimizedImage {
  blob: Blob;
  fileName: string;
  contentType: string;
  width: number;
  height: number;
}

export const IMAGE_DEFAULTS = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.82,
  bucket: 'assets',
} as const;
