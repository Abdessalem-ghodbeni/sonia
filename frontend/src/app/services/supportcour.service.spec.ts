import { TestBed } from '@angular/core/testing';

import { SupportcourService } from './supportcour.service';

describe('SupportcourService', () => {
  let service: SupportcourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportcourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
