import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../shared/reference.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from '../../shared/contract.service';
import { ErrorService } from 'src/app/shared/shared/error.service';

@Component({
    selector: 'app-contract-register',
    templateUrl: './contract-register.component.html',
    styleUrls: ['./contract-register.component.css'],
})
export class ContractRegisterComponent implements OnInit {
    AMClasses: any[];
    contract: any;
    MaxSalary: any;
    MinSalary: any;
    postback = false;
    changedIncome = false;
    loading = false;
    errormessage: string;
    extend = false;
    Countries: any;
    AimagList: any[];
    SomList: any;
    dom: string;
    valid = false;
    constructor(
        private refService: ReferenceService,
        private router: Router,
        private route: ActivatedRoute,
        private contractService: ContractService,
        private errorService: ErrorService
    ) {}

    async ngOnInit() {
        this.contract = {
            Class: 0,
            Length: 12,
            ContractPeriod: 0,
            Account: 0,
        };
        this.contractService.Check().subscribe(async isValid => {
            this.valid = isValid;
            if (isValid) {
                this.loading = true;
                await this.LoadData().then(() => {
                    this.loading = false;
                });
                this.route.url.subscribe((url) => {
                    if (url[0].path === 'extend') {
                        this.extend = true;
                        this.contractService.Get().subscribe(
                            (result) => {
                                this.contract = {
                                    Id: result.id,
                                    Class: { id: result.class.id, name: result.class.name },
                                    Income: result.income,
                                    Length: Number.parseInt(result.length, 10),
                                    CountryId: result.countryId,
                                    AimagId: result.dom.substring(0, 2),
                                    SomId: result.dom.substring(2, 4)
                                };
                                if (!this.contract) {
                                    this.errormessage = 'Гэрээ бүртгэлгүй байна';
                                }
                            },
                            (err) => {
                                this.errormessage = this.errorService.getInlineError(err);
                            }
                        );
                    }
                });
            }
        }, err => {
            this.errormessage = this.errorService.getInlineError(err);
            if (!this.errormessage) {
                this.errormessage = err.message;
            }
        });
    }
    async LoadData() {
        this.contractService.GetDom().subscribe(dom => {
            console.log(dom);
            this.dom = dom;
            this.refService.CountryList().subscribe((result) => {
                this.Countries = result;
                this.contract.CountryId = '001';
                this.refService.AimagList().subscribe(aimags => {
                    this.AimagList = aimags;
                    this.AimagList = this.AimagList.filter(x =>
                        x.id >= '01' && x.id <= '22'
                    );
                    if (this.dom.toString().substring(0, 2) >= '23') {
                        this.contract.AimagId = '22';
                        this.onChangeAimag();
                    } else {
                        this.contract.AimagId = this.dom.toString().substring(0, 2);
                        this.onChangeAimag();
                    }
                });
            });
        }, err => {
            console.log(err);
            this.errormessage = this.errorService.getInlineError(err);
            if (!this.errormessage) {
                this.errormessage = err.message;
            }
        });
        this.refService.AMClassList().subscribe((result) => {
            this.AMClasses = result;
        });
        this.refService.GetMinSalary().subscribe((result) => {
            this.MinSalary = result;
        });
        this.refService.GetMaxSalary().subscribe((result) => {
            this.MaxSalary = result;
        });
    }
    onChangeContry() {
        if (this.contract.CountryId !== '001') {
            this.contract.AimagId = '22';
            this.contract.SomId = '26';
        }
    }
    onChangeAimag() {
        this.loading = true;
        if (this.contract.AimagId === '22') {
            this.refService.AimagList().subscribe(aimags => {
                this.SomList = aimags;
                this.SomList = this.SomList.filter(x =>
                    x.id >= '23' && x.id <= '31'
                );
                this.contract.SomId = this.dom.toString().substring(0, 2);
                this.loading = false;
            });
        } else {
            this.refService.SomList(this.contract.AimagId).subscribe(soms => {
                this.SomList = soms;
                this.contract.SomId = this.dom.toString().substring(2, 4);
                this.loading = false;
            });
        }
    }
    onChangeAMClass() {
        if (this.contract.Class.id === 12) {
            // tslint:disable-next-line: max-line-length
            this.errormessage = 'Хүүхдээ асарч буй сайн дураар даатгуулагч эхийн сайн дурын даатгалаа цахимаар төлөх, гэрээ байгуулах програмын өөрчлөлт хийгдэж байна. Уг үйлчилгээг одоогоор цахимаар авах боломжгүй тул та Нийгмийн даатгалын хэлтсээр  үйлчлүүлнэ үү. Уг үйлчилгээг цахимаар авах боломж бүрдэхээр танд мэдэгдэх болно.';
        }
    }
    register() {
        console.log(Number.parseFloat(this.contract.Income));
        this.contract.Class = { Id: this.contract.Class.id, Name: this.contract.Class.name };
        this.contract.Income = Number.parseFloat(this.contract.Income);
        this.contract.Length = Number.parseInt(this.contract.Length, 10);
        this.postback = true;
        if (this.validate()) {
            if (this.extend) {
                localStorage.setItem('contract-extend', JSON.stringify(this.contract));
            } else {
                localStorage.setItem('contract-register', JSON.stringify(this.contract));
            }
            this.router.navigate(['/main/view/sd/confirm']);
        }
    }
    onChangeIncome(newval) {
        if (this.contract.Income < this.MinSalary || this.contract.Income > this.MaxSalary) {
            this.changedIncome = true;
        } else {
            this.changedIncome = false;
        }
    }
    validate(): boolean {
        if (!this.contract.Class || this.contract.Class === 0) {
            return false;
        }
        if (!this.contract.Income || this.contract.Income < this.MinSalary || this.contract.Income > this.MaxSalary) {
            return false;
        }
        if (this.contract.Class.id === 12) {
            return false;
        }
        return true;
    }
    byId(item1: any, item2: any) {
        return item1.id === item2.id;
    }
    byCode(item1: any, item2: any) {
        return item1.code === item2.code;
    }
}
