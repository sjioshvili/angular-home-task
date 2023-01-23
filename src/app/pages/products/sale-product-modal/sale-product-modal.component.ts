import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sale-product-modal',
  templateUrl: './sale-product-modal.component.html',
  styleUrls: ['./sale-product-modal.component.scss'],
})
export class SaleProductModalComponent implements OnInit {
  productForm!: FormGroup;

  public readonly reqErrorText: string = 'This field is required!';

  public readonly successText: string = 'Product sold successfully!';
  public showSuccessText: boolean = false;

  public errorText: string = 'Error!';
  public showErrorText: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SaleProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  createForm(): void {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      count: new FormControl('', Validators.required),
      saleDate: new FormControl('', Validators.required),
    });
  }

  initForm(): void {
    this.createForm();
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
