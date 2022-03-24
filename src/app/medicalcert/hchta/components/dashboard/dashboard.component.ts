import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/shared/alert.service';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { UnemploymentService } from 'src/app/unemployment/shared/unemployment.service';
import { HchtaService } from '../../shared/hchta.service';
@Component({
 selector: 'app-dashboard',
 templateUrl: './dashboard.component.html',
 styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 isloading: boolean;
 list: any;
 people: any;
 printdata: any;
 constructor(
  private alrt: AlertService,
  private modalService: ModalService,
  private router: Router,
  private srv: HchtaService,
  private srv1: UnemploymentService
 ) {}

 errormessage: any;
 btnRequest: boolean;
 ngOnInit() {
  //   console.log(JSON.parse(localStorage.getItem('user')));
  this.isloading = true;
  this.srv.medicalHChTA().subscribe(
   (data) => {
    this.list = data;
    // console.log('list', data);
    this.isloading = false;
   },
   (error) => {
    console.log(error);
   }
  );
 }

 createRequest(medcert: any) {
  //   console.log(medcert);
  this.router.navigate(['/main/view/medicalcert/hchta/request']);
  sessionStorage.setItem('medicalcert', medcert.medicalCertNum);
  sessionStorage.setItem('medicalcertaid', medcert.aid);
 }
 close() {
  this.modalService.close('medicalModal');
 }

 showprint(medcert: any) {
  this.srv1.peopleInfo().subscribe((data) => {
   this.people = data;
   this.printdata = medcert;
   //    console.log(this.printdata);
   this.modalService.open('medicalModal');
  });
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
}
