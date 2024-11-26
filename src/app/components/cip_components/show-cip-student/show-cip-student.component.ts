import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { CombinedData } from 'src/app/shared/models/CombinedData';

@Component({
  selector: 'app-show-cip-student',
  standalone: true,
  imports: [],
  templateUrl: './show-cip-student.component.html',
  styleUrl: './show-cip-student.component.css',
})
export class ShowCipStudentComponent implements OnInit {
  student!: CombinedData;
  constructor(
    studentService: StudentCipService,
    private router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.ci_passport)
        studentService
          .getAllStudentsById(params.ci_passport)
          .subscribe((serverStudent) => {
            this.student = serverStudent;
          });
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  modifyStudent(id: string) {
    this.router.navigateByUrl('/assignment/grant/modify-cip-student/' + id);
  }
  includeStudent() {
    this.router.navigateByUrl('/assignment/grant/include-cip-student');
  }
  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/cip-student');
  }
}
