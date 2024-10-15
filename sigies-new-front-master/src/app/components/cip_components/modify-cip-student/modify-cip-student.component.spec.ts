import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCipStudentComponent } from './modify-cip-student.component';

describe('ModifyCipStudentComponent', () => {
  let component: ModifyCipStudentComponent;
  let fixture: ComponentFixture<ModifyCipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCipStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
