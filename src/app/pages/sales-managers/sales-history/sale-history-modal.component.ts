import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'sales-history-modal',
  templateUrl: './sale-history-modal.component.html',
  styleUrls: ['./sale-history-modal.component.scss'],
})
export class SaleHistoryModalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'count', 'sellDate'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products: Product[] = [
    {
      id: 1,
      name: 'product1',
      price: 30,
      count: 100,
      sellDate: new Date('01/01/2022  21:00'),
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<SaleHistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
