import { Component, ViewChild } from '@angular/core';
import { BooksService } from './books/books.service';
import { BooksComponent } from './books/books.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})

export class HomepageComponent {
  @ViewChild(BooksComponent, {static: false})

  private booksComponent: BooksComponent;
  constructor(private bookService: BooksService) { }
  onCreate() {
    this.booksComponent.isActiveCreateBlock = true;
  }

}
