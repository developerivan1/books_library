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
  @Output() onDelete = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onSubmitChanges = new EventEmitter<any>();

  constructor(private bookService: BooksService) { }
  delete(arrayBook) {
    this.onDelete.emit(arrayBook);
  }
  edit(arrayBook) {
    this.onEdit.emit(arrayBook);
  }
  submitChanges(arrayBook) {
    this.onSubmitChanges.emit(arrayBook);
  }
}
