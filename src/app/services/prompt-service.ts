import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts: string[] = [];
  private history: string[] = []; // Historial para undo
  private future: string[] = [];  // Historial para redo
  private promptsSubject = new BehaviorSubject<string[]>(this.prompts);

  prompts$ = this.promptsSubject.asObservable();

  addPrompt(prompt: string) {
    if (!this.prompts.includes(prompt)) {
      this.history.push(this.getFormattedPrompts().join('')); // Save current state before adding
      this.future = []; // Reset redo history

      this.prompts.push(prompt);
      this.promptsSubject.next(this.getFormattedPrompts());
    }
  }

  clearPrompts() {
    this.prompts = [];
    this.history = [];
    this.future = [];
    this.promptsSubject.next(this.prompts);
  }
  undo() {
    if (this.history.length > 0) {
      this.future.push(this.getFormattedPrompts().join('')); // Save current state for redo
      const previousState = this.history.pop();
      this.prompts = previousState ? previousState.split(', ').filter(p => p.trim() !== '') : [];
      this.promptsSubject.next(this.getFormattedPrompts());
    }
  }

  redo() {
    if (this.future.length > 0) {
      this.history.push(this.getFormattedPrompts().join('')); // Save current state for undo
      const nextState = this.future.pop();
      this.prompts = nextState ? nextState.split(', ').filter(p => p.trim() !== '') : [];
      this.promptsSubject.next(this.getFormattedPrompts());
    }
  }

  private getFormattedPrompts(): string[] {
    // Join with a comma and space, but remove trailing spaces
    return [this.prompts.join(', ').trim()];
  }
}
