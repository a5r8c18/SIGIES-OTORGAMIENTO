import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeStudentComponent } from './include-student.component';

describe('IncludeStudentComponent', () => {
  let component: IncludeStudentComponent;
  let fixture: ComponentFixture<IncludeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncludeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
