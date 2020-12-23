import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/message.service';
import { ModalService } from 'src/app/shared/ui/modal.service';
import { ErrorService } from 'src/app/shared/shared/error.service';
import { AlertService } from 'src/app/shared/shared/alert.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  p = 1;
  msgAll: any[];
  messages: any[];
  message: any;
  searchText: string;
  errormessage: string;

  constructor(
      private service: MessageService,
      private modalService: ModalService,
      private errorService: ErrorService,
      private alertService: AlertService,
    ) { }

  ngOnInit() {
    this.list();
  }
  list() {
    this.service.List().subscribe(result => {
      console.log(result);
      this.msgAll = result;
      this.messages = result;
    });
  }
  read(msg) {
    this.message = msg;
    this.modalService.open('messageModal');
    this.service.Read(msg.id).subscribe(() => {
      this.service.SetUnreadNum(this.service.GetUnreadNum() - 1);
      msg.status = 1;
    });
  }
  close() {
    this.modalService.close('messageModal');
  }
  search() {
    this.messages = this.msgAll.filter(x => x.message.toLowerCase().includes(this.searchText.toLowerCase()));
  }
  confirm(message) {
    this.service.Confirm(message).subscribe(result => {
      this.modalService.close('messageModal');
      this.list();
    }, error => {
      console.log(error);
      this.errormessage = this.errorService.getInlineError(error);
      if (!this.errormessage) {
        this.errormessage = error.message;
      }
    });
  }
}
