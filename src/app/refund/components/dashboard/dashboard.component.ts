import { Component, OnInit } from '@angular/core';
import { RefundService } from '../../shared/refund.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  refund: any;
  refundGroup: any[] = [];
  constructor(private refundService: RefundService) { }

  ngOnInit() {
    this.refundService.get().subscribe(refund => {
      this.refund = refund;
      refund.forEach(item => {
        if (item.calMonth1 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth1);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth1,
              num: 1
            });
          }
        }
        if (item.calMonth2 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth2);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth2,
              num: 1
            });
          }
        }
        if (item.calMonth3 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth3);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth3,
              num: 1
            });
          }
        }
        if (item.calMonth4 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth4);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth4,
              num: 1
            });
          }
        }
        if (item.calMonth5 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth5);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth5,
              num: 1
            });
          }
        }
        if (item.calMonth6 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth6);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth6,
              num: 1
            });
          }
        }
        if (item.calMonth7 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth7);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth7,
              num: 1
            });
          }
        }
        if (item.calMonth8 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth8);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth8,
              num: 1
            });
          }
        }
        if (item.calMonth9 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth9);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth9,
              num: 1
            });
          }
        }
        if (item.calMonth10 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth10);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth10,
              num: 1
            });
          }
        }
        if (item.calMonth11 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth11);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth11,
              num: 1
            });
          }
        }
        if (item.calMonth12 !== 0) {
          const iresult = this.refundGroup.find(x => x.id === item.calMonth12);
          if (iresult) {
            iresult.num = iresult.num + 1;
          } else {
            this.refundGroup.push({
              id: item.calMonth12,
              num: 1
            });
          }
        }
      });
      this.refundGroup = this.refundGroup.sort((a, b) => a.id - b.id);
      let total = 0;
      this.refundGroup.forEach(item => {
        total = total + item.num;
      });
      this.refundGroup.push({
        id: 0,
        num: total
      });
    });
  }
}
