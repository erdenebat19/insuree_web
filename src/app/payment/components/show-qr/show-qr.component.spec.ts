import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQRComponent } from './show-qr.component';

describe('ShowQRComponent', () => {
  let component: ShowQRComponent;
  let fixture: ComponentFixture<ShowQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
