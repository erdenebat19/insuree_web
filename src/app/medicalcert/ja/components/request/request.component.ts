import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferenceService } from 'src/app/sd/shared/reference.service';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { UnemploymentService } from 'src/app/unemployment/shared/unemployment.service';
import { JaService } from '../../shared/ja.service';

@Component({
 selector: 'app-request',
 templateUrl: './request.component.html',
 styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
 medicalcert: string;
 isloading: boolean;
 people: any;
 AimagList: any;
 info: any;
 phone: string;
 email: string;
 Aimag: string;
 Bank: string;
 Account: string;
 error: boolean;
 errormessage: string;
 medicalcertaid: string;
 isAgreed: boolean = false;
 constructor(
  private srv: UnemploymentService,
  private ja: JaService,
  //   private account: AccountService,
  private refService: ReferenceService,
  private modalService: ModalService,
  private router: Router
 ) {}

 ngOnInit() {
  this.medicalcert = sessionStorage.getItem('medicalcert');
  this.medicalcertaid = sessionStorage.getItem('medicalcertaid');
  //   console.log(JSON.parse(localStorage.getItem('user')));
  this.isloading = true;
  this.srv.peopleInfo().subscribe((data) => {
   this.people = data;
   this.isloading = true;
   this.refService.AimagList().subscribe((aimags) => {
    // console.log('Aimag', this.AimagList);
    this.AimagList = aimags.filter((x) => x.id != '00' && x.id != '32' && x.id != '33');
    this.isloading = false;
   });
  });
  //   console.log(this.medicalcert);
  this.Aimag = this.medicalcertaid.substring(0, 2);
 }

 close() {
  this.modalService.close('messageModal');
 }
 btnOK() {
  this.router.navigate(['/main/view/medicalcert/ja']);
 }

 onSave() {
  this.info = {
   medCert: this.medicalcert,
   regID: this.people.regID,
   phone: this.phone.toString(),
   email: this.email,
   workMonth: 0,
   thinkPercent: 0,
   aid: this.Aimag,
   bankId: parseInt(this.Bank),
   bankAccount: this.Account.toString(),
   //    create_at: new Date(),
   tid: 2,
  };

  this.ja.medicalJAsave(this.info).subscribe(
   (data) => {
    this.error = false;
    this.errormessage = 'Хүсэлтийг хүлээн авлаа. Баярлалаа';
    this.modalService.open('messageModal');
   },
   (error) => {
    this.error = true;
    this.errormessage = error.toString();
    this.modalService.open('messageModal');
   }
  );
 }

 isAgree() {
  if (this.isAgreed) {
   this.isAgreed = false;
  } else {
   this.isAgreed = true;
  }
 }
}
