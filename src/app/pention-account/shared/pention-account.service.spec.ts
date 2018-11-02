import { TestBed } from '@angular/core/testing';

import { PentionAccountService } from './pention-account.service';

describe('PentionAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PentionAccountService = TestBed.get(PentionAccountService);
    expect(service).toBeTruthy();
  });
});
