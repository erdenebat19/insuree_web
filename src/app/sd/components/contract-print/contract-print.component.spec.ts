import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPrintComponent } from './contract-print.component';

describe('ContractPrintComponent', () => {
  let component: ContractPrintComponent;
  let fixture: ComponentFixture<ContractPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
