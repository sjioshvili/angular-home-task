import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateFormatService } from '../../../services/date-format.service';

@Component({
  selector: 'sales-manager-modal',
  templateUrl: './sale-manager-modal.component.html',
  styleUrls: ['./sale-manager-modal.component.scss'],
})
export class SaleManagerModalComponent implements OnInit {
  managerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordRep: new FormControl('', Validators.required),
    regDate: new FormControl(this.format.date_TO_String(new Date())),
  });

  constructor(
    public dialogRef: MatDialogRef<SaleManagerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private format: DateFormatService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    if (this.data?.manager) {
      this.managerForm.setValue({
        userName: this.data.manager.userName,
        firstName: this.data.manager.firstName,
        lastName: this.data.manager.lastName,
        password: this.data.manager.password,
        passwordRep: this.data.manager.password,
        regDate: this.data.regDate,
      });
    }
  }

  onSave(): void {
    if (this.managerForm.invalid) {
      return;
    }

    this.dialogRef.close(this.managerForm.value);
  }
}
