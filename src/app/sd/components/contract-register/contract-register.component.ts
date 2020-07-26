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

    ngOnInit() {
        this.contract = {
            Class: 0,
            Length: 12,
            ContractPeriod: 0,
            Account: 0,
        };
        this.contractService.Check().subscribe(isValid => {
            this.valid = isValid;
            console.log(isValid);
            if (isValid) {
                this.LoadData().then(() => {
                    this.route.url.subscribe((url) => {
                        if (url[0].path === 'extend') {
                            this.extend = true;
                            this.contractService.Get().subscribe(
                                (result) => {
                                    this.contract = {
                                        Id: result.id,
                                        Class: { Id: result.class.id, Name: result.class.name },
                                        Income: result.income,
                                        Length: result.length,
                                        CountryId: result.countryId
                                    };
                                    if (!this.contract) {
                                        this.errormessage = 'Гэрээ бүртгэлгүй байна';
                                    }
                                },
                                (error) => {
                                    this.errormessage = this.errorService.getInlineError(error);
                                }
                            );
                        }
                    });
                });
            }
        }, error => {
            this.errormessage = this.errorService.getInlineError(error);
            if (!this.errormessage) {
                this.errormessage = error.message;
            }
        });
    }
    async LoadData() {
        this.loading = true;
        this.contractService.GetDom().subscribe(dom => {
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
                    }
                    this.loading = false;
                });
            });
        });
        this.loading = true;
        this.refService.AMClassList().subscribe((result) => {
            this.AMClasses = result;
            this.loading = false;
        });
        this.loading = true;
        this.refService.GetMinSalary().subscribe((result) => {
            this.MinSalary = result;
            this.loading = false;
        });
        this.refService.GetMaxSalary().subscribe((result) => {
            this.MaxSalary = result;
            this.loading = false;
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
    register() {
        this.contract.Class = { Id: this.contract.Class.id, Name: this.contract.Class.name };
        this.contract.Income = Number.parseFloat(this.contract.Income);
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
        if (!this.contract.Income || this.contract.Income < this.MinSalary || this.contract.Income > this.MinSalary) {
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
