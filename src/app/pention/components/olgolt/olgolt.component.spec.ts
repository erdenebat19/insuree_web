import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlgoltComponent } from './olgolt.component';

describe('OlgoltComponent', () => {
  let component: OlgoltComponent;
  let fixture: ComponentFixture<OlgoltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlgoltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlgoltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
