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
  selectedFormula: string | null = null; // Track the selected formula
  selectedFormulaLabel: string = 'Prompt Formulas'; // Default label

  buttons = [
    {
      label: 'Prompt Formulas',
      prompts: [
        { name: 'Simple Photo Realistic', image: 'assets/images/simple-photo-realistic.jpg' },
        { name: 'Photo Realistic', image: 'assets/images/photo-realistic.jpg' },
        { name: 'Character focused', image: 'assets/images/character-focused.jpg' }
      ],
      show: true, // Always visible
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
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
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
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
    },
    {
      label: 'Subject',
      prompts: [
        { name: 'A dog', image: 'assets/images/a-dog.jpg' },
        { name: 'A cat', image: 'assets/images/a-cat.jpg' },
        { name: 'A man', image: 'assets/images/a-man.jpg' },
        { name: 'A woman', image: 'assets/images/a-woman.jpg' },
        { name: 'Custom', image: 'assets/images/custom.jpg' }
      ],
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
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
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
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
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
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
      show: false,
      expanded: false   // ✅ Controla si el dropdown está abierto
    }
  ];

  private formulaVisibilityConfig: { [key: string]: { show: string[], hide?: string[] } } = {
    'Simple Photo Realistic': {
      show: ['Photo Styles', 'Subject', 'Camera Lens', 'Lighting'],
      hide: ['Shot Types', 'Photo Effects']
    },
    'Photo Realistic': {
      show: ['Shot Types', 'Photo Styles', 'Subject', 'Photo Effects', 'Camera Lens', 'Lighting'],
      hide: ['Photo Effects']
    },
    'Character focused': {
      show: ['Photo Styles', 'Lighting'],
      hide: ['Photo Effects', 'Shot Types']
    },
    // ✅ Add new formulas here
    'Landscape Focused': {
      show: ['Shot Types', 'Camera Lens'],
      hide: ['Photo Effects', 'Photo Styles', 'Lighting']
    }
  };


  updateButtonVisibility(): void {
    const config = this.formulaVisibilityConfig[this.selectedFormula!];
  
    this.buttons.forEach(button => {
      if (button.label !== 'Prompt Formulas') {
        button.show = config?.show.includes(button.label) || false;  // ✅ Mostrar solo los permitidos
        button.expanded = false; // ✅ Colapsar todos los dropdowns al actualizar
      }
    });
  }


  constructor(
    private promptService: PromptService,
    private previewService: PreviewService,
    private eRef: ElementRef
  ) { }

  // ✅ Handle click for mobile and desktop
  awaitingConfirmation: { name: string; image: string } | null = null;

  handleClick(prompt: { name: string; image: string }, buttonLabel: string): void {
    if (buttonLabel === 'Prompt Formulas') {
      this.selectedFormula = prompt.name;
      this.selectedFormulaLabel = prompt.name; // Update the header title
      this.updateButtonVisibility();
      this.closeAllDropdowns(); // ✅ Auto-collapse after formula selection
    } else {
      this.setPreview(prompt.image);
    }
    // ✅ Collapse the dropdown after selection
      // this.toggleDropdown(buttonLabel);

    if (this.isMobile()) {
      // If we're already awaiting confirmation for this prompt, do nothing
      if (this.awaitingConfirmation?.name === prompt.name) return;
      // Show preview and ask for confirmation
      this.awaitingConfirmation = prompt;
      this.setPreview(prompt.image);
    } else {
      this.addToPrompt(prompt.name);
      this.closeDropdown(buttonLabel);  // ✅ Close the dropdown after selection
    }
  }
  closeDropdown(label: string): void {
    const button = this.buttons.find(b => b.label === label);
    if (button) {
      button.expanded = false;  // ✅ Collapse the selected dropdown
    }
  }
  confirmAddPrompt(buttonLabel: string): void {
    if (this.awaitingConfirmation) {
      this.addToPrompt(this.awaitingConfirmation.name);
      this.awaitingConfirmation = null; // Clear confirmation
      this.previewService.setPreviewImage(null); // Optional: Clear preview after adding
      this.closeDropdown(buttonLabel);  // ✅ Close the dropdown after selection
    }
  }

  // cancelAddPrompt(): void {
  //   this.awaitingConfirmation = null; // Cancel confirmation
  //   this.previewService.setPreviewImage(null); // Optional: Clear preview on cancel
  // }

  addToPrompt(prompt: string): void {
    this.promptService.addPrompt(prompt);
    
  }

  toggleDropdown(label: string): void {
    this.buttons.forEach((button) => {
      if (button.label === label) {
        button.expanded = !button.expanded; // Toggle the clicked button
      } else {
        button.expanded = false; // Close all others
      }
    });
  }

  closeAllDropdowns(): void {
    this.buttons.forEach(button => button.expanded = false);
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