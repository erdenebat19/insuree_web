import { TestBed } from '@angular/core/testing';

import { UnemploymentService } from './unemployment.service';

describe('UnemploymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnemploymentService = TestBed.get(UnemploymentService);
    expect(service).toBeTruthy();
  });
});
