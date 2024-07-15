import { TestBed } from '@angular/core/testing';

import { LaguageService } from './language.service';

describe('LaguageService', () => {
  let service: LaguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
