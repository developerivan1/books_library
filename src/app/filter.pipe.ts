import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array_of_books: any, selectedGener: any): any {
    if (selectedGener === 'All books') {
      return array_of_books;
    }
    return array_of_books.filter((item) => {
      return item.gener.includes(selectedGener);
    });
  }

}
