import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCipStudentComponent } from './remove-cip-student.component';

describe('RemoveCipStudentComponent', () => {
  let component: RemoveCipStudentComponent;
  let fixture: ComponentFixture<RemoveCipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveCipStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveCipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
