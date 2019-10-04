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
  @Output() onChanges = new EventEmitter<any>();
  @Input() array_book: Book;
  all_books: Book[];
  @Input() index_of_book: number;
  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }
  change(index_of_book) {
    console.log(index_of_book);
    this.onChanges.emit(index_of_book);
  }
}
