import { Component, ElementRef, HostListener } from '@angular/core';
import { PromptService } from '../../services/prompt-service';
import { CommonModule } from '@angular/common'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-button-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss']
})
export class ButtonListComponent {
  buttons = [
    { 
      label: 'Camera Lens', 
      prompts: [
        { name: 'Leica 50mm', image: 'assets/images/leica-50mm.jpg' },
        { name: 'Fujifilm 110mm', image: 'assets/images/fujifilm-110mm.jpg' },
        { name: 'Sony 16-35mm', image: 'assets/images/sony-16-35mm.jpg' },
        { name: 'Nikon 70-200mm', image: 'assets/images/nikon-70-200mm.jpg' },
        { name: 'Canon 24-70mm', image: 'assets/images/canon-24-70mm.jpg' }
      ], 
      show: false 
    },
    {
      label: 'Shot Types',
      prompts: [
        { name: 'Extreme Closeup', image: 'assets/images/extreme-closeup.jpg' },
        { name: 'Closeup', image: 'assets/images/closeup.jpg' },
        { name: 'Medium Closeup', image: 'assets/images/medium-closeup.jpg' },
        { name: 'Medium Shot', image: 'assets/images/medium-shot.jpg' },
        { name: 'Medium Full Shot', image: 'assets/images/medium-full-shot.jpg' },
        { name: 'Full Shot', image: 'assets/images/full-shot.jpg' }
      ],
      show: false 
    },
    { 
      label: 'Lighting', 
      prompts: [
        { name: 'Soft Light', image: 'assets/images/soft-light.jpg' },
        { name: 'Hard Light', image: 'assets/images/hard-light.jpg' },
        { name: 'Soft Focus', image: 'assets/images/soft-focus.jpg' },
        { name: 'Cinematic Lighting', image: 'assets/images/cinematic-lighting.jpg' },
        { name: 'High Contrast', image: 'assets/images/high-contrast.jpg' }
      ], 
      show: false 
    },
    { 
      label: 'Photo Styles', 
      prompts: [
        { name: 'Portrait', image: 'assets/images/portrait.jpg' },
        { name: 'Cinematic', image: 'assets/images/cinematic.jpg' },
        { name: 'Amateur', image: 'assets/images/amateur.jpg' },
        { name: 'Landscape', image: 'assets/images/landscape.jpg' },
        { name: 'Street Style', image: 'assets/images/street-style.jpg' }
      ], 
      show: false 
    },
    { 
      label: 'Photo Effects', 
      prompts: [
        { name: 'Geometric Overlay', image: 'assets/images/geometric-overlay.jpg' },
        { name: 'Tilt Shift Miniature', image: 'assets/images/tilt-shift-miniature.jpg' },
        { name: 'Uv Camera', image: 'assets/images/uv-camera.jpg' },
        { name: 'Quantum Superimposition', image: 'assets/images/quantum-superimposition.jpg' },
        { name: 'Platinum Print', image: 'assets/images/platinum-print.jpg' }
      ], 
      show: false 
    }
  ];

  constructor(
    private promptService: PromptService, 
    private previewService: PreviewService, 
    private eRef: ElementRef
  ) {}

  addToPrompt(prompt: string): void {
    this.promptService.addPrompt(prompt);
  }

  toggleDropdown(index: number): void {
    this.buttons.forEach((button, i) => {
      button.show = i === index ? !button.show : false;
    });
  }

  closeAllDropdowns(): void {
    this.buttons.forEach(button => (button.show = false));
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeAllDropdowns();
    }
  }

  setPreview(imageUrl: string | null): void {
    this.previewService.setPreviewImage(imageUrl);
  }
}