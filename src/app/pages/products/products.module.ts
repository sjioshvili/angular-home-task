import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { AngularMaterialModule } from '../../angular-material.module';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { SaleProductModalComponent } from './sale-product-modal/sale-product-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [
    ProductsComponent,
    ProductModalComponent,
    SaleProductModalComponent,
  ],
  exports: [ProductsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
