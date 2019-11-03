import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../app/homepage/author.model';
import { Book } from '../app/homepage/book.model';
import { Observable } from 'rxjs';

@Injectable()

export class BooksService {

  // Urls for http
  private apiUrlBooks = 'http://localhost:4200/api/booksArray';
  private apiUrlGeners = 'http://localhost:4200/api/geners';
  private apiUrlAuthors = 'http://localhost:4200/api/authors';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrlBooks}`);
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

  createGener(gener) {
    return this.http.post(`${this.apiUrlGeners}`, gener);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrlAuthors}`);
  }
  updateAuthor(author) {
    return this.http.put(`${this.apiUrlAuthors}/${author.id}`, author);
  }
  createAuthor(author) {
    return this.http.post(`${this.apiUrlAuthors}`, author);
  }

}
