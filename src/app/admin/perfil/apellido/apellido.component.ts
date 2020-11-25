import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-apellido',
  templateUrl: './apellido.component.html',
  styleUrls: ['./apellido.component.css']
})
export class ApellidoComponent implements OnInit {

  validate=true;

  placeholder = "Ingresa tus apellidos"

  apellidoForm = new FormGroup({
    lastName: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<ApellidoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.infoUser == "") {

    } else {
      this.apellidoForm.patchValue({ lastName: this.infoUser });
      this.placeholder=this.infoUser;
    }
  }

  async onClick(){
    try {
      this.validate=false;
      const { lastName } = this.apellidoForm.value;
      if (lastName!="") {
        const dat = await this.authService.updateLastName(lastName);
        if (dat) {
          this.dialogRef.close();
        }else{
          this.validate=true;
        }
      }else{
        this.authService.showError("Este campo es obligatorio");
        this.validate=true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser() {
    this.apellidoForm.patchValue({ lastName: "" });
  }


  dimissModal(){
    this.dialogRef.close();
  }

}
