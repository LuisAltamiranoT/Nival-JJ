import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-edit-aula',
  templateUrl: './edit-aula.component.html',
  styleUrls: ['./edit-aula.component.css']
})
export class EditAulaComponent implements OnInit {
  placeholder = "Ejemplo GR1"
  validate = true;
  mensaje = "";

  aulaForm = new FormGroup({
    aula: new FormControl('', [Validators.required, Validators.minLength(1), this.matchCharts()])
  })

  constructor(
    public dialogRef: MatDialogRef<EditAulaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.placeholder = this.infoUser.nombreAula;
    this.aulaForm.patchValue({ aula: this.infoUser.nombreAula });
  }

  async onClick() {
    try {
      this.validate = false;
      const { aula } = this.aulaForm.value;
      console.log(this.infoUser.array[0].cursos[this.infoUser.index]['aula'])

      this.infoUser.array[0].cursos[this.infoUser.index]['aula'] = aula;
      console.log(this.infoUser.arrray);

      const dat = await this.authService.updateCursoAula(this.infoUser.idMateria, this.infoUser.array);
      if (dat) {
        this.dialogRef.close();
      } else {
        this.validate = true;
      }

    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }


  limpiarNombre() {
    this.aulaForm.patchValue({ aula: "" });
  }

  matchCharts() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      // control.parent es el FormGroup
      if (control.parent) { // en las primeras llamadas control.parent es undefined
        let data = control.value;
        //console.log(dominio[1],dominio.length);
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
