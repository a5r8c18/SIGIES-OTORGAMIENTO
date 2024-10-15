import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDiulService } from 'src/app/services/student-diul.service';
import { DiulStudent } from 'src/app/shared/models/DiulStudent';
import { TableComponent } from '../../table/table.component';

@Component({
  selector: 'app-diul-student',
  standalone: true,
  imports: [NgFor, CommonModule, TableComponent],
  templateUrl: './diul-student.component.html',
  styleUrl: './diul-student.component.css',
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
export class DiulStudentComponent implements OnInit {
  includeLink = '/assignment/grant/include-diul-student';
  showLink = '/assignment/grant/show-diul-student/';
  modifyLink = '/assignment/grant/modify-diul-student/';
  removeLink = '/assignment/grant/remove-diul-student/';

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

  studentsDiul: DiulStudent[] = [];
  selectIds: string[] = [];
  information!: string;
  datas: { key: string; values: string[]; checked: boolean }[] = [];

  constructor(
    private studentDiulService: StudentDiulService,
    private router: Router,
  ) {
    const studentsObservable = studentDiulService.getAll();
    studentsObservable.subscribe((studentDiulService) => {
      this.studentsDiul = studentDiulService;
      this.datas = this.formattedStudents;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  get formattedStudents() {
    return this.studentsDiul.map((studentDiul) => ({
      key: studentDiul.id, // Puedes usar cualquier propiedad como clave
      student: studentDiul.student,
      values: [
        'Averiguar',
        'Averiguar',
        'Averiguar',
        studentDiul.student.authorization,
        'Averiguar',
        studentDiul.student.ci_passport,
        studentDiul.student.name,
        studentDiul.student.lastname,
        studentDiul.student.awarded_specialty,
      ],
      checked: false,
    }));
  }

  removeStudentByCi(ci_passport: string) {
    this.studentDiulService
      .removeByCi(ci_passport)
      .subscribe((studentDiulService) => {
        this.studentsDiul = studentDiulService;
        this.datas = this.formattedStudents;
      });
    this.information = 'Eliminacion realizada con éxito!';
  }

  removeStudentsSelected() {
    console.log('Cis seleccionados:', this.selectIds);

    this.studentDiulService
      .removeAllCheck(this.selectIds)
      .subscribe((studentDiulService) => {
        this.studentsDiul = studentDiulService;
        this.datas = this.formattedStudents;
      });
    this.information = 'Eliminacion por cantidad realizada con éxito!';
  }

  handleInfo(receivedInfo: DiulStudent[]) {
    this.studentsDiul = receivedInfo; // Guarda la información recibida
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
