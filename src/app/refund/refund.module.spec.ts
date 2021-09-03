import { RefundModule } from './refund.module';

describe('RefundModule', () => {
  let refundModule: RefundModule;

  beforeEach(() => {
    refundModule = new RefundModule();
  });

  it('should create an instance', () => {
    expect(refundModule).toBeTruthy();
  });
});
