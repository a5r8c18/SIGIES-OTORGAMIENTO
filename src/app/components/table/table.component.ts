/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule, NgFor } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { FilterOfficialComponent } from '../official_components/filter-official/filter-official.component';
import { FilterStudentComponent } from '../student_components/filter-student/filter-student.component';
import { FilterCipStudentComponent } from '../cip_components/filter-cip-student/filter-cip-student.component';
import { FilterDiulStudentComponent } from '../diul_components/filter-diul-student/filter-diul-student.component';
import jsPDF from 'jspdf';

interface Confirmacion {
  confirm: boolean;
  selectKey: string;
  action: string;
  selectKeys: string[];
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FilterOfficialComponent,
    FormsModule,
    ConfirmDialogComponent,
    FilterStudentComponent,
    FilterCipStudentComponent,
    FilterDiulStudentComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  template: `
    <app-filter-official
      (infoFetched)="handleInfo($event)"
    ></app-filter-official>
    <app-filter-student (infoFetched)="handleInfo($event)"></app-filter-student>
    <app-filter-diul-student
      (infoFetched)="handleInfo($event)"
    ></app-filter-diul-student>
    <app-filter-cip-student
      (infoFetched)="handleInfo($event)"
    ></app-filter-cip-student>
    <app-confirm-dialog
      [action]="action"
      (confirmed)="confirmHandleInfo($event)"
    ></app-confirm-dialog>
  `,
})
export class TableComponent implements AfterViewInit, OnChanges, OnInit {
  @Input()
  includeLink!: string;
  @Input()
  showLink!: string;
  @Input()
  modifyLink!: string;
  @Input()
  removeLink!: string;

  @Input()
  table_name!: string;

  @Input() columns!: string[];
  @Input() datas: {
    key: string;
    values: string[];
    checked: boolean;
  }[] = [];
  @Input() showFilterOfficial!: boolean;
  @Input() showFilterStudent!: boolean;
  @Input() showFilterStudentCip!: boolean;
  @Input() showFilterStudentDiul!: boolean;

  @Input() information!: string;
  @Input() inOfficial!: boolean;

  @Output() confirmed = new EventEmitter<Confirmacion>();
  @Output() infoFetched = new EventEmitter<any[]>();
  selectKey!: string;

  action: string = '';
  selectedValue: number = 16; // Cantidad de elementos por página
  currentPage: number = 0; // Página actual
  totalPage: number = 0;
  selectedItems: string[] = [];
  mensaje: string = '';
  mostrarMensaje: boolean = false;
  keys: string[] = [];

  ascendingSort: boolean[] = [true, true]; // Controla el orden para cada columna

  private esPrimeraVez: boolean = true;
  ngOnInit() {
    this.selectedItems = new Array<string>();
  }

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.informationMessage(navigation.extras.state.data);
    }
    if (this.information) {
      this.informationMessage(this.information);
    }
  }

  sort(colIndex: number) {
    this.datas.sort((a, b) => {
      const aValue = a.values[colIndex];
      const bValue = b.values[colIndex];

      if (aValue < bValue) return this.ascendingSort[colIndex] ? -1 : 1;
      if (aValue > bValue) return this.ascendingSort[colIndex] ? 1 : -1;
      return 0;
    });
    this.ascendingSort[colIndex] = !this.ascendingSort[colIndex]; // Cambia el orden para la próxima vez
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.esPrimeraVez) {
      this.esPrimeraVez = false; // Cambia a false para las siguientes ejecuciones
      return; // Ignora la primera llamada
    }
    if (changes['information']) {
      this.informationMessage(changes['information'].currentValue);
    }
  }
  filterOfficial() {
    this.showFilterOfficial = !this.showFilterOfficial;
  }
  filterStudent() {
    this.showFilterStudent = !this.showFilterStudent;
  }
  filterStudentCip() {
    this.showFilterStudentCip = !this.showFilterStudentCip;
  }
  filterStudentDiul() {
    this.showFilterStudentDiul = !this.showFilterStudentDiul;
  }

  // Método para agrupar
  getGrouped() {
    const groups = [];

    for (let i = 0; i < this.datas.length; i += this.selectedValue) {
      groups.push(this.datas.slice(i, i + this.selectedValue));
    }
    this.totalPage = groups.length;
    if (this.currentPage > this.totalPage - 1 && this.totalPage !== 0) {
      this.currentPage = this.currentPage - 1;
    }
    return groups;
  }
  // Método para cambiar de página
  changePage(page: number) {
    if (!(page < 0 || page > this.totalPage - 1)) {
      this.currentPage = page;
    }
  }

  informationMessage(message: string) {
    this.mensaje = message;
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }

  onCheckboxChange(event: any) {
    const key = event.target.value;
    if (event.target.checked) {
      console.log('añadio');
      this.selectedItems.push(key);
    } else {
      console.log('no');
      this.selectedItems = this.selectedItems.filter((dato) => dato !== key);
    }
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

  onSelectChange(value: string) {
    this.selectedValue = +value; // Convierte el string a número
  }
  ngAfterViewInit() {
    this.loadScript('assets/js/selectAll.js');
  }

  confirmHandleInfo(confirm: boolean) {
    const data: Confirmacion = {
      confirm: confirm,
      selectKey: this.selectKey,
      action: this.action,
      selectKeys: this.selectedItems,
    };
    this.confirmed.emit(data);
  }
  handleInfo(receivedInfo: any[]) {
    this.infoFetched.emit(receivedInfo);
  }
  confirmAction(action: string, key: string) {
    this.action = action; // Guardar el tipo de acción
    if (action === 'Eliminar') {
      this.selectKey = key; // Guardar el ID del oficial a Eliminar
    }
  }

  modify(key: string) {
    this.router.navigateByUrl(this.modifyLink + key);
  }
  include() {
    this.router.navigateByUrl(this.includeLink);
  }
  show(key: string) {
    this.router.navigateByUrl(this.showLink + key);
  }
  isDataAvailable(): boolean {
    return this.selectedItems.length > 0; // Devuelve true si hay datos
  }

  generatePDF() {
    const doc = new jsPDF();
    let y = 10; // Posición Y inicial
    const pageHeight = doc.internal.pageSize.height;

    this.datas.forEach((data) => {
      const minLength = Math.min(this.columns.length, data.values.length);
      for (let i = 0; i < minLength; i++) {
        if (y + 10 > pageHeight) {
          doc.addPage(); // Agregar nueva página
          y = 10; // Reiniciar la posición Y
        }

        doc.text(`${this.columns[i]}: ${data.values[i]}`, 10, y);
        y += 10; // Mover hacia abajo para el siguiente texto
      }

      y += 10; // Espacio entre diferentes items
    });

    // doc.text('Este es el contenido del archivo PDF que se generará', 10, 10);
    doc.save('Datos ' + this.table_name + ' Sigies.pdf'); // Nombre del archivo a descargar
  }
}
