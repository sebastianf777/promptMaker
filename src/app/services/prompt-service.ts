import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts: string = ''; // Store full prompt as a single string
  private history: string[] = []; // Undo history
  private future: string[] = []; // Redo history
  private promptsSubject = new BehaviorSubject<string>('');

  prompts$ = this.promptsSubject.asObservable();

  /** Adds a new prompt from dropdown selection */
  addPrompt(prompt: string) {
    this.saveToHistory();
    this.future = [];

    // Append new prompt to existing text
    this.prompts = this.prompts ? `${this.prompts}, ${prompt}` : prompt;
    this.promptsSubject.next(this.prompts);
  }

  /** Updates the entire prompt area manually */
  setPrompt(newPrompt: string) {
    this.saveToHistory();
    this.future = [];
    this.prompts = newPrompt.trim();
    this.promptsSubject.next(this.prompts);
  }

  /** Clears the entire prompt */
  clearPrompts() {
    this.saveToHistory();
    this.prompts = '';
    this.history = [];
    this.future = [];
    this.promptsSubject.next('');
  }

  /** Undo last action */
  undo() {
    if (this.history.length > 0) {
      this.future.push(this.prompts);
      this.prompts = this.history.pop() || '';
      this.promptsSubject.next(this.prompts);
    }
  }

  /** Redo last undone action */
  redo() {
    if (this.future.length > 0) {
      this.history.push(this.prompts);
      this.prompts = this.future.pop() || '';
      this.promptsSubject.next(this.prompts);
    }
  }

  /** Check if undo is possible */
  hasUndo(): boolean {
    return this.history.length > 0;
  }

  /** Check if redo is possible */
  hasRedo(): boolean {
    return this.future.length > 0;
  }

  /** Saves the current state before making changes */
  private saveToHistory() {
    this.history.push(this.prompts);
    if (this.history.length > 50) {
      this.history.shift(); // Prevent memory overflow by keeping a max history length
    }
  }
}
