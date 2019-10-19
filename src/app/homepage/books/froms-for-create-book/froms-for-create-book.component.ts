import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BooksService } from '../books.service';
import { ActiveTemplateService } from '../../active-template.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-froms-for-create-book',
  templateUrl: './froms-for-create-book.component.html',
  styleUrls: ['./froms-for-create-book.component.sass']
})
export class FromsForCreateBookComponent implements OnInit {

  reactiveFormForCreateBook: FormGroup;
  isActiveOtherGener = false;

  @Output() onsubmit = new EventEmitter();

  // Property for files
  fileData: File = null;
  previewUrl: any = null;
  allBooks: Book[] = [];
  geners = [];

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getGeners();
    this.getBooks();
    this.initForm();
  }

  initForm() {
    this.reactiveFormForCreateBook = this.fb.group({
      title: ['', [
        Validators.required
       ]
      ],
      numberOfPages: [0, [
        Validators.required,
        Validators.pattern(/\d/i)
       ]
      ],
      gener: ['', [
        Validators.required
       ]
      ],
      otherGener: [null]
     });
    }

  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveFormForCreateBook.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }

  getBooks() {
    this.bookService.getBooks().subscribe(data => this.allBooks = data);
  }

  onSubmit() {
    // debugger;
    const controls = this.reactiveFormForCreateBook.controls;
    let g;
    if (this.reactiveFormForCreateBook.invalid) {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      console.log('Wooops');
      return;
    }
    if (controls.otherGener.value !== null && controls.gener.value === 'other') {
      this.bookService.createGener({ id: this.geners.length + 1, gener: controls.otherGener.value}).subscribe();
      g = controls.otherGener.value;
    } else {
      g = controls.gener.value;
    }
    const obj: Book = {
      id: this.allBooks.length + 1,
      title: controls.title.value,
      numberOfPages: controls.numberOfPages.value,
      gener: g,
      imageSrc: this.previewUrl
    };
    this.bookService.createBook(obj).subscribe();
    this.closeCreateBlock();
    this.onsubmit.emit(obj);
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
