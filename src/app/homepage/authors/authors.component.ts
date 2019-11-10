import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Author } from '../author.model';

import { BooksService } from '../../../services/books.service';
import { ActiveTemplateService } from '../../../services/active-template.service';

import { SearchAuthorPipe } from 'src/app/pipes/search-author.pipe';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})

export class AuthorsComponent implements OnInit, OnDestroy {

  @Input() public authors: Author[];

  // Selected author
  @Input() author: Author;

  // Input field string for author search
  @Input() term: string;

  // template properties
  public isActiveSearchBlock = false;
  public isActiveAuthorDesc: boolean;
  public isActiveCreateAuthor: boolean;

  constructor(private booksService: BooksService,
              private activeTemplate: ActiveTemplateService) {

                // Setting component visibility properties
                activeTemplate.isActiveAuthorDesc.subscribe( bool => {
                  this.isActiveAuthorDesc = bool;
                });
                activeTemplate.isActiveCreateAuthor.subscribe(bool => {
                  this.isActiveCreateAuthor = bool;
                });
  }

  ngOnInit(): void {
    // Getting a list of all authors
    this.booksService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  ngOnDestroy(): void {
    // Hide all open components
    this.isActiveSearchBlock = false;
    this.isActiveAuthorDesc = false;
    this.activeTemplate.setBoolCreateAuthor(false);
    this.activeTemplate.setBoolEditAuthor(false);
  }

  // button for searching (Two states: active and hidden)
  toggleSearchBlock() {
    this.isActiveSearchBlock = !this.isActiveSearchBlock;
  }

  // AuthorDescription initialization with transfer of the selected author to it
  activatedAuthorDesc(author: Author) {
    this.activeTemplate.setBoolEditAuthor(true);
    this.author = author;
  }


  activatedCreateAuthor() {
    this.activeTemplate.setBoolCreateAuthor(true);
  }

  // Adding an author to an array of authors
  onSubmitAuthor(author: Author) {
    this.authors.push(author);
  }

  // Author change
  onSubmitEdit(changedAuthor: Author) {
    this.authors.splice(changedAuthor.id, 1, changedAuthor);
  }

  // Closing AuthorDescription Component
  closeAuthorDesc() {
    this.activeTemplate.setBoolEditAuthor(false);
  }
}
