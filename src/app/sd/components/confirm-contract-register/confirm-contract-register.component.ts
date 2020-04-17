import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../shared/contract.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/shared/error.service';

@Component({
  selector: 'app-confirm-contract-register',
  templateUrl: './confirm-contract-register.component.html',
  styleUrls: ['./confirm-contract-register.component.css'],
})
export class ConfirmContractRegisterComponent implements OnInit {
  contract: string;
  confirm_message: string;
  error_message: any;

  constructor(private service: ContractService, private router: Router, private errorService: ErrorService) {}

  ngOnInit() {
    this.contract = JSON.parse(localStorage.getItem('contract-register'));
  }
  register() {
    this.service.Register(this.contract).subscribe(
      (result) => {
        localStorage.setItem('contract-registered', JSON.stringify(result));
        localStorage.removeItem('contract-register');
        this.router.navigate(['/main/view/sd/register-payment']);
      },
      (error) => {
        this.error_message = this.errorService.getInlineError(error);
      }
    );
  }
}
