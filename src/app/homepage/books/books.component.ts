import { Component, OnInit, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForm } from "@angular/forms";

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

  // Edit froms property
  title_book_for_edit: string;
  numberOfPages_for_edit: number
  gener_for_edit: string;
  book_for_change = {title: '', numberOfPages: 0, gener: ''};

  // Active property for template
  isActiveChangeBlock: boolean;
  isActiveSearchBlock: boolean;

  // Input property
  @Input() term: string;
  @Input() array_of_books = [];


  // Gener
  public geners = [];
  public selectedGener;

  constructor(private bookService: BooksService) { }

  // Component iniziallization
  ngOnInit() {
    this.isActiveSearchBlock = false;
    this.isActiveChangeBlock = false;
    this.selectedGener = 'All books';
    this.bookService.getBooks().subscribe(data => this.array_of_books = data);
    this.bookService.getGeners().subscribe(data => this.geners = data);
    
  }

  activatedSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }
  

  // Output events  
  onChangeEvent(array_book) {
      // for (let i = 0; i < this.bookService.books_array.length; i++) {
      //   const element = this.bookService.books_array[i];
      //   if (array_book.title === element.title) {
      //     this.bookService.books_array.splice(i, 1);
      //     localStorage.clear();
      //     this.array_of_books = [];
      //   }
      // }
      console.log(array_book);
      
    }

    onEditEvent(array_book) {
      this.isActiveChangeBlock = true;
      this.title_book_for_edit = array_book.title;
      this.numberOfPages_for_edit = array_book.numberOfPages;
      this.gener_for_edit = array_book.gener;
      this.book_for_change.title = array_book.title;
      this.book_for_change.numberOfPages = array_book.numberOfPages;
      this.book_for_change.gener = array_book.gener;
    }

    onSubmitChangesEvent() {
      // for (let i = 0; i < this.bookService.books_array.length; i++) {
      //   const element = this.bookService.books_array[i];
      //   if (element.title === this.book_for_change.title) {
      //     element.title = this.title_book_for_edit;
      //     element.numberOfPages = this.numberOfPages_for_edit;
      //     element.gener = this.gener_for_edit;
      //     this.array_of_books = [];
      //     localStorage.clear();
      //     this.closeEditBlock();
      //     this.book_for_change = { title: "", numberOfPages: 0, gener: '' }
      //   } else {
      //     console.log("Error");
          
      //   }
      // }
      // console.log(this.bookService.books_array);
      // console.log(this.book_for_change);
      
      
    }


    closeEditBlock() {
      this.isActiveChangeBlock = false
    }
}