import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../shared/contract.service';

@Component({
    selector: 'app-contract-print',
    templateUrl: './contract-print.component.html',
    styleUrls: ['./contract-print.component.css'],
})
export class ContractPrintComponent implements OnInit {
    printFile: any;

    constructor(private contractService: ContractService) {}

    ngOnInit() {
        this.contractService.GetPrint().subscribe((printResult) => {
            console.log('print');
            this.printFile = printResult;
            this.printContent();
        });
    }
    printContent() {
        const restorepage = document.body.innerHTML;
        const printcontent = this.printFile;
        const printPreview = window.open('_blank', 'print_preview');
        const printDocument = printPreview.document;
        printDocument.open();
        printDocument.write('<!doctype html>');
        printDocument.write('<html>');
        printDocument.write('<head>' + document.head.innerHTML + '</head>');
        printDocument.write('<body onload="window.print();window.close();">');
        printDocument.write(printcontent);
        printDocument.write('</body>');
        printDocument.write('</html>');
        printDocument.close();
        printPreview.focus();
    }
}
