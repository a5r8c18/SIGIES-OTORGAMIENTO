import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficialService } from 'src/app/services/official.service';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { StudentService } from 'src/app/services/student.service';
import { CipStudent } from 'src/app/shared/models/CipStudent';
import { Official } from 'src/app/shared/models/Official';
import { Student } from 'src/app/shared/models/Student';

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
  cipStudents: CipStudent[] = [];
  officials: Official[] = [];
  students: Student[] = [];
  newStudent!: CipStudent;
  studentCipForm!: FormGroup;
  isSubmitted = false;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentCipService: StudentCipService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private officialService: OfficialService,
  ) {
    this.getOfficials();
    this.getStudents();
  }
  getOfficials(): void {
    const officialsObservable = this.officialService.getAll();
    officialsObservable.subscribe((serverOfficials) => {
      this.officials = serverOfficials;
    });
  }
  getStudents(): void {
    const studentsObservable = this.studentService.getAll();
    studentsObservable.subscribe((studentService) => {
      this.students = studentService;
    });
  }

  ngOnInit(): void {
    this.studentCipForm = this.formBuilder.group({
      ci_passport: ['', [Validators.required]],
      student_type: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      description: [''],
      authorizing_officials: ['', []],
      commission: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      id_official: ['', [Validators.required]],
    });
  }

  includeStudent() {
    // console.log(this.studentDiulForm               );
    // if (this.studentDiulForm.invalid) return;

    // if (this.studentDiulForm.valid) {
    //   console.log('Formulario válido:', this.studentDiulForm.value               );
    // } else {
    //   console.log('Formulario inválido'               );
    // }

    const sv = this.studentCipForm.value;

    if (!sv.authorizing_officials) {
      sv.authorizing_officials = false;
    }

    const diulStudent: CipStudent = {
      id: '',
      ci_passport: sv.ci_passport,
      authorizing_officials: sv.authorizing_officials,
      commission: sv.commission,
      id_official: sv.id_official,
      description: sv.description,
      student_type: sv.student_type,
    };

    this.studentCipService
      .include(diulStudent)
      .subscribe((studentCipService) => {
        console.log(studentCipService);
        this.cipStudents = studentCipService;
      });

    this.mensaje = 'Ingreso realizado con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    // setTimeout(() => {
    //   this.mostrarMensaje = false;
    // }, 3000);
    // this.router.navigateByUrl('/assignment/grant/cip-student', {
    //   state: { data: this.mensaje },
    // });
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

  includeStudentCipEnd(): void {
    this.isSubmitted = true;
    console.log('ggggggggggggg');
    console.log('aaaaaaaa');
    if (this.studentCipForm.invalid) return;
    console.log('ggggggggggggg');
    this.includeStudent();
    this.router.navigateByUrl('/assignment/grant/cip-student', {
      state: { data: this.mensaje },
    });
  }

  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/cip-student', {
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
