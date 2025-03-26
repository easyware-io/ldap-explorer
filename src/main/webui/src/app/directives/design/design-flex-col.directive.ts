import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[design-flex-col]',
})
export class DesignFlexColDirective {
  gap = input<number>(2);
  wrap = input<boolean>(true);
  fullWidth = input<boolean>(true);
  pushToRight = input<boolean>(false);
  pushToBottom = input<boolean>(false);
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.applyClasses();
  }

  private applyClasses() {
    const classes = ['flex', 'flex-col', 'gap-' + this.gap()];
    if (this.fullWidth()) classes.push('w-full');
    if (this.wrap()) classes.push('flex-wrap');
    if (this.pushToRight()) classes.push('justify-end');
    if (this.pushToBottom()) classes.push('items-end');

    classes.forEach((cls) => {
      if (cls) this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
