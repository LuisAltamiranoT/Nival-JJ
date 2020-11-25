import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadImageService } from 'src/app/services/upload-image.service';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-eliminar-curso',
  templateUrl: './eliminar-curso.component.html',
  styleUrls: ['./eliminar-curso.component.css']
})
export class EliminarCursoComponent implements OnInit {
  //validacion del bar
  validate = true;
  //nombre materia
  materia = "";
  //ide de la materia
  idData: any;
  //almacenar las materias 
  materiaSeleccionada: any;
  //imagen
  image: any;
  //nomina
  nomina: any;
  //formulario
  materiaForm = new FormGroup({
    //materia: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EliminarCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private UploadImageService: UploadImageService
  ) { }

  ngOnInit(): void {
    //this.materiaForm.patchValue({ materia: this.infoUser});
    /*
      nombre:nombre,
      uidNomina: uidNomina,
      image:image,
      idMateria: idMateria,
 array:array el array de la amteria
    */
    this.materia = this.infoUser.nombre;
    this.idData = this.infoUser.idMateria;
    this.image = this.infoUser.image;
    this.nomina = this.infoUser.uidNomina;
    this.materiaSeleccionada = this.infoUser.array;
    console.log('adsasdf',this.materiaSeleccionada, this.infoUser);
  }

  async onClick() {
    try {
      this.validate = false;
      if (this.image != '') {
        this.UploadImageService.deleteImageCurso(this.image);
      }
      this.authService.deleteNomina(this.idData, this.nomina);
      let dat = this.authService.deleteCurso(this.idData,this.materiaSeleccionada);
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
