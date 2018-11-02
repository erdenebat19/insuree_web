import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionAccountListComponent } from './pention-account-list.component';

describe('PentionAccountListComponent', () => {
  let component: PentionAccountListComponent;
  let fixture: ComponentFixture<PentionAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PentionAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PentionAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
