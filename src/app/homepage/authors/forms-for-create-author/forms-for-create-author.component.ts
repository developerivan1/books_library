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

  reactiveFormForCreateAuthor: FormGroup;
  @Input() newBookStr: string;
  @Output() onsubmit = new EventEmitter();
  public isActiveNewBook = false;
  // Property for files
  fileData: File = null;
  previewUrl: any = null;
  allAuthors: Author[];
  books: string[] = [];
  isSubmitBtnDisabled = true;

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.bookService.getAuthors().subscribe(data => {
      this.allAuthors = data;
    });
  }

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

  onSubmit() {
    // debugger;
    const controls = this.reactiveFormForCreateAuthor.controls;
    if (this.reactiveFormForCreateAuthor.invalid) {
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
      console.log('Wooops');
      return;
    }
    const obj: Author = {
      id: this.allAuthors.length + 1,
      name: controls.name.value,
      surename: controls.surename.value,
      patronymic: controls.patronymic.value,
      birth: new Date(controls.birth.value),
      books: this.books,
      url: this.previewUrl
    };
    this.bookService.createAuthor(obj).subscribe();
    this.closeThisComponent();
    // this.bookService.createBook().subscribe();
    // this.closeThisComponent();
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

  addBook() {
    if (this.newBookStr !== null || undefined) {
      this.books.push(this.newBookStr);
      this.newBookStr = '';
      this.closeNewBook();
    } else {
      return false;
    }
  }
  activeNewBook() {
    this.isActiveNewBook = true;
  }
  closeNewBook() {
    this.isActiveNewBook = false;
  }
}
