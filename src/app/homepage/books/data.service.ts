import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from "../book";
import { Author } from "../author";

export class ImMemoryDataService implements InMemoryDbService {
  createDb() {
    let books_array: Book[] = [
      {title: 'Harry Potter and the Prisoner of Azkaban',         numberOfPages: 450, imageSrc: '../../../assets/Photos/books_library_images/hp-2.jpg',                 gener: 'Fantasy'},
      {title: 'Harry Potter and the philosophers stone',          numberOfPages: 350, imageSrc: '../../../assets/Photos/books_library_images/hp-1.jpg',                 gener: 'Fantasy'},
      {title: 'Stephen King It',                                  numberOfPages: 650, imageSrc: '../../../assets/Photos/books_library_images/st_it.jpg',                gener: 'Horror'},
      {title: 'Stephen King Outsider',                            numberOfPages: 300, imageSrc: '../../../assets/Photos/books_library_images/sk-outsider.jpg',          gener: 'Crime'},
      {title: 'Stephen King Green Mile',                          numberOfPages: 450, imageSrc: '../../../assets/Photos/books_library_images/sk-zelenaia_milya.jpg',    gener: 'Fantasy'},
      {title: 'The subtle art of indifference',                   numberOfPages: 750, imageSrc: '../../../assets/Photos/books_library_images/pofig.jpg',                gener: 'Psyhology'},
      {title: 'Stephen King Pet cemetery',                        numberOfPages: 450, imageSrc: '../../../assets/Photos/books_library_images/sk-kdz.jpg',               gener: 'Horror'},
      {title: 'Сity ​​of dreams: mercenary',                        numberOfPages: 450, imageSrc: '../../../assets/Photos/books_library_images/naemnik.jpg',              gener: 'Detective'},
      {title: 'Ernest Hemingway goodbye weapon',                  numberOfPages: 250, imageSrc: '../../../assets/Photos/books_library_images/eh-proshai_oruzhie.jpg',   gener: 'Romans'},
      {title: 'Gomer Iliada',                                     numberOfPages: 200, imageSrc: '../../../assets/Photos/books_library_images/gomer-iliada.jpg',         gener: 'Epic'},
      {title: 'Harry Potter and the goblet of fire',              numberOfPages: 320, imageSrc: '../../../assets/Photos/books_library_images/hp-4.jpg',                 gener: 'Fantasy'},
      {title: 'Harry Potter and the damned child',                numberOfPages: 450, imageSrc: '../../../assets/Photos/books_library_images/hp-9.jpg',                 gener: 'Fantasy'},
      {title: 'Quentin Tarantino criminal minds',                 numberOfPages: 210, imageSrc: '../../../assets/Photos/books_library_images/kriminalnoe-chtivo.jpg',   gener: 'Crime'},
      {title: 'Mikhail Bulgakov Dog Heart',                       numberOfPages: 110, imageSrc: '../../../assets/Photos/books_library_images/misha.jpg',                gener: 'Novel'},
      {title: 'Gaston Leroux The Phantom of the Opera',           numberOfPages: 440, imageSrc: '../../../assets/Photos/books_library_images/prizrak.jpg',              gener: 'Romans'},
      {title: 'Tammara Webber Just Together',                     numberOfPages: 290, imageSrc: '../../../assets/Photos/books_library_images/prosto-vdvoem.jpg',        gener: 'Romans'},
      {title: 'Erich Maria Remarque Arc de Triomphe',             numberOfPages: 100, imageSrc: '../../../assets/Photos/books_library_images/remark-arka.jpg',          gener: 'Romans'},
      {title: 'Stephen King Happy Country',                       numberOfPages: 140, imageSrc: '../../../assets/Photos/books_library_images/sk-happy_country.jpg',     gener: 'Fantasy'},
      {title: 'Stephen King Needed Things',                       numberOfPages: 140, imageSrc: '../../../assets/Photos/books_library_images/sk-musthave_things.jpg',   gener: 'Fantasy'},
      {title: 'Sabrina Jeffries Testament Passion',               numberOfPages: 140, imageSrc: '../../../assets/Photos/books_library_images/strat_po_zaveshaniu.jpg',  gener: 'Romans'},
    ];
    const authors: Author[] = [
      {
        surename: 'Rowling', 
        name: 'Joanne', 
        birth: new Date('Jule 31, 1965'), 
        books: [
          'Harry Potter and the Philosophers Stone',
          'Harry Potter and the Chamber of Secrets',
          'Harry Potter and the Prisoner of Azkaban',
          'Harry Potter and the Goblet of Fire',
          'Harry Potter and the Order of the Phoenix',
          'Harry Potter and the Half-Blood Prince',
          'Harry Potter and the Deathly Hallows'
        ]
      },
      {
        surename: 'King', 
        name: 'Stephen', 
        birth: new Date('September 21, 1947'), 
        books: [
          'It',
          'Outsider',
          'Green Mile',
          'Pet cemetery',
          'Happy Country',
          'Needed Things'
        ]
      },
      {
        surename: 'Remark', 
        name: 'Erich', 
        birth: new Date('June 22, 1898'), 
        books: [
          'Arc de Triomphe',
          'Three Comrades',
          'All Quiet on the Western Front',
          'The Black Obelisk',
          'Heaven Has No Favorites',
          'Flotsam'
        ]
      },
      {
        surename: 'Hemingway', 
        name: 'Ernest', 
        birth: new Date('July 21, 1899'), 
        books: [
          'Goodbye weapon',
          'Winner Take Nothing',
          'To Have and Have Not',
          'Green Hills of Africa',
          'The Nick Adams Stories',
          'For Whom the Bell Tolls',
          'The Sun Also Rises',
          'The Old Man and The Sea'
        ]
      },
      {
        surename: 'Булгаков', 
        name: 'Михаил',
        patronymic: 'Афана́сьевич', 
        birth: new Date('May 15, 1891'), 
        books: [
          'Мастер и Маргарита',
          'Записки юного врача (сборник)',
          'Морфий. Записки юного врача (сборник)',
          'Собачье сердце',
          'Морфий',
          'Белая Гвардия',
        ]
      },
    ];
  
    const geners: string[] = [
      'Romans',
      'Classic',
      'Crime',
      'Detective',
      'Fantasy',
      'Horror',
      'Psyhology',
      'Epic',
      'Novel'
    ];
    return {books_array, authors, geners}
  }
}
