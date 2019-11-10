import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Author } from '../../author.model';

import { BooksService } from '../../../../services/books.service';
import { ActiveTemplateService } from '../../../../services/active-template.service';

@Component({
  selector: 'app-author-description',
  templateUrl: './author-description.component.html',
  styleUrls: ['./author-description.component.sass']
})

export class AuthorDescriptionComponent implements OnInit {

  @Input() authors: Author[];
  // Output property for submiting changed author
  @Output() onsubmit = new EventEmitter();

  @Input() author: Author;

  // Updated author
  public updatedAuthor: Author;

  // Properties for presentation in template
  public fullName: string;
  public date: string;
  public books: string[];

  // Component condition (Two states: Author description / Author data changes)
  public editAuthor = false;
  public descAuthor = true;

  // Block for adding new book (condition)
  public isActiveNewBook = false;
  public newBookStr: string;

  // Array of all months
  public monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

  // Invalid fields alert status
  public dateEmpty = false;
  public invalidName = false;
  public invalidSurename = false;
  public invalidDate = false;
  public invalid = false;

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) { }

  ngOnInit() {
    this.getFullname();
    this.getFormatDate();
    this.books = this.author.books;
    console.log(this.author.id);
  }

  // Full name of author for template
  getFullname() {
    // Patronymic check
    if (!this.author.patronymic) {
      this.fullName = `${this.author.name} ${this.author.surename}`;
    } else {
      this.fullName = `${this.author.name} ${this.author.patronymic} ${this.author.surename}`;
    }
  }

  // Convert date to display in template
  getFormatDate() {
    const date = new Date(this.author.birth);
    const day = date.getDate();
    const month = this.monthNames[date.getMonth()];
    const year = date.getFullYear();
    this.date = `${day} ${month} ${year}`;
  }

  // Removing a book by index from the author’s book list
  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  closeComponent() {
    this.activeTemplate.setBoolEditAuthor(false);
  }

  // Component state change
  toggleEdit() {
    this.editAuthor = !this.editAuthor;
    this.descAuthor = !this.descAuthor;
  }

  activatedNewBook() {
    this.isActiveNewBook = true;
  }

  closeNewBook() {
    this.isActiveNewBook = false;
  }

  // Adding new book to list of books
  addBook() {
    if (this.newBookStr) {
      this.books.push(this.newBookStr);
      this.isActiveNewBook = false;
      this.newBookStr = '';
    }
  }

  // Submiting changed author
  onSubmitEdit() {
    // Convert string date to format Date
    const date = this.date.split(' ');
    const day = Number(date[0]);
    const month = this.monthNames.indexOf(date[1]);
    const year = Number(date[2]);
    const updatedDate = new Date(year, month, day);
    const resultAuthor: Author = {id: this.author.id,
                                  name: this.author.name,
                                  patronymic: this.author.patronymic,
                                  surename: this.author.surename,
                                  books: this.books,
                                  birth: new Date(this.date),
                                  url: this.author.url };
    // Updating author
    this.bookService.updateAuthor(resultAuthor).subscribe();
    console.log(this.author.id);
    this.activeTemplate.setBoolEditAuthor(false);
  }


  // Basic validation of input fields

  // Check emty feild - NAME
  checkEmptyName() {
    if (!this.author.name) {
      this.invalidName = true;
      this.invalid = true;
    } else {
      this.invalidName = false;
      this.invalid = false;

    }
  }

  // Check emty feild - SURENAME
  checkEmptySurename() {
    if (!this.author.surename) {
      this.invalidSurename = true;
      this.invalid = true;
    } else {
      this.invalidSurename = false;
      this.invalid = false;
    }
  }

  // Date validation
  checkEmptyDate() {
    const dateSplited = this.date.split(' ');
    if (dateSplited.length === 3) {
      if (Number(dateSplited[0]) > 0 && Number(dateSplited[0]) < 31) {
        if (this.monthNames.includes(dateSplited[1])) {
          if (Number(dateSplited[2]) > 0 && Number(dateSplited[2]) < 2020) {
            this.invalidDate = false;
            this.invalid = false;
          } else {
            this.invalidDate = true;
            this.invalid = true;
          }
        } else {
            this.invalidDate = true;
            this.invalid = true;
        }
      } else {
          this.invalidDate = true;
          this.invalid = true;
      }
    } else {
      this.invalidDate = true;
      this.invalid = true;
    }
    if (!this.date) {
      this.dateEmpty = true;
    } else {
      this.dateEmpty = false;
    }
  }

}
