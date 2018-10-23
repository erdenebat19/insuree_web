import { Component, OnInit } from '@angular/core';
import { PentionService } from '../../shared/pention.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  tetsalary: any;
  errormassage: string;
  isloading: boolean;

  constructor(private route: Router, private service: PentionService) { }

  ngOnInit() {
    this.isloading = true;
    this.service.getSalary().subscribe(result => {
      this.isloading = false;
      console.log(result);
      this.tetsalary = result;
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
