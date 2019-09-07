import { SdModule } from './sd.module';

describe('SdModule', () => {
  let sdModule: SdModule;

  beforeEach(() => {
    sdModule = new SdModule();
  });

  it('should create an instance', () => {
    expect(sdModule).toBeTruthy();
  });
});
