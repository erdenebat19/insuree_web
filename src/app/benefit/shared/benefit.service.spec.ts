import { TestBed } from '@angular/core/testing';

import { BenefitService } from './benefit.service';

describe('BenefitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenefitService = TestBed.get(BenefitService);
    expect(service).toBeTruthy();
  });
});
