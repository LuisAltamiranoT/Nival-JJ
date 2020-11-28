import { Injectable, NgModuleDecorator } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
import { Request, Response } from 'express';


//import {fs} from 'fs';
//import * as fs from "fs";
//const fs = require ('fs');


import { RoleValidator } from 'src/app/helpers/rolValidator';

import { ToastrService } from 'ngx-toastr';
import { first, switchMap } from 'rxjs/operators';
///observable y subject permite ejecutar una accion al cumplirse una condicion
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User, Curso, Materia, Nomina, NominaObligatoria, MateriaRegister } from 'src/app/models/user.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {
  //observable y subject
  private estadoImgenUpdate = new Subject<void>();
  public finalizoImage$ = this.estadoImgenUpdate.asObservable();

  private dataUser: any;
  public user$: Observable<User>;

  constructor(
    public afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private afs: AngularFirestore
  ) {
    super();

    //es utilizado en el guard
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.dataUser = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    )
  }


  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.showError(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    try {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      const { user } = await this.afAuth.signInWithEmailAndPassword(email,password);
      await this.updateUserData(user);
      return user;
    } catch (error) {
      this.showError(error);
    }
  }


  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      this.showError(error);
    }
  }

  //actualiza la informacion de email verificado
  private async updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      };
      //si existe que realixe merge
      return await userRef.set(data, { merge: true });
  }
    //Registro profesor
    async register(email: string, password: string, nombre: string, apellido: string): Promise<User> {
      try {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email,password);
        if(user){
          await this.registerDataUser(user, nombre, apellido);
        }
        await this.sendVerificationEmail();
        return user;
      } catch (error) {
        this.showError(error);
      }
    }

  private async registerDataUser(user: User, nombre: string, apellido: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        nombre: nombre,
        apellido: apellido,
        email: user.email,
        emailVerified: user.emailVerified,
        role: 'ADMIN',
        photoUrl:'https://firebasestorage.googleapis.com/v0/b/easyacnival.appspot.com/o/imageCurso%2FwithoutUser.jpg?alt=media&token=61ba721c-b7c1-42eb-8712-829f4c465680'
      };

      return await userRef.set(data, { merge: true });

    } catch (error) {
      this.showError(error);
    }
  }

  //Obtener Datos
  public getDataUser() {
    try {
      let db = this.afs.doc<User>(`users/${this.dataUser}`).snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }


  public reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword
    );
    return user.reauthenticateWithCredential(credential);
  }


  //password
  public async updatePass(oldPass: string, newPass: string): Promise<Number> {
    //estado cero no se logro, estado 1 se ha logrado 
    const user = firebase.auth().currentUser;
    let data: number;
    try {
      await this.reauthenticate(oldPass);
      await user.updatePassword(newPass);
      this.showSuccess("Su contraseña ha sido actualizada");
      data = 1;
      return data;
    } catch (error) {
      this.showError(error);
      return data = 0;
    }
  }

   //Delete user
   public async updateAcoountUser(oldPass: string): Promise<Number> {
    //estado cero no se logro, estado 1 se ha logrado 
    let data:number;
    try{
      let userAccount = firebase.auth().currentUser;
      await this.reauthenticate(oldPass);

      await userAccount.delete();
      console.log(data + "se ha actualizado");
      return data=1;
    }catch(error){
      this.showError(error);
      return data = 0;
    }
  }

    //nombre
    public async updateEstado(valor: string) {
      try {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      
        //const dataUpdate = await userRef.set(data, { merge: true });
        this.showUpdatedata();
      //  return { dataUpdate };
  
      } catch (error) {
        this.showError(error);
      }
    }
   

  //descripcion
  public async updateDescripcion(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        info: valor
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError(error);
    }
  }

  //nombre
  public async updateName(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        nombre: valor
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError(error);
    }
  }

  //apellido
  public async updateLastName(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        apellido: valor
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError(error);
    }
  }

  //oficina
  public async updateOficina(valor: string) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        oficina: valor
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError(error);
    }
  }

  //anio
  public async updateAnioLectivo(valor: string, valor2: string) {
    try {
      console.log(valor, valor2);
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        anioInicio: moment(valor).format('DD-MM-YYYY'),
        anioFin: moment(valor2).format('DD-MM-YYYY')
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      console.log(error);
      this.showError(error);
    }
  }

  // obtener materias

  public getDataMateria() {
    try {
      let db = this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

  //crear materia
  public async createMateria(valor: any, nombre: any, image: any) {
    try {
      const data: MateriaRegister = {
        nombre: valor,
        profesor: nombre,
        photoUrl: image,
        uidProfesor: this.dataUser,
        cursos: []
      }
      const create = await this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').add(data);
      this.showUpdatedata();
      return create;
    } catch (error) {
      this.showError(error);
    }
  }

  public async updateMateria(documentId: string, data: any) {
    try {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const update: Materia = {
        nombre: data
      };
      const dataUpdate = await userRef.set(update, { merge: true });
      this.showUpdatedata();
      return { dataUpdate };
    } catch (error) {
      this.showError(error);
    }
  }

  
  //editar aula
  public async updateCursoAula(documentId: any, data: any) {
    try {
      const dataRef: AngularFirestoreDocument<Materia> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const dataUpdate = await dataRef.set(data[0], { merge: true });
      this.showUpdatedata();
      return { dataUpdate };

    } catch (error) {
      this.showError(error);
      //console.log(error);
    }
  }

    //actualizar curso horario
    public async updateImageCurso(curso:any, idMateria: any) {
      try {
        const dataRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria);
        const dataUpdate = await dataRef.set(curso[0], { merge: true });
        this.estadoImgenUpdate.next();
        this.showUpdatedata();
        return { dataUpdate };
      } catch (error) {
        this.showError(error);
      }
    }

  public async delecteMateria(documentId:any):Promise<number>{
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId).delete();
      this.showUpdatedata();
      return 1;
    } catch (error) {
      this.showError(error);
    }
  }

   //eliminar estudiante
   public async deleteCurso(idMateria: any,ArrayCurso:any) {
    try {
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).update({cursos: firebase.firestore.FieldValue.arrayRemove(ArrayCurso)});
      this.showUpdatedata();
      return create;
    } catch (error) {
      this.showError(error);
    }
  }

