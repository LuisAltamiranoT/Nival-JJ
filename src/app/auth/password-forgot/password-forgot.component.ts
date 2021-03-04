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
  cont = 0;

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
    this.cont=0;
    try {
      this.validate = false;
      const { email } = this.Form.value;
      const verify = await this.authService.resetPassword(email);

      if (this.cont === 0) {
        this.cont = this.cont + 1;
        if (verify === "auth/user-not-found") {
          this.authService.showError('El correo ingresado no se encuentra registrado');
        }else if(verify === "auth/too-many-requests"){
          this.authService.showError('Ha excedido el número de envio de solicitudes, intente más tarde');
        }else {
          this.authService.showInfo('Solicitud enviada con éxito');
          this.router.navigate(['/home']);
        }
      }
      this.validate = true;
    } catch (error) {
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

  back(){
    this.router.navigate(['/home']);
  }

}
