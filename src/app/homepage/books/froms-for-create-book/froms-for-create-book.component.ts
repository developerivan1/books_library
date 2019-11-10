import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BooksService } from '../../../../services/books.service';
import { ActiveTemplateService } from '../../../../services/active-template.service';

import { Book } from '../../book.model';

@Component({
  selector: 'app-froms-for-create-book',
  templateUrl: './froms-for-create-book.component.html',
  styleUrls: ['./froms-for-create-book.component.sass']
})

export class FromsForCreateBookComponent implements OnInit {

  // Reactive form property
  reactiveFormForCreateBook: FormGroup;

  // Other gener input status
  isActiveOtherGener = false;

  // Output propery for submiting new book
  @Output() onsubmit = new EventEmitter();

  // Property for files
  fileData: File = null;
  previewUrl: any = null;

  // List of all books
  allBooks: Book[] = [];

  // List of all geners
  geners = [];

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getGeners();
    this.getBooks();
    this.initForm();
  }
  // Reactive form initialization
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

  // InValidation check
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveFormForCreateBook.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  // Getting list of all geners
  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }

  // Getting list of all books
  getBooks() {
    this.bookService.getBooks().subscribe(data => this.allBooks = data);
  }

  // Method for submiting new book
  onSubmit() {
    // debugger;
    // Getting all controls
    const controls = this.reactiveFormForCreateBook.controls;

    // Gener
    let g;

    // Invalidation form check
    if (this.reactiveFormForCreateBook.invalid) {

      // If at least one control invalid mark as touched him
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      console.log('Wooops');
      return;
    }
    // If selceted gener is "Other gener" active input for create new gener and if other gener value not empty
    if (controls.otherGener.value !== null && controls.gener.value === 'other') {
      // Adding new gener to a list of all geners
      this.bookService.createGener({ id: this.geners.length + 1, gener: controls.otherGener.value}).subscribe();
      // Assign a new genre to a variable "g"
      g = controls.otherGener.value;
    } else {
      // Else assing a seleted genre to a varible "g"
      g = controls.gener.value;
    }

    // Formation of the object of a new book to be sent
    const obj: Book = {
      id: this.allBooks.length + 1,
      title: controls.title.value,
      numberOfPages: controls.numberOfPages.value,
      gener: g,
      imageSrc: this.previewUrl
    };
    // Sendig new book
    this.bookService.createBook(obj).subscribe();
    // Closing this component
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

  // Method for checking the selected genre
  isOtherBlockActive(event) {
    if (event === 'other') {
      this.isActiveOtherGener = !this.isActiveOtherGener;
    } else {
      this.isActiveOtherGener = false;
    }
  }

  // Closing this component
  closeCreateBlock() {
    this.activeTemplate.setBoolCreateBlock(false);
  }
}
