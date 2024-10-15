import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';

@Component({
  selector: 'app-modify-official',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modify-official.component.html',
  styleUrl: './modify-official.component.css',
})
export class ModifyOfficialComponent implements OnInit, AfterViewInit {
  official!: Official;
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
    this.loadOfficialData();
    this.initializeForm();
  }

  loadOfficialData() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.officialId)
        this.officialService
          .getAllOfficialsById(params.officialId)
          .subscribe((serverOfficial) => {
            this.official = serverOfficial;
            this.initializeForm();
          });
    });
  }

  initializeForm() {
    this.officialForm = this.formBuilder.group({
      officialName: [
        this.official?.name || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      officialLastName: [
        this.official?.lastname || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
      officialPosition: [
        this.official?.position || '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)],
      ],
    });
  }

  modifyOfficial() {
    if (this.officialForm.valid) {
      console.log('Formulario válido:', this.officialForm.value);
    } else {
      console.log('Formulario inválido');
    }
    const fv = this.officialForm.value;
    const official: Official = {
      id: this.official.id,
      convocation: '1',
      processing: 'Procesamiento rellenar',
      name: fv.officialName,
      lastname: fv.officialLastName,
      position: fv.officialPosition,
    };

    this.officialService.modify(official).subscribe((serverOfficial) => {
      this.official = serverOfficial;
    });
    this.mensaje = 'Modificacion realizada con éxito!';
    this.mostrarMensaje = true;

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 3000);
  }

  modifyOfficialContinue() {
    this.isSubmitted = true;
    if (this.officialForm.invalid) return;

    console.warn(this.officialForm.value);
    this.modifyOfficial();
    // window.location.reload();
  }
  modifyOfficialEnd(): void {
    this.isSubmitted = true;
    if (this.officialForm.invalid) return;

    this.modifyOfficial();
    console.warn(this.officialForm.value);
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
    this.loadScript('assets/js/toats.js');
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
