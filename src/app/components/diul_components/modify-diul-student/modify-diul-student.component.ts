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
import { CombinedData } from 'src/app/shared/models/CombinedData';
import { DiulStudent } from 'src/app/shared/models/DiulStudent';
import { Official } from 'src/app/shared/models/Official';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-modify-diul-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modify-diul-student.component.html',
  styleUrl: './modify-diul-student.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class ModifyDiulStudentComponent implements OnInit, AfterViewInit {
  action: string = 'modificar estudiante cip';
  done!: string;
  studentCi: string = '';
  confirm: boolean | undefined;
  diulStudents: CombinedData[] = [];
  officials: Official[] = [];
  students: Student[] = [];
  newStudent!: DiulStudent;
  studentDiulForm!: FormGroup;
  isSubmitted = false;
  diulStudent!: CombinedData;

  idCip!: string;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentCipService: StudentDiulService,
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
    this.loadStudentData();
    this.initializeForm();
  }

  initializeForm() {
    this.studentDiulForm = this.formBuilder.group({
      ci_passport: [this.diulStudent?.ci_passport || '', [Validators.required]],
      student_type: [
        this.diulStudent?.student_type || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      description: [this.diulStudent?.description || ''],
      authorizing_officials: [
        this.diulStudent?.authorizing_officials || '',
        [],
      ],
      commission: [
        this.diulStudent?.commission || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      id_official: [this.diulStudent?.id_official || '', [Validators.required]],
      student_of: [
        this.diulStudent?.student_of || '',
        Validators.pattern(
          /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
        ),
      ],
    });
  }

  loadStudentData() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.ci_passport) {
        this.idCip = params.ci_passport;
        this.studentCipService
          .getAllStudentsById(params.ci_passport)
          .subscribe((serverStudent) => {
            console.log(serverStudent);
            this.diulStudent = serverStudent;
            this.initializeForm();
          });
      }
    });
  }

  modifyStudent() {
    this.isSubmitted = true;
    console.log(this.studentDiulForm);
    if (this.studentDiulForm.invalid) return;

    if (this.studentDiulForm.valid) {
      console.log('Formulario válido:', this.studentDiulForm.value);
    } else {
      console.log('Formulario inválido');
    }
    const sv = this.studentDiulForm.value;

    if (!sv.authorizing_officials) {
      sv.authorizing_officials = false;
    }

    const diulStudent: DiulStudent = {
      id: this.idCip,
      ci_passport: sv.ci_passport,
      authorizing_officials: sv.authorizing_officials,
      commission: sv.commission,
      id_official: sv.id_official,
      description: sv.description,
      student_type: sv.student_type,
      student_of: sv.student_of,
    };
    console.log(diulStudent);
    this.studentCipService
      .modify(diulStudent)
      .subscribe((studentDiulService) => {
        this.diulStudents = studentDiulService;
      });

    this.mensaje = 'Ingreso realizado con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);

    this.router.navigateByUrl('/assignment/grant/cip-student', {
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
}
