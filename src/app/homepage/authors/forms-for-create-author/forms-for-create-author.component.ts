import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActiveTemplateService } from 'src/services/active-template.service';
import { BooksService } from 'src/services/books.service';

import { Author } from 'src/app/homepage/author.model';

@Component({
  selector: 'app-forms-for-create-author',
  templateUrl: './forms-for-create-author.component.html',
  styleUrls: ['./forms-for-create-author.component.sass']
})

export class FormsForCreateAuthorComponent implements OnInit {

  // Reactive form property
  reactiveFormForCreateAuthor: FormGroup;

  // Two-way binding string for adding new book to a list of books
  @Input() newBookStr: string;

  // Output property for submit new author
  @Output() onsubmit = new EventEmitter();

  // Proeprty for display new book block
  public isActiveNewBook = false;

  // Property for files
  public fileData: File = null;
  public previewUrl: any = null;

  // List of all authors
  public allAuthors: Author[];

  // Array of all author books
  public books: string[] = [];

  public isSubmitBtnDisabled = true;

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();

    // Getting list of all authors
    this.bookService.getAuthors().subscribe(data => {
      this.allAuthors = data;
    });
  }

  // Reactive form init
  initForm() {
    this.reactiveFormForCreateAuthor = this.fb.group({
      name: ['', [
        Validators.required
       ]
      ],
      surename: ['', [
        Validators.required
       ]
      ],
      patronymic: [null],
      birth: ['', [
        Validators.required,
        Validators.pattern(/^([0]?[1-9]|[1-2]\d|3[0-1])\s(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{1}$|\d{2}$|\d{3}|1\d{3}$|20[0-1][0-9])$/)
       ]
      ]
     });
    }

  // Validation of all controls
  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveFormForCreateAuthor.controls[controlName];
    const result = control.invalid && control.touched;
    if (result) {
      this.isSubmitBtnDisabled = true;
    } else {
      this.isSubmitBtnDisabled = false;
    }
    return result;
  }

  // Submiting new author
  onSubmit() {
    // debugger;
    // Getting of all controls
    const controls = this.reactiveFormForCreateAuthor.controls;
    // Invalidation check
    if (this.reactiveFormForCreateAuthor.invalid) {
      // If control invalid, then mark as touched him
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    // Formation of the author’s object for sending
    const obj: Author = {
      id: this.allAuthors.length + 1,
      name: controls.name.value,
      surename: controls.surename.value,
      patronymic: controls.patronymic.value,
      birth: new Date(controls.birth.value),
      books: this.books,
      url: this.previewUrl
    };

    // Sending author object
    this.bookService.createAuthor(obj).subscribe();
    this.closeThisComponent();
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

  closeThisComponent() {
    this.activeTemplate.setBoolCreateAuthor(false);
  }

  // Adding new book to a author list of books
  addBook() {
    if (this.newBookStr !== null || undefined) {
      this.books.push(this.newBookStr);
      this.newBookStr = '';
      this.closeNewBook();
    } else {
      return false;
    }
  }
  // Opening new book block
  activeNewBook() {
    this.isActiveNewBook = true;
  }

  // Closing new book block
  closeNewBook() {
    this.isActiveNewBook = false;
  }

  // Method for removing book
  deleteBook(i) {
    this.books.splice(i, 1);
  }

}
