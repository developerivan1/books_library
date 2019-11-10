import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Book} from '../app/homepage/book.model';
import {Author} from '../app/homepage/author.model';

export class ImMemoryDataService implements InMemoryDbService {
  createDb() {
    const booksArray: Book[] = [
      {
        id: 0,
        title: 'Harry Potter and the Prisoner of Azkaban',
        numberOfPages: 450,
        imageSrc: '../../../assets/Photos/books_library_images/hp-2.jpg',
        gener: 'Fantasy'
      },
      {
        id: 1,
        title: 'Harry Potter and the philosophers stone',
        numberOfPages: 350,
        imageSrc: '../../../assets/Photos/books_library_images/hp-1.jpg',
        gener: 'Fantasy'
      },
      {
        id: 2,
        title: 'Stephen King It',
        numberOfPages: 650,
        imageSrc: '../../../assets/Photos/books_library_images/st_it.jpg',
        gener: 'Horror'
      },
      {
        id: 3,
        title: 'Stephen King Outsider',
        numberOfPages: 300,
        imageSrc: '../../../assets/Photos/books_library_images/sk-outsider.jpg',
        gener: 'Crime'
      },
      {
        id: 4,
        title: 'Stephen King Green Mile',
        numberOfPages: 450,
        imageSrc: '../../../assets/Photos/books_library_images/sk-zelenaia_milya.jpg',
        gener: 'Fantasy'
      },
      {
        id: 5,
        title: 'The subtle art of indifference',
        numberOfPages: 750,
        imageSrc: '../../../assets/Photos/books_library_images/pofig.jpg',
        gener: 'Psyhology'
      },
      {
        id: 6,
        title: 'Stephen King Pet cemetery',
        numberOfPages: 450,
        imageSrc: '../../../assets/Photos/books_library_images/sk-kdz.jpg',
        gener: 'Horror'
      },
      {
        id: 7,
        title: 'Сity ​​of dreams: mercenary',
        numberOfPages: 450,
        imageSrc: '../../../assets/Photos/books_library_images/naemnik.jpg',
        gener: 'Detective'
      },
      {
        id: 8,
        title: 'Ernest Hemingway goodbye weapon',
        numberOfPages: 250,
        imageSrc: '../../../assets/Photos/books_library_images/eh-proshai_oruzhie.jpg',
        gener: 'Romans'
      },
      {
        id: 9,
        title: 'Gomer Iliada',
        numberOfPages: 200,
        imageSrc: '../../../assets/Photos/books_library_images/gomer-iliada.jpg',
        gener: 'Epic'},
      {
        id: 10,
        title: 'Harry Potter and the goblet of fire',
        numberOfPages: 320,
        imageSrc: '../../../assets/Photos/books_library_images/hp-4.jpg',
        gener: 'Fantasy'
      },
      {
        id: 11,
        title: 'Harry Potter and the damned child',
        numberOfPages: 450,
        imageSrc: '../../../assets/Photos/books_library_images/hp-9.jpg',
        gener: 'Fantasy'
      },
      {
        id: 12,
        title: 'Quentin Tarantino criminal minds',
        numberOfPages: 210,
        imageSrc: '../../../assets/Photos/books_library_images/kriminalnoe-chtivo.jpg',
        gener: 'Crime'
      },
      {
        id: 13,
        title: 'Mikhail Bulgakov Dog Heart',
        numberOfPages: 110,
        imageSrc: '../../../assets/Photos/books_library_images/misha.jpg',
        gener: 'Novel'
      },
      {
        id: 14,
        title: 'Gaston Leroux The Phantom of the Opera',
        numberOfPages: 440,
        imageSrc: '../../../assets/Photos/books_library_images/prizrak.jpg',
        gener: 'Romans'
      },
      {
        id: 15,
        title: 'Tammara Webber Just Together',
        numberOfPages: 290,
        imageSrc: '../../../assets/Photos/books_library_images/prosto-vdvoem.jpg',
        gener: 'Romans'
      },
      {
        id: 16,
        title: 'Erich Maria Remarque Arc de Triomphe',
        numberOfPages: 100,
        imageSrc: '../../../assets/Photos/books_library_images/remark-arka.jpg',
        gener: 'Romans'
      },
      {
        id: 17,
        title: 'Stephen King Happy Country',
        numberOfPages: 140,
        imageSrc: '../../../assets/Photos/books_library_images/sk-happy_country.jpg',
        gener: 'Fantasy'
      },
      {
        id: 18,
        title: 'Stephen King Needed Things',
        numberOfPages: 140,
        imageSrc: '../../../assets/Photos/books_library_images/sk-musthave_things.jpg',
        gener: 'Fantasy'
      },
      {
        id: 19,
        title: 'Sabrina Jeffries Testament Passion',
        numberOfPages: 140,
        imageSrc: '../../../assets/Photos/books_library_images/strat_po_zaveshaniu.jpg',
        gener: 'Romans'
      },
    ];

    const authors: Author[] = [
      {
        id: 0,
        surename: 'Rowling',
        name: 'Joanne',
        birth: new Date(1965, 5, 23),
        books: [
          'Harry Potter and the Philosophers Stone',
          'Harry Potter and the Chamber of Secrets',
          'Harry Potter and the Prisoner of Azkaban',
          'Harry Potter and the Goblet of Fire',
          'Harry Potter and the Order of the Phoenix',
          'Harry Potter and the Half-Blood Prince',
          'Harry Potter and the Deathly Hallows'
        ],
        url: 'https://hpmedia.bloomsbury.com/rep/files/shot-c-021_withcredit_4001.png'
      },
      {
        id: 1,
        surename: 'King',
        name: 'Stephen',
        birth: new Date( 1947, 8, 21 ),
        books: [
          'It',
          'Outsider',
          'Green Mile',
          'Pet cemetery',
          'Happy Country',
          'Needed Things'
        ],
        url: 'https://images.gr-assets.com/authors/1362814142p8/3389.jpg'
      },
      {
        id: 2,
        surename: 'Remark',
        name: 'Erich',
        birth: new Date(1898, 6, 22),
        books: [
          'Arc de Triomphe',
          'Three Comrades',
          'All Quiet on the Western Front',
          'The Black Obelisk',
          'Heaven Has No Favorites',
          'Flotsam'
        ],
        url: 'http://2.bp.blogspot.com/_ecJZf4mc-_I/TCDe8_ZoM6I/AAAAAAAAAA8/vfr2MEJJmp8/s1600/remarque.jpg'
      },
      {
        id: 3,
        surename: 'Hemingway',
        name: 'Ernest',
        birth: new Date(1988, 5, 21),
        books: [
          'Goodbye weapon',
          'Winner Take Nothing',
          'To Have and Have Not',
          'Green Hills of Africa',
          'The Nick Adams Stories',
          'For Whom the Bell Tolls',
          'The Sun Also Rises',
          'The Old Man and The Sea'
        ],
        url: 'https://karsh.org/wordpress/wp-content/uploads/2016/10/Yousuf-Karsh-Ernest-Hemingway-1957-1558x1960.jpg'
      },
      {
        id: 4,
        surename: 'Булгаков',
        name: 'Михаил',
        patronymic: 'Афана́сьевич',
        birth: new Date(1891, 3, 12),
        books: [
          'Мастер и Маргарита',
          'Записки юного врача (сборник)',
          'Морфий. Записки юного врача (сборник)',
          'Собачье сердце',
          'Морфий',
          'Белая Гвардия',
        ],
        url: 'https://img.rg.ru/pril/article/133/91/16/bul.jpg'
      },
    ];

    const geners = [
      { id: 0, gener: 'Romans' },
      { id: 1, gener: 'Classic' },
      { id: 2, gener: 'Crime' },
      { id: 3, gener: 'Detective' },
      { id: 4, gener: 'Fantasy' },
      { id: 5, gener: 'Horror' },
      { id: 6, gener: 'Psyhology' },
      { id: 7, gener: 'Epic' },
      { id: 8, gener: 'Novel' },
    ];
    return { booksArray, authors, geners };
  }
}
