import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentCipService } from 'src/app/services/student-cip.service';
import { TableComponent } from '../../table/table.component';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';
import { CombinedData } from 'src/app/shared/models/CombinedData';

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
      [table_name]="table_name"
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
  table_name = 'Estudiantes Cip';

  columns: string[] = [
    'Comisión',
    'Convocatoria',
    'Procesamiento',
    'Autorización',
    'Funcionario que autoriza',
    'CI/Pasaporte',
    'Nombre(s)',
    'Apellidos',
    'Carrera',
    'Acciones',
  ];

  studentsCip: CombinedData[] = [];
  official!: Official;
  student!: Student;
  selectIds: string[] = [];
  information!: string;
  datas: {
    key: string;
    values: string[];
    checked: boolean;
  }[] = [];

  constructor(
    private studentCipService: StudentCipService,
    private router: Router,
    private officialService: OfficialService,
    private studentService: StudentService,
  ) {}
  ngOnInit(): void {
    const studentsObservable = this.studentCipService.getAll();
    studentsObservable.subscribe((studentCipService) => {
      this.studentsCip = studentCipService;
      this.datas = this.formattedStudents;
    });
  }
  get formattedStudents() {
    if (!this.studentsCip || this.studentsCip.length === 0) {
      return []; // Retorna un arreglo vacío si no hay estudiantes
    }

    return this.studentsCip.map((studentCip) => ({
      key: studentCip.id, // Puedes usar cualquier propiedad como clave
      values: [
        studentCip.commission,
        studentCip.convocation,
        studentCip.prosecution,
        this.changeBoolean(studentCip.authorizing_officials),
        studentCip.official_name,
        studentCip.ci_passport,
        studentCip.name,
        studentCip.lastname,
        studentCip.awarded_specialty,
      ],
      checked: false,
    }));
  }
  changeBoolean(authorizing_officials: boolean): string {
    if (authorizing_officials) {
      return 'Si';
    }
    return 'No';
  }
  checkAuthorizing(authorizing_officials: boolean): string {
    if (authorizing_officials) {
      return 'Si';
    }
    return 'No';
  }

  removeStudentByCi(id: string) {
    console.log(id);
    this.studentCipService.removeByCi(id).subscribe((studentCipService) => {
      this.studentsCip = studentCipService;
      this.datas = this.formattedStudents;
      this.router.navigateByUrl('/assignment/grant/cip-student');
      this.information = 'Eliminación realizada con éxito!';
    });
  }

  removeStudentsSelected() {
    console.log('Cis seleccionados:', this.selectIds);

    this.studentCipService
      .removeAllCheck(this.selectIds)
      .subscribe((studentService) => {
        this.studentsCip = studentService;
        this.datas = this.formattedStudents;
        this.router.navigateByUrl('/assignment/grant/cip-student');
        this.information = 'Eliminación realizada con éxito!';
      });
  }

  handleInfo(receivedInfo: CombinedData[]) {
    this.studentsCip = receivedInfo; // Guarda la información recibida
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
      } else if (data.action === 'Eliminar por lote') {
        this.selectIds = data.selectKeys;
        this.removeStudentsSelected();
      }
    }
  }
}
