import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeDiulStudentComponent } from './include-diul-student.component';

describe('IncludeDiulStudentComponent', () => {
  let component: IncludeDiulStudentComponent;
  let fixture: ComponentFixture<IncludeDiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeDiulStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncludeDiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
