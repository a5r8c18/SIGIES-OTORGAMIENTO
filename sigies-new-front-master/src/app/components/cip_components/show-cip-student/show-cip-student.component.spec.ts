import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCipStudentComponent } from './show-cip-student.component';

describe('ShowCipStudentComponent', () => {
  let component: ShowCipStudentComponent;
  let fixture: ComponentFixture<ShowCipStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCipStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCipStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
