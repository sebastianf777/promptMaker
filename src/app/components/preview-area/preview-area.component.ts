import { Component } from '@angular/core';
import { PreviewService } from '../../services/preview.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-preview-area',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent {
  previewImage: string | null = null;

  constructor(private previewService: PreviewService) {
    this.previewService.previewImage$.subscribe(imageUrl => {
      this.previewImage = imageUrl;
    });
  }
}
