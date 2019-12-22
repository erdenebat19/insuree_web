import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertInlineComponent } from './alert-inline.component';

describe('AlertInlineComponent', () => {
  let component: AlertInlineComponent;
  let fixture: ComponentFixture<AlertInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
