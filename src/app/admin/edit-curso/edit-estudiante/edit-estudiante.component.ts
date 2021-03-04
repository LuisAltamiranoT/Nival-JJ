import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-estudiante',
  templateUrl: './edit-estudiante.component.html',
  styleUrls: ['./edit-estudiante.component.css']
})
export class EditEstudianteComponent implements OnInit {
  public placeholder = "";
  public placeholderCodigo = "";
  public placeholderCorreo ="";
  public validate = true;

  private array = [];

  estudianteForm = new FormGroup({
    codigoUnico: new FormControl('',[Validators.required, Validators.minLength(9),Validators.pattern("[0-9]{9}")]),
    estudiante: new FormControl('',[Validators.required, Validators.minLength(2),Validators.pattern("[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ ]{2,48}")]),
    email: new FormControl('',[Validators.required, Validators.email,this.matchEmail()])
  })

  constructor(
    public dialogRef: MatDialogRef<EditEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombre;
    this.placeholderCodigo = this.infoUser.numero;
    this.placeholderCorreo = this.infoUser.correo;
    this.estudianteForm.patchValue({ codigoUnico: this.infoUser.numero });
    this.estudianteForm.patchValue({ estudiante: this.infoUser.nombre });
    this.estudianteForm.patchValue({ email: this.infoUser.correo });
    this.array = this.infoUser.array;
  }

  async onClick() {
    try {
      this.validate = false;
      let validacionDatos = false;
      const { codigoUnico,estudiante,email } = this.estudianteForm.value;

      if(codigoUnico===this.placeholderCodigo&&estudiante===this.placeholder&&email===this.placeholderCorreo){
        this.authService.showInfo('No se ha realizado ningún cambio');
        this.validate=true
        this.dialogRef.close();
      }else{
        for (let i = 0; i < this.array.length; i++) {
          if (this.array[i].nombre.toLowerCase() == estudiante.toLowerCase() && i !=this.infoUser.posicion) {
            validacionDatos = true;
            this.authService.showError('El estudiante ' + estudiante + ' ya está registrado en el curso');
            this.validate = true;
            break;
          }
  
          if (this.array[i].codigoUnico == codigoUnico && i != this.infoUser.posicion) {
            validacionDatos = true;
            this.authService.showError('El código único ' + codigoUnico + ' ya se encuentra registrado');
            this.validate = true;
            break;
          }else if (this.array[i].correo == email && i != this.infoUser.posicion) {
            validacionDatos = true;
            this.authService.showError('El correo electronico' + email + ' ya se encuentra registrado');
            this.validate = true;
            break;
          }
        }
  
        if (validacionDatos) {
  
        } else {
          this.array[this.infoUser.posicion]['nombre']=estudiante;
          this.array[this.infoUser.posicion]['codigoUnico']=codigoUnico;
          this.array[this.infoUser.posicion]['correo']=email;


          let update = this.authService.updateNominaEstudiante(this.infoUser.idNomina,this.infoUser.idMateria,this.array);
          if(update){
            this.validate=true
            this.dialogRef.close();
          }else{
            this.validate=true
          }
        }
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  limpiarNombre(){
    this.estudianteForm.patchValue({ estudiante: "" });
  }

  limpiarNumero() {
    this.estudianteForm.patchValue({ codigoUnico: "" });
  }
  limpiarCorreo(){
    this.estudianteForm.patchValue({ email: "" });
  }

  matchEmail() {
    return (control: AbstractControl): { [s: string]: boolean } => {    
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let dominio=control.value.split("@", 2);
        if (dominio[1] !== 'epn.edu.ec') {
          return {
            match: true
          };
        }
      }
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
      this.authService.showInfo('No se admite el ingreso de letras.');
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
      this.authService.showInfo('No se admite el ingreso de números.');
      return false;
    }
  }

}
