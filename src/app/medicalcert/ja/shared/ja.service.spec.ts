import { TestBed } from '@angular/core/testing';

import { JaService } from './ja.service';

describe('JaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JaService = TestBed.get(JaService);
    expect(service).toBeTruthy();
  });
});
