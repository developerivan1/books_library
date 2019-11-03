import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../../author.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.sass']
})
export class AuthorComponent implements OnInit {
  @Input() public author: Author;
  @Input() public index: number;
  constructor() { }

  ngOnInit() {}

}
