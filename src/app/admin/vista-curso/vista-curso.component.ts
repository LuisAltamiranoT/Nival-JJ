import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Nomina } from 'src/app/models/user.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { UploadExcelService } from 'src/app/services/upload-excel.service'
import { Subscription } from 'rxjs';

import * as moment from 'moment';
moment.locale('es');
import * as xlsx from 'xlsx';
import { ViewImageComponent } from '../curso-group/view-image/view-image.component';

@Component({
  selector: 'app-vista-curso',
  templateUrl: './vista-curso.component.html',
  styleUrls: ['./vista-curso.component.css']
})
export class VistaCursoComponent implements OnInit {
  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;
  public idNomina: any;
  public idMateria: any;
  //array de la nomina de los estudiantes 
  public nominaVista: any[] = [];
  //dato que almacenara el id de la materia
  public dataId: any;
  //CODIGO NUEVO TABLA
  displayedColumns: string[] = ['fila', 'codigoUnico', 'image', 'nombre', 'presente', 'atraso', 'falta'];
  dataSource = new MatTableDataSource(this.nominaVista);
  //array original de nomina de estudiante
  private nominaConsulta: any = [];
  //manejar las suscripciones
  private suscripcion1: Subscription;
  //manejo de codigo qr
  public codigoQr = 'kajshdkjahsdkjhaskdhugdyueggdvshfvdgvfsdvfhdvsf';
  //datos del tiempo
  nombre: any;
  fechaActual: any;
  nombreDay: any;
  hora: any;
  //estado para agregar
  estado = 'presente';

  constructor(
    private authService: AuthService,
    public router: Router,
    private _route: ActivatedRoute,
    public ventana: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    //console.log(this.dataId);
    let splitted = this.dataId.split("//");
    this.idNomina = splitted[0];
    this.idMateria = splitted[1];
    //console.log('id de la materia seleccionada', this.dataId, this.idNomina, this.idMateria);
    this.obtenerNomina(this.idMateria, this.idNomina);
    //funcion moment
    let f = moment();
    //fecha actual en string
    this.fechaActual = f.format('DD-MM-YYYY');
    //funcion day
    var day = moment(this.fechaActual).day();
    //obtiene el nombre de dia del sistema
    this.nombreDay = moment.weekdays(day).charAt(0).toUpperCase() + moment.weekdays(day).slice(1)
    //obtiene la hora del sistema
    this.hora = moment().format('HH:mm:ss');
    //console.log('moment', this.nombreDay, this.fechaActual, this.hora);
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }

  public obtenerNomina(idMateria: any, idNomina: any) {
    this.suscripcion1 = this.authService.getDataNominaCursoId(idMateria, idNomina).subscribe((data) => {
      this.nominaVista.length = 0;
      this.nominaConsulta.length = 0;

      const dataNomina: any = data.payload.data();
      dataNomina.nomina.forEach((dataMateria: any) => {
        //console.log('tamaño array', dataMateria.asistencia.length)
        let ultimoId = dataMateria.asistencia.length - 1;
        //console.log('antes del id ', ultimoId);
        if (ultimoId < 0) {
          ultimoId = 0;
        }
        //console.log('ultimo index', ultimoId)

        if (dataMateria.asistencia.length == 0) {
          console.log('cero if entra');
          this.nominaVista.push({
            nombre: dataMateria.nombre,
            codigoUnico: dataMateria.codigoUnico,
            correo: dataMateria.correo,
            image: dataMateria.image,
            presente: false,
            atraso: false,
            falta: false,
            estado: false
          })
        } else {
          console.log('entra a else')
          if (dataMateria.asistencia[ultimoId].estado == true) {
            console.log('entra al estado');
            this.nominaVista.push({
              nombre: dataMateria.nombre,
              codigoUnico: dataMateria.codigoUnico,
              correo: dataMateria.correo,
              image: dataMateria.image,
              presente: dataMateria.asistencia[ultimoId].presente,
              atraso: dataMateria.asistencia[ultimoId].atraso,
              falta: dataMateria.asistencia[ultimoId].falta,
              estado: dataMateria.asistencia[ultimoId].estado
            })
          } else {
            console.log('entra al else estado');
            this.nominaVista.push({
              nombre: dataMateria.nombre,
              codigoUnico: dataMateria.codigoUnico,
              correo: dataMateria.correo,
              image: dataMateria.image,
              presente: false,
              atraso: false,
              falta: false,
              estado: false
            })
          }
        }
        this.nominaConsulta.push({
          nombre: dataMateria.nombre,
          codigoUnico: dataMateria.codigoUnico,
          correo: dataMateria.correo,
          image: dataMateria.image,
          asistencia: dataMateria.asistencia
        })
      });
      this.tabla1.renderRows();
    });
    //console.log(this.nominaVista);
  }

