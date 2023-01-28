import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductSell } from '../models/productSell';
import { SaleManagerService } from './sale-manager.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private managerService: SaleManagerService
  ) {}
  private baseUrl = environment.apiUrl;

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  public editProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      `${this.baseUrl}/products/${product.id}`,
      product
    );
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/products/${id}`);
  }

  public sellProduct(product: ProductSell): Observable<ProductSell> {
    this.getProductById(product.productId).subscribe((res: Product) => {
      let count = res.count - product.count;
      this.http
        .patch<Product>(`${this.baseUrl}/products/${product.productId}`, {
          count: count,
        })
        .subscribe();

      let amount = product.count * product.price;
      this.managerService
        .editManagerAmount(product.managerId, amount)
        .subscribe();
    });

    return this.http.post<ProductSell>(`${this.baseUrl}/sellHistory`, product);
  }
}
