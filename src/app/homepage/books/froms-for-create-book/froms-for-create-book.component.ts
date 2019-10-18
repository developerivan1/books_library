import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BooksService } from '../books.service';
import { ActiveTemplateService } from '../../active-template.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-froms-for-create-book',
  templateUrl: './froms-for-create-book.component.html',
  styleUrls: ['./froms-for-create-book.component.sass']
})
export class FromsForCreateBookComponent implements OnInit {
  // Create forms property
  title: string;
  numberOfPages: number;
  generr: string;
  imageSrc: string;
  otherGener: string;

  isActiveOtherGener = false;
  @Output() onsubmit = new EventEmitter();
  // Property for files
  fileData: File = null;
  previewUrl: any = null;
  allBooks: Book[] = [];
  geners = [];
  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) { }

  ngOnInit() {
    this.getGeners();
    this.getBooks();
  }
  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }
  getBooks() {
    this.bookService.getBooks().subscribe(data => this.allBooks = data);
  }
  onSubmitNewBook() {
    let g;
    if (this.title.length !== 0 && this.numberOfPages !== 0 && this.generr !== undefined || null ) {
      if (this.otherGener !== null || undefined) {
        const allGeners: string[] = this.geners.map((item) => {
          return item.gener;
        });
        if (allGeners.includes(this.otherGener)) {
          return false;
        } else {
        this.geners.push({ id: this.geners.length + 1, gener: this.otherGener});
        this.bookService.createGener({ id: this.geners.length + 1, gener: this.otherGener}).subscribe();
        g = this.otherGener;
        console.log('Other gener - ' + g);
        }
        } else {
          console.log('Selected gener - ' + g);
          g = this.generr;
        }
      }
    const newBook: Book = {
      id: (this.allBooks.length + 1),
      title: this.title,
      numberOfPages: this.numberOfPages,
      gener: g,
      imageSrc: this.previewUrl
    };
    this.bookService.createBook(newBook).subscribe();
    this.activeTemplate.isActiveCreateBlock = false;
    this.onsubmit.emit(newBook);
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
  isOtherBlockActive(event) {
    if (event === 'other') {
      this.isActiveOtherGener = !this.isActiveOtherGener;
    } else {
      this.isActiveOtherGener = false;
    }
  }
  closeCreateBlock() {
    this.activeTemplate.isActiveCreateBlock = false;
  }
}
