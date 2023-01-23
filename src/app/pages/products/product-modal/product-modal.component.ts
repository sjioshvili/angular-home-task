import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  productForm!: FormGroup;

  public readonly reqErrorText: string = 'This field is required!';

  public readonly succsessText: string = 'Data Updated!';
  public showSuccessText: boolean = false;

  public errorText: string = 'Error!';
  public showErrorText: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  createForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
    });
  }

  initForm(): void {
    this.createForm();

    console.log('data', this.data);

    if (this.data?.products) {
      this.productForm.setValue({
        id: this.data.products.id,
        name: this.data.products.name,
        price: this.data.products.price,
        count: this.data.products.count,
      });
    }
  }

  onSave(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.productForm.get('id')?.value) {
      // this.taskService.updateTask(this.taskForm.value).subscribe(
      //   (res) => {
      //     this.showSuccessText = true;
      //   },
      //   (error) => {
      //     this.errorText = error.message;
      //     this.showErrorText = true;
      //   }
      // );
    } else {
      let id = Math.random();
      this.productForm.get('id')?.setValue(id);
      // this.taskService.createTask(this.taskForm.value).subscribe(
      //   (res) => {
      //     this.showSuccessText = true;
      //
      //     // setTimeout(() => {
      //     //   this.dialogRef.close();
      //     // }, 1000);
      //   },
      //   (error) => {
      //     this.errorText = error.message;
      //     this.showErrorText = true;
      //   }
      // );
    }
  }
}
