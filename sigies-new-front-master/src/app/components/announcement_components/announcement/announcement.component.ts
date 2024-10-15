import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterOfficialComponent } from '../../official_components/filter-official/filter-official.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TableComponent } from '../../table/table.component';
import { Announcement } from 'src/app/shared/models/Announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FilterOfficialComponent,
    FormsModule,
    ConfirmDialogComponent,
    TableComponent,
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css',
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
      (confirmed)="confirmHandleInfo($event)"
      (infoFetched)="handleInfo($event)"
    ></app-table>
  `,
})
export class AnnouncementComponent implements OnInit {
  includeLink = '/assignment/grant/include-announcement';
  showLink = '/assignment/grant/show-announcement/';
  modifyLink = '/assignment/grant/modify-announcement/';
  removeLink = '/assignment/grant/remove-announcement/';

  columns: string[] = [
    'Comisión',
    'Convocatoria',
    'Procesamiento',
    'Nombre',
    'Descripción',
    'Tipo',
    'Funcionario',
  ];

  inOfficial: boolean = true;
  announcements: Announcement[] = [];
  selectedIds: string[] = [];
  information!: string;
  datas: { key: string; values: string[]; checked: boolean }[] = [];

  constructor(
    private announcementService: AnnouncementService,
    private router: Router,
  ) {
    const announcementsObservable = announcementService.getAll();
    announcementsObservable.subscribe((serverAnnouncements) => {
      this.announcements = serverAnnouncements;
      this.datas = this.formattedAnnouncements;
    });
  }

  get formattedAnnouncements() {
    return this.announcements.map((announcement) => ({
      key: announcement.id, // Puedes usar cualquier propiedad como clave
      values: [
        announcement.name,
        announcement.description,
        announcement.type,
        announcement.type,
      ],
      checked: false,
    }));
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  removeAnnouncementById(officialId: string) {
    this.announcementService
      .removeById(officialId)
      .subscribe((serverAnnouncements) => {
        this.announcements = serverAnnouncements;
        this.datas = this.formattedAnnouncements;
      });
    this.information = 'Eliminacion realizada con éxito!';
  }

  removeAnnouncementsSelected() {
    console.log('IDs seleccionados:', this.selectedIds);

    this.announcementService
      .removeAllCheck(this.selectedIds)
      .subscribe((serverOfficial) => {
        this.announcements = serverOfficial;
        this.datas = this.formattedAnnouncements;
      });
    this.information = 'Eliminacion por cantidad realizada con éxito!';
  }

  handleInfo(receivedInfo: Announcement[]) {
    this.announcements = receivedInfo; // Guarda la información recibida
  }
  confirmHandleInfo(data: {
    confirm: boolean;
    selectKey: string;
    action: string;
    selectKeys: string[];
  }) {
    if (data.confirm) {
      if (data.action === 'eliminar') {
        this.removeAnnouncementById(data.selectKey);
      } else if (data.action === 'eliminar por cantidad') {
        this.selectedIds = data.selectKeys;
        this.removeAnnouncementsSelected();
      }
    }
  }
}
