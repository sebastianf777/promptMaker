import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private prompts: string[] = [];
  private promptsSubject = new BehaviorSubject<string[]>(this.prompts);

  prompts$ = this.promptsSubject.asObservable();

  addPrompt(prompt: string) {
    // Avoid adding duplicate prompts
    if (!this.prompts.includes(prompt)) {
      this.prompts.push(prompt);
    }

    this.promptsSubject.next(this.getFormattedPrompts());
  }

  clearPrompts() {
    this.prompts = [];
    this.promptsSubject.next(this.prompts);
  }

  private getFormattedPrompts(): string[] {
    // Join with a comma and space, but remove trailing spaces
    return [this.prompts.join(', ').trim()];
  }
}
