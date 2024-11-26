import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-include-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './include-student.component.html',
  styleUrl: './include-student.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class IncludeStudentComponent implements OnInit, AfterViewInit {
  action: string = 'insertar estudiante';
  done!: string;
  studentCi: string = '';
  confirm: boolean | undefined;
  students: Student[] = [];
  newStudent!: Student;
  studentForm!: FormGroup;
  isSubmitted = false;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      ci_passport: ['', [Validators.required]],
      awarded_specialty: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      isforeign: ['', []],
      country: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      pre_university: ['', [Validators.required]],
      entrance_exams: this.formBuilder.array([]), // Cambiado a FormArray
      academic_index: ['', [Validators.required]],
      grade_average: ['', [Validators.required]],
      scholarship_right: ['', []],
      ces: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
    });
  }

  onCheckboxChange(e: any) {
    const entranceExams: FormArray = this.studentForm.get(
      'entrance_exams',
    ) as FormArray;

    if (e.target.checked) {
      console.log('si ' + e.target.value);
      entranceExams.push(this.formBuilder.control(e.target.value));
    } else {
      console.log('no ' + e.target.value);
      const index = entranceExams.controls.findIndex(
        (x) => x.value === e.target.value,
      );
      entranceExams.removeAt(index);
    }
  }

  includeStudent() {
    this.isSubmitted = true;
    if (this.studentForm.invalid) return;

    if (this.studentForm.valid) {
      console.log('Formulario válido:', this.studentForm.value);
    } else {
      console.log('Formulario inválido');
    }

    const sv = this.studentForm.value;

    if (!sv.isforeign) {
      sv.isforeign = false;
    }
    if (!sv.scholarship_right) {
      sv.scholarship_right = false;
    }

    // console.log(sv.entrance_exams               );
    // console.log(sv.isforeign               );
    // console.log(sv.gender               );
    // console.log(sv.scholarship_right               );

    const student: Student = {
      authorization: '1',
      name: sv.name,
      lastname: sv.lastname,
      ci_passport: sv.ci_passport,
      awarded_specialty: sv.awarded_specialty,
      gender: sv.gender,
      address: sv.address,
      isforeign: sv.isforeign,
      country: sv.country,
      pre_university: sv.pre_university,
      entrance_exams: sv.entrance_exams,
      academic_index: sv.academic_index,
      grade_average: sv.grade_average,
      scholarship_right: sv.scholarship_right,
      ces: sv.ces,
    };

    this.studentService.include(student).subscribe((serverStudent) => {
      this.students = serverStudent;
    });

    this.mensaje = 'Ingreso realizado con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);

    this.router.navigateByUrl('/assignment/grant/student', {
      state: { data: this.mensaje },
    });
  }

  // includeStudentContinue() {
  //   this.isSubmitted = true;
  //   if (this.studentForm.invalid) return;

  //   console.warn(this.studentForm.value               );
  //   this.includeStudent(               );
  //   this.router.navigateByUrl('/assignment/grant/include-student'               );
  // }
  // includeStudentEnd(): void {
  //   this.isSubmitted = true;
  //   if (this.studentForm.invalid) return;

  //   this.includeStudent(               );
  //   console.warn(this.studentForm.value               );
  //   this.router.navigateByUrl('/assignment/grant/student'               );
  // }

  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/student', {
      state: { data: 'La acción ha sido cancelada.' },
    });
  }
  ngAfterViewInit() {
    this.loadScript('assets/js/validation.js');
  }

  loadScript(src: string) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      console.log('Script loaded successfully');
    };
    document.body.appendChild(script);
  }
}
