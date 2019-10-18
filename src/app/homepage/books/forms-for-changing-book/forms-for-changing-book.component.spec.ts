import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsForChangingBookComponent } from './forms-for-changing-book.component';

describe('FormsForChangingBookComponent', () => {
  let component: FormsForChangingBookComponent;
  let fixture: ComponentFixture<FormsForChangingBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsForChangingBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsForChangingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
