import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BooksService } from '../../../../services/books.service';
import { Book } from '../../book.model';
import { ActiveTemplateService } from '../../../../services/active-template.service';

@Component({
  selector: 'app-forms-for-changing-book',
  templateUrl: './forms-for-changing-book.component.html',
  styleUrls: ['./forms-for-changing-book.component.sass']
})
export class FormsForChangingBookComponent implements OnInit {
    @Input() arrayBookForChanging: Book;
    @Input() isActiveChangeBlock: boolean;

    public geners = [];
    constructor(private bookService: BooksService,
                private activeTemplate: ActiveTemplateService) { }

  ngOnInit() {
    this.getGeners();
  }
  onSubmitChangesEvent() {
    this.bookService.updateBook(this.arrayBookForChanging).subscribe();
    this.closeEditBlock();
  }

  closeEditBlock() {
    this.activeTemplate.isActiveChangeBlock = false;
  }
  getGeners() {
    this.bookService.getGeners().subscribe(data => this.geners = data);
  }
}
