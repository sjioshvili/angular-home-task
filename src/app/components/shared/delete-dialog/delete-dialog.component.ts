import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteModalData } from '../../../models/deleteModalData';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  conFirmTitle: string = '';

  conFirmText: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteModalData
  ) {}

  ngOnInit() {
    this.conFirmTitle = this.data.title || 'Delete task';
    this.conFirmText =
      this.data.text || 'Are you sure you want to delete this task?';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
