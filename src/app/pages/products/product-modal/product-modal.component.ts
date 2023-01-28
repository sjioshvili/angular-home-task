import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LangService } from '../../../services/lang.service';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private langservice: LangService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setLangValidator();
  }

  initForm(): void {
    if (this.data?.products) {
      this.productForm.setValue({
        id: this.data.products.id,
        name: this.data.products.name,
        price: this.data.products.price,
        count: this.data.products.count,
      });
    }
  }

  setLangValidator() {
    // Tavidan megona rom interfeisis enis mixedviT unda dameseta validatori da mere mivxvdi enas ar aqvs mnishvneloba :d
    // let curLang = this.langservice.getCurLang();
    // let pattern = curLang === 'en' ? '([a-zA-Z]+)' : '(|[\u10D0-\u10F0]+)';
    let pattern = '([a-zA-Z]+|[\\\u10D0-\\\u10F0]+)';
    this.productForm.get('name')?.setValidators(Validators.pattern(pattern));
  }
  onSave(): void {
    if (this.productForm.invalid) {
      return;
    }
    this.dialogRef.close(this.productForm.value);
  }
}
