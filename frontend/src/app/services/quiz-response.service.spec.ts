import { TestBed } from '@angular/core/testing';

import { QuizResponseService } from './quiz-response.service';

describe('QuizResponseService', () => {
  let service: QuizResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
