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
import { StudentDiulService } from 'src/app/services/student-diul.service';
import { StudentService } from 'src/app/services/student.service';
import { DiulStudent } from 'src/app/shared/models/DiulStudent';
import { Official } from 'src/app/shared/models/Official';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-include-diul-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './include-diul-student.component.html',
  styleUrl: './include-diul-student.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class IncludeDiulStudentComponent implements OnInit, AfterViewInit {
  action: string = 'insertar estudiante cip';
  done!: string;
  studentCi: string = '';
  confirm: boolean | undefined;
  diulStudents: DiulStudent[] = [];
  officials: Official[] = [];
  students: Student[] = [];
  newStudent!: DiulStudent;
  studentDiulForm!: FormGroup;
  isSubmitted = false;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentDiulService: StudentDiulService,
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
    this.studentDiulForm = this.formBuilder.group({
<<<<<<< HEAD
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
=======
      ci_passport: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      student_type: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      description: ['', [Validators.pattern(/^[a-zA-Z ]+$/)]],
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
      authorizing_officials: ['', []],
      commission: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      id_official: ['', [Validators.required]],
      student_of: [
        '',
<<<<<<< HEAD
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
=======
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
      ],
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

    const sv = this.studentDiulForm.value;

    if (!sv.authorizing_officials) {
      sv.authorizing_officials = false;
    }

    const diulStudent: DiulStudent = {
      id: '',
      ci_passport: sv.ci_passport,
      authorizing_officials: sv.authorizing_officials,
      commission: sv.commission,
      id_official: sv.id_official,
      description: sv.description,
      student_type: sv.student_type,
      student_of: sv.student_of,
    };

    this.studentDiulService
      .include(diulStudent)
      .subscribe((studentDiulService) => {
        console.log(studentDiulService);
        this.diulStudents = studentDiulService;
      });

    this.mensaje = 'Ingreso realizado con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    // setTimeout(() => {
    //   this.mostrarMensaje = false;
    // }, 3000);
    this.router.navigateByUrl('/assignment/grant/diul-student', {
      state: { data: this.mensaje },
    });
  }

  studentList(): void {
    this.router.navigateByUrl('/assignment/grant/diul-student', {
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

  includeStudentDiulContinue() {
    this.isSubmitted = true;
    if (this.studentDiulForm.invalid) return;

    this.includeStudent();
    // window.location.reload(               );
  }

  includeStudentDiulEnd(): void {
    this.isSubmitted = true;
    if (this.studentDiulForm.invalid) return;

    this.includeStudent();
    this.router.navigateByUrl('/assignment/grant/diul-student', {
      state: { data: this.mensaje },
    });
  }
}
