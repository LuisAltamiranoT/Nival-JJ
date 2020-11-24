import { Injectable } from '@angular/core';
import { FileI, Curso } from 'src/app/models/user.interface';


///observable y subject permite ejecutar una accion al cumplirse una condicion
import { Observable} from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { ImageValidator } from 'src/app/helpers/imageValidators';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService extends ImageValidator {
  private filePath: any;
  private downloadURL: Observable<string>;
  private MEDIA_STORAGE_PATH = 'imageCurso';
  private MEDIA_STORAGE_PATH_PERFIL = 'perfil';
  public nominaDat:any;
  public nominaHorario:any;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    super();
  }

  public preAddAndUpdate(aula: any,idMateria:any,image: FileI,nomina:any,horario:any,cursos:any) {
    //aula,idMateria,image,Nomina,Horario,cursos
    this.filePath = this.generateFileName(image.name, this.MEDIA_STORAGE_PATH);
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    let dataTsk = task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          //aqui se ejecuta el
          this.addCurso(aula,idMateria,horario,nomina,cursos);
          //aula,idMateria,horario,nomina,arrayCursos
        });
      })
    ).subscribe();
    //cursos,idMateria,idCurso,nomina
  }

  async addCurso(aula:any,idMateria:any,horario:any,nomina:any,arrayCurso:any){
               //aula,idMateria,horario,nomina,arrayCursos
    let cursos = arrayCurso;
    let id = cursos.length + 1;
    let idCurso = idMateria + id;
    let cursoNuevo = await this.authService.createNomina(nomina,idCurso,idMateria);

      cursos.push({
        id: idCurso,
        aula: aula,
        image: this.downloadURL,
        horario: horario,
        uidNomina:cursoNuevo.id
      });    
    await this.authService.createCurso(cursos,idMateria);
  }






  public preAddAndUpdateCurso(image: FileI, idCurso:any) {
    let data=idCurso;
    this.uploadImageService(data, image, this.MEDIA_STORAGE_PATH,'updateCurso');
  }

  public preAddAndUpdatePerfil(image: FileI) {
    let data = '';
    this.uploadImageService(data, image, this.MEDIA_STORAGE_PATH_PERFIL,'updatePerfil');
  }



  private uploadImageService(data: any, image: FileI, filenameFs:string,clave:any){
    let item = false;
    this.filePath = this.generateFileName(image.name, filenameFs);
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    let dataTsk = task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURL = urlImage;
          if(clave==='updatePerfil'){
            this.addPhoto();
          }
          if(clave==='updateCurso'){
            this.updateImageCurso(data);
          }

        });
      })
    ).subscribe();
  }


  public async addPhoto() {
    let info = await this.authService.updatePhoto(this.downloadURL);
    return info;
  }

  public deleteImagePerfil(imageName:string){
    let splitted = imageName.split("perfil%2F")[1];
    let name =  splitted.split("?alt")[0];
    const fileref = this.storage.ref(`${this.MEDIA_STORAGE_PATH_PERFIL}/${name}`); 
    fileref.delete();
  }

  public async updateImageCurso(idCurso:any) {
    let info = await this.authService.updatePhotoCurso(this.downloadURL,idCurso);
    return info;
  }
  
  public deleteImageCurso(imageName:string){
    let splitted = imageName.split("imageCurso%2F")[1];
    let name =  splitted.split("?alt")[0];
    const fileref = this.storage.ref(`${this.MEDIA_STORAGE_PATH}/${name}`); 
    fileref.delete();
  }

  private generateFileName(name: string, filenameFs: string): string {
    return `${filenameFs}/${new Date().getTime()}_${name}`;
  }

}

