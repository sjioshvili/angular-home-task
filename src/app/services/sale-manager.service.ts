import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { filter, Observable } from 'rxjs';
import { SalesManager } from '../models/salesManager';
import { ProductSell } from '../models/productSell';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SaleManagerService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.apiUrl;

  public getAllManagers(): Observable<SalesManager[]> {
    return this.http.get<SalesManager[]>(`${this.baseUrl}/saleManagers`);
  }

  public getManagerById(id: number): Observable<SalesManager> {
    return this.http.get<SalesManager>(`${this.baseUrl}/saleManagers/${id}`);
  }

  public addManager(manager: SalesManager): Observable<SalesManager> {
    return this.http.post<SalesManager>(
      `${this.baseUrl}/saleManagers`,
      manager
    );
  }

  public editManager(manager: SalesManager): Observable<SalesManager> {
    return this.http.patch<SalesManager>(
      `${this.baseUrl}/products/${manager.id}`,
      manager
    );
  }

  public deleteManager(id: number): Observable<SalesManager> {
    return this.http.delete<SalesManager>(`${this.baseUrl}/saleManagers/${id}`);
  }

  public getSaleHistory(managerId: number): Observable<ProductSell[]> {
    return this.http
      .get<ProductSell[]>(`${this.baseUrl}/sellHistory`)
      .pipe(
        map((history: Array<ProductSell>) =>
          history.filter((item) => item.managerId == managerId)
        )
      );
  }

  public editManagerAmount(
    managerId: number,
    amount: number
  ): Observable<SalesManager> {
    console.log(managerId, amount);
    return this.http.patch<SalesManager>(
      `${this.baseUrl}/saleManagers/${managerId}`,
      { totalAmount: amount }
    );
  }
}
