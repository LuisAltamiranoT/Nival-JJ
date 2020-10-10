import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/auth/services/upload-image.service';

import { MatDialog } from '@angular/material/dialog';
import { VistaHorarioComponent } from './vista-horario/vista-horario.component';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {
  cursoForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl('')
  })


  

  public materias = [];
  public horario =[];


  //image="";
  perfil = '';
  private file: any;
  public photoSelected: string | ArrayBuffer;
  private validImage: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private uploadImage: UploadImageService,
    public ventana: MatDialog,
  ) { }

  ngOnInit(): void {
    this.materia();
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      if (this.validImage) {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
      }
    }else{
      this. validImage=false;
    }
  }


  materia() {
    this.authService.getDataMateria().subscribe((data) => {
      this.materias = [];
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })

    });
  }

  addCurso(data: any) {
    console.log(data.value);
    let splitted = data.value.materia.split("+//+", 2);
    console.log(splitted);


    //if (this.validImage) {
      //this.uploadImage.preAddAndUpdate(splitted[1], this.file)
    //}else{
      //this.uploadImage.addCurso2(splitted[1]);
    //}
  }
  openHorario() {
    this.ventana.open(VistaHorarioComponent,
      { width: ' 45rem' }).afterClosed().subscribe(item => {
      });
  }

}
