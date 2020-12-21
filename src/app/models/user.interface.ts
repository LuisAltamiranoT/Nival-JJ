export type Roles = 'ADMIN';

export interface User {
    uid?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    emailVerified?: boolean;
    info?: string;
    role?: Roles;
    oficina?: string;
    photoUrl?: string;
    password?: string;
    anioInicio?: any;
    anioFin?: any;
}

export interface MateriaRegister {
    nombre?: string;
    profesor?: string;
    uidProfesor?: string;
    photoUrl?: string;
    cursos?: []
}

export interface Materia {
    nombre?: string;
    profesor?: string;
    uidProfesor?: string;
    photoUrl?: string;
    cursos?: [{
        id?: string,
        aula?: string,
        image?: string,
        uidNomina?: string,
        horario?: [{
            dia?: string,
            posicion?: number,
            hora?:string
        }]
    }]
}

export interface NominaObligatoria {
    estado?:string,//identifica si el estudiante puede agregar datos como presente,atraso
    uidCurso?: string,//id del curso
    uidProfesor?:string,//id del profesor
    uidMateria?:string,// id de la materia
    nomina?: [{
        codigoUnico?: string,
        nombre?: string,
        correo?:string,
        image?:string
        uidUser?:string, //tiene noRegister si aun el estudiante ha leido por primera vez el codigo qr
        asistencia?: [{
            fecha?: string,
            dia?:string,
            presente?: boolean,
            atraso?: boolean,
            falta?: boolean,
            estado?:boolean
        }]
    }]
}


export interface NominaEstuiantes {
    codigoUnico?: string,
    nombre?: string,
    correo?:string,
    asistencia?: {
        fecha?: string,
        dia?:string
        presente?: boolean,
        atraso?: boolean,
        falta?: boolean
    }

}

export interface Curso {
    uidMateria?: any;
    aula?: any;
    image?: any;
}

export interface FileI {
    name: string;
    imageFile: File;
    size: string;
    type: string;
}


export interface Nomina {
    fila?: any,
    id?: any,
    codigoUnico?: any,
    nombre?: any,
    presente?: any,
    atraso?: any,
    falta?: any
    opciones?: any
}

