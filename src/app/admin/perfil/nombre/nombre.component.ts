import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent implements OnInit {
  validate = true;


  placeholder = "Ingresa tus nombres"

  nombreForm = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<NombreComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    console.log(this.infoUser);

    if (this.infoUser == "") {

    } else {
      this.nombreForm.patchValue({ name: this.infoUser });
      this.placeholder = this.infoUser;
    }
  }

/*

if (this.horario[i].final <= inicio) {
    console.log('el segundo if ' + this.horario[i].inicio, final);
    console.log("puede guardarse");
  } else {
    console.log('el segundo if ' + this.horario[i].inicio, final);
    this.authService.showError('La fecha no coincide if 2');
    break;
  }
*/




async onClick() {
  try {
    this.validate = false;
    const { name } = this.nombreForm.value;
    if (name != "") {
      const dat = await this.authService.updateName(name);
      if (dat) {
        this.authService.showUpdatedata();
        this.dialogRef.close();
      }
      if (!dat) {
        this.validate = true;
      }
    } else {
      this.authService.showError("Este campo es obligatorio");
      this.validate = true;
    }
  } catch (error) {
    this.authService.showError(error);
  }
}

eraser() {
  this.nombreForm.patchValue({ name: "" });
}


dimissModal() {
  this.dialogRef.close();
}

}
