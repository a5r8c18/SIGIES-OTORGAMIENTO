import { TestBed } from '@angular/core/testing';

import { StudentDiulService } from './student-diul.service';

describe('StudentDiulService', () => {
  let service: StudentDiulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDiulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
