import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from '../book.model';
import { Author } from '../author.model';
import { Observable } from 'rxjs';

@Injectable()

export class BooksService {
  // Urls for http
  private apiUrlBooks = 'http://localhost:4200/api/booksArray';
  private apiUrlAuthors = 'http://localhost:4200/api/authors';
  private apiUrlGeners = 'http://localhost:4200/api/geners';

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

  deleteBook(arrayBook): Observable<{}> {
    return this.http.delete(`${this.apiUrlBooks}/${arrayBook.id}`);
  }
  updateBook(putBook) {
    return this.http.put( `${this.apiUrlBooks}/${putBook.id}`, putBook );
  }
  createBook(obj) {
    return this.http.post(`${this.apiUrlBooks}`, obj);
  }
}
