import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { BooksService } from "./books/books.service";
import { Book } from "./book";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})

export class HomepageComponent {


  constructor(private bookService: BooksService) { }


}
