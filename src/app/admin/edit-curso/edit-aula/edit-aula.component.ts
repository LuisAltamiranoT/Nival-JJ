import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-edit-aula',
  templateUrl: './edit-aula.component.html',
  styleUrls: ['./edit-aula.component.css']
})
export class EditAulaComponent implements OnInit {
  placeholder = "Ejemplo GR1"
  validate = true;

  aulaForm = new FormGroup({
    aula: new FormControl('', [Validators.required, Validators.minLength(1)])
  })

  constructor(
    public dialogRef: MatDialogRef<EditAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder= this.infoUser.nombreAula;
    this.aulaForm.patchValue({ aula: this.infoUser.nombreAula });
  }

  async onClick() {
    try {
      this.validate = false;
      const { aula } = this.aulaForm.value;

      let info = {
        aula: aula
      }
      const dat = await this.authService.updateCursoAula(this.infoUser.idCurso, info);
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

  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.aulaForm.patchValue({ aula: "" });
  }

}
