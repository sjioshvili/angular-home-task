import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductSell } from '../../../models/productSell';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../store/products/products.state';
import { Observable } from 'rxjs';
import { GetProducts } from '../../../store/products/products.actions';
import { ManagerState } from '../../../store/sale-managers/saleManagers.state';
import { GetSaleHistory } from '../../../store/sale-managers/saleManagers.action';
import { SaleManagerService } from '../../../services/sale-manager.service';

@Component({
  selector: 'sales-history-modal',
  templateUrl: './sale-history-modal.component.html',
  styleUrls: ['./sale-history-modal.component.scss'],
})
export class SaleHistoryModalComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'count', 'sellDate'];
  dataSource!: MatTableDataSource<ProductSell>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<SaleHistoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getSaleHistory();
  }

  @Select(ManagerState.saleHistorySelector) getSaleHistoryOb$!: Observable<
    ProductSell[]
  >;
  getSaleHistory() {
    this.store.dispatch(new GetSaleHistory(this.data.manager.id));
    this.getSaleHistoryOb$.subscribe((res) => {
      const history = res;
      this.dataSource = new MatTableDataSource(history);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
