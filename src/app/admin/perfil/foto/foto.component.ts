import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

//subscripcion a un observable
import { Subscription } from "rxjs";

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  private stateImage: Subscription = null;

  validate = true;


  photoForm = new FormGroup({
    image: new FormControl('', Validators.required)
  })

  //image="";
  perfil = '';
  private file: any;
  public photoSelected: string | ArrayBuffer;
  //validar tamaño y tipo de imagen
  private validImage: boolean = false;
  private validateSize: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FotoComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private uploadImage: UploadImageService
  ) { }

  ngOnInit(): void {

    /*
    data: this.perfil,
        array:this.materias
     */

    this.photoSelected = '../../../assets/aqui.jpg';

    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.dimissModal();
    })
  }
  ngOnDestroy() {
    if(this.stateImage){
      this.stateImage.unsubscribe();
    }
    
  }


  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      this.validateSize = this.uploadImage.validateSize(this.file.size);
      //console.log('esto es a imagen',this.file.size);
      //console.log('esto es el tamaño',this.validateSize);
      if (this.validImage) {
        if (this.validateSize) {
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.file);
        } else {
          this.authService.showError('El tamaño de la imagen no puede exceder los 2MB');
          this.file = '';
          this.photoForm.patchValue({ image: '' });
        }
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
        this.file = '';
        this.photoForm.patchValue({ image: '' });
      }
    } else {
      this.validImage = false;
    }
  }

  addFoto() {
    this.validate = false;
    if (this.validImage && this.infoUser.data === 'no-image') {
      let data = this.uploadImage.preAddAndUpdatePerfil(this.file,this.infoUser.array);
    } else {
      let data = this.uploadImage.preAddAndUpdatePerfil(this.file,this.infoUser.array);
      this.uploadImage.deleteImagePerfil(this.infoUser.data);
    }
  }



  dimissModal() {
    this.validate = true;
    this.authService.showSuccess('La información se ha actualizado');
    this.dialogRef.close();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
