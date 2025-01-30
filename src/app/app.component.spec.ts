import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { PromptAreaComponent } from './components/prompt-area/prompt-area.component';
import { MatButtonModule } from '@angular/material/button'; // Add any Material modules used
import { MatExpansionModule } from '@angular/material/expansion'; // For expansion panels

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // AppComponent as a standalone component
        ButtonListComponent, // ButtonListComponent as a standalone component
        PromptAreaComponent, // PromptAreaComponent as a standalone component
        MatButtonModule,
        MatExpansionModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'promptTool' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, promptTool');
  });
});
