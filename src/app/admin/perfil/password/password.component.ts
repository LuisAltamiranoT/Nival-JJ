import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  validacionPass: boolean = false;
  validate = true;
  mensaje = '';

  hide = true;
  hide1 = true;
  hide2 = true;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.matchPass('oldPassword')]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6), this.match('newPassword')]),
  })

  constructor(
    public dialogRef: MatDialogRef<PasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async onClick() {
    this.validate = false;
    const { oldPassword, newPassword, rePassword } = this.passwordForm.value;
    if (newPassword != rePassword) {
      this.authService.showError("Existe un error en los datos ingresados");
      this.validate = true;
    } else {
      const dat = await this.authService.updatePass(oldPassword, newPassword);
      if (dat != 1) {
        this.validate = true;
      } else {
        this.dimissModal();
      }
    }
  }
  
  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.passwordForm.patchValue({ office: "" });
  }

  match(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        const checkValue = control.parent.controls[controlKey].value;
        if (control.value !== checkValue) {
          this.validacionPass = false;
          return {
            match: true
          };
        }
      }
      this.validacionPass = true;
      return null;
    };
  }

  //validar dos nombres
  matchPass(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value;
        const value = control.parent.controls[controlKey].value;
        if (data === value && value !== "") {
          this.mensaje = 'La nueva contraseña es igual a la anterior';
          return {
            match: true
          };
        }
        this.validacionPass = true;
        this.mensaje = '';
        return null;
      }
    };
  }

}
