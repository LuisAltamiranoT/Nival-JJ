import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  placeholder = "Ingresa una nueva materia"
  validate = true;
  materias = [];

  materiaForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(1)])
  })

  constructor(
    public dialogRef: MatDialogRef<MateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //console.log("modal", this.infoUser);
    this.materia();
  }

  async onClick() {
    try {
      let permiso = 1;
      this.validate = false;
      const { materia } = this.materiaForm.value;

      console.log(this.materias.length, "tamaño de array");

      if (this.materias.length != 0) {
        for (let i = 0; i < this.materias.length; i++) {
          //console.log(i+" "+"se compara ",this.materias[i].data.nombre,"->", materia);
          if (this.materias[i].data.nombre != materia) {
            permiso = 1;
            //console.log(permiso+" -> if for")
          } else {
            permiso = 0;
            //console.log(permiso +" -> else for termina")
            this.validate = true;
            this.authService.showError("La materia " + materia + " ya se encuentra registrada");
            break;
          }
        }
      }
      if (permiso != 0) {
        //console.log(permiso +" se guarda")
        const dat = await this.authService.createMateria(materia);
        if (dat) {
          this.authService.showUpdatedata();
          this.materiaForm.patchValue({ materia: "" });
          this.validate = true;
        }

      } else {
        //console.log(permiso +" no se guarda")

      }
    } catch (error) {

    }
  }
  guardarData() {

  }

  materia() {
    this.authService.getDataMateria().subscribe((data) => {
      this.materias = [];
      data.forEach((dataMateria: any) => {

        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });
  }


  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.materiaForm.patchValue({ materia: "" });
  }


}
