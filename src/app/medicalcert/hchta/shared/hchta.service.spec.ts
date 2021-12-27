import { TestBed } from '@angular/core/testing';

import { HchtaService } from './hchta.service';

describe('HchtaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HchtaService = TestBed.get(HchtaService);
    expect(service).toBeTruthy();
  });
});
