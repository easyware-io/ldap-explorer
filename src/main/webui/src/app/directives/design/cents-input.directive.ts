import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[cents-input]',
})
export class TwoDecimalsDirective {
  constructor(
    private el: ElementRef,
    private ngModel: NgModel
  ) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    let rawValue = input.value.replace(/[^0-9]/g, ''); // Only digits

    // Default to 0 if empty
    if (!rawValue) {
      this.updateValue(0);
      return;
    }

    // Convert cents to decimal
    const cents = parseInt(rawValue, 10);
    const decimalValue = cents / 100;

    // Update input and model
    this.updateValue(decimalValue);
  }

  private updateValue(value: number): void {
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const input = this.el.nativeElement as HTMLInputElement;

    // Prevent cursor jump by checking if the value actually changed
    if (input.value !== formatted) {
      input.value = formatted;
    }

    this.ngModel.update.emit(value);
  }
}
