import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDiulService } from 'src/app/services/student-diul.service';
// import { DiulStudent } from 'src/app/shared/models/DiulStudent';
import { TableComponent } from '../../table/table.component';
import { Official } from 'src/app/shared/models/Official';
import { OfficialService } from 'src/app/services/official.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/models/Student';
import { CombinedData } from 'src/app/shared/models/CombinedData';

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
      [table_name]="table_name"
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
  table_name = 'Estudiantes Diul';

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

  studentsDiul: CombinedData[] = [];
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
    private studentDiulService: StudentDiulService,
    private router: Router,
    private officialService: OfficialService,
    private studentService: StudentService,
  ) {}
  ngOnInit(): void {
    const studentsObservable = this.studentDiulService.getAll();
    studentsObservable.subscribe((studentDiulService) => {
      this.studentsDiul = studentDiulService;
      this.datas = this.formattedStudents;
    });
  }
  get formattedStudents() {
    if (!this.studentsDiul || this.studentsDiul.length === 0) {
      return []; // Retorna un arreglo vacío si no hay estudiantes
    }

    return this.studentsDiul.map((studentCip) => ({
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
    this.studentDiulService.removeByCi(id).subscribe((studentDiulService) => {
      this.studentsDiul = studentDiulService;
<<<<<<< HEAD

      this.datas = this.formattedStudents;
      console.log(this.datas);
      this.router.navigateByUrl('/assignment/grant/diul-student');
      this.information = 'Eliminación realizada con éxito!';
    });
=======
      this.datas = this.formattedStudents;
    });
    this.information = 'Eliminación realizada con éxito!';
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  }

  removeStudentsSelected() {
    console.log('Cis seleccionados:', this.selectIds);

    this.studentDiulService
      .removeAllCheck(this.selectIds)
      .subscribe((studentService) => {
        this.studentsDiul = studentService;
        this.datas = this.formattedStudents;
        this.router.navigateByUrl('/assignment/grant/diul-student');
        this.information = 'Eliminación realizada con éxito!';
      });
<<<<<<< HEAD
=======
    this.information = 'Eliminación por lote realizada con éxito!';
>>>>>>> 7f8c1f3936d6985bce14d5050be4ce0a2ca13cad
  }

  handleInfo(receivedInfo: CombinedData[]) {
    this.studentsDiul = receivedInfo; // Guarda la información recibida
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
        this.selectIds = data.selectKeys;
        this.removeStudentsSelected();
      }
    }
  }
}
