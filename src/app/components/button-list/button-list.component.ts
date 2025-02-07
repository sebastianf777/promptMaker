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
    },
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
      label: 'Lighting',
      prompts: [
        { name: 'Soft Light', image: 'assets/images/soft-light.jpg' },
        { name: 'Hard Light', image: 'assets/images/hard-light.jpg' },
        { name: 'Soft Focus', image: 'assets/images/soft-focus.jpg' },
        { name: 'Cinematic Lighting', image: 'assets/images/cinematic-lighting.jpg' },
        { name: 'High Contrast', image: 'assets/images/high-contrast.jpg' }
      ],
      show: false
    }
  ];

  constructor(
    private promptService: PromptService,
    private previewService: PreviewService,
    private eRef: ElementRef
  ) { }

 // ✅ Handle click for mobile and desktop
 awaitingConfirmation: { name: string; image: string } | null = null;

 handleClick(prompt: { name: string; image: string }): void {
  if (this.isMobile()) {
    // If we're already awaiting confirmation for this prompt, do nothing
    if (this.awaitingConfirmation?.name === prompt.name) return;

    // Show preview and ask for confirmation
    this.awaitingConfirmation = prompt;
    this.setPreview(prompt.image);
  } else {
    this.addToPrompt(prompt.name);
    this.setPreview(prompt.image);
  }
}

confirmAddPrompt(): void {
  if (this.awaitingConfirmation) {
    this.addToPrompt(this.awaitingConfirmation.name);
    this.awaitingConfirmation = null; // Clear confirmation
    this.previewService.setPreviewImage(null); // Optional: Clear preview after adding
  }
}
cancelAddPrompt(): void {
  this.awaitingConfirmation = null; // Cancel confirmation
  this.previewService.setPreviewImage(null); // Optional: Clear preview on cancel
}

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

// ✅ Set preview (works on both mobile and desktop now)
setPreview(imageUrl: string | null): void {
  this.previewService.setPreviewImage(imageUrl);
}

// ✅ Clear preview when leaving hover (desktop only)
clearPreview(): void {
  if (!this.isMobile() && !this.awaitingConfirmation) {
    this.previewService.setPreviewImage(null);
  }
}
  // ✅ Toggle preview for mobile
  togglePreview(imageUrl: string): void {
    const currentImage = this.previewService.getCurrentImage();
    this.previewService.setPreviewImage(currentImage === imageUrl ? null : imageUrl);
  }

  // ✅ Check if the device is mobile
  isMobile(): boolean {
    return window.innerWidth <= 768;
  }
}