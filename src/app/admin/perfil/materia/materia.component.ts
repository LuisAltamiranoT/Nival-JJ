import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  placeholder = "Ingresa una nueva materia";
  mensaje = '';
  validate = true;
  materias = [];
  nombreProfesor = '';
  image = "../../../assets/perfil.jpg";

  //control de suscripciones
  private suscripcion1: Subscription;

  materiaForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(4), this.match()])
  })

  constructor(
    public dialogRef: MatDialogRef<MateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.nombreProfesor = this.infoUser.nombre;
    this.image = this.infoUser.image;
    this.materia();
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }

  async onClick() {
    try {
      this.validate = false;
      const { materia } = this.materiaForm.value;
      const dat = await this.authService.createMateria(materia,this.nombreProfesor,this.image);
        if (dat) {
          this.materiaForm.patchValue({ materia: "" });
          this.validate = true;
        }
    } catch (error) {

    }
  }


  materia() {
    this.suscripcion1 = this.authService.getDataMateria().subscribe((data) => {
      this.materias = [];
      data.forEach((dataMateria: any) => {
        this.materias.push(
          dataMateria.payload.doc.data().nombre.toUpperCase()
        );
      })
    });
  }


  dimissModal() {
    this.dialogRef.close();
  }

  eraser() {
    this.materiaForm.patchValue({ materia: "" });
  }

  //validar dos nombres
  match() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.parent) {
        let data = control.value;
        //console.log(this.materias);
        //console.log(data.toUpperCase())
        if (this.materias.includes(data.toUpperCase())) {
          this.mensaje = 'Esta materia ya exite en tu lista';
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
