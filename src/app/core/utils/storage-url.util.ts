import { IMAGE_DEFAULTS } from '@core/models/image-upload.model';
import { environment } from '../../../environments/environment';

export function resolveStorageUrl(storagePath: string | null | undefined): string {
  if (!storagePath) {
    return '';
  }

  if (
    storagePath.startsWith('http://') ||
    storagePath.startsWith('https://') ||
    storagePath.startsWith('data:')
  ) {
    return storagePath;
  }

  const normalizedPath = storagePath.replace(/^\/+/, '');
  return `${environment.supabaseUrl}/storage/v1/object/public/${IMAGE_DEFAULTS.bucket}/${normalizedPath}`;
}
