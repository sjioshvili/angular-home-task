import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { DeleteDialogComponent } from '../../components/shared/delete-dialog/delete-dialog.component';
import { SaleProductModalComponent } from './sale-product-modal/sale-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'count', 'actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  products: Product[] = [{ id: 1, name: 'product1', price: 30, count: 100 }];
  ELEMENT_DATA: Product[] = [
    { id: 2, name: 'product2', price: 330, count: 1020 },
  ];

  selectedProduct!: Product;

  constructor(public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    this.openDialog();
  }

  public openDialog(element?: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '460px',
      height: '380px',
      data: {
        products: element,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((response: boolean) => response))
      .subscribe(() => {
        // this.taskService.taskListUpdate.next(true);
      });
  }

  public deleteProduct(element: Product): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Product',
        text: `Are you sure you want to delete  Product ${element.name}?`,
      },
    });
    dialogRef
      .afterClosed()

      .subscribe(() => {
        // this.taskService.deleteTask(this.todo.id);
        // this.taskService.taskListUpdate.next(true);
      });
  }

  public saleProduct(element: Product): void {
    const dialogRef = this.dialog.open(SaleProductModalComponent, {
      width: '450px',
      height: '370px',
      data: element,
    });
    dialogRef
      .afterClosed()

      .subscribe(() => {
        // this.taskService.deleteTask(this.todo.id);
        // this.taskService.taskListUpdate.next(true);
      });
  }
}
