import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-edit-estudiante',
  templateUrl: './edit-estudiante.component.html',
  styleUrls: ['./edit-estudiante.component.css']
})
export class EditEstudianteComponent implements OnInit {
  public placeholder = ""
  public placeholderCodigo = ""
  public validate = true;

  private array = [];

  estudianteForm = new FormGroup({
    codigoUnico: new FormControl('', [Validators.required, Validators.minLength(1)]),
    estudiante: new FormControl('', [Validators.required, Validators.minLength(1)])
  })

  constructor(
    public dialogRef: MatDialogRef<EditEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser.posicion);
    this.placeholder = this.infoUser.nombre;
    this.placeholderCodigo = this.infoUser.numero;
    this.estudianteForm.patchValue({ codigoUnico: this.infoUser.numero });
    this.estudianteForm.patchValue({ estudiante: this.infoUser.nombre });
    this.array = this.infoUser.array;
  }

  async onClick() {
    try {
      this.validate = false;
      let validacionDatos = 0;
      const { codigoUnico } = this.estudianteForm.value;
      const { estudiante } = this.estudianteForm.value;
      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i].nombre.toLowerCase() == estudiante.toLowerCase() && i!=this.infoUser.posicion) {
          validacionDatos = 1;
          this.authService.showError('El estudiante ' + estudiante + ' ya está registrado en el curso');
          this.validate = true;
          break;
        }

        if (this.array[i].codigoUnico == codigoUnico && i!=this.infoUser.posicion) {
          validacionDatos = 1;
          this.authService.showError('El Número Único ' + codigoUnico + ' ya se encuentra registrado');
          this.validate = true;
          break;
        }
      }

      if (validacionDatos != 0) {
      } else {
        let info = {
          nombre: estudiante,
          codigoUnico: codigoUnico
        }
        const dat = await this.authService.updateEstudiante(info,this.infoUser.idCurso,this.infoUser.idEstudiante);
        if (dat) {
          this.authService.showUpdatedata();
          this.dialogRef.close();
        }
        if (!dat) {
          this.validate = true;
        }
      }


    } catch (error) {
      this.authService.showError(error);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.estudianteForm.patchValue({ codigoUnico: "" });
    this.estudianteForm.patchValue({ estudiante: "" });
  }
}
