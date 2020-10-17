import { database } from 'firebase';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export type Roles = 'ADMIN';

export interface User {
    uid?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    emailVerified?: boolean;
    info?: string;
    role?: Roles;
    oficina?:string;
    photoUrl?: string;
    password?: string;
    anioInicio?:any;
    anioFin?:any;
}

export interface Curso{
    uidMateria?: any;
    aula?:any;
    image?:any;
}

export interface Materia{
    nombre?:string;
}

export interface FileI {
    name: string;
    imageFile: File;
    size: string;
    type: string;
  }