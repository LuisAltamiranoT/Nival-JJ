import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-apellido',
  templateUrl: './apellido.component.html',
  styleUrls: ['./apellido.component.css']
})
export class ApellidoComponent implements OnInit {

  validate = true;
  mensaje = '';

  placeholder = "Ingresa tus apellidos";

  apellidoForm = new FormGroup({
    lastName: new FormControl('', [Validators.required, Validators.minLength(4), this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<ApellidoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.infoUser == "") {

    } else {
      this.apellidoForm.patchValue({ lastName: this.infoUser });
      this.placeholder = this.infoUser;
    }
  }

  async onClick() {
    try {
      this.validate = false;
      const { lastName } = this.apellidoForm.value;
      if (lastName != "") {
        const dat = await this.authService.updateLastName(lastName);
        if (dat) {
          this.authService.showUpdatedata();
          this.dialogRef.close();
        }
        if (!dat) {
          this.validate = true;
        }
      } else {
        this.authService.showError("Este campo es obligatorio");
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser() {
    this.apellidoForm.patchValue({ lastName: "" });
  }


  dimissModal() {
    this.dialogRef.close();
  }

  //validar dos nombres
  match() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.split(' ');
        let long = data.length;
        //console.log(data);
        //console.log(long)
        if (long > 2) {
          this.mensaje = 'Solo puede ingresar dos apellidos';
          return {
            match: true
          };
        } else if (data[0] + ' ' + data[1] === this.placeholder) {
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje = 'No use espacios al inicio del primer apellido';
          return {
            match: true
          };
        } else if (data[1] === "" || data[1] === undefined) {
          this.mensaje = 'Debe ingresar dos apellidos';
          return {
            match: true
          };
        }
      }
      this.mensaje = '';
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
