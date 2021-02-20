import { Component, OnInit } from '@angular/core';
import { PentionService } from '../../shared/pention.service';
import { Router } from '@angular/router';
import { PentionStatementService } from '../../shared/pention-statement.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  pentionInfo: any;
  errormassage: string;
  isloading: boolean;
  current_index: number;
  info: any;
  statement_html: any;

  constructor(
    private route: Router,
    private service: PentionService,
    private serviceStatement: PentionStatementService
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.service.getInfo().subscribe(result => {
      this.isloading = false;
      this.pentionInfo = result;
      if (this.pentionInfo !== undefined && this.pentionInfo.length > 0) {
        this.getPage(0);
      }
    }, error => {
      if (error.status === 0) {
        this.route.navigate(['/error']);
      } else {
        this.errormassage = error.message;
      }
      this.isloading = false;
    });
    const user = JSON.parse(localStorage.getItem('user'));
    this.serviceStatement.Get(user.userID).subscribe(data => {
      this.statement_html = data;
      this.isloading = false;
    }, error => {
      this.errormassage = error;
      this.isloading = false;
    });
  }
  getPage(index: number) {
    this.current_index = index;
    if (index > -1) {
      this.info = this.pentionInfo[index];
    }
  }
  printStatement() {
    const printcontent = '<div style="position: relative;">' + this.statement_html + '</div>';
    const printPreview = window.open('_blank', 'print_preview');
    const printDocument = printPreview.document;
    printDocument.open();
    printDocument.write('<!doctype html>');
    printDocument.write('<html>');
    // tslint:disable-next-line: max-line-length
    printDocument.write('<head><link href="http://app.ndaatgal.mn/css/tet01.css" rel="stylesheet" type="text/css" /></head>');
    printDocument.write('<body onload="window.print();window.close();">');
    printDocument.write(printcontent);
    printDocument.write('</body>');
    printDocument.write('</html>');
    printDocument.close();
    printPreview.focus();
  }
}
