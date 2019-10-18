import {Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

import {Book} from '../book.model';
import {BooksService} from './books.service';
import { ActiveTemplateService } from '../active-template.service';
import {SearchPipe} from '../../search.pipe';
import {FilterPipe} from '../../filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
  providers: [
    BooksService,
    ActiveTemplateService
  ]
})

export class BooksComponent implements OnInit {
  @Input() arrayBook: Book;

  // Input property
  @Input() term: string;
  @Input() array_of_books: any[] = [];
  // Gener

  public geners = [];
  public selectedGener;

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) {
  }

  // Component iniziallization
  ngOnInit() {
    this.selectedGener = 'All books';
    this.getBooks();
    this.getGeners();
  }
  getBooks() {
    this.bookService.getBooks().subscribe(data => this.array_of_books = data);
  }

  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }

  activatedSearchBlock() {
    this.activeTemplate.isActiveSearchBlock = !this.activeTemplate.isActiveSearchBlock;
  }

  // Output events
  onDeleteEvent(arrayBook) {
    const index = this.array_of_books.indexOf(arrayBook);
    if (index !== null || index !== undefined) {
      this.array_of_books = this.array_of_books.filter((book, i) => i !== index);
    }
    this.bookService.deleteBook(arrayBook).subscribe();
  }


  onEditEvent(arrayBook) {
    this.arrayBook = arrayBook;
    this.activeTemplate.isActiveChangeBlock = true;
  }
  activeCreateForm() {
    this.activeTemplate.isActiveCreateBlock = true;
  }
  onSubmitBook(event) {
    this.array_of_books.push(event);
  }
}
