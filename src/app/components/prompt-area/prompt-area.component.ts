import { Component } from '@angular/core';
import { PromptService } from '../../services/prompt-service';

@Component({
  selector: 'app-prompt-area',
  standalone: true,
  imports: [],
  templateUrl: './prompt-area.component.html',
  styleUrls: ['./prompt-area.component.css']
})
export class PromptAreaComponent {
  fullPrompt: string = '';
  buttonText: string = 'Copy Prompt'; // Default button text
  timeoutId: any; // To track the timeout

  constructor(private promptService: PromptService) {
    this.promptService.prompts$.subscribe((prompts: string[]) => {
      this.fullPrompt = prompts.join(' ');
    });
  }

  onPromptChange(event: Event): void {
    // Update `fullPrompt` when the textarea content changes
    const target = event.target as HTMLTextAreaElement;
    this.fullPrompt = target.value;
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.fullPrompt).then(() => {
      this.buttonText = 'Copied!'; // Temporarily change button text

      // Clear any previous timeout
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      // Revert button text after 2 seconds
      this.timeoutId = setTimeout(() => {
        this.buttonText = 'Copy Prompt';
      }, 2000);
    });
  }

  resetButtonText(): void {
    this.buttonText = 'Copy Prompt'; // Revert to default when clicking elsewhere
  }
}