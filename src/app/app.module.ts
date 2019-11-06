import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ImMemoryDataService } from '../services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksComponent } from './homepage/books/books.component';
import { BooksService } from '../services/books.service';
import { AuthorsComponent } from './homepage/authors/authors.component';
import { BookComponent } from './homepage/books/book/book.component';
import { SearchPipe } from './search.pipe';
import { FilterPipe } from './filter.pipe';
import { FormsForChangingBookComponent } from './homepage/books/forms-for-changing-book/forms-for-changing-book.component';
import { FromsForCreateBookComponent } from './homepage/books/froms-for-create-book/froms-for-create-book.component';
import { ActiveTemplateService } from '../services/active-template.service';
import { AuthorComponent } from './homepage/authors/author/author.component';
import { AuthorDescriptionComponent } from './homepage/authors/author-description/author-description.component';
import { FormsForCreateAuthorComponent } from './homepage/authors/forms-for-create-author/forms-for-create-author.component';
import { SearchAuthorPipe } from './search-author.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    HomepageComponent,
    BooksComponent,
    AuthorsComponent,
    BookComponent,
    SearchPipe,
    FilterPipe,
    FormsForChangingBookComponent,
    FromsForCreateBookComponent,
    AuthorComponent,
    AuthorDescriptionComponent,
    FormsForCreateAuthorComponent,
    SearchAuthorPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ImMemoryDataService)
  ],
  providers: [BooksService,
              ActiveTemplateService],
  bootstrap: [AppComponent]
})

export class AppModule { }
