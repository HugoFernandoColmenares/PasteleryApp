import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import { resolveLocalImageUrl, resolveStorageUrl } from '@core/utils/storage-url.util';

@Directive({
  selector: 'img[storageSrc]',
})
export class StorageSrcDirective {
  private readonly host = inject<ElementRef<HTMLImageElement>>(ElementRef);

  readonly storageSrc = input<string | null | undefined>();

  constructor() {
    effect(() => {
      const path = this.storageSrc();
      const image = this.host.nativeElement;
      const remoteUrl = resolveStorageUrl(path);
      const localUrl = resolveLocalImageUrl(path);

      image.src = remoteUrl || localUrl;
      image.onerror = () => {
        image.onerror = null;

        if (localUrl && image.getAttribute('src') !== localUrl) {
          image.src = localUrl;
        }
      };
    });
  }
}
