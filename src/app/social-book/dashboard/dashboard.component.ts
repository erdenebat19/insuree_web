import { Component, OnInit } from '@angular/core';
import { SocialBookService } from '../shared/social-book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  book_html: string;
  loading = false;
  errormessage: any;
  constructor(
    private service: SocialBookService
  ) { }

  ngOnInit() {
    this.errormessage = undefined;
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user'));
    // ЮД72100576 user.userID
    this.service.Get(user.userID).subscribe(data => {
      // console.log(data);
      console.log(user);
      this.book_html = data;
      this.loading = false;
    }, error => {
      this.errormessage = error;
      this.loading = false;
    });
  }
  print() {
    const printcontent = this.book_html;
    const printPreview = window.open('_blank', 'print_preview');
    const printDocument = printPreview.document;
    console.log(document.head.innerHTML);
    printDocument.open();
    printDocument.write('<!doctype html>');
    printDocument.write('<html>');
    // tslint:disable-next-line: max-line-length
    printDocument.write('<head><link href="https://www.ndaatgal.mn/v1/css/bootstrap.css" rel="stylesheet" type="text/css"><link href="https://www.ndaatgal.mn/v1/css/electronnote.css" rel="stylesheet" type="text/css"></head>');
    printDocument.write('<body onload="window.print();window.close();">');
    printDocument.write(printcontent);
    printDocument.write('</body>');
    printDocument.write('</html>');
    printDocument.close();
    printPreview.focus();
  }
}
