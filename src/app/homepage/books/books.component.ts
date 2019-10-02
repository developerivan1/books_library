import { Component, OnInit, Input } from '@angular/core';

import { BooksService } from './books.service';
import { Book } from "../book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})

export class BooksComponent implements OnInit {

  @Input() books = [];
  array_of_books = [];
  filter_for_books = [];

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.localStorageInitialize();
    this.completeArray();
    this.filter_for_books = this.array_of_books;
  }

  completeArray() {
    for (let i = 0; i < localStorage.length; i++) {
      const element = localStorage.getItem('book - ' + i);
      this.array_of_books.push(JSON.parse(element));
    }
  }

  onChange(event) {
    if (event === "All books") {
      this.filter_for_books = this.array_of_books;
    } 
    else {
      this.filter_for_books = this.array_of_books.filter(book => book.gener.includes(event));
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
    // this.filter_for_books = this.array_of_books.filter(book => book.title.toLowerCase().includes(this.searchingStr));
  }
}