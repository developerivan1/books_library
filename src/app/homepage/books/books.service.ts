import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from '../book';
import { Author } from "../author";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  // Urls for http
  private apiUrlBooks = 'api/books_array';
  private apiUrlAuthors = 'api/authors';
  private apiUrlGeners = 'api/geners';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrlBooks}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrlAuthors}`);
  }

  getGeners(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrlGeners}`);
  }

  
  deleteBook(array_book): Observable<{}> {
    return this.http.delete(this.apiUrlBooks)
  }
}