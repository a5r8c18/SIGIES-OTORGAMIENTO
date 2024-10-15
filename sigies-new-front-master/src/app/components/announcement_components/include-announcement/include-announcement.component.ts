import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Announcement } from 'src/app/shared/models/Announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/Student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-include-announcement',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmDialogComponent],
  templateUrl: './include-announcement.component.html',
  styleUrl: './include-announcement.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class IncludeAnnouncementComponent implements OnInit, AfterViewInit {
  action: string = 'insertar procesamiento de convocatoria';
  done!: string;
  announcementId: string = '';
  confirm: boolean | undefined;
  announcements: Announcement[] = [];
  newAnnouncement!: Announcement;
  announcementForm!: FormGroup;
  isSubmitted = false;
  students: Student[] = [];
  studentsinList: Student[] = [];

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private announcementService: AnnouncementService,
    private studentService: StudentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    const studentsObservable = studentService.getAll();
    studentsObservable.subscribe((studentService) => {
      this.students = studentService;
    });
  }

  ngOnInit(): void {
    this.announcementForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      type: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      description: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      official_aprove: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      students: ['', [Validators.required]],
    });
  }

  includeAnnouncement() {
    if (this.announcementForm.valid) {
      console.log('Formulario válido:', this.announcementForm.value);
    } else {
      console.log('Formulario inválido');
    }
    const fv = this.announcementForm.value;
    const announcement: Announcement = {
      id: Math.floor(Math.random() * 101).toString(),
      // convocation: '1',
      // processing: 'Procesamiento rellenar',
      name: fv.name,
      type: fv.type,
      description: fv.description,
      official_aprove: fv.official_aprove,
      students: fv.students,
    };

    // try {
    this.announcementService.include(announcement).subscribe(
      (serverAnnouncement) => {
        this.announcements = serverAnnouncement;
      },
      (error) => {
        this.mensaje = 'Hubo un error al realizar el ingreso.' + error;
        this.mostrarMensaje = true;

        // También puedes manejar el error aquí si es necesario
      },
    );

    this.mensaje = 'Ingreso realizado con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }

  includeAnnouncementContinue() {
    this.isSubmitted = true;
    if (this.announcementForm.invalid) return;

    this.includeAnnouncement();
    // window.location.reload();
  }
  includeAnnouncementEnd(): void {
    this.isSubmitted = true;
    if (this.announcementForm.invalid) return;

    this.includeAnnouncement();
    this.router.navigateByUrl('/assignment/grant/announcement', {
      state: { data: this.mensaje },
    });
  }

  announcementList(): void {
    this.router.navigateByUrl('/assignment/grant/announcement', {
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

  removeStudentfromList() {}

  includeStudentinList() {}
}
