import { TestBed } from '@angular/core/testing';

import { QuizformService } from './quizform.service';

describe('QuizformService', () => {
  let service: QuizformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
