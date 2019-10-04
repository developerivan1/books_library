import { Component, OnInit, Input, Output } from '@angular/core';

import { Book } from "../book";
import { BooksService } from './books.service';
import { SearchPipe } from "../../search.pipe";
import { FilterPipe } from "../../filter.pipe";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})

export class BooksComponent implements OnInit {

  isActiveSearchBlock: boolean;
  selectedGener = this.bookService.geners[0];

  @Input() term: string;
  @Input() array_of_books = [];

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.localStorageInitialize();
    this.completeArray();
    this.isActiveSearchBlock = false;
  }

  activatedSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }
  
  localStorageInitialize() {
    if (localStorage.length == 0) {
      for (let i = 0; i < this.bookService.books_array.length; i++) {
        const element = this.bookService.books_array[i];
        localStorage.setItem('book - ' + i, JSON.stringify(element))
      }
    }
  }

  completeArray() {
    for (let i = 0; i < localStorage.length; i++) {
      const element = localStorage.getItem('book - ' + i);
      this.array_of_books.push(JSON.parse(element));
    }
  }

  onChangeEvent(index_of_book) {
    this.bookService.books_array.splice(index_of_book, 1);
    localStorage.clear();
    this.array_of_books = [];
    this.localStorageInitialize();
    this.completeArray();
  }

}