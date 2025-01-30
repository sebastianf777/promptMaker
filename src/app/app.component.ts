import { Component } from '@angular/core';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { PromptAreaComponent } from './components/prompt-area/prompt-area.component';
import { PreviewAreaComponent } from './components/preview-area/preview-area.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonListComponent, PromptAreaComponent, PreviewAreaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
