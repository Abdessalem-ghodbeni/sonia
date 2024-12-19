import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResponseComponent } from './quiz-response.component';

describe('QuizResponseComponent', () => {
  let component: QuizResponseComponent;
  let fixture: ComponentFixture<QuizResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
