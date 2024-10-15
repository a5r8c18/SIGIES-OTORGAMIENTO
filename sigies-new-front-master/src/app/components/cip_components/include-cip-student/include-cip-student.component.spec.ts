import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeCipStudentComponent } from './include-cip-student.component';

describe('IncludeCipStudentComponent', () => {
  let component: IncludeCipStudentComponent;
  let fixture: ComponentFixture<IncludeCipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncludeCipStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncludeCipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
