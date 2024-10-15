import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  // FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-include-official',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmDialogComponent],
  templateUrl: './include-official.component.html',
  styleUrl: './include-official.component.css',
  template: `
    <app-confirm-dialog [action]="action" [done]="done"></app-confirm-dialog>
  `,
})
export class IncludeOfficialComponent implements OnInit, AfterViewInit {
  action: string = 'insertar funcionario';
  done!: string;
  officialId: string = '';
  confirm: boolean | undefined;
  officials: Official[] = [];
  newOfficial!: Official;
  officialForm!: FormGroup;
  isSubmitted = false;

  mensaje: string = '';
  mostrarMensaje: boolean = false;
  constructor(
    private officialService: OfficialService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.officialForm = this.formBuilder.group({
      officialName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      officialLastName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      officialPosition: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
    });
  }

  includeOfficial() {
    if (this.officialForm.valid) {
      console.log('Formulario válido:', this.officialForm.value);
    } else {
      console.log('Formulario inválido');
    }
    const fv = this.officialForm.value;
    const official: Official = {
      id: Math.floor(Math.random() * 101).toString(),
      convocation: '1',
      processing: 'Procesamiento rellenar',
      name: fv.officialName,
      lastname: fv.officialLastName,
      position: fv.officialPosition,
    };

    // try {
    this.officialService.include(official).subscribe(
      (serverOfficial) => {
        this.officials = serverOfficial;
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

  includeOfficialContinue() {
    this.isSubmitted = true;
    if (this.officialForm.invalid) return;

    this.includeOfficial();
    // window.location.reload();
  }
  includeOfficialEnd(): void {
    this.isSubmitted = true;
    if (this.officialForm.invalid) return;

    this.includeOfficial();
    this.router.navigateByUrl('/assignment/grant/official', {
      state: { data: this.mensaje },
    });
  }

  officialList(): void {
    this.router.navigateByUrl('/assignment/grant/official', {
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
}
