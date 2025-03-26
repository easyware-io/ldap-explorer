import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[design-top-right-corner]',
})
export class DesignTopRightCornerDirective {
  margin = input<number>(4);
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.applyClasses();
  }

  private applyClasses() {
    const classes = ['fixed', 'right-' + this.margin(), 'top-' + this.margin(), '-mt-16'];

    classes.forEach((cls) => {
      if (cls) this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
