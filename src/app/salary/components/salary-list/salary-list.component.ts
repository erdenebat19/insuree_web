import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaryService } from '../../shared/salary.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import { InsureeService } from '../../shared/insuree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  byear: number;
  eyear: number;
  isvalid: boolean;
  salaries: any[];
  person: any;
  isloading = false;
  isFirstLoad = false;
  today: Date;
  errormassage: string;
  qrCode: any;
  qrCodeData: any;
  pages: number[];
  pagesize = 24;

  constructor(private route: Router, private _service: SalaryService, private _insureeService: InsureeService) { }

  ngOnInit() {
    this.isFirstLoad = true;
    this.byear = new Date().getFullYear() - 1;
    this.eyear = new Date().getFullYear();
    this.today = new Date();
  }

  getSalary() {
    this.isloading = true;
    this.salaries = undefined;
    this._insureeService.getPerson().subscribe(response => {
      this.isloading = false;
      this.person = response;
    }, error => {
      if (error.status === 0) {
        this.route.navigate(['/error']);
      } else {
        this.errormassage = error.message;
      }
      this.isloading = false;
    });
    this._service.getSalary(this.byear, this.eyear).subscribe(response => {
      this.qrCode = response.qrCode;
      this.qrCodeData = response.qrCodeData;
      this.isFirstLoad = false;
      this.isloading = false;
      const result = response;
      this.salaries = result.salaries;
      this.pages = this.SplitByPage(this.salaries, this.pagesize);
    }, error => {
      if (error.status === 0) {
        this.route.navigate(['/error']);
      } else {
        this.errormassage = error.message;
      }
      this.isloading = false;
    });
  }

  SplitByPage(data: any[], pagesize: number): any[] {
    const ipage = 0;
    let irow = 0;
    let lastindex = 0;
    const pages = [];
    for (let i = 0; i < data.length; i++) {
      if (irow >= pagesize) {
        lastindex = i;
        pages.push(data.slice(pages.length * pagesize, pagesize * (pages.length + 1)));
        irow = 0;
      }
      irow++;
    }
    if (lastindex < (data.length)) {
      pages.push(data.slice(lastindex, data.length));
    }
    return pages;
  }
  CalcPages(pagesize: number, rownum: number): number {
    let pagenum = rownum / pagesize;
    if (pagenum - Math.trunc(pagenum) > 0) {
      pagenum++;
    }
    return Math.trunc(pagenum);
  }
  printContent() {
    const restorepage = document.body.innerHTML;
    const restoreBYear = this.byear;
    const restoreEYear = this.eyear;
    const printcontent = document.getElementById('printArea').innerHTML;
    const printPreview = window.open('_blank', 'print_preview');
    const printDocument = printPreview.document;
    printDocument.open();
    printDocument.write("<!doctype html>");
    printDocument.write("<html>");
    printDocument.write("<head>" + document.head.innerHTML + "</head>");
    printDocument.write("<body onload='window.print();window.close();'>");
    printDocument.write(printcontent);
    printDocument.write("</body>");
    printDocument.write("</html>");
    printDocument.close();
    printPreview.focus();
  }
}
