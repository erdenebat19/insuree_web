import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSwitchComponent } from './register-switch.component';

describe('RegisterSwitchComponent', () => {
  let component: RegisterSwitchComponent;
  let fixture: ComponentFixture<RegisterSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
