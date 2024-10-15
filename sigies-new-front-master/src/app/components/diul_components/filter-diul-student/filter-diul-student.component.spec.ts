import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDiulStudentComponent } from './filter-diul-student.component';

describe('FilterDiulStudentComponent', () => {
  let component: FilterDiulStudentComponent;
  let fixture: ComponentFixture<FilterDiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDiulStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterDiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
