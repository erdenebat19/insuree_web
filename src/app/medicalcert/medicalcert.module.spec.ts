import { MedicalcertModule } from './medicalcert.module';

describe('MedicalcertModule', () => {
  let medicalcertModule: MedicalcertModule;

  beforeEach(() => {
    medicalcertModule = new MedicalcertModule();
  });

  it('should create an instance', () => {
    expect(medicalcertModule).toBeTruthy();
  });
});
