import { TestBed } from '@angular/core/testing';

import { PentionService } from './pention.service';

describe('PentionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PentionService = TestBed.get(PentionService);
    expect(service).toBeTruthy();
  });
});
