import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[libLocationSelectCustomIcon]',
  exportAs: 'libLocationSelectCustomIcon',
})
export class LibLocationSelectCustomIconDirective {
  constructor(public elementRef: ElementRef) {} // Expose ElementRef
}
