import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {
  validate = true;
  materias = [];
  idData: any;
  mensaje = '';

  placeholder = "";

  materiaForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(4), this.match(), this.matchNombre()])
  })

  constructor(
    public dialogRef: MatDialogRef<EditarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombre;
    this.materias = this.infoUser.array;
    this.idData = this.infoUser.id;
    this.materiaForm.patchValue({ materia: this.infoUser.nombre });
  }

  async onClick() {
    try {
      this.validate = false;
      const { materia } = this.materiaForm.value;
      const dat = await this.authService.updateMateria(this.idData, materia);
      if (dat) {
        this.dialogRef.close();
        this.validate = true;
      } else {
        this.validate = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.materiaForm.patchValue({ materia: "" });
  }

  //validar dos nombres
  match() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value;
        //console.log(this.materias);
        //console.log(data.toUpperCase())
        if (this.materias.includes(data.toUpperCase())) {
          this.mensaje = 'Esta materia ya exite en tu lista';
          return {
            match: true
          };
        }
      }
      this.mensaje = '';
      return null;
    };
  }

  //validar dos nombres
  matchNombre() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value.toUpperCase();
        if (data === this.placeholder.toUpperCase()) {
          return {
            match: true
          };
        }
        this.mensaje = '';
        return null;
      };
    }
  }

}
