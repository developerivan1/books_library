import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksComponent } from './homepage/books/books.component';
import { AuthorsComponent } from './homepage/authors/authors.component';

const homepageChildRoutes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'authors', component: AuthorsComponent}
];

const appRoutes: Routes = [
  {path: 'welcomepage', component: WelcomepageComponent},
  {path: 'homepage', component: HomepageComponent, children: homepageChildRoutes},
  {path: '', redirectTo: '/welcomepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
