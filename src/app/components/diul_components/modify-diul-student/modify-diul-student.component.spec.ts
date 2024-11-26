import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDiulStudentComponent } from './modify-diul-student.component';

describe('ModifyDiulStudentComponent', () => {
  let component: ModifyDiulStudentComponent;
  let fixture: ComponentFixture<ModifyDiulStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyDiulStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyDiulStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
