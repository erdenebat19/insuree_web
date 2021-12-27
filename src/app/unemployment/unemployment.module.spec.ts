import { UnemploymentModule } from './unemployment.module';

describe('UnemploymentModule', () => {
  let unemploymentModule: UnemploymentModule;

  beforeEach(() => {
    unemploymentModule = new UnemploymentModule();
  });

  it('should create an instance', () => {
    expect(unemploymentModule).toBeTruthy();
  });
});
