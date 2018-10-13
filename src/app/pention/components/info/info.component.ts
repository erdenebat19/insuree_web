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

  constructor(private route: Router, private service: PentionService) { }

  ngOnInit() {
    this.service.getInfo().subscribe(result => {
      this.pentionInfo = result;
      console.log(this.pentionInfo);
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

}
