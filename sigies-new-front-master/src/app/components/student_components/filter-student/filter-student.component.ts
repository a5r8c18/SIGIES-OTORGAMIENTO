import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-filter-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-student.component.html',
  styleUrl: './filter-student.component.css',
  template: `
    <button (click)="filter()">
      <span>Filtrar</span>
    </button>
  `,
})
export class FilterStudentComponent implements OnInit {
  @Output() infoFetched = new EventEmitter<Student[]>();
  students: Student[] = [];
  studentForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(),
      lastname: new FormControl(),
      ci_passport: new FormControl(),
      gender: new FormControl(),
      awarded_specialty: new FormControl(),
    });
  }
  get fc() {
    return this.studentForm.controls;
  }

  filter() {
    const isEmpty = Object.values(this.studentForm.value).every(
      (value) => !value,
    );
    let studentsObservable: Observable<Student[]>;

    if (isEmpty) {
      studentsObservable = this.studentService.getAll();
    } else {
      const sv = this.studentForm.value;
      const filters: Student = {
        authorization: '1',
        name: sv.name,
        lastname: sv.lastname,
        ci_passport: sv.ci_passport,
        awarded_specialty: sv.awarded_specialty,
        gender: sv.gender,
        address: 'sv.address',
        isforeign: false,
        country: 'sv.country',
        pre_university: 'sv.pre_university',
        entrance_exams: ['sv.entrance_exams'],
        academic_index: 1,
        grade_average: 1,
        scholarship_right: false,
        ces: 'sv.ces',
      };
      studentsObservable =
        this.studentService.getAllStudentsBySearchTerm(filters);
    }
    // Emite la información al componente padre
    studentsObservable.subscribe((serverStudents) => {
      this.infoFetched.emit(serverStudents);
    });
  }

  restore() {
    // window.location.reload();
    let studentsObservable: Observable<Student[]>;
    studentsObservable = this.studentService.getAll();

    studentsObservable.subscribe((studentService) => {
      this.infoFetched.emit(studentService);
    });
  }
}
