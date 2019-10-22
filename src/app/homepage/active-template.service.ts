import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActiveTemplateService {

  public isActiveChangeBlock = false;
  public isActiveSearchBlock = false;

  private createSource = new BehaviorSubject<boolean>(false);
  public isA = this.createSource.asObservable();

  setBoolCreateBlock(val: boolean) {
    this.createSource.next(val);
  }
}
