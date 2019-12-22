import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRegisterPaymentComponent } from './contract-register-payment.component';

describe('ContractRegisterPaymentComponent', () => {
  let component: ContractRegisterPaymentComponent;
  let fixture: ComponentFixture<ContractRegisterPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRegisterPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRegisterPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
