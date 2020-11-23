import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  validate=true;

  hide = true;
  hide1 = true;
  hide2 = true;
  
  passwordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    rePassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
  })

  constructor(
    public dialogRef: MatDialogRef<PasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async onClick(){
    this.validate=false;
    const {  oldPassword, newPassword,rePassword } = this.passwordForm.value;
    if(newPassword!=rePassword){
      this.authService.showError("Existe un error en los datos ingresados");
      this.validate=true;
    }else{
      const dat = await this.authService.updatePass(oldPassword,newPassword);
      if(dat!=1){
       this.validate=true;
      }else{
        this.dimissModal();
        this.authService.showSuccess("Su contraseña ha sido actualizada");
      }
    }
  }

  dimissModal(){
    this.dialogRef.close();
  }
}
