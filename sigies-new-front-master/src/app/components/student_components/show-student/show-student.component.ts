import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-show-student',
  standalone: true,
  imports: [],
  templateUrl: './show-student.component.html',
  styleUrl: './show-student.component.css',
})
export class ShowStudentComponent implements OnInit {
  student!: Student;
  constructor(
    studentService: StudentService,
    private router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.ci_passport)
        studentService
          .getAllStudentsByCi(params.ci_passport)
          .subscribe((serverStudent) => {
            this.student = serverStudent;
          });
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  modifyStudent(ci_passport: string) {
    this.router.navigateByUrl(
      '/assignment/grant/modify-student/' + ci_passport,
    );
  }
  includeStudent() {
    this.router.navigateByUrl('/assignment/grant/include-student');
  }
  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/student');
  }
}
