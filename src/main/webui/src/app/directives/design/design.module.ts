import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DesignFlexColDirective } from './design-flex-col.directive';
import { DesignFlexRowDirective } from './design-flex-row.directive';
import { DesignGridDirective } from './design-grid.directive';
import { DesignLowerRightCornerDirective } from './design-lower-right-corner.directive';
import { DesignTopRightCornerDirective } from './design-top-right-corner.directive';
import { TwoDecimalsDirective } from './cents-input.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    DesignFlexColDirective,
    DesignFlexRowDirective,
    DesignGridDirective,
    DesignLowerRightCornerDirective,
    DesignTopRightCornerDirective,
    TwoDecimalsDirective,
  ],
  exports: [
    FormsModule,
    DesignFlexColDirective,
    DesignFlexRowDirective,
    DesignGridDirective,
    DesignLowerRightCornerDirective,
    DesignTopRightCornerDirective,
    TwoDecimalsDirective,
  ],
})
export class DesignModule {}
