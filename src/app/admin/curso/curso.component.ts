import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/auth/services/upload-image.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  placeholder = "Ingresa información del aula";

  cursoForm = new FormGroup({
    materia: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl(''),
    aula:new FormControl('',[Validators.required, Validators.minLength(1)]),
    dia: new FormControl('',[Validators.required, Validators.minLength(1)]),
    horaInicio: new FormControl(''),
    horaFin: new FormControl(''),
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
    private uploadImage: UploadImageService
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

}
