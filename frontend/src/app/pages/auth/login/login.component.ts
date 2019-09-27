import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, Person } from '../../../intefaces';
import { AuthService, UtilService } from '../../../services/';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private util: UtilService
    ) { 
    }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

   async onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const { email, password, firstName, lastName } = this.loginForm.value;
      const person: Person = { firstName, lastName };
      const user: User = { email, password, person, _id: null };

      this.authService
        .signin(user)
        .then(async (res: any) => {
          if (res.status === 1) {
            this.loading = false;
            await this.authService.login(res);
            this.router.navigateByUrl('/pokedex');
          }
        })
        .catch(error => {
          this.loading = false;
          const message = this.util.handleLoginFailed(error.error.message);
          this.util.openSnackBar(message);
        });
    } else {
      this.util.getFormValidationErrors(
        this.loginForm,
        this.handleValidationForm
      );
    }
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
