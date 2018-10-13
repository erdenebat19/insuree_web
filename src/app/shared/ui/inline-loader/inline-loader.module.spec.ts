import { InlineLoaderModule } from './inline-loader.module';

describe('InlineLoaderModule', () => {
  let inlineLoaderModule: InlineLoaderModule;

  beforeEach(() => {
    inlineLoaderModule = new InlineLoaderModule();
  });

  it('should create an instance', () => {
    expect(inlineLoaderModule).toBeTruthy();
  });
});
