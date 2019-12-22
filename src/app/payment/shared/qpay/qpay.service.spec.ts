import { TestBed } from '@angular/core/testing';

import { QpayService } from './qpay.service';

describe('QpayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QpayService = TestBed.get(QpayService);
    expect(service).toBeTruthy();
  });
});
