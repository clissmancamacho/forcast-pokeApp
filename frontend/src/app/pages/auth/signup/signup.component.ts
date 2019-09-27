import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, Person } from '../../../intefaces';
import { AuthService, UtilService } from '../../../services/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  user: User;
  loading = false;

  constructor
  (
    private router: Router,
    private authService: AuthService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        passwordRepeat: new FormControl(null, [Validators.required])
      },
      this.passwordMatchValidator
    );
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;

      const { email, password, firstName, lastName } = this.signupForm.value;
      const person: Person = { firstName, lastName };
      const user: User = {
        email,
        password,
        person,
        _id: null,
      };
      this.authService
        .signup(user)
        .then(async (res: any) => {
          if (res.status === 1) {
            await this.authService.login(res);
            this.loading = false;
            this.router.navigateByUrl('/pokedex');
          }
        })
        .catch(error => {
          this.loading = false;
          if (error.error.message === 'This email already exist') {
           this.util.openSnackBar(
              "¡Este correo ya se encuentra registrado!",
             );
          } else {
            this.util.openSnackBar(error.error.message);
          }
        });
    } else {
      this.util.getFormValidationErrors(
        this.signupForm,
        this.handleValidationForm
      );
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordRepeat').value
      ? null
      : { mismatch: true };
  }

  handleValidationForm(key, keyError) {
    let message = `${key} no puede estar vacio`;

    if (key === 'Email') {
      if (keyError !== 'required') {
        message = 'Por favor introduzca un email válido';
      }
    }
    return message;
  }

}
