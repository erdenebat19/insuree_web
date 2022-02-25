import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/shared/account.service';
import { ReferenceService } from 'src/app/sd/shared/reference.service';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { UnemploymentService } from 'src/app/unemployment/shared/unemployment.service';
import { HchtaService } from '../../shared/hchta.service';

@Component({
 selector: 'app-request',
 templateUrl: './request.component.html',
 styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
 isloading: boolean;
 workInfo: any;
 people: any;
 AimagList: any;
 monthMore: any;
 infotext: string;
 workInfoEdit: boolean;
 error: boolean;
 errormessage: string;
 think_percent: number;
 info: any;
 medicalcert: string;
 phone: string;
 email: string;
 Aimag: string;
 Bank: string;
 Account: string;
 medicalcertaid: string;
 isAgreed: boolean = false;
 required: boolean = false;
 constructor(
  private srv: UnemploymentService,
  private hchta: HchtaService,
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
   this.srv.WorkMonth().subscribe((data) => {
    this.workInfo = data;
    // console.log('workInfo', data);
    this.isloading = false;
    this.isloading = true;
    this.refService.AimagList().subscribe((aimags) => {
     //  console.log('Aimag', this.AimagList);
     this.AimagList = aimags.filter((x) => x.id != '00' && x.id != '32' && x.id != '33');
     this.isloading = false;
    });

    this.percentage(this.workInfo.totalMonth);
    // console.log(this.medicalcertaid.substring(0, 2));

    this.Aimag = this.medicalcertaid.substring(0, 2);
    // if (this.workInfo.totalMonth < 60) {
    //  this.think_percent = 45;
    // } else if (this.workInfo.totalMonth >= 60 && this.workInfo.totalMonth < 120) {
    //  this.think_percent = 50;
    // } else if (this.workInfo.totalMonth >= 120 && this.workInfo.totalMonth < 180) {
    //  this.think_percent = 60;
    // } else {
    //  this.think_percent = 70;
    // }
   });
  });
 }
 percentage(totalMonth: any) {
  if (totalMonth < 60) {
   this.think_percent = 45;
  } else if (totalMonth >= 60 && totalMonth < 168) {
   this.think_percent = 55;
  } else {
   this.think_percent = 75;
  }
 }

 totalMonthMore() {
  if (this.monthMore) {
   this.infotext = 'харах';
   this.monthMore = false;
  } else {
   this.infotext = 'хаах';
   this.monthMore = true;
  }
 }

 otherWorkMonth() {
  this.workInfoEdit = false;
  this.error = true;
  this.errormessage =
   'Таны ажилласан жил болон тэтгэмж бодох хувь дээрхтэй таарахгүй бол. Нийгмийн даатгалын хэлтэст очин хүсэлтээ гаргана уу.';
  this.modalService.open('messageModal');
 }

 close() {
  this.modalService.close('messageModal');
 }

 btnOK() {
  this.router.navigate(['/main/view/medicalcert/hchta']);
 }

 hasValue() {
  if (!this.phone || !this.email || !this.Bank || !this.Account) {
   this.error = false;
   this.errormessage = 'Мэдээллээ бүрэн оруулна уу.';
   this.modalService.open('messageModal');
   console.log('false');
   return false;
  }
  return true;
 }

 onSave() {
  this.required = this.hasValue();

  if (this.required) {
   this.info = {
    medCert: this.medicalcert,
    regID: this.people.regID,
    phone: this.phone.toString(),
    email: this.email,
    workMonth: this.workInfo.totalMonth,
    thinkPercent: this.think_percent,
    aid: this.Aimag,
    bankId: parseInt(this.Bank),
    bankAccount: this.Account.toString(),
    //    create_at: new Date(),
    tid: 1,
   };

   //   console.log(this.info);

   this.hchta.medicalHChTAsave(this.info).subscribe(
    (data) => {
     this.error = false;
     this.errormessage = 'Хүсэлтийг хүлээн авлаа. Баярлалаа';
     this.modalService.open('messageModal');
     // this.router.navigate(['/main/view/medicalcert/hchta']);
    },
    (error) => {
     this.error = true;
     this.errormessage = error.toString();
     this.modalService.open('messageModal');
    }
   );
  }
 }

 isAgree() {
  if (this.isAgreed) {
   this.isAgreed = false;
  } else {
   this.isAgreed = true;
  }
 }
}
