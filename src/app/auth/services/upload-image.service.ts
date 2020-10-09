import { Injectable } from '@angular/core';
import { FileI, Curso } from 'src/app/shared/models/user.interface';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ImageValidator } from 'src/app/auth/helpers/imageValidators';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService extends ImageValidator {

  private filePath: any;
  private downloadURL: Observable<string>;
  private MEDIA_STORAGE_PATH = 'imageCurso';
  private MEDIA_STORAGE_PATH_PERFIL = 'perfil';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    super();
  }

  public preAddAndUpdate(data: any, image: FileI) {
    this.uploadImageService(data, image, this.MEDIA_STORAGE_PATH);
  }

  public preAddAndUpdatePerfil(image: FileI) {
    let data = '';
    this.uploadImageService(data, image, this.MEDIA_STORAGE_PATH_PERFIL);
  }

  private uploadImageService(data: any, image: FileI, filenameFs) {
    this.filePath = this.generateFileName(image.name, filenameFs);
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          console.log('url', urlImage, data);
          if (filenameFs === 'imageCurso') {
            this.addCurso(data);
          }
          else {
            this.addPhoto();
          }

        });
      })
    ).subscribe();
  }

  private generateFileName(name: string, filenameFs: string): string {
    return `${filenameFs}/${new Date().getTime()}_${name}`;
  }

  public addCurso(data: Curso) {
    this.authService.createCurso(data, this.downloadURL);
  }

  public addCurso2(data: Curso) {
    this.authService.createCurso(data, '');
  }

  public addPhoto() {
    this.authService.updatePhoto(this.downloadURL);
  }
}


