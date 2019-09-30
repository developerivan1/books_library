import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BooksService } from "./books/books.service";
import { Book } from "./book";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {
  isActiveSearchBlock: boolean;
  selectedGener = this.bookService.geners[0];
  array_of_books = [];
  filter_for_books = [];
  searchingStr: string;
  booksNotFound: boolean = false

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.filter_for_books = this.array_of_books;
    this.isActiveSearchBlock = false;
    this.localStorageInitialize();
    this.completeArray();
  }
  activatedSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }
  onChange(event) {
    if (event === "All books") {
      this.filter_for_books = this.array_of_books;
    } 
    else {
      this.filter_for_books = this.array_of_books.filter(book => book.gener.includes(event));
    }
    if (this.isActiveSearchBlock === true) {
      this.isActiveSearchBlock = false;
    }
  }
  completeArray() {
    for (let i = 0; i < localStorage.length; i++) {
      const element = localStorage.getItem('book - ' + i);
      this.array_of_books.push(JSON.parse(element));
    }
  }
  localStorageInitialize() {
    if (localStorage.length == 0) {
      for (let i = 0; i < this.bookService.books_array.length; i++) {
        const element = this.bookService.books_array[i];
        localStorage.setItem('book - ' + i, JSON.stringify(element))
      }
    }
  }
  show(event: any) {
    this.filter_for_books = this.array_of_books.filter(book => book.title.toLowerCase().includes(this.searchingStr));
    if (this.searchingStr == '') {
      this.selectedGener = this.bookService.geners[0];      
    }
  }

}
