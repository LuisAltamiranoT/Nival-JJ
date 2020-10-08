import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  validate=true;

  placeholder = "Escribe algo sobre ti"


  infoForm = new FormGroup({
    info: new FormControl('')
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
    }

  }

  async onClick() {
    try {
      this.validate=false;
      const { info } = this.infoForm.value;
      const dat = await this.authService.updateDescripcion(info);
      if (dat) {
        this.authService.showUpdatedata();
        this.dialogRef.close();
      }
      if(!dat){
        this.validate=true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  eraser(){
    this.infoForm.patchValue({ info: "" });
  }

  dimissModal() {
    this.dialogRef.close();
  }

}
