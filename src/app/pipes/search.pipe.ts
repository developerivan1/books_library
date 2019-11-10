import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../homepage/book.model';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(array_of_books: Book[], term: string): Book[] {

    // Check if search term is undefined
    if (term === undefined) {
      return array_of_books;
    }

    // return updated books array
    return array_of_books.filter((item)=> {
      return item.title.toLowerCase().includes(term.toLowerCase());
    });
  }
}
