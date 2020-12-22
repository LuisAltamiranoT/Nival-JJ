import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {

  validate = true;

  Form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()])
  })
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      this.validate = false;
      const { email } = this.Form.value;
      this.authService.resetPassword(email);
      this.authService.showInfo('Solicitud enviada con éxito');
      this.validate = true;
      this.router.navigate(['/home']);
    } catch (error) {
      this.validate = true;
    }
  }

  matchEmail() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let dominio = control.value.split("@", 2);
        if (dominio[1] !== 'epn.edu.ec') {
          return {
            match: true
          };
        }
      }
      return null;
    };
  }

}
