import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRegisterComponent } from './contract-register.component';

describe('ContractRegisterComponent', () => {
  let component: ContractRegisterComponent;
  let fixture: ComponentFixture<ContractRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
