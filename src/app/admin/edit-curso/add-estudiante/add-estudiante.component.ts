import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.css']
})
export class AddEstudianteComponent implements OnInit {
  placeholder = "Ingrese nombres y apellidos"
  placeholderCodigo = "Ingrese el código único"
  validate = true;
  private array = [];
  private historial=[];
  private asistencia=[];

  estudianteForm = new FormGroup({
    codigoUnico: new FormControl('', [Validators.required, Validators.minLength(9),Validators.pattern("[0-9]{9}")]),
    estudiante: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-ZáéíóúüÁÉÍÓÚÜ ]{2,48}")]),
    email: new FormControl('', [Validators.required, Validators.email, this.matchEmail()])
  })

  constructor(
    public dialogRef: MatDialogRef<AddEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.array = this.infoUser.array;
    this.historial=this.infoUser.historial;
  }

  async onClick() {
    try {
      this.validate = false;
      let validacionDatos = false;
      const { codigoUnico, estudiante, email } = this.estudianteForm.value;

      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i].nombre.toLowerCase() == estudiante.toLowerCase()) {
          validacionDatos = true;
          this.authService.showError('El estudiante ' + estudiante + ' ya está registrado en el curso');
          this.validate = true;
          break;
        }

        if (this.array[i].codigoUnico == codigoUnico) {
          validacionDatos = true;
          this.authService.showError('El código único ' + codigoUnico + ' ya se encuentra registrado');
          this.validate = true;
          break;
        }

        if (this.array[i].correo == email) {
          validacionDatos = true;
          this.authService.showError('El correo electronico' + email + ' ya se encuentra registrado');
          this.validate = true;
          break;
        }
      }

      if (validacionDatos) {

      } else {
        this.historial.forEach(data=>{
          let splitted = data.split("//");
          let nombreDay = splitted[0];
          let fechaActual = splitted[1];
          this.asistencia.push({
            dia:nombreDay,
            fecha:fechaActual,
            presente:false,
            atraso:false,
            falta:true,
            estado:false
          })
        })

        console.log(this.asistencia);
        
        let info = {
          nombre: estudiante,
          codigoUnico: codigoUnico,
          correo: email,
          image: '',
          uidUser: 'noRegister',
          asistencia: this.asistencia
        }

        const dat = this.authService.addEstudiante(this.infoUser.idMateria, this.infoUser.idCurso, info);
        if (dat) {
          this.validate=true
          this.dialogRef.close();
        } else {
          this.validate = true;
        }
      }

    } catch (error) {
      this.authService.showError(error);
    }
  }
  dimissModal() {
    this.dialogRef.close();
  }

  limpiarNombre() {
    this.estudianteForm.patchValue({ estudiante: "" });
  }
  limpiarNumero() {
    this.estudianteForm.patchValue({ codigoUnico: "" });
  }
  limpiarCorreo() {
    this.estudianteForm.patchValue({ email: "" });
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

  IngresarSoloNumeros(evt) {
    if (window.event) {
      var keynum = evt.keyCode;
    }
    else {
      keynum = evt.which;
    }
    // Comprobamos si se encuentra en el rango numérico y que teclas no recibirá.
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6) {
      return true;
    }
    else {
      this.authService.showInfo('No se admite el ingreso de letras');
      return false;
    }
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
