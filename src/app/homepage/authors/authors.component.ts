import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Author } from '../author.model';
import { BooksService } from '../../../services/books.service';
import { ActiveTemplateService } from '../../../services/active-template.service';
import { SearchAuthorPipe } from 'src/app/search-author.pipe';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  public authors: Author[];
  public isActiveSearchBlock = false;
  public isActiveAuthorDesc: boolean;
  @Input() author: Author;
  @Input() term: string;
  public isActiveCreateAuthor: boolean;
  constructor(private booksService: BooksService,
              private activeTemplate: ActiveTemplateService) {
                activeTemplate.isActiveAuthorDesc.subscribe( bool => {
                  this.isActiveAuthorDesc = bool;
                });
                activeTemplate.isActiveCreateAuthor.subscribe(bool => {
                  this.isActiveCreateAuthor = bool;
                });

  }
  ngOnInit(): void {
    this.booksService.getAuthors().subscribe(data => {
      this.authors = data;
      console.log(this.authors);
    });
  }
  ngOnDestroy(): void {
    this.isActiveSearchBlock = false;
    this.isActiveAuthorDesc = false;
    this.activeTemplate.setBoolCreateAuthor(false);
    this.activeTemplate.setBoolEditAuthor(false);
  }
  activatedSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }
  activatedAuthorDesc(author) {
    this.activeTemplate.setBoolEditAuthor(true);
    this.author = author;
  }
  activatedCreateAuthor() {
    this.activeTemplate.setBoolCreateAuthor(true);
  }
  onSubmitAuthor(author) {
    this.authors.push(author);
  }
  onSubmitEdit(event) {
    this.authors.splice(event.id, 1, event);
  }
  closeAuthorDesc() {
    this.activeTemplate.setBoolEditAuthor(false);
  }
}
