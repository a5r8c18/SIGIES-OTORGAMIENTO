import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStudentComponent } from './filter-student.component';

describe('FilterStudentComponent', () => {
  let component: FilterStudentComponent;
  let fixture: ComponentFixture<FilterStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
