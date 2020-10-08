import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
import { InfoComponent } from '../info/info.component';


@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {
  validate=true;

  placeholder = "Dinos donde localizarte"

  oficinaForm = new FormGroup({
    office: new FormControl('')
  })


  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.oficinaForm.patchValue({ office: this.infoUser });
  }

  async onClick() {
    try {
      this.validate=false;
      const { office } = this.oficinaForm.value;
      const dat = await this.authService.updateOficina(office);
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

  eraser() {
    this.oficinaForm.patchValue({ office: "" });
  }


  dimissModal(){
    this.dialogRef.close();
  }



}
