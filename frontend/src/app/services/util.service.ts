import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar) { 
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  getFormValidationErrors(form: any, handleValidationForm: Function) {
    let findError = false;

    for (let key of Object.keys(form.controls)) {
      const controlErrors: ValidationErrors = form.get(key).errors;

      if (controlErrors !== null) {
        for (let keyError of Object.keys(controlErrors)) {
          let newKey = this.renameKeyValidation(key);
          let message = handleValidationForm(newKey, keyError);
          this.openSnackBar(message);
          findError = true;
          break;
        }
      }
      if (findError) break;
    }
  }

  renameKeyValidation(key) {
    let newKey = key;

    if (key === 'firstName') newKey = 'Nombre';
    else if (key === 'lastName') newKey = 'Apellido';
    else if (key === 'password') newKey = 'Contraseña';
    else if (key === 'passwordRepeat') newKey = 'Repetir contraseña';
    else if (key === 'email') newKey = 'Email';
    return newKey;
  }

  handleLoginFailed(message: any) {
    let msg;
    let expression;

    expression = /password/;
    if (expression.test(message))
      msg = 'Este correo inicia sesión con correo y contraseña';

    if (message === 'The username and password is invalid.') {
      msg = 'El correo o la contraseña son incorrectos, intente nuevamente...';
    } else if (message === "The user with email doesn't exist") {
      msg =
        'No existe una cuenta asociado con este correo, intente nuevamente...';
    }

    return msg;
  }
}
