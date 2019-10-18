import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromsForCreateBookComponent } from './froms-for-create-book.component';

describe('FromsForCreateBookComponent', () => {
  let component: FromsForCreateBookComponent;
  let fixture: ComponentFixture<FromsForCreateBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromsForCreateBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromsForCreateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
