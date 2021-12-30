import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/shared/account.service';
import { ReferenceService } from 'src/app/sd/shared/reference.service';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { UnemploymentService } from '../../shared/unemployment.service';

@Component({
 selector: 'app-request',
 templateUrl: './request.component.html',
 styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
 surname: string;
 fatname: string;
 people: any;
 workInfoEdit: boolean = false;
 isloading: boolean = false;
 workInfo: any;
 think_percent: number = 0;
 monthMore: boolean = false;
 infotext: string = 'харах';
 wyear: number = 0;
 wmonth: number = 0;
 AimagList: any;
 BankList: any;
 errormessage: string;
 error: boolean = false;
 ajilguildel: any;
 email: string;
 phone: string;
 Aimag: string;
 Bank: string;
 Account: string;
 dismissDate: any;
 finishDate: any;
 registerDate: any;
 finishBase64: string;
 dismissBase64: string;
 dismissFile: any;
 finishFile: any;
 imageData: any;
 imageData1: any;
 isAgreed: boolean = false;
 isAgreed1: boolean = false;
 isAgreed2: boolean = false;
 required: boolean = false;

 constructor(
  private srv: UnemploymentService,
  private account: AccountService,
  private refService: ReferenceService,
  private modalService: ModalService,
  private router: Router
 ) {}

 ngOnInit() {
  //   console.log(JSON.parse(localStorage.getItem('user')));
  const dd = new Date(localStorage.getItem('RegisterDate'));
  //   console.log(dd);

  this.registerDate = formatDate(dd, 'yyyy-MM-dd', 'en-US');

  this.isloading = true;
  this.srv.peopleInfo().subscribe((data) => {
   this.people = data;
   this.aimagIdConvert(this.people.aimagID, this.people.somID);
   //    console.log(this.people);
   this.isloading = false;
   this.isloading = true;
   this.srv.WorkMonth().subscribe((data) => {
    this.workInfo = data;
    this.isloading = false;
    this.percentage(this.workInfo.totalMonth);

    this.refService.AimagList().subscribe((aimags) => {
     //  console.log(this.AimagList);
     this.AimagList = aimags.filter((x) => x.id != '00' && x.id != '32' && x.id != '33');
    });

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

 percentage(totalMonth: number) {
  if (totalMonth < 60) {
   this.think_percent = 45;
  } else if (totalMonth >= 60 && totalMonth < 120) {
   this.think_percent = 50;
  } else if (totalMonth >= 120 && totalMonth < 180) {
   this.think_percent = 60;
  } else {
   this.think_percent = 70;
  }
 }

 Ok() {
  this.router.navigate(['/main/view/unemployment/dashboard']);
 }

 close() {
  this.modalService.close('messageModal');
 }

 onFile(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  //   if (file && allowedMimeTypes.includes(file.type)) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   this.dismissBase64 = reader.result as string;
  };
  //   reader.readAsDataURL(file);
  //   }
 }

 onFile1(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   this.finishBase64 = reader.result as string;
  };
 }

 hasValue() {
  if (!this.phone || !this.email || !this.Bank || !this.Account || !this.dismissDate || !this.dismissBase64) {
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
  //   if (!this.phone) {
  //    this.error = false;
  //    this.errormessage = 'Утсны дугаараа оруулна уу.';
  //    this.modalService.open('messageModal');
  //    required = true;
  //    return;
  //   }
  //   required = false;
  //   if (!this.email) {
  //    this.error = false;
  //    this.errormessage = 'И-Мэйл хаяг оруулна уу.';
  //    required = true;
  //    this.modalService.open('messageModal');

  //    return;
  //   }
  //   required = false;
  //   if (!this.Bank) {
  //    this.error = false;
  //    this.errormessage = 'Банк сонгоно уу.';
  //    required = true;
  //    this.modalService.open('messageModal');

  //    return;
  //   }
  //   required = false;
  //   if (!this.Account) {
  //    this.error = false;
  //    this.errormessage = 'Дансаа оруулна уу.';
  //    required = true;
  //    this.modalService.open('messageModal');
  //    return;
  //   }
  //   required = false;
  //   if (!this.dismissDate) {
  //    this.error = false;
  //    this.errormessage = 'Ажлаас чөлөөлөгдсөн огноо оруулна уу.';
  //    required = true;
  //    this.modalService.open('messageModal');
  //    return;
  //   }
  //   required = false;
  //   if (!this.dismissBase64) {
  //    this.error = false;
  //    this.errormessage = 'Ажлаас чөлөөлөгдсөн тушаалаа оруулна уу.';
  //    required = true;
  //    this.modalService.open('messageModal');
  //    return;
  //   }
  if (this.required) {
   const ajilguildel = {
    SurName: this.people.surName,
    FatName: this.people.fatName,
    BenName: this.people.benName,
    RegID: this.people.regID,
    Addr: this.people.address,
    Phone: this.phone.toString(),
    Email: this.email,
    WorkMonth: this.workInfo.totalMonth,
    ThinkPercent: this.think_percent,
    ThinkAid: Number(this.Aimag),
    BankId: Number(this.Bank),
    BankAccount: this.Account.toString(),
    HalagdsanOgnoo: this.dismissDate,
    HuleeltssenOgnoo: this.finishDate ? this.finishDate : '1899-01-01',
    BurtgesenOgnoo: this.registerDate,
    HalagdsanFile: this.dismissBase64 === undefined ? '' : this.dismissBase64,
    HuleeltssenFile: this.finishBase64 === undefined ? '' : this.finishBase64,
   };

   //   console.log(ajilguildel);
   this.srv.requestSave(ajilguildel).subscribe(
    (data) => {
     this.error = false;
     this.errormessage = 'Хүсэлт амжилттай илгээгдлээ.';
     this.modalService.open('messageModal');
     // }
    },
    (error) => {
     //  console.log(error);
     this.error = true;
     this.errormessage = error.toString();
     this.modalService.open('messageModal');
    }
   );
  }
 }

 //  numYear(n: number): Array<number> {
 //   return Array(n);
 //  }

 isAgree() {
  if (this.isAgreed2) {
   this.isAgreed2 = false;
   this.isAgreed = false;
  } else {
   this.isAgreed2 = true;
   if (this.isAgreed1) {
    this.isAgreed = true;
   }
  }
 }

 isAgree1() {
  if (this.isAgreed1) {
   this.isAgreed1 = false;
   this.isAgreed = false;
  } else {
   this.isAgreed1 = true;
   if (this.isAgreed2) {
    this.isAgreed = true;
   }
  }
 }

 aimagIdConvert(aimagId: string, somid: string) {
  if (aimagId === '65') {
   this.Aimag = '01';
  }
  if (aimagId === '83') {
   this.Aimag = '02';
  }
  if (aimagId === '64') {
   this.Aimag = '03';
  }
  if (aimagId === '63') {
   this.Aimag = '04';
  }
  if (aimagId === '82') {
   this.Aimag = '05';
  }
  if (aimagId === '44') {
   this.Aimag = '06';
  }
  if (aimagId === '21') {
   this.Aimag = '07';
  }
  if (aimagId === '48') {
   this.Aimag = '08';
  }
  if (aimagId === '81') {
   this.Aimag = '09';
  }
  if (aimagId === '62') {
   this.Aimag = '10';
  }
  if (aimagId === '46') {
   this.Aimag = '11';
  }
  if (aimagId === '22') {
   this.Aimag = '12';
  }
  if (aimagId === '43') {
   this.Aimag = '13';
  }
  if (aimagId === '41') {
   this.Aimag = '14';
  }
  if (aimagId === '85') {
   this.Aimag = '15';
  }
  if (aimagId === '84') {
   this.Aimag = '16';
  }
  if (aimagId === '67') {
   this.Aimag = '17';
  }
  if (aimagId === '23') {
   this.Aimag = '18';
  }
  if (aimagId === '45') {
   this.Aimag = '19';
  }
  if (aimagId === '61') {
   this.Aimag = '20';
  }
  if (aimagId === '42') {
   this.Aimag = '21';
  }
  if (aimagId === '11' && somid === '25') {
   this.Aimag = '23';
  }
  if (aimagId === '11' && somid === '16') {
   this.Aimag = '24';
  }
  if (aimagId === '11' && somid === '07') {
   this.Aimag = '25';
  }
  if (aimagId === '11' && somid === '12') {
   this.Aimag = '26';
  }
  if (aimagId === '11' && somid === '10') {
   this.Aimag = '27';
  }
  if (aimagId === '11' && somid === '19') {
   this.Aimag = '28';
  }
  if (aimagId === '11' && somid === '01') {
   this.Aimag = '29';
  }
  if (aimagId === '11' && somid === '13') {
   this.Aimag = '30';
  }
  if (aimagId === '11' && somid === '04') {
   this.Aimag = '31';
  }
 }
}
