import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCipStudentComponent } from './filter-cip-student.component';

describe('FilterCipStudentComponent', () => {
  let component: FilterCipStudentComponent;
  let fixture: ComponentFixture<FilterCipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterCipStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterCipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
