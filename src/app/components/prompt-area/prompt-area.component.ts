import { Component } from '@angular/core';
import { PromptService } from '../../services/prompt-service';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prompt-area',
  standalone: true,
  imports: [CommonModule, MatIconModule], // Ensure MatIconModule is imported
  templateUrl: './prompt-area.component.html',
  styleUrls: ['./prompt-area.component.scss']
})
export class PromptAreaComponent {
  fullPrompt: string = '';
  copied: boolean = false; // Track if copied
  timeoutId: any; // Track timeout

  constructor(private promptService: PromptService, private clipboard: Clipboard) {
    this.promptService.prompts$.subscribe((prompts: string[]) => {
      this.fullPrompt = prompts.join('');
    });
  }

  onPromptChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.fullPrompt = target.value;
  }

  copyToClipboard(): void {
    this.clipboard.copy(this.fullPrompt);
    this.copied = true;

    // Clear any previous timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Revert text after 2 seconds
    this.timeoutId = setTimeout(() => {
      this.copied = false;
    }, 2000);
  }
  undo(): void {
    this.promptService.undo();
  }

  redo(): void {
    this.promptService.redo();
  }
  clearPrompt(): void {
    this.promptService.clearPrompts();
  }

  get canUndo(): boolean {
    return this.promptService['history'].length > 0;
  }

  get canRedo(): boolean {
    return this.promptService['future'].length > 0;
  }
}
