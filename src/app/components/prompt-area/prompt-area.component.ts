import { Component } from '@angular/core';
import { PromptService } from '../../services/prompt-service';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-prompt-area',
  standalone: true,
  imports: [CommonModule, MatIconModule], 
  templateUrl: './prompt-area.component.html',
  styleUrls: ['./prompt-area.component.scss']
})
export class PromptAreaComponent {
  fullPrompt: string = ''; // Stores the full prompt text
  copied: boolean = false;
  timeoutId: any;

  constructor(private promptService: PromptService, private clipboard: Clipboard) {
    this.promptService.prompts$.subscribe((prompt: string) => {
      this.fullPrompt = prompt; 
    });
  }

  /** Handles manual typing in the textarea */
  onPromptChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.fullPrompt = target.value;
    this.promptService.setPrompt(this.fullPrompt); // Store full text
  }

  /** Adds selected dropdown option to the prompt */
  addPrompt(prompt: string): void {
    this.promptService.addPrompt(prompt);
  }

  /** Copies the prompt to the clipboard */
  copyToClipboard(): void {
    this.clipboard.copy(this.fullPrompt);
    this.copied = true;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => { this.copied = false; }, 2000);
  }

  /** Undo last action */
  undo(): void {
    this.promptService.undo();
  }

  /** Redo last undone action */
  redo(): void {
    this.promptService.redo();
  }

  /** Clears the entire prompt */
  clearPrompt(): void {
    this.promptService.clearPrompts();
  }

  /** Check if undo is possible */
  get canUndo(): boolean {
    return this.promptService.hasUndo();
  }

  /** Check if redo is possible */
  get canRedo(): boolean {
    return this.promptService.hasRedo();
  }
}
