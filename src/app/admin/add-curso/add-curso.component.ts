import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

//subscripcion a un observable
import { Subscription } from "rxjs";

//exportar archivos
import * as xlsx from 'xlsx';
import { UploadExcelService } from 'src/app/services/upload-excel.service'

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/services/upload-image.service';

import { MatDialog } from '@angular/material/dialog';

import { Horario } from "src/app/models/horario.interface";
import { Curso } from 'src/app/models/user.interface';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {
  //observable
  private stateImage: Subscription = null;
  //carga la informacion de la materia 
  public materias = [];
  //array temporal del cursos guardados
  cursoGuardado = [];
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
  //index del array de materias
  public indexArray: any;
  //Es el horario que se agregar con el nuevo curso
  public nuevoHorario: any = [];
  placeholder = 'Ejemplo GR1';
  //se almacena la informacion de la imagen
  private file: any;
  //se almacena la direccion de la imagen
  public photoSelected: string | ArrayBuffer;
  //valida la imagen
  public validImage: boolean = false;
  private validateSize: boolean = false;

  //control de suscripciones
  private suscripcion1: Subscription;

  cursoForm = new FormGroup({
    materiaSelect: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl(''),
    aula: new FormControl('', [Validators.required, Validators.minLength(1)]),
    file: new FormControl('', [Validators.required]),
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
    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.finalizeBar();
    })
  }


  ngOnDestroy() {
    this.stateImage.unsubscribe();
    this.suscripcion1.unsubscribe();
  }

  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = this.horarioVista;


  materia() {
    this.suscripcion1 = this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });
  }

  setHoraDiaLunes(posicionActual,hora) {
    if (this.horarioVista[posicionActual]['lunes'] != '') {
    } else {
      this.horarioVista[posicionActual]['LS'] = true;
      this.horarioVista[posicionActual]['lunes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'lunes',hora);
    }
  }
  setHoraDiaMartes(posicionActual,hora) {
    if (this.horarioVista[posicionActual]['martes'] != '') {
    } else {
      this.horarioVista[posicionActual]['MS'] = true;
      this.horarioVista[posicionActual]['martes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'martes',hora);
    }
  }
  setHoraDiaMiercoles(posicionActual,hora) {
    if (this.horarioVista[posicionActual]['miercoles'] != '') {
    } else {
      this.horarioVista[posicionActual]['MiS'] = true;
      this.horarioVista[posicionActual]['miercoles'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'miercoles',hora);
    }
  }
  setHoraDiaJueves(posicionActual,hora) {
    if (this.horarioVista[posicionActual]['jueves'] != '') {
    } else {
      this.horarioVista[posicionActual]['JS'] = true;
      this.horarioVista[posicionActual]['jueves'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'jueves',hora);
    }
  }
  setHoraDiaViernes(posicionActual,hora) {
    if (this.horarioVista[posicionActual]['viernes'] != '') {
    } else {
      this.horarioVista[posicionActual]['VS'] = true;
      this.horarioVista[posicionActual]['viernes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'viernes',hora);
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

  replaceHorario() {
    this.materias.forEach(element => {
      element.data.cursos.forEach(elementCurso => {
        console.log('cursos',[elementCurso]);
        if ([elementCurso].length!=0) {
          elementCurso.horario.forEach(elementHorario => {
            //console.log('segundo foreach',elementHorario.dia)
            this.horarioVista[elementHorario.posicion][elementHorario.dia] = element.data.nombre + ' - ' + elementCurso.aula;
            if (elementHorario.dia === 'lunes') {
              this.horarioVista[elementHorario.posicion]['LD'] = true;
              this.horarioVista[elementHorario.posicion]['LS'] = false;
            }
            if (elementHorario.dia === 'martes') {
              this.horarioVista[elementHorario.posicion]['MD'] = true;
              this.horarioVista[elementHorario.posicion]['MS'] = false;
            }
            if (elementHorario.dia === 'miercoles') {
              this.horarioVista[elementHorario.posicion]['MiD'] = true;
              this.horarioVista[elementHorario.posicion]['MiS'] = false;
            }
            if (elementHorario.dia === 'jueves') {
              this.horarioVista[elementHorario.posicion]['JD'] = true;
              this.horarioVista[elementHorario.posicion]['JS'] = false;
            }
            if (elementHorario.dia === 'viernes') {
              this.horarioVista[elementHorario.posicion]['VD'] = true;
              this.horarioVista[elementHorario.posicion]['VS'] = false;
            }
          });
        }
      });
    })
  }

  selectMateria(materia) {
    this.replaceHorario();
    //activa el horario en el registro
    this.validacionDeMateria = true;
    //toma los valores del select
    let splitted = materia.split("+//+", 3);
    //toma el id de la materia
    this.idMateriaSeleccionada = splitted[0];
    //toma la posicion el index;
    this.indexArray = splitted[2];
    console.log('es la posicion array', this.indexArray)
    if (this.materiaSeleccionada != '') {
      if (this.materiaSeleccionada != splitted[1]) {
        this.materiaSeleccionada = splitted[1]
        this.cambiarNombre();
      }
    } else {
      this.materiaSeleccionada = splitted[1];
    }
    //console.log('select => ' + materia, 'materia=> ' + this.materiaSeleccionada, 'idMateria=> ' + this.idMateriaSeleccionada);
  }


  private cambiarNombre() {
    let numData = this.nuevoHorario.length;
    if (numData > 0) {
      for (let i = 0; i < numData; i++) {
        this.horarioVista[this.nuevoHorario[i].posicion][this.nuevoHorario[i].dia] = this.materiaSeleccionada;
        this.nuevoHorario[i].idMateria = this.idMateriaSeleccionada;
      }
    }
    console.log('horario al cambiar ', this.horarioVista);
    console.log('horario nuev ', this.nuevoHorario);
  }

  private agregarDataArrayNuevaMateria(posicion: any, dia: any,hora:any) {
    let data = {
      posicion: posicion,
      dia: dia,
      hora:hora
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
      } 
    }
  }


  addCurso(data: any) {
    try {
      this.validate = false;
      const { aula } = this.cursoForm.value;
      if (this.nuevoHorario.length > 0) {
        if (this.validFile) {
          //guardar con imagen
          if (this.validImage) {
            //aula,idMateria,image,Nomina,Horario,cursos
            this.uploadImage.preAddAndUpdate(aula, this.idMateriaSeleccionada, this.file, this.archivoExcel, this.nuevoHorario, this.materias[this.indexArray].data.cursos);
          } else {
            //sguardar sin imagen
            this.guardarWhitoutImage();
          }
        } else {
          this.authService.showError('El curso debe tener una nomina');
        }
      } else {
        this.validate = true;
        this.authService.showError('El curso debe tener registrado al menos una hora');
      }
    } catch (error) {
      this.finalizeBar();
      this.authService.showError(error);
    }
  }


  async guardarWhitoutImage() {
    const { aula } = this.cursoForm.value;
    this.cursoGuardado = this.materias[this.indexArray].data.cursos;
    let id = this.cursoGuardado.length + 1;
    let idCurso = this.idMateriaSeleccionada + id;
    
   let cursoNuevo = await this.authService.createNomina(this.archivoExcel, idCurso, this.idMateriaSeleccionada);

    this.cursoGuardado.push({
      id: idCurso,
      aula: aula,
      image: '',
      horario: this.nuevoHorario,
      uidNomina: cursoNuevo.id
    });

    console.log('curso almacenado', this.cursoGuardado);
    await this.authService.createCurso(this.cursoGuardado, this.idMateriaSeleccionada);
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      this.validateSize = this.uploadImage.validateSize(this.file.size);
      if (this.validImage) {
        if (this.validateSize) {
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.file);
        } else {
          this.authService.showError('El tamaño de la imagen no puede exceder los 2MB');
          this.file = '';
          this.cursoForm.patchValue({ image: '' });
        }
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
        this.file = '';
        this.cursoForm.patchValue({ image: '' });
      }
    } else {
      this.validImage = false;
    }
  }


  //boton eliminar archivo
  clearFile() {
    this.archivoExcel.Length = 0;
    this.cursoForm.patchValue({ file: '' });
    this.validFile = false;
    this.nombreFile = '';
  }

  //volver al estado original
  eraserAll() {
    this.clearFile();
    this.nuevoHorario = [];
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
            const { CodigoUnico, Nombre, Correo } = data1;
            if (CodigoUnico && Nombre && Correo) {
              // lee los datos de la nomina
              let data = {
                nombre: Nombre,
                codigoUnico: CodigoUnico,
                correo:Correo,
                image:'https://firebasestorage.googleapis.com/v0/b/easyacnival.appspot.com/o/imageCurso%2FwithoutUser.jpg?alt=media&token=61ba721c-b7c1-42eb-8712-829f4c465680',
                uidUser:'noRegister',
                asistencia: []
              }
              this.archivoExcel.push(data);
              //console.log(data,'  ',[this.archivoExcel]);
            } else {
              //console.log('llega el else');
            }
          })
          if (this.archivoExcel.length != 0) {
            this.validFile = true;
            this.nombreFile = file.name;
          } else {
            this.authService.showInfoExcel('Por favor revise que el archivo contenga las columnas: CodigoUnico, Nombre, Correo');
            this.cursoForm.patchValue({ file: '' });
          }

        }
        reader.readAsBinaryString(file);
      }
      else {
        this.authService.showError('Este no es un archivo de formato excel')
        this.cursoForm.patchValue({ file: '' });
      }
    } else {
      //console.log("esta en el else");
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

  photoQuit() {
    this.validImage = false;
    this.cursoForm.patchValue({ image: '' });
    this.photoSelected = '';
    this.file = '';
  }
}



