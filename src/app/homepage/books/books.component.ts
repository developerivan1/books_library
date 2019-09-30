import { Component, Input } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from "../book";
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent {
  @Input() books = [];
  constructor() { }
}