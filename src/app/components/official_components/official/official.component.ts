import { Component, OnInit } from '@angular/core';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FilterOfficialComponent } from '../filter-official/filter-official.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TableComponent } from '../../table/table.component';
import { Observable } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-official',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FilterOfficialComponent,
    FormsModule,
    ConfirmDialogComponent,
    TableComponent,
  ],
  templateUrl: './official.component.html',
  styleUrl: './official.component.css',
  template: `
    <app-table
      [columns]="columns"
      [datas]="datas"
      [information]="information"
      [includeLink]="includeLink"
      [showLink]="showLink"
      [modifyLink]="modifyLink"
      [removeLink]="removeLink"
      [inOfficial]="inOfficial"
      [table_name]="table_name"
      (confirmed)="confirmHandleInfo($event)"
      (infoFetched)="handleInfo($event)"
    ></app-table>
  `,
})
export class OfficialComponent implements OnInit {
  includeLink = '/assignment/grant/include-official';
  showLink = '/assignment/grant/show-official/';
  modifyLink = '/assignment/grant/modify-official/';
  removeLink = '/assignment/grant/remove-official/';
  table_name = 'Funcionarios';

  columns: string[] = [
    'Convocatoria',
    'Procesamiento',
    'Nombre(s)',
    'Apellidos',
    'Cargo',
    'Acciones',
  ];

  inOfficial: boolean = true;
  officials: Official[] = [];
  selectedIds: string[] = [];
  information!: string;
  datas: {
    key: string;
    values: string[];
    checked: boolean;
  }[] = [];

  constructor(
    private officialService: OfficialService,
    private router: Router,
  ) {
    const officialsObservable = officialService.getAll();
    this.formattedTable(officialsObservable);
  }

  formattedTable(officialsObservable: Observable<Official[]>): void {
    officialsObservable.subscribe((serverOfficials) => {
      this.officials = serverOfficials;
      this.datas = this.formattedOfficials;
      // console.log(this.datas);
    });
  }

  get formattedOfficials() {
    return this.officials.map((official) => ({
      key: official.id, // Puedes usar cualquier propiedad como clave
      values: [
        official.convocation,
        official.prosecution,
        official.name,
        official.lastname,
        official.position,
      ],
      checked: false,
    }));
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  removeOfficialById(officialId: string) {
    this.officialService.removeById(officialId).subscribe((serverOfficial) => {
      this.officials = serverOfficial;
      this.datas = this.formattedOfficials;
      this.information = 'Eliminación realizada con éxito!';
      this.router.navigateByUrl('/assignment/grant/official');
    });
  }

  removeOfficialsSelected() {
    console.log('IDs seleccionados:', this.selectedIds);

    this.officialService
      .removeAllCheck(this.selectedIds)
      .subscribe((serverOfficial) => {
        this.officials = serverOfficial;
        this.datas = this.formattedOfficials;

        this.router.navigateByUrl('/assignment/grant/official');
      });
    this.information = 'Eliminación realizada con éxito!';
  }

  handleInfo(receivedInfo: Official[]) {
    this.officials = receivedInfo; // Guarda la información recibida
    this.datas = this.formattedOfficials;
  }
  confirmHandleInfo(data: {
    confirm: boolean;
    selectKey: string;
    action: string;
    selectKeys: string[];
  }) {
    if (data.confirm) {
      if (data.action === 'Eliminar') {
        this.removeOfficialById(data.selectKey);
      } else if (data.action === 'Eliminar por lote') {
        this.selectedIds = data.selectKeys;
        this.removeOfficialsSelected();
      }
    }
  }
}
