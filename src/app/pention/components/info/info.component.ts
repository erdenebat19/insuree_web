import { Component, OnInit } from '@angular/core';
import { PentionService } from '../../shared/pention.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  pentionInfo: any;
  errormassage: string;
  isloading: boolean;
  current_index: number;
  info: any;

  constructor(private route: Router, private service: PentionService) { }

  ngOnInit() {
    this.isloading = true;
    this.service.getInfo().subscribe(result => {
      this.isloading = false;
      this.pentionInfo = result;
      if (this.pentionInfo != undefined && this.pentionInfo.length > 0) {        
        this.getPage(0);
      }
    }, error => {
      if (error.status == 0) {
        this.route.navigate(['/error']);
      }
      else {
        this.errormassage = error.message;
      }
      this.isloading = false;
    });
  }
  getPage(index: number) {
    this.current_index = index;
    if (index > -1) {
      this.info = this.pentionInfo[index];
    }
  }
}
