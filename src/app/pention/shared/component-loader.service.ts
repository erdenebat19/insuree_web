import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { InfoComponent } from '../components/info/info.component';
import { SalaryComponent } from '../components/salary/salary.component';
import { OlgoltComponent } from '../components/olgolt/olgolt.component';
import { HistoryComponent } from '../components/history/history.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

}
