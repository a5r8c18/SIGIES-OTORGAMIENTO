import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [NgFor, CommonModule, TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  template: `
    <app-table
      [columns]="columns"
      [datas]="datas"
      [information]="information"
      [includeLink]="includeLink"
      [showLink]="showLink"
      [modifyLink]="modifyLink"
      [removeLink]="removeLink"
      [table_name]="table_name"
      (confirmed)="confirmHandleInfo($event)"
      (infoFetched)="handleInfo($event)"
    ></app-table>
  `,
})
export class StudentComponent implements OnInit {
  includeLink = '/assignment/grant/include-student';
  showLink = '/assignment/grant/show-student/';
  modifyLink = '/assignment/grant/modify-student/';
  removeLink = '/assignment/grant/remove-student/';
  table_name = 'Estudiantes';

  columns: string[] = [
    'Autorización',
    'CI/Pasaporte',
    'Nombre(s)',
    'Apellidos',
    'Carrera',
    'Acciones',
  ];

  students: Student[] = [];
  selectCiPassports: string[] = [];
  information!: string;
  datas: {
    key: string;
    values: string[];
    checked: boolean;
  }[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {
    const studentsObservable = studentService.getAll();
    studentsObservable.subscribe((studentService) => {
      this.students = studentService;
      this.datas = this.formattedStudents;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  get formattedStudents() {
    return this.students.map((student) => ({
      key: student.ci_passport, // Puedes usar cualquier propiedad como clave
      values: [
        // student.authorization,
        'Autorizo del Estudiante',
        student.ci_passport,
        student.name,
        student.lastname,
        student.awarded_specialty,
      ],
      checked: false,
    }));
  }

  removeStudentByCi(ci_passport: string) {
    this.studentService.removeByCi(ci_passport).subscribe((studentService) => {
      this.students = studentService;
      this.datas = this.formattedStudents;
      this.information = 'Eliminación realizada con éxito!';
      this.router.navigateByUrl('/assignment/grant/student');
    });
<<<<<<< HEAD
=======
    this.information = 'Eliminación realizada con éxito!';
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  }

  removeStudentsSelected() {
    console.log('Cis seleccionados:', this.selectCiPassports);

    this.studentService
      .removeAllCheck(this.selectCiPassports)
      .subscribe((studentService) => {
        this.students = studentService;
        this.datas = this.formattedStudents;

        this.router.navigateByUrl('/assignment/grant/student');
      });
<<<<<<< HEAD
    this.information = 'Eliminación realizada con éxito!';
=======
    this.information = 'Eliminación por lote realizada con éxito!';
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  }

  handleInfo(receivedInfo: Student[]) {
    this.students = receivedInfo; // Guarda la información recibida
    this.datas = this.formattedStudents;
  }
  confirmHandleInfo(data: {
    confirm: boolean;
    selectKey: string;
    action: string;
    selectKeys: string[];
  }) {
    if (data.confirm) {
      if (data.action === 'Eliminar') {
        this.removeStudentByCi(data.selectKey);
<<<<<<< HEAD
      } else if (data.action === 'Eliminar por lote') {
=======
      } else if (data.action === 'eliminar por lote') {
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
        this.selectCiPassports = data.selectKeys;
        this.removeStudentsSelected();
      }
    }
  }
}
