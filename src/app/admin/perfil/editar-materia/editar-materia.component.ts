import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {
  validate=true;
  materias = [];
  idData:any;

  placeholder = "";

  materiaForm = new FormGroup({
    materia: new FormControl('',[Validators.required,Validators.minLength(1)])
  })

  constructor(
    public dialogRef: MatDialogRef<EditarMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombre;
    this.materias=this.infoUser.array;
    this.idData=this.infoUser.id;
    this.materiaForm.patchValue({ materia: this.infoUser.nombre });
  }

  async onClick(){
    try{
      let permiso = 0;
      this.validate=false;
      const { materia } = this.materiaForm.value;

      for (let i = 0; i < this.materias.length; i++) {
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
      if (permiso != 0) {
        //console.log(permiso +" se guarda")
        const dat = await this.authService.updateMateria(this.idData,materia);
        if (dat) {
          this.authService.showUpdatedata();
          this.dialogRef.close();
          this.validate = true;
        }
        if(!dat){
          this.validate=true;
        }

      } else {
        //console.log(permiso +" no se guarda")
        
      }

    }catch(error){
      console.log(error);
    }
  }

  dimissModal(){
    this.dialogRef.close();
  }

  eraser() {
    this.materiaForm.patchValue({ materia: "" });
  }



}
