import { ElementRef } from '@angular/core';
import { LibLocationSelectCustomIconDirective } from './ui-lib-location-select-custom-icon.directive';

describe('CustomIconDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new LibLocationSelectCustomIconDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
