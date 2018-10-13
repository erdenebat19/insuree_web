import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ComponentLoaderService } from '../../shared/component-loader.service';
import { InfoComponent } from '../info/info.component';
import { SalaryComponent } from '../salary/salary.component';
import { OlgoltComponent } from '../olgolt/olgolt.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  menus: any[] = [
    { id: 1, name: 'Тэтгэвэр авагчийн үндсэн мэдээлэл' },
    { id: 2, name: 'Тэтгэврийн түүх' },
    { id: 3, name: 'Тэтгэврийн олголт' },
    { id: 4, name: 'Тэтгэвэр тогтоолгосон цалин' },
  ]

  menu: number[] = [0, 1];

  @ViewChild('component1', { read: ViewContainerRef }) viewContainerRef1: ViewContainerRef;
  @ViewChild('component2', { read: ViewContainerRef }) viewContainerRef2: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.menu[0] = 0;
    this.menu[1] = 2;
    this.GetComponent(0, this.menu[0])
    this.GetComponent(1, this.menu[1])
  }

  selectMenu(menuindex: number, index: Components) {
    this.menu[menuindex] = index;
    this.GetComponent(menuindex, index);
  }

  GetComponent(dashindex: number, componentName: Components): any {
    console.log(componentName);
    var factory: any;
    switch (componentName) {
      case 0:
        factory = this.componentFactoryResolver.resolveComponentFactory(InfoComponent)
        break;
      case 1:
        factory = this.componentFactoryResolver.resolveComponentFactory(SalaryComponent)
        break;
      case 2:
        factory = this.componentFactoryResolver.resolveComponentFactory(OlgoltComponent)
        break;
      case 3:
        factory = this.componentFactoryResolver.resolveComponentFactory(HistoryComponent)
        break;
      default:
        factory = this.componentFactoryResolver.resolveComponentFactory(InfoComponent)

        break;
    }
    if (dashindex == 0) {
      this.viewContainerRef1.clear();
      const component = this.viewContainerRef1.createComponent(factory);
      component.changeDetectorRef.detectChanges();
    }
    if (dashindex == 1) {
      this.viewContainerRef2.clear();
      const component = this.viewContainerRef2.createComponent(factory);
      component.changeDetectorRef.detectChanges();
    }
  }

}
