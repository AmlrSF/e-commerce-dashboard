import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private apiUrl = 'http://localhost:3000/api/v1/comments';

  constructor(private http: HttpClient) {}

  // Get all comments
  getComments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get all comments
  getCommentsByProducts(commentId: string): Observable<any[]> {
    const url = `${this.apiUrl}/product/${commentId}`;
    return this.http.get<any[]>(url);
  }

  
  // Get all comments
  getCommentsByCostumer(commentId: string): Observable<any[]> {
    const url = `${this.apiUrl}/costumer/${commentId}`;
    return this.http.get<any[]>(url);
  }

  // Get all comments
  getCommentsById(commentId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${commentId}`;
    return this.http.get<any[]>(url);
  }

  // Add a new comment
  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }

  // Delete a comment by ID
  deleteCommentById(commentId: string): Observable<any> {
    const url = `${this.apiUrl}/${commentId}`;
    return this.http.delete<any>(url);
  }

  // Update a comment by ID
  updateCommentById(commentId: string, updatedComment: any): Observable<any> {
    const url = `${this.apiUrl}/${commentId}`;
    return this.http.put<any>(url, updatedComment);
  }
}
