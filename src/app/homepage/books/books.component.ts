import {Component, OnInit, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

import {Book} from '../book.model';
import {BooksService} from './books.service';
import {SearchPipe} from '../../search.pipe';
import {FilterPipe} from '../../filter.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})

export class BooksComponent implements OnInit {
  // Create forms property
  title: string;
  numberOfPages: number;
  generr: string;
  imageSrc: string;
  otherGener: string;

  // Property for files
  fileData: File = null;
  previewUrl: any = null;

  // Edit forms property
  id: number;
  imgSrc: string;
  title_book_for_edit: string;
  numberOfPages_for_edit: number;
  gener_for_edit: string;

  // Active property for template
  isActiveChangeBlock: boolean;
  isActiveSearchBlock: boolean;
  isActiveCreateBlock: boolean;
  isActiveOtherGener: boolean;

  // Input property
  @Input() term: string;
  @Input() array_of_books: any[] = [];
  @Input() events: Observable<void>;
  // Gener

  public geners = [];
  public selectedGener;

  constructor(private bookService: BooksService) {
  }

  // Component iniziallization
  ngOnInit() {
    this.isActiveSearchBlock = false;
    this.isActiveChangeBlock = false;
    this.isActiveCreateBlock = false;
    this.isActiveOtherGener = false;
    this.selectedGener = 'All books';
    this.getBooks();
    this.getGeners();
  }

  // Methods for reading files
  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
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
      if (item.id === putBook.id) {
        const index = this.array_of_books.indexOf(item);
        this.array_of_books.splice(index, 1, putBook);
      }
    });
    this.bookService.updateBook(putBook).subscribe();
    this.isActiveChangeBlock = false;

  }
  onSubmitNewBook() {
    let g;
    if (this.title.length !== 0 && this.numberOfPages !== 0 && this.generr !== undefined || null ) {
      if (this.otherGener !== null || undefined ) {
        if (this.geners.includes(this.otherGener)) {
          return;
        } else {
        this.geners.push(this.otherGener);
        this.bookService.createGener(this.otherGener).subscribe();
        g = this.otherGener;
        }
        } else {
          g = this.generr;
        }
      }
    const newBook: Book = {
      id: (this.array_of_books.length + 1),
      title: this.title,
      numberOfPages: this.numberOfPages,
      gener: g,
      imageSrc: this.previewUrl};
      this.bookService.createBook(newBook).subscribe();
      this.array_of_books.push(newBook);
      this.isActiveCreateBlock = false;
    }
  closeEditBlock() {
    this.isActiveChangeBlock = false;
  }
  closeCreateBlock() {
    this.isActiveCreateBlock = false;
  }

  isOtherBlockActive(event) {
    if (event == 'other') {
      this.isActiveOtherGener = !this.isActiveOtherGener;
    } else {
      this.isActiveOtherGener = false;
    }
  }
}
