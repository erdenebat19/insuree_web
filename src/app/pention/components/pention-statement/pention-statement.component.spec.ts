import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionStatementComponent } from './pention-statement.component';

describe('PentionStatementComponent', () => {
  let component: PentionStatementComponent;
  let fixture: ComponentFixture<PentionStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentionStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentionStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
