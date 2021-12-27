import { JaModule } from './ja.module';

describe('JaModule', () => {
  let jaModule: JaModule;

  beforeEach(() => {
    jaModule = new JaModule();
  });

  it('should create an instance', () => {
    expect(jaModule).toBeTruthy();
  });
});
