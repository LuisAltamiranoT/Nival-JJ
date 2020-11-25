//Eliminar una materia
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-eliminar-data',
  templateUrl: './eliminar-data.component.html',
  styleUrls: ['./eliminar-data.component.css']
})
export class EliminarDataComponent implements OnInit {

  validate=true;


  materia = "";
  idData:any;
  materiaForm = new FormGroup({
    //materia: new FormControl('')
  })


  constructor(
    public dialogRef: MatDialogRef<EliminarDataComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.materiaForm.patchValue({ materia: this.infoUser});
    this.idData=this.infoUser.id;
    this.materia= this.infoUser.nombre;
  }

  onClick(){
    try{
      this.validate=false;
      const dat = this.authService.delecteMateria(this.idData);

        if (dat) {
          this.validate=true;
        }else{
          this.dialogRef.close();
          this.authService.showSuccess("La materia "+ this.materia +" ha sido eliminada");
        }

    }catch(error){

    }
  }

  dimissModal(){
    this.dialogRef.close();
  }

}
