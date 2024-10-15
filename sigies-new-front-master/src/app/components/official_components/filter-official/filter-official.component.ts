import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  // FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';

@Component({
  selector: 'app-filter-official',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-official.component.html',
  styleUrl: './filter-official.component.css',
  template: `
    <button (click)="filter()">
      <span>Filtrar</span>
    </button>
  `,
})
export class FilterOfficialComponent implements OnInit {
  @Output() infoFetched = new EventEmitter<Official[]>();
  officials: Official[] = [];
  officialForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private officialService: OfficialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.officialForm = new FormGroup({
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
