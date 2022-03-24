import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/shared/account.service';
import { AlertService } from 'src/app/shared/shared/alert.service';
import { AlertComponent } from 'src/app/shared/ui/alert/alert.component';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { UnemploymentService } from '../../shared/unemployment.service';

@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 modal: boolean;
 infotitle: string;
 jobSecker: any;
 errormessage: string;
 error: boolean = false;
 btnRequest: boolean = false;
 isloading: boolean;
 loadingText: string = '';
 unemployment: any;
 people: any;
 printdata: any;
 bname: string;
 constructor(
  private srv: UnemploymentService,
  private account: AccountService,
  private alrt: AlertService,
  private modalService: ModalService,
  private router: Router
 ) {}

 ngOnInit() {
  //   this.account.getProfile().subscribe((data) => {
  //    console.log(data);
  //   });

  this.isloading = true;
  this.loadingText = '';
  this.srv.requestList().subscribe((data) => {
   //    console.log(data);
   this.unemployment = data;
   this.isloading = false;
  });
 }

 createRequest() {
  this.isloading = true;
  this.loadingText = 'Хөдөлмөр зохицуулалтын албанд бүртгүүлсэн эсэхийг шалгаж байна';
  this.btnRequest = true;
  this.srv.jobSeeker().subscribe(
   async (data) => {
    this.isloading = false;
    this.jobSecker = data.return;
    //    console.log(this.jobSecker);
    if (this.jobSecker.response != null) {
     // console.log(this.jobSecker.response);
     // this.router.navigate(['/main/view/unemployment/request']);
     if (this.jobSecker.response.lastUpdateDateSpecified === false) {
      this.error = true;
      this.errormessage = 'ХХҮЕГ-н хөдөлмөр зохицуулалтын албанд бүртгүүлээгүй байна. Бүртгүүлснээр энэ үйлчилгээг авах боломжтой. ';
      this.modalService.open('messageModal');
      this.btnRequest = false;
     } else {
      var date1: any = new Date(this.jobSecker.response.lastUpdateDate);
      var date2: any = new Date();
      var diffDays: any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

      //  console.log(diffDays);
      if (diffDays > 14) {
       this.error = true;
       this.errormessage = 'Хуулийн 14 хоногийн хугацаа хэтэрсэн байна. Хэрэв та “Хүндэтгэн үзэх шалтгаан”-тай бол НДХ-т биеэр хандана уу';
       this.modalService.open('messageModal');
      } else {
       localStorage.setItem('RegisterDate', this.jobSecker.response.lastUpdateDate);
       this.router.navigate(['/main/view/unemployment/request']);
      }
     }
    } else {
     this.error = true;
     this.errormessage = 'ХХҮЕГ-н хөдөлмөр зохицуулалтын албанд бүртгүүлээгүй байна. Бүртгүүлснээр энэ үйлчилгээг авах боломжтой.';
     this.modalService.open('messageModal');
     this.btnRequest = false;
    }
   },
   (error) => {
    this.error = true;
    this.errormessage = 'ХХҮЕГ-н хөдөлмөр зохицуулалтын албанд бүртгүүлсэн мэдээллийг шалгах явцад алдаа гарлаа.';
    this.modalService.open('messageModal');
    this.btnRequest = false;
   }
  );
 }

 close() {
  this.modalService.close('messageModal');
 }

 close1() {
  this.modalService.close('medicalModal');
 }

 showprint(medcert: any) {
  console.log(medcert);
  this.printdata = medcert;
  this.bankName(medcert.bankId);
  this.modalService.open('medicalModal');
 }

 print() {
  var restorepage = document.body.innerHTML;
  var printcontent = document.getElementById('printBody').innerHTML;
  var printPreview = window.open('_blank', 'print_preview');
  var printDocument = printPreview.document;
  printDocument.open();
  printDocument.write('<!doctype html>');
  printDocument.write('<html>');
  printDocument.write('<head>' + document.head.innerHTML + '</head>');
  printDocument.write("<body onload='window.print();window.close();'>");
  printDocument.write(printcontent);
  printDocument.write('</body>');
  printDocument.write('</html>');
  printDocument.close();
  printPreview.focus();
 }

 statusname(statusid: number): string {
  //   console.log(statusid);
  if (statusid === 0) {
   return 'Хүсэлт илгээсэн';
  }
  if (statusid === 1) {
   return 'Тэтгэмж бодсон';
  }
  if (statusid === 2) {
   return 'Хүсэлт буцаасан';
  }
 }

 bankName(bankid: string) {
  this.bname = '';
  //   console.log('bankid', bankid);
  if (bankid == '17') {
   this.bname = 'Хаан банк';
  }
  if (bankid == '14') {
   this.bname = 'Төрийн банк';
  }
  if (bankid == '04') {
   this.bname = 'Худалдаа хөгжлийн банк';
  }
  if (bankid == '05') {
   this.bname = 'Голомт банк';
  }
  if (bankid == '11') {
   this.bname = 'Капитрон банк';
  }
  if (bankid == '12') {
   this.bname = 'Хас банк';
  }
  if (bankid == '10') {
   this.bname = 'Үндэсний Хөрөнгө Оруулалтын банк';
  }
  if (bankid == '13') {
   this.bname = 'Чингис Хаан Банк';
  }
  if (bankid == '18') {
   this.bname = 'Богд банк';
  }
 }
}
