import { TestBed } from '@angular/core/testing';

import { QuizPropositionService } from './quiz-proposition.service';

describe('QuizPropositionService', () => {
  let service: QuizPropositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizPropositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
