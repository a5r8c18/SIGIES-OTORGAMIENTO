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
import { CombinedData } from 'src/app/shared/models/CombinedData';
import { Official } from 'src/app/shared/models/Official';
import { Student } from 'src/app/shared/models/Student';

@Component({
  selector: 'app-modify-cip-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modify-cip-student.component.html',
  styleUrl: './modify-cip-student.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class ModifyCipStudentComponent implements OnInit, AfterViewInit {
  action: string = 'modificar estudiante cip';
  done!: string;
  studentCi: string = '';
  confirm: boolean | undefined;
  cipStudents: CombinedData[] = [];
  officials: Official[] = [];
  students: Student[] = [];
  newStudent!: CipStudent;
  studentCipForm!: FormGroup;
  isSubmitted = false;
  cipStudent!: CombinedData;

  idCip!: string;

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
    this.loadStudentData();
    this.initializeForm();
  }

  initializeForm() {
    this.studentCipForm = this.formBuilder.group({
      ci_passport: [this.cipStudent?.ci_passport || '', [Validators.required]],
      student_type: [
        this.cipStudent?.student_type || '',
<<<<<<< HEAD
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      description: [this.cipStudent?.description || ''],
=======
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      description: [
        this.cipStudent?.description || '',
        [Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
      authorizing_officials: [this.cipStudent?.authorizing_officials || '', []],
      commission: [
        this.cipStudent?.commission || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      id_official: [this.cipStudent?.id_official || '', [Validators.required]],
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
            this.cipStudent = serverStudent;
            this.initializeForm();
          });
      }
    });
  }

  modifyStudent() {
    this.isSubmitted = true;
    console.log(this.studentCipForm);
    if (this.studentCipForm.invalid) return;

    if (this.studentCipForm.valid) {
      console.log('Formulario válido:', this.studentCipForm.value);
    } else {
      console.log('Formulario inválido');
    }
    const sv = this.studentCipForm.value;

    if (!sv.authorizing_officials) {
      sv.authorizing_officials = false;
    }

    const cipStudent: CipStudent = {
      id: this.idCip,
      ci_passport: sv.ci_passport,
      authorizing_officials: sv.authorizing_officials,
      commission: sv.commission,
      id_official: sv.id_official,
      description: sv.description,
      student_type: sv.student_type,
    };
    console.log(cipStudent);
    this.studentCipService.modify(cipStudent).subscribe((studentCipService) => {
      this.cipStudents = studentCipService;
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
