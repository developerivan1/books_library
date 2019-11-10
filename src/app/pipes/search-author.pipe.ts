import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../homepage/author.model';

@Pipe({
  name: 'searchAuthor'
})
export class SearchAuthorPipe implements PipeTransform {

  transform(authors: Author[], term: string): Author[] {

    // Check if search term is undefined
    if (term === undefined) {
      return authors;
    }

    // return updated books array
    return authors.filter((item)=> {
        return  item.surename.toLowerCase().includes(term.toLowerCase()) || item.name.toLowerCase().includes(term.toLowerCase());
    });
  }
}