//deleteNomina
  public async deleteNomina(documentId:any,idNomina:any):Promise<number>{
    try {
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId).collection('nomina').doc(idNomina).delete();
      return 1;
    } catch (error) {
      this.showError(error);
    }
  }



  //imagen
  public async updatePhoto(valor: any) {
    try {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.dataUser}`);
      const data: User = {
        photoUrl: valor
      };
      await userRef.set(data, { merge: true });
      this.estadoImgenUpdate.next();

    } catch (error) {
      this.showError(error);
    }
  }

  //imagen curso
  public async updatePhotoCurso(valor: any, idCurso: any) {
    try {
      const userRef: AngularFirestoreDocument<Curso> = this.afs.doc(`users/${this.dataUser}`).collection('cursos').doc(idCurso);
      const data: Curso = {
        image: valor
      };
      await userRef.set(data, { merge: true });
      this.estadoImgenUpdate.next();

    } catch (error) {
      this.showError(error);
    }
  }

  //crear curso
  public async createCurso(listCurso: any, idMateria: any) {
    //cursos,idMateria,idCurso,nomina
    try {
      const datos: Materia = {
        cursos: listCurso
      }
      await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).set(datos, { merge: true });
      this.estadoImgenUpdate.next();
    } catch (error) {
      this.showError(error);
    }
  }

  //crear nomina de estudiantes
  public async createNomina(nomina: any, idCurso: any, idMateria) {
    try {
      const nominaCurso: NominaObligatoria = {
        uidMateria: idMateria,
        uidCurso: idCurso,
        uidProfesor: this.dataUser,
        nomina: nomina
      }
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').add(nominaCurso);
      return create;
    } catch (error) {
      this.showError(error);
    }
  }

  //agregar estudiante en nomina segun el id del curso
  public async addEstudiante(idMateria: any,idNomina:any, valor: any){
    try {
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).update({nomina: firebase.firestore.FieldValue.arrayUnion(valor)});
      this.showUpdatedata();
      return create;
      
    } catch (error) {
      this.showError(error);
    }
  }


  //eliminar estudiante
  public async deleteEstudiante(idMateria: any, idNomina: any,ArrayEstudiante:any) {
    try {
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).update({nomina: firebase.firestore.FieldValue.arrayRemove(ArrayEstudiante)});
      this.showUpdatedata();
      return create;
    } catch (error) {
      this.showError(error);
    }
  }



  //actualizar horario
  public async updateHorario(horario:any, idMateria: any) {
    try {
      const dataRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria);
      const dataUpdate = await dataRef.set(horario[0], { merge: true });
      this.showUpdatedata();
      return { dataUpdate };
    } catch (error) {
      this.showError(error);
    }
  }


  //Obtener la materia con el id
  public getMateriaId(id: any) {
    try {
      let db = this.afs.doc<Curso>(`users/${this.dataUser}`).collection('materias').doc(id).snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

  //actualizar nomina
  public async updateNomina(idNomina: any, idMateria: any, array: any, estado: any): Promise<void> {
    try {
      let data = {
        estado: estado,
        nomina: array
      }
      let db = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      this.showUpdatedata();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

   //actualizar estado actual
   public async updateNominaEstado(idNomina: any, idMateria: any,estado: any): Promise<void> {
    try {
      let data = {
        estado: estado
      }
      let db = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      this.showUpdatedata();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }


   //actualizar estudiante
   public async updateNominaEstudiante(idNomina: any, idMateria: any, array: any): Promise<void>{
    try {
      let data = {
        nomina: array
      }
      let db = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).set(data, { merge: true });
      this.showUpdatedata();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

  //Obtener la nomina del curso
  public getDataNominaCursoId(idMateria: any, idNomina: any) {
    try {
      let db = this.afs.doc<NominaObligatoria>(`users/${this.dataUser}`).collection('materias').doc(idMateria).collection('nomina').doc(idNomina).snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }


  //Obtener asistencia de todos por fecha
  public getDataAsistencia(idCurso: any, dataAsistencia: any) {
    try {
      let consulta = this.afs.doc(`users/${this.dataUser}`).collection('cursos').doc(idCurso).collection('asistencia', ref => ref.where('fecha', '==', dataAsistencia)).snapshotChanges();
      return consulta;

    } catch (error) {
      this.showError(error);
    }
  }


  //mensajes
  showError(mensaje: string) {
    this.toastr.error(mensaje, 'Error', {
      timeOut: 4000,
    });
  }

  //mensaje de error de archivo excel
  showSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exitoso', {
      timeOut: 5000,
    });
  }
  showUpdatedata() {
    this.showSuccess("Se ha actualizado su información");
  }
  showWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 5000,
    });
  }

  showInfoExcel(mensaje: string) {
    this.toastr.info(mensaje, 'Información', {
      timeOut: 8000,
    });
  }

  showInfo(mensaje: string) {
    this.toastr.info(mensaje, 'Información', {
      timeOut: 4000,
    });
  }




}
