import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[design-lower-right-corner]',
})
export class DesignLowerRightCornerDirective {
  margin = input<number>(4);
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.applyClasses();
  }

  private applyClasses() {
    const classes = ['absolute', 'right-' + this.margin(), 'bottom-' + this.margin()];

    classes.forEach((cls) => {
      if (cls) this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
