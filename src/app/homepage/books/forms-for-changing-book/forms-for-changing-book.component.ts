import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../../../services/books.service';
import { ActiveTemplateService } from '../../../../services/active-template.service';

import { Book } from '../../book.model';

@Component({
  selector: 'app-forms-for-changing-book',
  templateUrl: './forms-for-changing-book.component.html',
  styleUrls: ['./forms-for-changing-book.component.sass']
})

export class FormsForChangingBookComponent implements OnInit {
  // Current book for changing
  @Input() bookForChanging: Book;

  @Input() currentGenre: string;
  // Change block status 
  @Input() isActiveChangeBlock: boolean;

  // List of all geners
  public geners: string[] = [];

  constructor(private bookService: BooksService,
              private activeTemplate: ActiveTemplateService) { }

  ngOnInit() {
    this.getGeners();

    setTimeout(this.currentGenre = this.bookForChanging.gener, 1000);
  }

  // Method for submiting changed book
  onSubmitChangesEvent() {
    this.bookService.updateBook(this.bookForChanging).subscribe();
    this.closeEditBlock();
  }

  // Closing Edit block component
  closeEditBlock() {
    this.activeTemplate.isActiveChangeBlock = false;
  }

  // Getting list of all geners
  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }
}
