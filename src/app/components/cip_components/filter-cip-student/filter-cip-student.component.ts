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
import { StudentCipService } from 'src/app/services/student-cip.service';
import { CipStudent } from 'src/app/shared/models/CipStudent';
import { CombinedData } from 'src/app/shared/models/CombinedData';

@Component({
  selector: 'app-filter-cip-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-cip-student.component.html',
  styleUrl: './filter-cip-student.component.css',
  template: `
    <button (click)="filter()">
      <span>Filtrar</span>
    </button>
  `,
})
export class FilterCipStudentComponent implements OnInit {
  @Output() infoFetched = new EventEmitter<CombinedData[]>();
  cipStudent: CipStudent[] = [];
  cipStudentForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private cipStudentService: StudentCipService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.cipStudentForm = new FormGroup({
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
    return this.cipStudentForm.controls;
  }
  restore() {
    // window.location.reload();
    let studentsObservable: Observable<CombinedData[]>;
    studentsObservable = this.cipStudentService.getAll();

    studentsObservable.subscribe((studentService) => {
      this.infoFetched.emit(studentService);
    });
  }
  filter() {
    const isEmpty = Object.values(this.cipStudentForm.value).every(
      (value) => !value,
    );
    let studentsObservable: Observable<CombinedData[]>;

    if (isEmpty) {
      studentsObservable = this.cipStudentService.getAll();
    } else {
      const fv = this.cipStudentForm.value;
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
        this.cipStudentService.getAllStudentsBySearchTerm(filters);
    }

    // Emite la información al componente padre
    studentsObservable.subscribe((serverStudents) => {
      this.infoFetched.emit(serverStudents);
    });
  }
}
