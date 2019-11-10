import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../homepage/book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array_of_books: Book[], selectedGener: string): Book[] {

    if (selectedGener === 'All books') {
      return array_of_books;
    }
    return array_of_books.filter((item) => {
      return item.gener.includes(selectedGener);
    });
  }
}
