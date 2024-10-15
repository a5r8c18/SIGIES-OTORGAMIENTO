import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { CipStudent } from 'src/app/shared/models/CipStudent';

@Component({
  selector: 'app-include-cip-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './include-cip-student.component.html',
  styleUrl: './include-cip-student.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class IncludeCipStudentComponent implements OnInit, AfterViewInit {
  action: string = 'insertar estudiante cip';
  done!: string;
  studentCi: string = '';
  confirm: boolean | undefined;
  students: CipStudent[] = [];
  newStudent!: CipStudent;
  studentForm!: FormGroup;
  isSubmitted = false;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentCipService: StudentCipService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      ci_passport: ['', [Validators.required]],
      awarded_specialty: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      foreign: ['', []],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      pre_university: ['', [Validators.required]],
      entrance_exams: ['', [Validators.required]],
      academic_index: ['', [Validators.required]],
      grade_average: ['', [Validators.required]],
      scholarship_right: ['', []],
      ces: ['', [Validators.required]],
    });
  }

  includeStudent() {
    this.isSubmitted = true;
    if (this.studentForm.invalid) return;

    if (this.studentForm.valid) {
      console.log('Formulario válido:', this.studentForm.value);
    } else {
      console.log('Formulario inválido');
    }

    // const sv = this.studentForm.value;
    // const student: CipStudent = {
    //   id: '1',
    //   name: sv.name,
    //   lastname: sv.lastname,
    //   ci_passport: sv.ci_passport,
    //   awarded_specialty: sv.awarded_specialty,
    //   gender: sv.gender,
    //   address: sv.address,
    //   foreign: sv.foreign,
    //   country: sv.country,
    //   pre_university: sv.pre_university,
    //   entrance_exams: sv.entrance_exams,
    //   academic_index: sv.academic_index,
    //   grade_average: sv.grade_average,
    //   scholarship_right: sv.scholarship_right,
    //   ces: sv.ces,
    // };

    // this.studentCipService.include(student).subscribe((serverStudent) => {
    //   this.students = serverStudent;
    // });

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

  //   console.warn(this.studentForm.value);
  //   this.includeStudent();
  //   this.router.navigateByUrl('/assignment/grant/include-student');
  // }
  // includeStudentEnd(): void {
  //   this.isSubmitted = true;
  //   if (this.studentForm.invalid) return;

  //   this.includeStudent();
  //   console.warn(this.studentForm.value);
  //   this.router.navigateByUrl('/assignment/grant/student');
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