import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDiulStudentComponent } from './remove-diul-student.component';

describe('RemoveDiulStudentComponent', () => {
  let component: RemoveDiulStudentComponent;
  let fixture: ComponentFixture<RemoveDiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveDiulStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveDiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
