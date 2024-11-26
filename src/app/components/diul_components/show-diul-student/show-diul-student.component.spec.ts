import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiulStudentComponent } from './show-diul-student.component';

describe('ShowDiulStudentComponent', () => {
  let component: ShowDiulStudentComponent;
  let fixture: ComponentFixture<ShowDiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDiulStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowDiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
