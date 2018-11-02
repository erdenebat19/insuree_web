import { Component, OnInit } from '@angular/core';
import { PentionAccountService } from '../../shared/pention-account.service';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isloading: boolean;
  ndans: any;
  errormassage: string;
  UldChart: Chart;
  ChartData: any[][];

  constructor(private route: Router, private service: PentionAccountService) { }

  ngOnInit() {
    this.NdansList();
  }

  NdansList() {
    this.isloading = true;
    this.service.get().subscribe(result => {
      this.isloading = false;
      this.ndans = result;
      this.ChartData = this.service.SplitData(this.ndans.duldList);
      this.UldChart = new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: ""
        },
        xAxis: {
          categories: this.ChartData[0],
          title: {
            text: "Он"
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: "Үлдэгдэл",
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            events: {
              click: function (event) {
                // console.log(event.point.id);
              }
            }
          }
        },
        series: [{
          name: "Үлдэгдэл",
          data: this.ChartData[1],
        }]
      });
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
