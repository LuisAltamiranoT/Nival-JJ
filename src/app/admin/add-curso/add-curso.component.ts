import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

//subscripcion a un observable
import { Subscription } from "rxjs";

//exportar archivos
import * as xlsx from 'xlsx';
import { UploadExcelService } from '../../auth/services/upload-excel.service'

import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/auth/services/upload-image.service';

import { MatDialog } from '@angular/material/dialog';
import { VistaHorarioComponent } from './vista-horario/vista-horario.component';
import { Horario } from "../../shared/models/horario.interface";
import { Curso } from 'src/app/shared/models/user.interface';


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {

  private stateImage: Subscription = null;
  //validar si selecciono una imagen ya guardada en el storage
  imagenSelectStorage = '';
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
  //est almacena el id de la materia
  public idMateriaSeleccionada = '';
  //carga la informacion de la base de datos
  public materias = [];
  //caraga la informacion del curso
  public curso = [];
  //carga horario guardado
  public horarioGuardado = [];
  //cargar horario actual del usuario
  public horarioProfesor = [];
  //Es el horario que se agregar con el nuevo curso
  public nuevoHorario: any = [];
  placeholder = 'Ejemplo GR1';
  //se almacena la informacion de la imagen
  private file: any;
  //se almacena la direccion de la imagen
  public photoSelected: string | ArrayBuffer;
  //valida la imagen
  public validImage: boolean = false;

  //control de suscripciones
  private suscripcion1: Subscription;
  private suscripcion2: Subscription;
  private suscripcion3: Subscription;

  cursoForm = new FormGroup({
    materiaSelect: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl(''),
    aula: new FormControl('', [Validators.required, Validators.minLength(1)]),
    file: new FormControl(''),
  })


  public horarioVista: Horario[] = [
    { hora: '7:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '7:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '8:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '8:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '9:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '9:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '10:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '10:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '11:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '11:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '12:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '12:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '13:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '13:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '14:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '14:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '15:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '15:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '16:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '16:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '17:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '17:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '18:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    //{ hora: '18:30', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '19:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false },
    { hora: '20:00', lunes: '', LS: false, LD: false, martes: '', MS: false, MD: false, miercoles: '', MiS: false, MiD: false, jueves: '', JS: false, JD: false, viernes: '', VS: false, VD: false }
  ]

  constructor(
    private authService: AuthService,
    private uploadImage: UploadImageService,
    public ventana: MatDialog,
    private uploadExcel: UploadExcelService,
  ) { }

  ngOnInit(): void {
    this.materia();
    this.getCursos();
    this.getHorario();
    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.finalizeBar();
    })
  }
  

  ngOnDestroy() {
    this.stateImage.unsubscribe();
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
    this.suscripcion3.unsubscribe();
  }

  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = this.horarioVista;

  selectMateria(materia) {
    this.replaceHorario();
    //activa el horario en el registro
    this.validacionDeMateria = true;
    //toma los valores del select
    let splitted = materia.split("+//+", 2);
    //toma el id de la materia
    this.idMateriaSeleccionada = splitted[0];
    if (this.materiaSeleccionada != '') {
      if (this.materiaSeleccionada != splitted[1]) {
        let materiaAnerior = this.materiaSeleccionada;
        this.materiaSeleccionada = splitted[1]
        this.cambiarNombre(materiaAnerior);
      } else {

      }
    } else {
      this.materiaSeleccionada = splitted[1];
    }
    console.log('select => ' + materia, 'materia=> ' + this.materiaSeleccionada, 'idMateria=> ' + this.idMateriaSeleccionada);
  }

  private cambiarNombre(materiaAnterio: any) {
    let numData = this.nuevoHorario.length;
    if (numData > 0) {
      for (let i = 0; i < numData; i++) {
        this.horarioVista[this.nuevoHorario[i].posicion][this.nuevoHorario[i].dia] = this.materiaSeleccionada;
        this.nuevoHorario[i].idMateria = this.idMateriaSeleccionada;
      }
    }
    console.log('horario al cambiar ' + this.horarioVista);
    console.log('horario nuev ' + this.nuevoHorario);
  }

  private agregarDataArrayNuevaMateria(posicion: any, dia: any) {
    let data = {
      posicion: posicion,
      dia: dia,
      idMateria: this.idMateriaSeleccionada
    }
    this.nuevoHorario.push(data);
    console.log(this.nuevoHorario);
  }

  private quitarDataArrayNuevaMateria(posicion: any, dia: any) {
    //console.log("All "+this.nuevoHorario);
    for (let i = 0; i < this.nuevoHorario.length; i++) {
      if (this.nuevoHorario[i].posicion === posicion && this.nuevoHorario[i].dia === dia) {
        this.nuevoHorario.splice(i, 1);
        break;
      } else {

      }
    }
  }

  setHoraDiaLunes(posicionActual) {
    if (this.horarioVista[posicionActual]['lunes'] != '') {
    } else {
      this.horarioVista[posicionActual]['LS'] = true;
      this.horarioVista[posicionActual]['lunes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'lunes');
    }
  }
  setHoraDiaMartes(posicionActual) {
    if (this.horarioVista[posicionActual]['martes'] != '') {
    } else {
      this.horarioVista[posicionActual]['MS'] = true;
      this.horarioVista[posicionActual]['martes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'martes');
    }
  }
  setHoraDiaMiercoles(posicionActual) {
    if (this.horarioVista[posicionActual]['miercoles'] != '') {
    } else {
      this.horarioVista[posicionActual]['MiS'] = true;
      this.horarioVista[posicionActual]['miercoles'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'miercoles');
    }
  }
  setHoraDiaJueves(posicionActual) {
    if (this.horarioVista[posicionActual]['jueves'] != '') {
    } else {
      this.horarioVista[posicionActual]['JS'] = true;
      this.horarioVista[posicionActual]['jueves'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'jueves');
    }
  }
  setHoraDiaViernes(posicionActual) {
    if (this.horarioVista[posicionActual]['viernes'] != '') {
    } else {
      this.horarioVista[posicionActual]['VS'] = true;
      this.horarioVista[posicionActual]['viernes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'viernes');
    }
  }

  ///delete posicion horario
  delHoraDiaLunes(posicionActual) {
    this.horarioVista[posicionActual]['LS'] = false;
    this.horarioVista[posicionActual]['lunes'] = '';
    this.quitarDataArrayNuevaMateria(posicionActual, 'lunes');
  }
  delHoraDiaMartes(posicionActual) {
    this.horarioVista[posicionActual]['MS'] = false;
    this.horarioVista[posicionActual]['martes'] = '';
    this.quitarDataArrayNuevaMateria(posicionActual, 'martes');
  }
  delHoraDiaMiercoles(posicionActual) {
    this.horarioVista[posicionActual]['MiS'] = false;
    this.horarioVista[posicionActual]['miercoles'] = '';
    this.quitarDataArrayNuevaMateria(posicionActual, 'miercoles');
  }
  delHoraDiaJueves(posicionActual) {
    this.horarioVista[posicionActual]['JS'] = false;
    this.horarioVista[posicionActual]['jueves'] = '';
    this.quitarDataArrayNuevaMateria(posicionActual, 'jueves');
  }
  delHoraDiaViernes(posicionActual) {
    this.horarioVista[posicionActual]['VS'] = false;
    this.horarioVista[posicionActual]['viernes'] = '';
    this.quitarDataArrayNuevaMateria(posicionActual, 'viernes');
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      if (this.validImage) {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
      }
    } else {
      this.validImage = false;
    }
  }

  materia() {
    this.suscripcion1=this.authService.getDataMateria().subscribe((data) => {
      this.materias = [];
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });
  }

  getCursos() {
    this.suscripcion2=this.authService.getDataCurso().subscribe((data) => {
      this.curso = [];
      data.forEach((dataMateria: any) => {
        this.curso.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
    });
  }

  getHorario() {
    this.suscripcion3=this.authService.getHorario().subscribe((data) => {
      this.horarioGuardado = [];
      data.forEach((dataMateria: any) => {
        this.horarioGuardado.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
    });
  }

  replaceHorario() {
    console.log('Se ejecuta el replace');
    this.materias.forEach(element => {
      this.curso.forEach(elementCurso => {
        if (element.id === elementCurso.data.uidMateria) {
          this.horarioGuardado.forEach(elementHorario => {
            if (elementCurso.id === elementHorario.data.uidCurso) {
              this.horarioVista[elementHorario.data.posicion][elementHorario.data.dia] = element.data.nombre + ' - ' + elementCurso.data.aula;
              if (elementHorario.data.dia === 'lunes') {
                this.horarioVista[elementHorario.data.posicion]['LD'] = true;
                this.horarioVista[elementHorario.data.posicion]['LS'] = false;
              }
              if (elementHorario.data.dia === 'martes') {
                this.horarioVista[elementHorario.data.posicion]['MD'] = true;
                this.horarioVista[elementHorario.data.posicion]['MS'] = false;
              }
              if (elementHorario.data.dia === 'miercoles') {
                this.horarioVista[elementHorario.data.posicion]['MiD'] = true;
                this.horarioVista[elementHorario.data.posicion]['MiS'] = false;
              }
              if (elementHorario.data.dia === 'jueves') {
                this.horarioVista[elementHorario.data.posicion]['JD'] = true;
                this.horarioVista[elementHorario.data.posicion]['JS'] = false;
              }
              if (elementHorario.data.dia === 'viernes') {
                this.horarioVista[elementHorario.data.posicion]['VD'] = true;
                this.horarioVista[elementHorario.data.posicion]['VS'] = false;
              }
            }
          });
        }
      });
    });
  }

  //boton eliminar archivo
  clearFile() {
    this.archivoExcel = [];
    this.cursoForm.patchValue({ file: '' });
    this.validFile = false;
    this.nombreFile = '';
  }

  //volver al estado original
  eraserAll(){
    this.clearFile();
    this.nuevoHorario=[];
    this.cursoForm.patchValue({ aula: '' });
    this.cursoForm.patchValue({ image: '' });
  }

  //lector dde archivos excel
  onFileChange(ev: any) {
    let workBook = null;
    const reader = new FileReader();

    const file = ev.target.files[0];

    if (file) {
      this.archivoExcel = [];
      const formato = file.name.split('.')[1];
      if (this.uploadExcel.validateType(formato)) {
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          const sheet_name_list = workBook.SheetNames;
          const plantilla = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
          plantilla.forEach(async (data1: any) => {
            const { CodigoUnico, Nombre } = data1;
            if (CodigoUnico && Nombre) {
              // lee los datos de la nomina
              let data = {
                nombre: Nombre,
                codigoUnico: CodigoUnico
              }
              this.archivoExcel.push(data);
              //console.log(data,'  ',this.archivoExcel);
            } else {
              //console.log('llega el else');
            }
          })
          if (this.archivoExcel.length != 0) {
            this.validFile = true;
            this.nombreFile = file.name;
          } else {
            this.authService.showInfoExcel('Por favor revise que el archivo contenga las columnas: CodigoUnico, Nombre');
            this.cursoForm.patchValue({ file: '' });
          }

        }
        reader.readAsBinaryString(file);
      }
      else {
        this.authService.showError('Este no es un archivo de formato excel')
      }
    } else {
      //console.log("esta en el else");
    }
  }


  addCurso(data: any) {
    this.validate = false;
    try {
      if (this.validFile && this.nuevoHorario.length > 0) {
        if (this.validImage) {
          //GUARDADO INFORAMCION CON IMAGEN
          console.log('guardado el id es ', this.idMateriaSeleccionada)
          const { aula } = this.cursoForm.value;
          let data: Curso = {
            uidMateria: this.idMateriaSeleccionada,
            aula: aula
          }
          this.uploadImage.preAddAndUpdate(data, this.file, this.archivoExcel, this.nuevoHorario);

        } else {
          //GUARDADO INFORAMCION SIN IMAGEN
          const { aula } = this.cursoForm.value;
          let data: Curso = {
            uidMateria: this.idMateriaSeleccionada,
            aula: aula,
            image: ''
          }
          let info = this.authService.preparateCreateCurso(data, '', this.archivoExcel, this.nuevoHorario);
        }
      } else {
        this.validate = true;
        this.authService.showError('Por favor ingrese los datos solicitados en el formulario');
      }
    } catch (error) {
      this.finalizeBar();
      this.authService.showError(error);
    }
  }

  finalizeBar() {
    const { aula } = this.cursoForm.value;
    this.validate = true;
    this.authService.showSuccess('El curso ' + this.materiaSeleccionada + ' ' + aula + ' ha sido registrado en el sistema');
    this.replaceHorario();
    this.eraserAll();
    this.photoQuit();
  }

  photoQuit(){
    this.validImage= false;
    this.cursoForm.patchValue({ image: '' });
    this.photoSelected='';
    this.file='';
  }

}




