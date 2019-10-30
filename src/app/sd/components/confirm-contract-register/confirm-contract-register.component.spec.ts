import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmContractRegisterComponent } from './confirm-contract-register.component';

describe('ConfirmContractRegisterComponent', () => {
  let component: ConfirmContractRegisterComponent;
  let fixture: ComponentFixture<ConfirmContractRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmContractRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmContractRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
