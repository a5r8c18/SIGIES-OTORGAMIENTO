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
  selector: 'app-modify-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modify-student.component.html',
  styleUrl: './modify-student.component.css',
})
export class ModifyStudentComponent implements OnInit, AfterViewInit {
  student!: Student;
  newStudent!: Student;
  studentForm!: FormGroup;
  isSubmitted = false;

  entranceExams: string[] = [];

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.loadStudentData();
    this.initializeForm();
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

  // Función para verificar si un examen está en entranceExams
  // isExamSelected(exam: string): boolean {
  //   const entranceExams = this.student?.entrance_exams;
  //   return entranceExams.includes(exam               );
  // }

  loadStudentData() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.ci_passport)
        this.studentService
          .getAllStudentsByCi(params.ci_passport)
          .subscribe((serverStudent) => {
            this.student = serverStudent;
            this.initializeForm();
          });
    });
  }

  initializeForm() {
    this.studentForm = this.formBuilder.group({
      name: [
        this.student?.name || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      lastname: [
        this.student?.lastname || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      ci_passport: [this.student?.ci_passport || '', [Validators.required]],
      awarded_specialty: [
        this.student?.awarded_specialty || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      gender: [this.student?.gender || '', [Validators.required]],
      address: [this.student?.address || '', [Validators.required]],
      isforeign: [this.student?.isforeign || '', []],
      country: [
        this.student?.country || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
      pre_university: [
        this.student?.pre_university || '',
        [Validators.required],
      ],
      entrance_exams: this.formBuilder.array(
        this.student?.entrance_exams || [],
      ),
      academic_index: [
        this.student?.academic_index || '',
        [Validators.required],
      ],
      grade_average: [this.student?.grade_average || '', [Validators.required]],
      scholarship_right: [this.student?.scholarship_right || '', []],
      ces: [
        this.student?.ces || '',
        [
          Validators.required,
          Validators.pattern(
            /^(?! )[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/,
          ),
        ],
      ],
    });

    this.entranceExams = this.studentForm.value.entrance_exams;
  }

  modifyStudent() {
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

    this.studentService
      .modify(student, this.student?.ci_passport)
      .subscribe((serverStudent) => {
        this.student = serverStudent;
      });

    this.mensaje = 'Modificacion realizada con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }

  modifyStudentContinue() {
    this.isSubmitted = true;
    if (this.studentForm.invalid) return;

    console.warn(this.studentForm.value);
    this.modifyStudent();
  }
  modifyStudentEnd(): void {
    this.isSubmitted = true;
    if (this.studentForm.invalid) return;

    this.modifyStudent();
    console.warn(this.studentForm.value);
    this.router.navigateByUrl('/assignment/grant/student', {
      state: { data: this.mensaje },
    });
  }

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
