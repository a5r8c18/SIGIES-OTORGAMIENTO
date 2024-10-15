import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { CipStudent } from 'src/app/shared/models/CipStudent';

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
  @Output() infoFetched = new EventEmitter<CipStudent[]>();
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
      officialName: new FormControl(),
      officialLastName: new FormControl(),
      officialPosition: new FormControl(),
      officialAnnouncement: new FormControl(),
      officialProcessing: new FormControl(),
    });
  }
  get fc() {
    return this.officialForm.controls;
  }
  restore() {
    window.location.reload();
  }
  filter() {
    const isEmpty = Object.values(this.officialForm.value).every(
      (value) => !value,
    );
    let officialsObservable: Observable<Official[]>;

    if (isEmpty) {
      officialsObservable = this.officialService.getAll();
    } else {
      const fv = this.officialForm.value;
      const filters: unknown = {
        name: fv.officialName,
        lastname: fv.officialLastName,
        position: fv.officialPosition,
        // Convocatoria
        // Procesamiento
      };
      officialsObservable =
        this.officialService.getAllOfficialsBySearchTerm(filters);
    }
    // Emite la información al componente padre
    officialsObservable.subscribe((serverOfficials) => {
      this.infoFetched.emit(serverOfficials);
    });
  }
}
