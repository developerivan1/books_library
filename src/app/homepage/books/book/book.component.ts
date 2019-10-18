import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../books.service';
import { Book } from '../../book.model';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent {

  @Input() arrayBook: Book;
  @Output() ondelete = new EventEmitter<any>();
  @Output() onedit = new EventEmitter<any>();
  @Output() onsubmitChanges = new EventEmitter<any>();

  constructor(private bookService: BooksService) { }
  delete(arrayBook) {
    this.ondelete.emit(arrayBook);
  }
  edit(arrayBook) {
    this.onedit.emit(arrayBook);
  }
  submitChanges(arrayBook) {
    this.onsubmitChanges.emit(arrayBook);
  }
}
