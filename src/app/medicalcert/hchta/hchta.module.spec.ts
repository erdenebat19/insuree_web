import { HchtaModule } from './hchta.module';

describe('HchtaModule', () => {
  let hchtaModule: HchtaModule;

  beforeEach(() => {
    hchtaModule = new HchtaModule();
  });

  it('should create an instance', () => {
    expect(hchtaModule).toBeTruthy();
  });
});
