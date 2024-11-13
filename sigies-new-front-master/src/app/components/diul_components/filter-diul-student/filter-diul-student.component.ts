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
import { StudentDiulService } from 'src/app/services/student-diul.service';
import { DiulStudent } from 'src/app/shared/models/DiulStudent';

@Component({
  selector: 'app-filter-diul-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-diul-student.component.html',
  styleUrl: './filter-diul-student.component.css',
  template: `
    <button (click)="filter()">
      <span>Filtrar</span>
    </button>
  `,
})
export class FilterDiulStudentComponent implements OnInit {
  @Output() infoFetched = new EventEmitter<DiulStudent[]>();
  diulStudent: DiulStudent[] = [];
  diulStudentForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private diulStudentService: StudentDiulService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.diulStudentForm = new FormGroup({
      name: new FormControl(),
      lastname: new FormControl(),
      ci_passport: new FormControl(),
      awarded_specialty: new FormControl(),
      authorizing_officials: new FormControl(),
      commission: new FormControl(),
      convocation: new FormControl(),
      prosecution: new FormControl(),
      official_name: new FormControl(),
    });
  }

  get fc() {
    return this.diulStudentForm.controls;
  }
  restore() {
    // window.location.reload();
    let studentsObservable: Observable<DiulStudent[]>;
    studentsObservable = this.diulStudentService.getAll();

    studentsObservable.subscribe((studentService) => {
      this.infoFetched.emit(studentService);
    });
  }
  filter() {
    const isEmpty = Object.values(this.diulStudentForm.value).every(
      (value) => !value,
    );
    let studentsObservable: Observable<DiulStudent[]>;

    if (isEmpty) {
      studentsObservable = this.diulStudentService.getAll();
    } else {
      const fv = this.diulStudentForm.value;
      const filters: unknown = {
        name: fv.name,
        lastname: fv.lastname,
        ci_passport: fv.ci_passport,
        awarded_specialty: fv.awarded_specialty,
        authorizing_officials: fv.authorizing_officials,
        commission: fv.commission,
        convocation: fv.convocation,
        prosecution: fv.prosecution,
        official_name: fv.official_name,
      };
      studentsObservable =
        this.diulStudentService.getAllStudentsBySearchTerm(filters);
    }
    // Emite la información al componente padre
    studentsObservable.subscribe((serverStudents) => {
      this.infoFetched.emit(serverStudents);
    });
  }
}
