import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDiulService } from 'src/app/services/student-diul.service';
import { CombinedData } from 'src/app/shared/models/CombinedData';

@Component({
  selector: 'app-show-diul-student',
  standalone: true,
  imports: [],
  templateUrl: './show-diul-student.component.html',
  styleUrl: './show-diul-student.component.css',
})
export class ShowDiulStudentComponent implements OnInit {
  student!: CombinedData;
  constructor(
    studentService: StudentDiulService,
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
    this.router.navigateByUrl('/assignment/grant/modify-diul-student/' + id);
  }
  includeStudent() {
    this.router.navigateByUrl('/assignment/grant/include-diul-student');
  }
  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/diul-student');
  }
}
