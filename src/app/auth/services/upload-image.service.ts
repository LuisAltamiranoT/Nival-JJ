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

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    super();
  }

  public preAddAndUpdate(data: any, image: FileI) {
    this.uploadImageService(data, image);
  }

  private uploadImageService(data: any, image: FileI) {
    this.filePath = this.generateFileName(image.name);
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          //console.log('url', urlImage, data);
          this.addCurso(data);
        });
      })
    ).subscribe();
  }

  private generateFileName(name: string): string {
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }

  public addCurso(data: Curso) {
    this.authService.createCurso(data, this.downloadURL);
  }

  public addCurso2(data: Curso) {
    this.authService.createCurso(data, '');
  }

}


