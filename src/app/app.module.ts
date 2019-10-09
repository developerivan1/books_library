import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { ImMemoryDataService } from './homepage/books/data.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksComponent } from './homepage/books/books.component';
import { BooksService } from "./homepage/books/books.service";
import { AuthorsComponent } from './homepage/authors/authors.component';
import { BookComponent } from './homepage/books/book/book.component';
import { SearchPipe } from './search.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    HomepageComponent,
    BooksComponent,
    AuthorsComponent,
    BookComponent,
    SearchPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ImMemoryDataService)
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})

export class AppModule { }