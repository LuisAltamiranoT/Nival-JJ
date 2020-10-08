import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-editar-anio',
  templateUrl: './editar-anio.component.html',
  styleUrls: ['./editar-anio.component.css']
})
export class EditarAnioComponent implements OnInit {
  validate=true;

  anioForm = new FormGroup({
    inicio: new FormControl(''),
    fin: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<EditarAnioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  async onClick() {
    try {
      this.validate=false;
      const { inicio } = this.anioForm.value;
      const { fin } = this.anioForm.value;
      
      const dat = await this.authService.updateAnioLectivo(inicio,fin);
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
  
  dimissModalInfo() {
    this.dialogRef.close();
  }

  eraser(){
    this.anioForm.patchValue({ info: "" });
  }

}
