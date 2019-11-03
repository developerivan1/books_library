import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsForCreateAuthorComponent } from './forms-for-create-author.component';

describe('FormsForCreateAuthorComponent', () => {
  let component: FormsForCreateAuthorComponent;
  let fixture: ComponentFixture<FormsForCreateAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsForCreateAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsForCreateAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
