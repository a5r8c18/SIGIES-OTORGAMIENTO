import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { CipStudent } from 'src/app/shared/models/CipStudent';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-cip-student',
  standalone: true,
  imports: [NgFor, CommonModule, TableComponent],
  templateUrl: './cip-student.component.html',
  styleUrl: './cip-student.component.css',
  template: `
    <app-table
      [columns]="columns"
      [datas]="datas"
      [information]="information"
      [includeLink]="includeLink"
      [showLink]="showLink"
      [modifyLink]="modifyLink"
      [removeLink]="removeLink"
      (confirmed)="confirmHandleInfo($event)"
      (infoFetched)="handleInfo($event)"
    ></app-table>
  `,
})
export class CipStudentComponent implements OnInit {
  includeLink = '/assignment/grant/include-cip-student';
  showLink = '/assignment/grant/show-cip-student/';
  modifyLink = '/assignment/grant/modify-cip-student/';
  removeLink = '/assignment/grant/remove-cip-student/';

  columns: string[] = [
    'Comisión',
    'Convocatoria',
    'Procesamiento',
    'Autorización',
    'Funcionario que autoriza',
    'Carné de identidad',
    'Nombre(s)',
    'Apellidos',
    'Carrera',
    'Acciones',
  ];

  studentsCip: CipStudent[] = [];
  selectIds: string[] = [];
  information!: string;
  datas: { key: string; values: string[]; checked: boolean }[] = [];

  constructor(
    private studentCipService: StudentCipService,
    private router: Router,
  ) {
    const studentsObservable = studentCipService.getAll();
    studentsObservable.subscribe((studentCipService) => {
      this.studentsCip = studentCipService;
      this.datas = this.formattedStudents;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  get formattedStudents() {
    return this.studentsCip.map((studentCip) => ({
      key: studentCip.id, // Puedes usar cualquier propiedad como clave
      student: studentCip.student,
      values: [
        'Averiguar',
        'Averiguar',
        'Averiguar',
        studentCip.student.authorization,
        'Averiguar',
        studentCip.student.ci_passport,
        studentCip.student.name,
        studentCip.student.lastname,
        studentCip.student.awarded_specialty,
      ],
      checked: false,
    }));
  }

  removeStudentByCi(ci_passport: string) {
    this.studentCipService
      .removeByCi(ci_passport)
      .subscribe((studentCipService) => {
        this.studentsCip = studentCipService;
        this.datas = this.formattedStudents;
      });
    this.information = 'Eliminacion realizada con éxito!';
  }

  removeStudentsSelected() {
    console.log('Cis seleccionados:', this.selectIds);

    this.studentCipService
      .removeAllCheck(this.selectIds)
      .subscribe((studentService) => {
        this.studentsCip = studentService;
        this.datas = this.formattedStudents;
      });
    this.information = 'Eliminacion por cantidad realizada con éxito!';
  }

  handleInfo(receivedInfo: CipStudent[]) {
    this.studentsCip = receivedInfo; // Guarda la información recibida
  }
  confirmHandleInfo(data: {
    confirm: boolean;
    selectKey: string;
    action: string;
    selectKeys: string[];
  }) {
    if (data.confirm) {
      if (data.action === 'eliminar') {
        this.removeStudentByCi(data.selectKey);
      } else if (data.action === 'eliminar por cantidad') {
        this.selectIds = data.selectKeys;
        this.removeStudentsSelected();
      }
    }
  }
}
