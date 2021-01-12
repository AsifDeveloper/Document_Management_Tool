import { Injectable } from '@angular/core';
import { Document } from './document';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseURL = "http://localhost:4000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Documents
  getDocuments() {
    return this.http.get(this.baseURL)
  }

  // Create Document
  addDocument(name: string, tags: string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("tags", tags);
    formData.append("avatar", profileImage);

    return this.http.post<Document>(`${this.baseURL}/create-document`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}