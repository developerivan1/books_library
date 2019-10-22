import { Component } from '@angular/core';
import { BooksService } from './books/books.service';
import { ActiveTemplateService } from './active-template.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})

export class HomepageComponent {

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) {}


}
