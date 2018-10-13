import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryListComponent } from './salary-list.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { InlineLoaderModule } from '../../../shared/ui/inline-loader/inline-loader.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('SalaryListComponent', () => {
  let component: SalaryListComponent;
  let fixture: ComponentFixture<SalaryListComponent>;
  const routes: Routes = [];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryListComponent],
      imports: [
        RouterModule.forRoot(routes),
        RecaptchaModule.forRoot(),
        FormsModule,
        InlineLoaderModule,
        HttpClientModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
  }));
  it('splite page in pagesize=24', () => {
    let data = [] = [];
    for (let i = 1; i < 150; i++) {
      data.push(i);
      const fixture = TestBed.createComponent(SalaryListComponent);
      component = fixture.componentInstance;
      let p1 = component.SplitByPage(data, 24).length;
      let p2 = component.CalcPages(24, data.length)
      if (p1 != p2) {
        console.log(component.SplitByPage(data, 24));
        console.log(component.CalcPages(24, data.length));
      }
      expect(p1).toEqual(p2);
    }
  });
  it('splite page in pagesize=24 verify data', () => {
    let data = [] = [];
    for (let i = 1; i < 150; i++) {
      data.push(i);
      const fixture = TestBed.createComponent(SalaryListComponent);
      component = fixture.componentInstance;
      let pages = component.SplitByPage(data, 24);
      let p2 = component.CalcPages(24, data.length)
      for (let j = 0; j < p2; j++) {

        var sd: any[];
        if (p2 > 1) {
          if (j == 0) {
            sd = data.slice(0, 24);
          }
          if (j > 0) {
            sd = data.slice(j * 24, 24);
          }
          if (j == p2 - 1) {
            sd = data.slice(j * 24, data.length);
          }
        }
        else {
          sd = data.slice(0, data.length);
        }
        expect(sd).toEqual(pages[j]);
      }
    }
  });
});
