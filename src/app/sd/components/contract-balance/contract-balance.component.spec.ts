import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBalanceComponent } from './contract-balance.component';

describe('ContractBalanceComponent', () => {
  let component: ContractBalanceComponent;
  let fixture: ComponentFixture<ContractBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
