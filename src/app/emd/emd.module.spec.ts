import { EmdModule } from './emd.module';

describe('EmdModule', () => {
  let emdModule: EmdModule;

  beforeEach(() => {
    emdModule = new EmdModule();
  });

  it('should create an instance', () => {
    expect(emdModule).toBeTruthy();
  });
});
