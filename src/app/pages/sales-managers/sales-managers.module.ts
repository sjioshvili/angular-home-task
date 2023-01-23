import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { SalesManagersRoutingModule } from './sales-managers-routing.module';
import { SalesManagersComponent } from './sales-managers.component';
import { NgxNumericRangeFormFieldModule } from 'ngx-numeric-range-form-field';
import { SaleManagerModalComponent } from './sales-manager-modal/sale-manager-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SalesManagersRoutingModule,
    AngularMaterialModule,
    NgxNumericRangeFormFieldModule,
  ],
  declarations: [SalesManagersComponent, SaleManagerModalComponent],
  exports: [SalesManagersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesManagersModule {}
