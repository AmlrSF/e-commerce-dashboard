import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillboardService {
  private baseUrl = 'http://localhost:3000/api/v1/billboards';

  constructor(private http: HttpClient) { }

  getAllBillboards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getBillboardById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/billboard/${id}`);
  }

  createBillboard(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  updateBillboardById(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/billboard/${id}`, data);
  }

  deleteBillboardById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/billboard/${id}`);
  }

  deleteAllBillboards(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}`);
  }
}
