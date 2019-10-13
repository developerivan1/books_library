import {Component, OnInit, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

import {Book} from '../book.model';
import {BooksService} from './books.service';
import {SearchPipe} from '../../search.pipe';
import {FilterPipe} from '../../filter.pipe';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})

export class BooksComponent implements OnInit {

  // Edit froms property
  id: number;
  imgSrc: string;
  title_book_for_edit: string;
  numberOfPages_for_edit: number;
  gener_for_edit: string;

  // Active property for template
  isActiveChangeBlock: boolean;
  isActiveSearchBlock: boolean;

  // Input property
  @Input() term: string;
  @Input() array_of_books: any[] = [];


  // Gener
  public geners = [];
  public selectedGener;

  constructor(private bookService: BooksService) {
  }

  // Component iniziallization
  ngOnInit() {
    this.isActiveSearchBlock = false;
    this.isActiveChangeBlock = false;
    this.selectedGener = 'All books';
    this.getBooks();
    this.getGeners();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => this.array_of_books = data);
  }

  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }

  activatedSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }

  // Output events
  onDeleteEvent(arrayBook) {
    const index = this.array_of_books.indexOf(arrayBook);
    if (index !== null || index !== undefined) {
      this.array_of_books = this.array_of_books.filter((book, i) => i !== index);
    }
    this.bookService.deleteBook(arrayBook).subscribe();
  }

  onEditEvent(arrayBook) {
    this.id = arrayBook.id;
    if (arrayBook.imageSrc) {
      this.imgSrc = arrayBook.imageSrc;
    }
    this.isActiveChangeBlock = true;
    this.title_book_for_edit = arrayBook.title;
    this.numberOfPages_for_edit = arrayBook.numberOfPages;
    this.gener_for_edit = arrayBook.gener;
  }

  onSubmitChangesEvent() {
    const putBook = {
      id: (this.id),
      title: this.title_book_for_edit,
      numberOfPages: this.numberOfPages_for_edit,
      gener: this.gener_for_edit,
      imageSrc: this.imgSrc
    };
    this.array_of_books.map((item, i) => {
      if(item.id === putBook.id) {
        this.array_of_books.splice(i, 1, putBook);
      }
    });
    this.bookService.updateBook(putBook).subscribe();
    this.isActiveChangeBlock = false;

  }

  closeEditBlock() {
    this.isActiveChangeBlock = false;
  }
}
