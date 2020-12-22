//Eliminar una materia
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadImageService } from 'src/app/services/upload-image.service';

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-eliminar-data',
  templateUrl: './eliminar-data.component.html',
  styleUrls: ['./eliminar-data.component.css']
})
export class EliminarDataComponent implements OnInit {
  //validacion del bar
  validate = true;
  //nombre materia
  materia = "";
  //ide de la materia
  idData: any;
  //almacenar las materias 
  materiaSeleccionada: any;
  //formulario
  materiaForm = new FormGroup({
    //materia: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EliminarDataComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private UploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    this.idData = this.infoUser.id;
    this.materia = this.infoUser.nombre;
    this.materiaSeleccionada = this.infoUser.array;
  }

  async onClick() {
    try {
      this.validate = false;
      if (this.materiaSeleccionada.cursos.length != 0) {
        this.materiaSeleccionada.cursos.forEach(element => {
          if (element.image != '') {
            this.UploadImageService.deleteImageCurso(element.image);
          }
          this.authService.deleteNomina(this.idData, element.uidNomina);
        });
      }
      let dat = await this.authService.delecteMateria(this.idData);
      if (dat) {
        this.validate = true;
        this.dialogRef.close();
      } else {
        this.validate = true;
      }


    } catch (error) {

    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

}
