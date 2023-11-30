import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostumersService {

  private apiUrl = 'http://localhost:3000/api/v1/customers/';

  constructor(private http: HttpClient) { }

  public getCostumer(): Observable<any> {
    return this.http.get(this.apiUrl);
    
  }
  
  public getCostumerByID(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
    
  }

  public deleteCostumerById(id:string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
    
  }

}
