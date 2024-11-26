import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../../core/_services/translations.service';
import { ApplicatioMessages } from '../../core/utils/messages/applicationMessages';
import { LoadingSpinnerService } from 'src/app/core/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  recoverPassword = '/recovery';

  passwordVisible = false;
  password?: string;

  aplicationMessages = ApplicatioMessages;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private translations: TranslationsService,
    private loadingSpinner: LoadingSpinnerService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.translate.addLangs(this.translations.getSystemLanguages());
    this.translate.setDefaultLang(this.translations.getProfileLanguage());

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.loadingSpinner.show();
    // this.authenticationService
    //   .login(this.loginForm.get('username').value, this.loginForm.get('password').value)
    //   .pipe(first())
    //   .subscribe(
    //     () => {
    //       this.router.navigate([this.returnUrl]               );
    //     },
    //     (error) => {
    //       if (error === 'Unauthorized') {
    //         this.error = 'Usuario o contraseña incorrecta';
    //       } else {
    //         this.error = 'Error de conexión con el servidor';
    //       }

    //       // this.error = error;

    //       this.loadingSpinner.hide(               );
    //     },
    //                  );
  }
}
