import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent implements OnInit {
  validate = true;
  placeholder = "Ingresa tus nombres";
  mensaje = '';

  nombreForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4), this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<NombreComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    /*nombre:this.nombre,
      apellido:this.apellido,
      arrayMaterias:this.materias */

    console.log(this.infoUser);

    if (this.infoUser == "") {

    } else {
      //almacena informacion
      this.nombreForm.patchValue({ name: this.infoUser.nombre });
      this.placeholder = this.infoUser.nombre;
    }
  }


  eraser() {
    this.nombreForm.patchValue({ name: "" });
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

  async onClick() {
    try {
      this.validate = false;
      this.mensaje = '';
      const { name } = this.nombreForm.value;
      this.updateMateria(name);
      const dat = await this.authService.updateName(name);
      if (dat) {
        this.dialogRef.close();
      } else {
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  //ejecutar actualizacion en loas archivos materia
  updateMateria(nombre:any){
    this.infoUser.arrayMaterias.forEach(element => {
      this.authService.updateMateriaNombreProfesor(element.id,nombre+' '+this.infoUser.apellido);
    });
  }

  dimissModal() {
    this.mensaje = '';
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
          this.mensaje = 'Solo puede ingresar dos nombres';
          return {
            match: true
          };
        } else if (data[0] + ' ' + data[1] === this.placeholder) {
          return {
            match: true
          };
        } else if (data[0] === "") {
          this.mensaje = 'No use espacios al inicio del primer nombre';
          return {
            match: true
          };
        } else if (data[1] === "") {
          this.mensaje = 'Debe ingresar dos nombres';
          return {
            match: true
          };
        }
      }
      this.mensaje = '';
      return null;
    };
  }
  
  limpiarBusqueda() {
    this.nombreForm.patchValue({ name: "" });
  }
}


