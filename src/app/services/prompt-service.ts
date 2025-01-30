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
    this.prompts.push(prompt);
    this.promptsSubject.next(this.prompts);
  }

  clearPrompts() {
    this.prompts = [];
    this.promptsSubject.next(this.prompts);
  }
}