  showOptionsPresente(event, dato: any) {
    this.nominaVista[dato].presente = true;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = false;
    try {
      let presente = true;
      let atraso = false;
      let falta = false;
      this.almacenarNomina(dato, presente, atraso, falta);
      //dato es el index del array
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsAtraso(event, dato: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = true;
    this.nominaVista[dato].falta = false;

    try {
      let presente = false;
      let atraso = true;
      let falta = false;
      this.almacenarNomina(dato, presente, atraso, falta);
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsFalta(event, dato: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = true;
    try {
      let presente = false;
      let atraso = false;
      let falta = true;
      this.almacenarNomina(dato, presente, atraso, falta);
    } catch (error) {
      this.authService.showError(error);
    }
  }

  almacenarNomina(indexArray, presente, atraso, falta) {
    //console.log('tamaño de array',this.nominaConsulta)
    //vaida si el array nomina contiene datos
    let tamañoArrayAsistencia = this.nominaConsulta[indexArray].asistencia.length;
    if (tamañoArrayAsistencia < 0) {
      tamañoArrayAsistencia = 0;
    }

    if (tamañoArrayAsistencia == 0) {

      this.agregarArray(indexArray, presente, atraso, falta);

    } else {
      //console.log('djaslkdjaslkdjaskljdlkasjdlkasjdlkajs' + this.nominaConsulta[indexArray].asistencia.length);
      //toma la posicion del ultimo dato ingresado
      let indexAsistencia = this.nominaConsulta[indexArray].asistencia.length - 1;
      if (indexAsistencia < 0) {
        indexAsistencia = 0;
      }
      //verifica si ya existe la fecha y actualiza la fecha
      if (this.nominaConsulta[indexArray].asistencia[indexAsistencia].estado == false) {
        this.agregarArray(indexArray, presente, atraso, falta);
      } else {
        this.nominaConsulta[indexArray].asistencia[indexAsistencia] = {
          fecha: this.fechaActual,
          dia: this.nombreDay,
          presente: presente,
          atraso: atraso,
          falta: falta,
          estado: false
        }
        //console.log('Entro a los if', this.nominaConsulta)
      }
    }
    console.log('probar array de objetos', this.nominaConsulta)
  }


  async almacenarDatos() {
    //idNomina, idMateria, array, fechaHora, estado
    try {
      let data = await this.authService.updateNomina(this.idNomina, this.idMateria, this.nominaConsulta, this.fechaActual, this.estado);
      if (data) {
        this.authService.showUpdatedata();
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  almacenarNominaFinalizado() {
    this.estado = 'presente';
    this.nominaConsulta.forEach(element => {
      //element.asistencia.length
      let tamañoArrayAsistencia = element.asistencia.length;
      if (tamañoArrayAsistencia < 0) {
        tamañoArrayAsistencia = 0;
      }
      if (tamañoArrayAsistencia == 0) {
        element.asistencia.push({
          fecha: this.fechaActual,
          dia: this.nombreDay,
          presente: false,
          atraso: false,
          falta: true,
          estado: false,
        })
      } else {
        let indexAsistencia = tamañoArrayAsistencia - 1;
        if (indexAsistencia < 0) {
          indexAsistencia = 0;
        }

        if (element.asistencia[indexAsistencia].estado == false) {
          
        } else {
          element.asistencia.push({
            fecha: this.fechaActual,
            dia: this.nombreDay,
            presente: element.asistencia[indexAsistencia].presente,
            atraso: element.asistencia[indexAsistencia].atraso,
            falta: element.asistencia[indexAsistencia].falta,
            estado: false,
          })
        }
      }
    });

    this.nominaConsulta.forEach(element => {
      console.log(element);
    });
    this.agregarArrayFinalizado();

  }


  async agregarArray(indexArray, presente, atraso, falta) {
    console.log('datos que se insertaran', indexArray, this.nominaConsulta[indexArray].asistencia)
    await this.nominaConsulta[indexArray].asistencia.push({
      fecha: this.fechaActual,
      dia: this.nombreDay,
      presente: presente,
      atraso: atraso,
      falta: falta,
      estado: true,
    })
  }

  async agregarArrayFinalizado() {
    let data = await this.authService.updateNomina(this.idNomina, this.idMateria, this.nominaConsulta, this.fechaActual, this.estado);
    if (data) {
      this.authService.showUpdatedata();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource.filter = null;
  }

  openPhoto(image: any) {
    if (image != '') {
      this.ventana.open(ViewImageComponent,
        { data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El curso no dispone de una imagen');
    }
  }

}
