import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validate=true;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onLogin() {
    try {
      this.validate=false;
      const { email, password } = this.loginForm.value;
      const user = await this.authService.login(email, password);

      if(!user){
        this.validate=true;
      }

      if (user.emailVerified) {
        this.router.navigate(['/admin']);
        this.modalService.dismissAll();
        this.validate=true;
      } else if (user) {
        this.validate=true;
        this.modalService.dismissAll();
        this.router.navigate(['/verification-email']);
        
      }

    } catch (error) {

    }
  }

  /*modal*/

  dimissModalLogin() {
    this.activeModal.dismiss();
  }

  openFormModalRegister() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(RegisterComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }

  openReset(){
    this.dimissModalLogin();
    this.router.navigate(['/password-forgot']);
  }

  showError(mensaje: string) {
    this.toastr.success(mensaje, 'Error', {
      timeOut: 2000,
    });
  }

  matchEmail() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let dominio = control.value.split("@", 2);
        //console.log(dominio[1],dominio.length);
        if (dominio[1] !== 'epn.edu.ec') {
          //console.log(control.value,'no pertenece al dominio');
          //this.validacionEmail=false;
          return {
            match: true
          };
        }
      }
      //console.log('iguales');
      //this.validacionEmail=true;
      return null;
    };
  }
}
