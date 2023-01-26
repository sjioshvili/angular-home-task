import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SellProduct } from '../../../store/products/products.actions';
import { ProductSell } from '../../../models/productSell';
import { AuthenticationService } from '../../../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { DateFormatService } from '../../../services/date-format.service';

@Component({
  selector: 'sale-product-modal',
  templateUrl: './sale-product-modal.component.html',
  styleUrls: ['./sale-product-modal.component.scss'],
})
export class SaleProductModalComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    count: new FormControl('', [
      Validators.required,
      Validators.max(this.data.count),
    ]),
    sellDate: new FormControl(new Date(), Validators.required),
  });

  errorText: string = '';

  constructor(
    public dialogRef: MatDialogRef<SaleProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private authService: AuthenticationService,
    private format: DateFormatService
  ) {
    this.productForm.get('name')?.setValue(data.name);
    this.productForm.get('price')?.setValue(data.price);
  }

  ngOnInit(): void {
    console.log('current date', this.format.date_TO_String(new Date()));
  }

  onSave(): void {
    console.log(
      'date',
      new Date(this.productForm.get('sellDate')?.value || ''),
      this.format.date_TO_String(
        new Date(this.productForm.get('sellDate')?.value || '')
      )
    );

    if (this.productForm.invalid) {
      return;
    }

    const productSell: ProductSell = {
      id: this.generateRandomInteger(1000),
      productId: this.data.id,
      name: this.data.name,
      price: this.data.price,
      count: Number(this.productForm.get('count')?.value),
      sellDate: this.format.date_TO_String(
        new Date(this.productForm.get('sellDate')?.value || '')
      ),

      managerId: this.authService.currentUserValue.id,
    };

    this.store
      .dispatch(new SellProduct(productSell))
      .pipe(catchError((err) => (this.errorText = err.name)))
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  generateRandomInteger(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
