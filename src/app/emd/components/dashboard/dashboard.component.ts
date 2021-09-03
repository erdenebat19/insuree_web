import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/shared/error.service';
import { EmdService } from '../../shared/emd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  list: any;
  loading = false;
  errormessage: any;
  constructor(private emdService: EmdService, private errorService: ErrorService) { }

  ngOnInit() {
    this.loading = true;
    this.emdService.get().subscribe(list => {
      this.list = list;
      this.loading = false;
    }, error => {
      this.errormessage = this.errorService.getInlineError(error);
      if (!this.errormessage) {
          this.errormessage = error.message;
      }
      this.loading = false;
    });
  }

}
