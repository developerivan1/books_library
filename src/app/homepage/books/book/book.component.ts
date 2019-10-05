import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BooksService } from "../books.service";
import { Book } from "../../book";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  all_books: Book[];

  @Input() array_book: Book;
  @Input() index_of_book: number;
  @Output() onChanges = new EventEmitter<any>();

  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }
  change(array_book) {
    this.onChanges.emit(array_book);
  }
}
