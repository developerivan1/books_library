export interface Author {
    id: number;
    surename: string;
    name: string;
    patronymic?: string;
    birth: Date;
    books: string[];
    url: string;
}
