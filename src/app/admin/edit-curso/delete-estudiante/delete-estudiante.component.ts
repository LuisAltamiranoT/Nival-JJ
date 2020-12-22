import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/app/services/auth.service'


@Component({
  selector: 'app-delete-estudiante',
  templateUrl: './delete-estudiante.component.html',
  styleUrls: ['./delete-estudiante.component.css']
})
export class DeleteEstudianteComponent implements OnInit {
  placeholder = ""
  validate = true;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombre;
  }

  
  onClick() {
    try {
      this.validate = false;
      const dat = this.authService.deleteEstudiante(this.infoUser.idMateria, this.infoUser.idNomina,this.infoUser.array);
      if (dat) {
        this.dialogRef.close();
      }else{
        this.validate = true;
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }


}
