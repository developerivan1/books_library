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
  @Output() onsubmit = new EventEmitter();

  @Input() author: Author;
  public updatedAuthor: Author;
  public fullName: string;
  public date: string;
  public books: string[];
  public editAuthor = false;
  public descAuthor = true;
  public isActiveNewBook = false;
  public newBookStr: string;
  public monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

  public dateEmpty = false;

  invalidName = false;
  invalidSurename = false;
  invalidDate = false;
  invalid = false;

  public isActiveThisComponent: boolean;
  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) { }

  ngOnInit() {
    this.getFullname();
    this.getFormatDate();
    this.books = this.author.books;
  }

  getFullname() {
    if (!this.author.patronymic) {
      this.fullName = `${this.author.name} ${this.author.surename}`;
    } else {
      this.fullName = `${this.author.name} ${this.author.patronymic} ${this.author.surename}`;
    }
  }

  getFormatDate() {
    const date = new Date(this.author.birth);
    const day = date.getDate();
    const month = this.monthNames[date.getMonth()];
    const year = date.getFullYear();
    this.date = `${day} ${month} ${year}`;
  }

  deleteBook(index) {
    this.books.splice(index, 1);
  }

  closeComponent() {
    this.activeTemplate.setBoolEditAuthor(false);
  }

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

  addBook() {
    if (this.newBookStr) {
      this.books.push(this.newBookStr);
      this.isActiveNewBook = false;
      this.newBookStr = '';
    }
  }

  onSubmitEdit() {
    const date = this.date.split(' ');
    const day = Number(date[0]);
    const month = this.monthNames.indexOf(date[1]);
    const year = Number(date[2]);
    const updatedDate = new Date(year, month, day);
    console.log(updatedDate);
    const resultAuthor: Author = {id: this.author.id,
                                  name: this.author.name,
                                  patronymic: this.author.patronymic,
                                  surename: this.author.surename,
                                  books: this.books,
                                  birth: new Date(this.date),
                                  url: this.author.url };
    this.bookService.updateAuthor(resultAuthor).subscribe();
    this.activeTemplate.setBoolEditAuthor(false);
    this.onsubmit.emit(resultAuthor);
  }

  checkEmptyName() {
    if (!this.author.name) {
      this.invalidName = true;
      this.invalid = true;
    } else {
      this.invalidName = false;
      this.invalid = false;

    }
  }

  checkEmptySurename() {
    if (!this.author.surename) {
      this.invalidSurename = true;
      this.invalid = true;
    } else {
      this.invalidSurename = false;
      this.invalid = false;
    }
  }

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
