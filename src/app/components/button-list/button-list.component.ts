import { Component, ElementRef, HostListener } from '@angular/core';
import { PromptService } from '../../services/prompt-service';
import { CommonModule } from '@angular/common'; 
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-button-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './button-list.component.html',
  styleUrls: ['./button-list.component.scss']
})
export class ButtonListComponent {
  buttons = [
    { label: 'Camera Lens', prompts: ['Wide Angle', 'Telephoto', 'Macro', 'Fisheye'], show: false },
    { label: 'Lighting', prompts: ['Soft Light', 'Hard Light', 'Backlight', 'Natural Light'], show: false },
    { label: 'Style', prompts: ['Minimalist', 'Abstract', 'Retro', 'Modern'], show: false }
  ];

  constructor(private promptService: PromptService, private eRef: ElementRef) {}

  addToPrompt(prompt: string): void {
    this.promptService.addPrompt(prompt);
  }

  toggleDropdown(index: number): void {
    // Toggle the clicked dropdown and close others
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
}
