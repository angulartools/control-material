import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutofocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  public constructor(private el: ElementRef) {
  }

  public ngAfterContentInit() {
    if (!this.appAutoFocus) {
      return;
    }
    setTimeout(() => {
          this.el.nativeElement.focus();
      }, 500);

  }
}
