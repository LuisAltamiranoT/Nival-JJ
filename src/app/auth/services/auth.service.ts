import { Injectable, NgModuleDecorator } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
import { Request, Response } from 'express';


//import {fs} from 'fs';
//import * as fs from "fs";
//const fs = require ('fs');

import { RoleValidator } from '../../auth/helpers/rolValidator';

import { ToastrService } from 'ngx-toastr';
import { first, switchMap } from 'rxjs/operators';
///observable y subject permite ejecutar una accion al cumplirse una condicion
import { Observable, of, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User, Curso, Materia } from '../../shared/models/user.interface';



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
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      await this.updateUserData(user);
      return user;
    } catch (error) {
      this.showError(error);
    }
  }

  //Registro estudiante
  async register(email: string, password: string, nombre: string, apellido: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.registerDataUser(user, nombre, apellido);
      this.sendVerificationEmail();
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

  //getCurrent() {
  //return this.afAuth.authState.pipe(first()).toPromise();
  //}


  //actualiza la informacion de email verificado
  private async updateUserData(user: User) {
    if (user.emailVerified === true) {

    } else {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
      const data: User = {
        emailVerified: user.emailVerified
      };

      return await userRef.set(data, { merge: true });
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
        role: 'ADMIN'
      };

      return await userRef.set(data, { merge: true });

    } catch (error) {
      this.showError(error);
    }
  }

  public getDataUser() {
    try {
      let db = this.afs.doc<User>(`users/${this.dataUser}`).valueChanges();
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
      data = 1;
      console.log(data + "se ha actualizado");
      return data;
    } catch (error) {
      this.showError(error);
      return data = 0;
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

  // obtener materias

  public getMateriaHorario() {
    try {
      let db = this.afs.doc<Materia>(`users/${this.dataUser}`).collection('materias').snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }
  


  //crear materia
  public async createMateria(valor: any) {
    try {
      const data: Materia = {
        nombre: valor
      }
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('materias').add(data);
      return create;
    } catch (error) {
      this.showError(error);
    }
  }

  public async updateMateria(documentId: string, valor: any) {
    try {
      const userRef: AngularFirestoreDocument<Materia> = this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId);
      const data: Materia = {
        nombre: valor
      };
      const dataUpdate = await userRef.set(data, { merge: true });
      return { dataUpdate };
    } catch (error) {
      this.showError(error);
    }
  }

  public async delecteMateria(documentId: string): Promise<Number> {
    let verify = 0;
    try {
      const data = await this.afs.doc(`users/${this.dataUser}`).collection('materias').doc(documentId).delete();
      verify = 1;
      return verify;
    } catch (error) {
      this.showError(error);
      return verify = 0;
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

  // agregar un curso se obtiene la informacion de uploadImage

  public async preparateCreateCurso(valor: any, image: any, nomina: any, horario: any) {
    try {
      let idcurso = await this.createCurso(valor, image);
      let archivoExcel = nomina;
      let horarioCurso = horario;

      await Promise.all(archivoExcel.map(async (element) => {
        const data = {
          nombre: element.nombre,
          numeroUnico: element.codigoUnico
        }
        await this.createNomina(data, idcurso);
      }));


      await Promise.all(horarioCurso.map(async (element) => {
        const data = {
          posicion: element.posicion,
          dia: element.dia,
          uidMateria: element.idMateria,
          uidCurso: idcurso
        }
        await this.createHorario(data);
      }));

      console.log('termino el guardado');
      this.estadoImgenUpdate.next();

    } catch (error) {
      this.showError(error);
    }

  }
  //crear nomina de estudiantes
  public async createNomina(valor: any, idCurso: any) {
    try {
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('cursos').doc(`${idCurso}`).collection('nomina').add(valor);
      return create;
    } catch (error) {
      this.showError(error);
    }
  }

  //crear horario
  public async createHorario(valor: any) {
    try {
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('horario').add(valor);
      return create;
    } catch (error) {
      this.showError(error);
    }
  }
  //crear curso
  public async createCurso(valor: any, image: any) {
    try {
      const data: Curso = {
        uidMateria: valor.uidMateria,
        aula: valor.aula,
        image: image
      }
      const create = await this.afs.doc(`users/${this.dataUser}`).collection('cursos').add(data);
      console.log(create.id);
      return create.id;
    } catch (error) {
      this.showError(error);
      console.log(error);
    }
  }

  //obtener cursos
  public getCurso() {
    try {
      let db = this.afs.doc<Materia>(`users/${this.dataUser}`).collection('cursos').snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

  //obtener 

  //obtener el horario
  public getHorario() {
    try {
      let db = this.afs.doc<Materia>(`users/${this.dataUser}`).collection('horario').snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }


  //cursos
  public getDataCurso() {
    try {
      let db = this.afs.doc<Curso>(`users/${this.dataUser}`).collection('cursos').snapshotChanges();
      return db;
    } catch (error) {
      this.showError(error);
    }
  }

   //Obtener curso con el id
   public getDataCursoId(id:any) {
    try {
      let db = this.afs.doc<Curso>(`users/${this.dataUser}`).collection('cursos').doc(id).collection('nomina').snapshotChanges();
      return db;
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
    this.toastr.success(mensaje, 'Success', {
      timeOut: 5000,
    });
  }
  showUpdatedata() {
    this.showSuccess("Se ha actualizado su información");
  }
  showWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Warning', {
      timeOut: 5000,
    });
  }

  showInfoExcel(mensaje: string) {
    this.toastr.info(mensaje, 'information', {
      timeOut: 8000,
    });
  }

  showInfo(mensaje: string) {
    this.toastr.info(mensaje, 'information', {
      timeOut: 4000,
    });
  }




}
