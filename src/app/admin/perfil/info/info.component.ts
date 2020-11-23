import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, AbstractControl, Validator } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  validate = true;

  placeholder = "Escribe algo sobre ti";
  mensaje = "";

  infoForm = new FormGroup({
    info: new FormControl('', [this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.infoUser == "") {

    } else {
      this.infoForm.patchValue({ info: this.infoUser });
      this.placeholder = this.infoUser;
    }

  }

  async onClick() {
    try {
      this.validate = false;
      const { info } = this.infoForm.value;
      const dat = await this.authService.updateDescripcion(info);
      if (dat) {
        this.authService.showUpdatedata();
        this.dialogRef.close();
      }
      if (!dat) {
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser() {
    this.infoForm.patchValue({ info: "" });
  }

  dimissModal() {
    this.dialogRef.close();
  }

  //validar informacion
  match() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value;
        //console.log(data);
        //console.log(long)
        if (data === this.placeholder) {
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
