import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Observable } from 'rxjs';

import { Product } from '../models/product';
import { ProductSell } from '../models/productSell';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
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
    let prodByID: Product;
    this.getProductById(product.productId).subscribe((res: Product) => {
      prodByID = res;
      prodByID.count = prodByID.count - product.count;

      this.http
        .patch<Product>(
          `${this.baseUrl}/products/${product.productId}`,
          prodByID
        )
        .subscribe();
    });

    return this.http.post<ProductSell>(`${this.baseUrl}/sellHistory`, product);
  }
}
