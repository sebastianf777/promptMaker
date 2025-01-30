import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent {
  previewText: string = "Preview will be shown here...";
}
