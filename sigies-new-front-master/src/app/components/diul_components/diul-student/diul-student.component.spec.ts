import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiulStudentComponent } from './diul-student.component';

describe('DiulStudentComponent', () => {
  let component: DiulStudentComponent;
  let fixture: ComponentFixture<DiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiulStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
