import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PentionService } from '../../shared/pention.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any[];
  errormassage: string;
  isloading: boolean;
  info: any
  current_index: number;

  constructor(private route: Router, private service: PentionService) { }

  ngOnInit() {
    this.isloading = true;
    this.service.getInfo().subscribe(result => {
      console.log(result);
      this.isloading = false;
      this.history = result;
      if (this.history != undefined && this.history.length > 0) {        
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
      this.info = this.history[index];
    }
  }

}
