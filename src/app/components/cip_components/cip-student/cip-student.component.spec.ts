import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipStudentComponent } from './cip-student.component';

describe('CipStudentComponent', () => {
  let component: CipStudentComponent;
  let fixture: ComponentFixture<CipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CipStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
