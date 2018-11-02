import { Component, OnInit } from '@angular/core';
import { BenefitService } from '../../shared/benefit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent implements OnInit {
  isloading: boolean;
  benefit_list: any[];
  errormassage: string;

  constructor(private route: Router, private service: BenefitService) { }

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.isloading = true;
    this.service.get().subscribe(result => {
      this.isloading = false;
      this.benefit_list = result;
      console.log(this.benefit_list);
    }, error => {
      console.log(error);
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
