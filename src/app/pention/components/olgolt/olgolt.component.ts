import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PentionService } from '../../shared/pention.service';

@Component({
  selector: 'app-olgolt',
  templateUrl: './olgolt.component.html',
  styleUrls: ['./olgolt.component.css']
})
export class OlgoltComponent implements OnInit {
  olgoltList: any;
  errormassage: any;
  isloading: boolean;

  constructor(private route: Router, private service: PentionService) { }

  ngOnInit() {
    this.isloading = true;
    this.service.getOlgolt().subscribe(result => {
      this.isloading = false;
      this.olgoltList = result;
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
