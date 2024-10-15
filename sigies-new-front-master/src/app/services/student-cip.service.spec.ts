import { TestBed } from '@angular/core/testing';

import { StudentCipService } from './student-cip.service';

describe('StudentCipService', () => {
  let service: StudentCipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
