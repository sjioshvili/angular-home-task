import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'sales-manager-modal',
  templateUrl: './sale-manager-modal.component.html',
  styleUrls: ['./sale-manager-modal.component.scss'],
})
export class SaleManagerModalComponent implements OnInit {
  productForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRep: new FormControl('', Validators.required),
  });

  public readonly reqErrorText: string = 'This field is required!';

  public readonly succsessText: string = 'Data Updated!';
  public showSuccessText: boolean = false;

  public errorText: string = 'Error!';
  public showErrorText: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SaleManagerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSave(): void {
    if (this.productForm.invalid) {
      return;
    }

    // this.taskService.updateTask(this.taskForm.value).subscribe(
    //   (res) => {
    //     this.showSuccessText = true;
    //   },
    //   (error) => {
    //     this.errorText = error.message;
    //     this.showErrorText = true;
    //   }
    // );
  }
}
