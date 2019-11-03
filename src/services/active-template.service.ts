import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class ActiveTemplateService {

  public isActiveChangeBlock = false;
  public isActiveSearchBlock = false;
  private createSource = new BehaviorSubject<boolean>(false);
  public isA = this.createSource.asObservable();

  private editAuthor = new BehaviorSubject<boolean>(false);
  public isActiveAuthorDesc = this.editAuthor.asObservable();

  private createAuthor = new BehaviorSubject<boolean>(false);
  public isActiveCreateAuthor = this.createAuthor.asObservable();

  setBoolCreateBlock(val: boolean) {
    this.createSource.next(val);
  }
  setBoolEditAuthor(val: boolean) {
    this.editAuthor.next(val);
  }
  setBoolCreateAuthor(val: boolean) {
    this.createAuthor.next(val);
  }

}