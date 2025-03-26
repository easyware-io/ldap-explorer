import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[design-grid]',
})
export class DesignGridDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.applyClasses();
  }

  private applyClasses() {
    const classes = ['grid', 'gap-4', 'grid-cols-1', 'md:grid-cols-2', 'xl:grid-cols-3', '2xl:grid-cols-4'];

    classes.forEach((cls) => {
      if (cls) this.renderer.addClass(this.el.nativeElement, cls);
    });
  }
}
