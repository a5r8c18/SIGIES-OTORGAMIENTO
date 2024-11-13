/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input } from '@angular/core';
import { ILeftMenuItem } from '../../interfaces/ILeftMenuItem';

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent {
  @Input() isCollapsedLeft: boolean = false;

  //Organization Tab --------------------------------------
  organizationTab: ILeftMenuItem[] = [
    {
      name: 'Codificadores',
      sub_menus: [
        { name: 'Examen', url: '' },
        { name: 'Carrera', url: '' },
        { name: 'Área de la ciencia', url: '' },
        { name: 'Organismo formador', url: '' },
        { name: 'Color de piel', url: '' },
        { name: 'Centro de educación superior', url: '' },
        { name: 'Vinculación territorial', url: '' },
        { name: 'Tipo de preuniversitario', url: '' },
        { name: 'Vía de ingreso', url: '' },
        { name: 'Fuente de ingreso', url: '' },
        { name: 'Provincia', url: '' },
        { name: 'Municipio', url: '' },
        { name: 'Escolaridad', url: '' },
        { name: 'Ocupación', url: '' },
        { name: 'Procedencia', url: '' },
        { name: 'Situación actual', url: '' },
        { name: 'Modalidad', url: '' },
        { name: 'Sexo', url: '' },
        { name: 'Sexo del plan de plazas', url: '' },
        { name: 'Convocaoria', url: '' },
        { name: 'Sector laboral', url: '' },
        { name: 'Tipo de escalafón', url: '' },
        { name: 'Tipo ganador de evento', url: '' },
        { name: 'Nivel universitario', url: '' },
      ],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Plan de plazas general',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Rpt. Control global', url: '' },
        { name: 'Rpt. Resumen por vía', url: '' },
        { name: 'Rpt. Resumen por CES', url: '' },
        { name: 'Rpt. Plan de plazas', url: '' },
      ],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Plan de plazas procesamiento',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Rpt. Plan de plazas', url: '' },
      ],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Historial de plan de plazas',
      sub_menus: [],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Preuniversitario',
      sub_menus: [{ name: 'Entrada', url: '' }],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Estudiante',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Rpt. Ficha de un estudiante ', url: '' },
        { name: 'Rpt. Cantera de varones al SMA', url: '' },
        { name: 'Rpt. Probable sexo no correspondiente', url: '' },
      ],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Requisitos adicionales',
      sub_menus: [{ name: 'Entrada', url: '' }],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Solicitud',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Intercambio', url: '' },
        { name: 'Cargar', url: '' },
      ],
      open: false,
      domain: 'organization',
    },
    {
      name: 'Estudiante eximido',
      sub_menus: [{ name: 'Entrada', url: '' }],
      open: false,
      domain: 'organization',
    },
  ];

  //Examination Tab --------------------------------------

  examinationTab: ILeftMenuItem[] = [
    {
      name: 'Actas',
      sub_menus: [
        { name: 'Preparación de actas', url: '' },
        { name: 'Rpt. Para publicar', url: '' },
      ],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Anonimato',
      sub_menus: [],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Asistencia',
      sub_menus: [{ name: 'Entrada', url: '' }],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Tribunal',
      sub_menus: [],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Calificación',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Rpt. Diferencia entre nota y el índice', url: '' },
      ],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Reclamación',
      sub_menus: [
        { name: 'Solicitud', url: '' },
        { name: 'Calificación', url: '' },
      ],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Mostrado de examén',
      sub_menus: [{ name: 'Calificación', url: '' }],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Reasultado',
      sub_menus: [],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Estadísticas',
      sub_menus: [],
      open: false,
      domain: 'examination',
    },
    {
      name: 'Resultados general',
      sub_menus: [],
      open: false,
      domain: 'examination',
    },
  ];

  //Assignment  Tab --------------------------------------

  assignmentTab: ILeftMenuItem[] = [
    {
      name: 'Discapacitado',
      sub_menus: [{ name: 'Entrada', url: '' }],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Ganador de evento',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Rpt. Listado', url: '' },
      ],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Escalafón',
      sub_menus: [
        { name: 'Entrada', url: '' },
        { name: 'Intercambio', url: '' },
      ],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Preasignación',
      sub_menus: [
        { name: 'Excluir', url: '' },
        { name: 'Entrada', url: '' },
        { name: 'Listado', url: '' },
        { name: 'intercambio', url: '' },
        { name: 'Plan de plazas', url: '' },
      ],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Mover Plazas',
      sub_menus: [],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Asignación',
      sub_menus: [
        { name: 'Excluir', url: '' },
        { name: 'Entrada', url: '' },
        { name: 'Listado', url: '' },
        { name: 'Intercambio', url: '' },
        { name: 'Plan de plazas', url: '' },
        { name: 'Rpt. Listado de matrícula', url: '' },
        { name: 'Rpt. Estadísticas', url: '' },
        { name: 'Rpt. Composición', url: '' },
        { name: 'Rpt. Control del plan', url: '' },
        {
          name: 'Rpt. Valor del corte general de las carreras or convocatorias y procesamiento',
          url: '',
        },
        { name: 'Rpt. Valor de corte  por carreras general', url: '' },
        { name: 'Rpt. Resultados por opciones ', url: '' },
        { name: 'Rpt. Plan de plazas para póximo procesamiento ', url: '' },
      ],
      open: false,
      domain: 'assignment',
    },
    {
      name: 'Otorgamiento',
      sub_menus: [
        { name: 'Funcionario', url: '/grant/official' },
        { name: 'SIES-3', url: '/grant/student' },
        { name: 'CIP', url: '/grant/cip-student' },
        { name: 'DIUL', url: '/grant/diul-student' },
        { name: 'Listado', url: '' },
        { name: 'Rpt. Estudiante SIES-3 CIP', url: '' },
        { name: 'Rpt. Estudiante SIES-3 DIUL', url: '' },
      ],
      open: true,
      domain: 'assignment',
    },
  ];

  //General  Tab --------------------------------------

  generalTab: ILeftMenuItem[] = [
    {
      name: 'Seguridad',
      sub_menus: [
        { name: 'Uusario', url: '' },
        { name: 'Rol', url: '' },
        { name: 'Permiso', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Administración',
      sub_menus: [
        { name: 'Periodo de ingreso', url: '' },
        { name: 'Comisión', url: '' },
        { name: 'Convocatoria', url: '' },
        { name: 'Procesamiento', url: '' },
        { name: 'Cargar datos', url: '' },
        { name: 'Configurar servicios', url: '' },
        { name: 'Configurar estapas', url: '' },
        { name: 'Plan de plazas de procesamiento cargadas', url: '' },
        { name: 'Procesamiento preparados', url: '' },
        { name: 'Asignaciones realizadas', url: '' },
        { name: 'Tarea programada', url: '' },
        { name: 'Reportes', url: '' },
        { name: 'Nodo', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Reportes genrales',
      sub_menus: [
        { name: 'Rpt. Modelo 0', url: '' },
        { name: 'Rpt. Modelo 0.1', url: '' },
        { name: 'Rpt. Modelo 0.2', url: '' },
        { name: 'Rpt. Modelo 0.3', url: '' },
        { name: 'Rpt. Modelo 1', url: '' },
        { name: 'Rpt. Modelo 1.1', url: '' },
        { name: 'Rpt. Modelo 1.2', url: '' },
        { name: 'Rpt. Modelo 2', url: '' },
        { name: 'Rpt. Modelo 2.1', url: '' },
        { name: 'Rpt. Modelo 2.2', url: '' },
        { name: 'Rpt. Modelo 3', url: '' },
        { name: 'Rpt. Modelo 3.1', url: '' },
        { name: 'Rpt. Modelo 3.2', url: '' },
        { name: 'Rpt. Modelo 3.3', url: '' },
        { name: 'Rpt. Modelo 3.4', url: '' },
        { name: 'Rpt. Modelo 3.5', url: '' },
        { name: 'Rpt. Modelo 3.6', url: '' },
        { name: 'Rpt. Modelo 3.7', url: '' },
        { name: 'Rpt. Modelo 3.8', url: '' },
        { name: 'Rpt. Modelo 4.1', url: '' },
        { name: 'Rpt. Modelo 4.2', url: '' },
        { name: 'Rpt. Modelo 4.3', url: '' },
        { name: 'Rpt. Modelo 4.4', url: '' },
        { name: 'Rpt. Modelo 4.5', url: '' },
        { name: 'Rpt. Modelo 4.6', url: '' },
        { name: 'Rpt. Modelo 5', url: '' },
        { name: 'Rpt. Modelo 5.1', url: '' },
        { name: 'Rpt. Modelo 5.2', url: '' },
        { name: 'Rpt. Modelo 6', url: '' },
        { name: 'Rpt. Modelo 6.1', url: '' },
        { name: 'Rpt. Modelo 6.2', url: '' },
        { name: 'Rpt. Modelo 7', url: '' },
        { name: 'Rpt. Modelo 7.1', url: '' },
        { name: 'Rpt. Modelo 7.2 ', url: '' },
        { name: 'Rpt. Modelo 8', url: '' },
        { name: 'Rpt. Modelo 8.1', url: '' },
        { name: 'Rpt. Modelo 8.2', url: '' },
        { name: 'Rpt. Modelo 9', url: '' },
        { name: 'Rpt. Modelo 9.1', url: '' },
        { name: 'Rpt. Modelo 9.2', url: '' },
        { name: 'Rpt. Modelo 10', url: '' },
        { name: 'Rpt. Modelo 10.1', url: '' },
        { name: 'Rpt. Modelo 10.2', url: '' },
        { name: 'Rpt. Modelo 11', url: '' },
        { name: 'Rpt. Modelo 12', url: '' },
        { name: 'Rpt. Modelo 12.1', url: '' },
        { name: 'Rpt. Modelo 12.2', url: '' },
        { name: 'Rpt. Modelo 12.3', url: '' },
        { name: 'Rpt. Modelo 12.4', url: '' },
        { name: 'Rpt. Modelo 12.5', url: '' },
        { name: 'Rpt. Modelo 12.6', url: '' },
        { name: 'Rpt. Modelo 13', url: '' },
        { name: 'Rpt. Modelo 13.1', url: '' },
        { name: 'Rpt. Modelo 13.2', url: '' },
        { name: 'Rpt. Modelo 14', url: '' },
        { name: 'Rpt. Modelo 14.1', url: '' },
        { name: 'Rpt. Modelo 14.2', url: '' },
        { name: 'Rpt. Modelo 14.3', url: '' },
        { name: 'Rpt. Modelo 14.4', url: '' },
        { name: 'Rpt. Modelo 15', url: '' },
        { name: 'Rpt. Modelo 15.1', url: '' },
        { name: 'Rpt. Modelo 15.2', url: '' },
        { name: 'Rpt. Modelo 15.3', url: '' },
        { name: 'Rpt. Modelo 15.4', url: '' },
        { name: 'Rpt. Modelo 16', url: '' },
        { name: 'Rpt. Modelo 16.1', url: '' },
        { name: 'Rpt. Modelo 16.2', url: '' },
        { name: 'Rpt. Modelo 16.4', url: '' },
        { name: 'Rpt. Modelo 16.5', url: '' },
        { name: 'Rpt. Modelo 16.6', url: '' },
        { name: 'Rpt. Modelo 16.7', url: '' },
        { name: 'Rpt. Modelo 16.8', url: '' },
        { name: 'Rpt. Modelo 16.9', url: '' },
        { name: 'Rpt. Modelo 17 y 18', url: '' },
        { name: 'Rpt. Modelo 19', url: '' },
        { name: 'Rpt. Modelo 19.1', url: '' },
        { name: 'Rpt. Modelo 19.2', url: '' },
        { name: 'Rpt. Modelo 20', url: '' },
        { name: 'Rpt. Modelo 20.1', url: '' },
        { name: 'Rpt. Modelo 20.2', url: '' },
        { name: 'Rpt. Modelo 20.3', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Modelos de datos excel',
      sub_menus: [
        { name: 'Exportar', url: '' },
        { name: 'Importar', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Ossec',
      sub_menus: [
        { name: 'Alertas', url: '' },
        { name: 'Directorios', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Trazas',
      sub_menus: [
        { name: 'Revisión', url: '' },
        { name: 'Acciones', url: '' },
        { name: 'Datos', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Exportar datos ',
      sub_menus: [
        { name: 'SIGENU', url: '' },
        { name: 'CEPES', url: '' },
      ],
      open: false,
      domain: 'general',
    },
    {
      name: 'Ayuda',
      sub_menus: [],
      open: false,
      domain: 'general',
    },
    {
      name: 'Acerca de SIGIES',
      sub_menus: [],
      open: false,
      domain: 'general',
    },
  ];

  username?: string;

  clickSingle(array: ILeftMenuItem[], reference: ILeftMenuItem) {
    array.forEach((item) => {
      if (item !== reference) item.open = false;
    });
  }
}
