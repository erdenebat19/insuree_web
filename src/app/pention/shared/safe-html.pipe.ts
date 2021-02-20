import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: any): any {
        console.log(this.sanitizer.bypassSecurityTrustHtml(value));
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
