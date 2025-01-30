import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Automatically provided in the root injector
})
export class PreviewService {
  private previewImageSource = new BehaviorSubject<string | null>(null);
  previewImage$ = this.previewImageSource.asObservable();

  setPreviewImage(imageUrl: string | null): void {
    this.previewImageSource.next(imageUrl);
  }
}
