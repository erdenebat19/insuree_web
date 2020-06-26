import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../shared/contract.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/notification/shared/message.service';
import { PaymentService } from '../../shared/payment.service';
import { ContactService } from '../../shared/contact.service';
import { ReferenceService } from '../../shared/reference.service';
import { ErrorService } from 'src/app/shared/shared/error.service';
import { Options } from 'ng5-slider';
import { ShareDataService } from 'src/app/shared/shared/share-data.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
    loading_message = false;
    loading_contract = false;
    loading_payment = false;
    message: string;
    contract: any;
    payment: any[];
    expanded = false;
    selectedPayment: any;
    lastPayment: any;
    transacs: any;
    contact: any;
    loading_contact: boolean;
    contract_moving_error_message: string;
    aimags: any;
    loading_transac: boolean;
    message_error_message: any;
    contract_error_message: string;
    amount: number;
    PayMonth: number;
    minPayMonth: number;
    monthNum = 12;
    options: Options;
    PayMonthNum: number;

    constructor(
        private contractService: ContractService,
        private messageService: MessageService,
        private paymentService: PaymentService,
        private contactService: ContactService,
        private referenceService: ReferenceService,
        private errorService: ErrorService,
        private shareDataService: ShareDataService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loading_message = true;
        this.messageService
            .GetLast()
            .subscribe(
                (result) => {
                    this.loading_message = false;
                    this.message = result;
                },
                (error) => {
                    this.message_error_message = this.errorService.getInlineError(error);
                }
            )
            .add(() => {
                this.loading_message = false;
            });
        this.loading_contract = true;
        this.contractService
            .Get()
            .subscribe(
                (result) => {
                    this.loading_contract = false;
                    this.contract = result;
                    this.contract.periodName =
                        this.contract.periodName === 'Month'
                            ? 'Сараар'
                            : this.contract.periodName === 'QuarterYear'
                            ? 'Улирлаар'
                            : 'Хагс жилээр';
                },
                (error) => {
                    this.contract_error_message = this.errorService.getInlineError(error);
                }
            )
            .add(() => {
                this.loading_contract = false;
            });
        this.loading_payment = true;
        this.paymentService
            .Get()
            .subscribe((result) => {
                this.loading_payment = false;
                this.payment = result;
                this.PayMonthNum = 1;
                this.payment.find((x) => x.status === 3).ischecked = true;
                this.minPayMonth = this.payment.find((x) => x.status === 3).calMonth;
                this.monthNum = this.payment.filter((x) => x.status === 3 || x.status === 0).length;
                this.options = {
                    ceil: this.monthNum,
                    floor: 1,
                    showSelectionBar: true,
                    showTicks: true,
                };
            })
            .add(() => {
                this.loading_payment = false;
            });
        this.loading_payment = true;
        this.paymentService
            .GetLastPayment()
            .subscribe((result) => {
                console.log(result);
                this.loading_payment = false;
                this.lastPayment = result;
                this.amount = this.lastPayment.payAmount;
            })
            .add(() => {
                this.loading_payment = false;
            });
        this.loading_contact = true;
        this.referenceService
            .AimagList()
            .subscribe((result) => {
                this.loading_contact = false;
                this.aimags = result;
                console.log(this.aimags);
            })
            .add(() => {
                this.loading_contact = false;
            });
        // FIXME complate get Contact
        this.contactService.Get().subscribe((contact) => {
            this.contact = contact;
            console.log(this.contact);
        });
    }

    selectPayment(item: any) {
        this.expanded = !this.expanded;
        this.selectedPayment = item;
        this.loading_transac = true;
        if (item.paid > 0) {
            this.paymentService.GetTransac(item.calYear, item.calMonth).subscribe(
                (result) => {
                    this.loading_transac = false;
                    this.transacs = result;
                },
                (error) => {
                    console.log(error);
                    this.loading_transac = false;
                }
            );
        } else {
            this.expanded = false;
        }
    }
    ContractMove() {
        this.contract_moving_error_message =
            // tslint:disable-next-line: max-line-length
            'Та тооцооны үлдэгдэлтэй байгаа тул таны гэрээг шилжүүлэх боломжгүй байна. Та тооцооны үлдэгдэлгүй болоод дараа шилжүүлэх боломжтой.';
    }
    pay() {
        let bdate: Date;
        let edate: Date;
        if (!this.payment || this.payment.length === 0) {
            bdate = this.contract.beginDate;
            edate = this.lastPayment.nextDate;
        } else {
            const checkedList = this.payment.filter((x) => x.ischecked);
            bdate = new Date(checkedList[0].calYear + '-' + checkedList[0].calMonth + '-' + '01');
            edate = new Date(
                checkedList[checkedList.length - 1].calYear +
                    '-' +
                    checkedList[checkedList.length - 1].calMonth +
                    '-' +
                    '01'
            );
        }
        this.shareDataService.SetPayment({
            BeginDate: bdate,
            EndDate: edate,
            Amount: this.lastPayment.amount,
            Class: {
                id: 1,
                name: 'Сайн дурын даатгал',
            },
            Description: 'Даатгалын гэрээний төлбөр',
        });
        this.router.navigate(['main/view/payment']);
    }
    ConvertToDate(year: number, month: number): Date {
        return new Date(year, month, 1);
    }
    calc(month) {
        this.lastPayment.payAmount = this.amount;
        this.lastPayment.amount = this.amount + this.lastPayment.ald;
        this.payment.forEach((i) => {
            i.ischecked = false;
        });
        const current = this.ConvertToDate(this.payment[0].calYear, month + this.minPayMonth - 1);
        this.payment
            .filter(
                (x) =>
                    this.ConvertToDate(x.calYear, x.calMonth) <= current &&
                    (x.status === 0 || x.status === 3)
            )
            .forEach((item) => {
                item.ischecked = true;
                this.lastPayment.calMonth = item.calMonth;
                if (item.status !== 3) {
                    this.lastPayment.payAmount = this.lastPayment.payAmount + item.payAmount;
                    this.lastPayment.amount = this.lastPayment.amount + item.amount;
                }
            });
    }
}
