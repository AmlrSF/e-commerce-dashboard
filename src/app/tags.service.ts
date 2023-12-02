import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private baseUrl = 'http://localhost:3000/api/v1/tags';

  constructor(private http: HttpClient) { }

  getAllTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getTagById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createTag(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  updateTagById(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteTagById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  deleteAllTags(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}`);
  }
}
