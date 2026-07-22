import { Pipe, PipeTransform } from '@angular/core';
import { resolveStorageUrl } from '@core/utils/storage-url.util';

@Pipe({
  name: 'storageUrl',
})
export class StorageUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return resolveStorageUrl(value);
  }
}
