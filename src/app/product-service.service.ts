import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs'; // Import throwError

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public postProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(productData));
  }

  public deleteAllProducts(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  public updateProductById(productId: string, productData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/product/${productId}`;
    return this.http.put(updateUrl, productData);
  }

  public deleteProductById(productId: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/product/${productId}`;
    return this.http.delete(deleteUrl);
  }

  public getProductById(productId: string): Observable<any> {
    const getUrl = `${this.apiUrl}/product/${productId}`;
    return this.http.get(getUrl);
  }

  private handleError(operation = 'operation', data: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed:`, error);
      return throwError(error);
    };
  }
}

