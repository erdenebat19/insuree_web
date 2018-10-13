import { PentionModule } from './pention.module';

describe('PentionModule', () => {
  let pentionModule: PentionModule;

  beforeEach(() => {
    pentionModule = new PentionModule();
  });

  it('should create an instance', () => {
    expect(pentionModule).toBeTruthy();
  });
});
