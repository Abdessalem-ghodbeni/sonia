import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPropositionComponent } from './quiz-proposition.component';

describe('QuizPropositionComponent', () => {
  let component: QuizPropositionComponent;
  let fixture: ComponentFixture<QuizPropositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPropositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
