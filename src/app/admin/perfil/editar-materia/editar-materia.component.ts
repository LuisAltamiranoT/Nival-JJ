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
  content=[];
  idData: any;
  mensaje = '';

  placeholder = "";

  materiaForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(4), this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<EditarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /**
     *nombre: nombre,
      id: idMateria,
      array: this.materias
     */

    this.placeholder = this.infoUser.nombre;
    this.content = this.infoUser.array;
    this.idData = this.infoUser.id;
    this.materiaForm.patchValue({ materia: this.infoUser.nombre });

    this.createArray();
    
  }

  createArray(){
    this.content.forEach((dataMateria: any) => {
      this.materias.push(
        dataMateria.data.nombre.toUpperCase()
      );
      console.log(this.materias);
    })
  }

  onClick() {
    try {
      this.validate = false;
      const { materia } = this.materiaForm.value;

      let dat = this.authService.updateMateria(this.idData, materia);
                                            /////////documentId: string, data: any                       
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

}