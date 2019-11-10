import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BooksService } from '../../../../services/books.service';

import { Book } from '../../book.model';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})

export class BookComponent {

  // Input property - current book
  @Input() book: Book;

  // Output properties
  @Output() ondelete = new EventEmitter<any>();
  @Output() onedit = new EventEmitter<any>();
  @Output() onsubmitChanges = new EventEmitter<any>();

  constructor(private bookService: BooksService) { }

  // Methods for deleting book
  delete(book: Book) {
    this.ondelete.emit(book);
  }

  // Method for editing book
  edit(book: Book) {
    this.onedit.emit(book);
  }

  // Submit changed book
  submitChanges(book: Book) {
    this.onsubmitChanges.emit(book);
  }
}
