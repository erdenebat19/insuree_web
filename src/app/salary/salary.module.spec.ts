import { SalaryModule } from './salary.module';

describe('SalaryModule', () => {
  let salaryModule: SalaryModule;

  beforeEach(() => {
    salaryModule = new SalaryModule();
  });

  it('should create an instance', () => {
    expect(salaryModule).toBeTruthy();
  });
});
