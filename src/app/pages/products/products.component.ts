import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { ProductModalComponent } from './product-modal/product-modal.component';
import { DeleteDialogComponent } from '../../components/shared/delete-dialog/delete-dialog.component';
import { SaleProductModalComponent } from './sale-product-modal/sale-product-modal.component';
import { Product } from '../../models/product';
import {
  AddProduct,
  DeleteProduct,
  EditProduct,
  GetProducts,
} from '../../store/products/products.actions';
import { ProductState } from '../../store/products/products.state';

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

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Select(ProductState.getProductSelector) getProductsOb$!: Observable<
    Product[]
  >;
  getProducts() {
    this.store.dispatch(new GetProducts());
    this.getProductsOb$.subscribe((res) => {
      const products = res;
      this.dataSource = new MatTableDataSource(products);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openProductDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '460px',
      height: '500px',
      data: {
        products: product,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const product: Product = {
          id: data.id || Math.floor(Math.random()),
          name: data.name,
          price: data.price,
          count: data.count,
        };
        let actObject = data.id
          ? new EditProduct(product)
          : new AddProduct(product);
        this.store.dispatch(actObject).subscribe(() => {
          this.getProducts();
        });
      }
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
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.store.dispatch(new DeleteProduct(element.id)).subscribe(() => {
          this.getProducts();
        });
      }
    });
  }

  public saleProduct(element: Product): void {
    const dialogRef = this.dialog.open(SaleProductModalComponent, {
      width: '450px',
      height: '550px',
      data: element,
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.getProducts();
      }
    });
  }
}
