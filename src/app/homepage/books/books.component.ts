import { Component, OnInit, OnDestroy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Book } from '../book.model';

import { BooksService } from '../../../services/books.service';
import { ActiveTemplateService } from '../../../services/active-template.service';

import { SearchPipe } from '../../pipes/search.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';

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

  @Input() book: Book;
  // Input property

  // Two-way binding property for filter books
  @Input() term: string;

  // List of all books
  @Input() array_of_books: Book[] = [];

  // List of geners
  public geners = [];
  // Selected gener detection
  public selectedGener;

  // Proprty for display Create new book block
  public isActiveCreateBlock: boolean;

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) {
                activeTemplate.isA.subscribe( bool => {
                  this.isActiveCreateBlock = bool;
                });
              }

  ngOnInit() {
    this.selectedGener = 'All books';
    this.getBooks();
    this.getGeners();

  }

  // Method for getting a list of all books
  getBooks() {
    this.bookService.getBooks().subscribe(data => this.array_of_books = data);
  }

  // Methos for getting a list of all geners
  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }

  // Toggle search btn
  activatedSearchBlock() {
    this.activeTemplate.isActiveSearchBlock = !this.activeTemplate.isActiveSearchBlock;
  }

  // Output events

  // Deleting book
  onDeleteEvent(book: Book) {
    const index = this.array_of_books.indexOf(book);
    if (index !== null || index !== undefined) {
      this.array_of_books = this.array_of_books.filter((book, i) => i !== index);
    }
    this.bookService.deleteBook(book).subscribe();
  }

  // Editing book
  onEditEvent(book: Book) {
    this.book = book;
    this.activeTemplate.isActiveChangeBlock = true;
  }

  // Adding new book to a list of all books
  onSubmitBook(book: Book) {
    this.array_of_books.push(book);
  }

  onSubmitCreateEvent(event) {
    console.log(event);
  }

  onCreate() {
    this.activeTemplate.setBoolCreateBlock(true);
  }
}

