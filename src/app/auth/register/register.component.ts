import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validacionPass: boolean = false;
  mensaje_nombre = '';
  mensaje_apellido = '';

  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), this.match_nombre()]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2), this.match_apellido()]),
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    _password: new FormControl('', [Validators.required, Validators.minLength(6), this.match('password')]),
  })

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onRegister() {
    try {
      const { email, password, nombre, apellido } = this.registerForm.value;
      const user = await this.authService.register(email, password, nombre, apellido);
      if (user) {
        this.modalService.dismissAll();
        this.router.navigate(['/verification-email']);
      }
    } catch (error) {
      this.authService.showError('Algo salio mal');
    }
  }

  //modal
  dimissModalRegister() {
    this.activeModal.dismiss();
  }

  openFormModalLogin() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(LoginComponent, {
      windowClass: 'modal-holder',
      size: 'md',
      centered: true
    });
  }

  match(controlKey: string) {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        const checkValue = control.parent.controls[controlKey].value;
        if (control.value !== checkValue) {
          //console.log('no son iguales');
          this.validacionPass = false;
          return {
            match: true
          };
        }
      }
      //console.log('iguales');
      this.validacionPass = true;
      return null;
    };
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

  //validar dos nombres
  match_nombre() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.split(' ');
        let long = data.length;
        //console.log(data);
        //console.log(long)
        if (long > 2) {
          this.mensaje_nombre = 'Solo puede ingresar dos nombres';
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje_nombre = 'No use espacios al inicio del primer nombre';
          return {
            match: true
          };
        } else if (data[1] === "" || data[1] === undefined) {
          this.mensaje_nombre = 'Debe ingresar dos nombres';
          return {
            match: true
          };
        }
      }
      this.mensaje_nombre = '';
      return null;
    };
  }

  //validar dos nombres
  match_apellido() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.split(' ');
        let long = data.length;
        //console.log(data);
        //console.log(long)
        if (long > 2) {
          this.mensaje_apellido = 'Solo puede ingresar dos apellidos';
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje_apellido = 'No use espacios al inicio del primer apellido';
          return {
            match: true
          };
        } else if (data[1] === "" || data[1] === undefined) {
          this.mensaje_apellido = 'Debe ingresar dos apellidos';
          return {
            match: true
          };
        }
      }
      this.mensaje_apellido = '';
      return null;
    };
  }


  IngresarSoloLetras(e) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    //Se define todo el abecedario que se va a usar.
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    //Es la validación del KeyCodes, que teclas recibe el campo de texto.
    let especiales = [8, 37, 39, 46, 6, 13];
    let tecla_especial = false
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      this.authService.showInfo('No se admite el ingreso de números');
      return false;
    }
  }


}
