import { Injectable } from '@angular/core';
import { FileI, Curso } from 'src/app/shared/models/user.interface';


///observable y subject permite ejecutar una accion al cumplirse una condicion
import { Observable} from 'rxjs';

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
  public nominaDat:any;
  public nominaHorario:any;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) {
    super();
  }

  public preAddAndUpdate(data: any, image: FileI,dataNomina:any,dataHorario:any) {
    this.nominaDat=dataNomina;
    this.nominaHorario=dataHorario;
    console.log('estamos en el service'+image.name);
    this.uploadImageService(data, image, this.MEDIA_STORAGE_PATH,'addCurso');
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
          if(clave==='addCurso'){
            this.addCurso(data);
          }
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

  public async addCurso(data: Curso) {
    let curso:Curso={
      uidMateria:data.uidMateria,
      aula:data.aula
    }
    let info = await this.authService.preparateCreateCurso(data,this.downloadURL,this.nominaDat,this.nominaHorario);
    console.log('funcion add cuerso',info)
    return info;
  }

}


/*
 

 private stateImage: Subscription = null;
  //Validar archivo
  validFile = false;
  //Array de codigo unico
  archivoExcel: any = [];
  //nombre del archivo excel
  nombreFile = '';
  //control de progressbar
  validate = true;
  //controla que se sea visible el horario
  public validacionDeMateria: boolean = false;
  //controla que sa seleccionada una materia
  public materiaSeleccionada = '';
  //esta almacena el id de la materia
  public idMateriaSeleccionada = '';
  //almacena el nombre del curso
  public nombreAula='';
  //carga la informacion de la base de datos
  public materias = [];
  //caraga la informacion del curso
  public curso=[];
  //carga horario guardado
  public horarioGuardado=[];
  //Es el horario que se agregar con el nuevo curso
  public nuevoHorario: any = [];
  //image="";
  placeholder = 'Ingresa informacion sobre el aula';
  private file: any;
  public photoSelected: string | ArrayBuffer;
  private validImage: boolean = false;


  clearFile(){
    this.archivoExcel=[];
    this.cursoForm.patchValue({ file: '',image:'', aula:'',materiaSelect:''});
    this.validFile=false;
    this.validacionDeMateria=false,
    this.idMateriaSeleccionada='',
    this.nombreFile='';
    this.nombreAula='';
    this.materiaSeleccionada=''
    this.nuevoHorario=[];
    //console.log(this.archivoExcel);
  } */

