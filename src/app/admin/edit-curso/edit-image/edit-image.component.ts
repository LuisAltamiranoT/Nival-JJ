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
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  private stateImage: Subscription = null;
  validate = true;

  photoForm = new FormGroup({
    image: new FormControl('')
  })

  //image="";
  perfil = '';
  private file: any;
  public photoSelected: string | ArrayBuffer;
  private validImage: boolean = false;
  private validateSize: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService,
    private uploadImage: UploadImageService
  ) { }

  ngOnInit(): void {
    this.photoSelected = 'https://firebasestorage.googleapis.com/v0/b/easyacnival.appspot.com/o/nival%2Faqui.jpg?alt=media&token=e012db0c-46aa-4e36-bfa2-790a308fd4d8';

    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.dimissModal();
    })
  }

  ngOnDestroy() {
    this.stateImage.unsubscribe();
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
    if (this.validImage && this.infoUser.image === '') {
      console.log('llego aqui');
      this.uploadImage.preAddAndUpdateCurso(this.file, this.infoUser);
    } else {
      this.uploadImage.preAddAndUpdateCurso(this.file, this.infoUser);
      this.uploadImage.deleteImageCurso(this.infoUser.image);
    }
  }

  dimissModal() {
    this.validate = true;
    this.dialogRef.close();
  }


  closeModal() {
    this.dialogRef.close();
  }

}
