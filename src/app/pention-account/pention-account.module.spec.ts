import { PentionAccountModule } from './pention-account.module';

describe('PentionAccountModule', () => {
  let pentionAccountModule: PentionAccountModule;

  beforeEach(() => {
    pentionAccountModule = new PentionAccountModule();
  });

  it('should create an instance', () => {
    expect(pentionAccountModule).toBeTruthy();
  });
});
