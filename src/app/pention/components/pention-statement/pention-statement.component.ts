import { Component, OnInit } from '@angular/core';
import { PentionStatementService } from '../../shared/pention-statement.service';

@Component({
  selector: 'app-pention-statement',
  templateUrl: './pention-statement.component.html',
  styleUrls: ['./pention-statement.component.css']
})
export class PentionStatementComponent implements OnInit {
  loading: boolean;
  errormessage: any;
  statement_html: any;

  constructor(private service: PentionStatementService) { }

  ngOnInit() {
    this.errormessage = undefined;
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user'));
    this.service.Get(user.userID).subscribe(data => {
      this.statement_html = data;
      this.loading = false;
    }, error => {
      this.errormessage = error;
      this.loading = false;
    });
  }
  print() {
    const printcontent = this.statement_html;
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
