import {MatButtonToggleGroup} from '@angular/material/button-toggle';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Libreria para encriptar y desencriptar //
import * as CryptoJS from 'crypto-js'
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
import { ViewImageComponent } from '../../curso-group/view-image/view-image.component';


/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

*/

@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css']
})
export class VistaReportesComponent implements OnInit{
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
  public codigoQr = '';
  //datos del tiempo
  nombre: any;
  fechaActual: any;
  nombreDay: any;
  hora: any;
  //estado para agregar
  estado = 'presente';
  //estado control
  estadoControl: boolean = false;
   //variable para el qr
   idQr:any;

   constructor(
    private authService: AuthService,
    public router: Router,
    private _route: ActivatedRoute,
    public ventana: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    let splitted = this.dataId.split("//");
    this.idNomina = splitted[0];
    this.idMateria = splitted[1];
    // Función para obtener nómina
    this.obtenerNomina(this.idMateria, this.idNomina);
    // Función moment
    let f = moment();
    // Fecha actual en string
    this.fechaActual = f.format('DD-MM-YYYY');
    // Función day
    var day = moment(this.fechaActual).day();
    // Obtiene el nombre de día del sistema
    this.nombreDay = moment.weekdays(day).charAt(0).toUpperCase() + moment.weekdays(day).slice(1)
    // Obtiene la hora del sistema
    this.hora = moment().format('HH:mm:ss');
    

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
        this.idQr = dataNomina.uidProfesor+'//'+dataNomina.uidMateria+'//'+dataNomina.uidCurso;
        console.log('tamaño array  asdnfjdsfn', this.idQr)
        let ultimoId = dataMateria.asistencia.length - 1;

        //console.log('ultimo index', ultimoId),
        //console.log('este es el estado anterior', estado)
        if (ultimoId === -1) {
          this.nominaVista.push({
            nombre: dataMateria.nombre,
            codigoUnico: dataMateria.codigoUnico,
            correo: dataMateria.correo,
            image: dataMateria.image,
            uidUser: dataMateria.uidUser,
            presente: false,
            atraso: false,
            falta: false,
            estado: true
          })
        } else if (dataMateria.asistencia[ultimoId].estado === this.estadoControl) {
          this.nominaVista.push({
            nombre: dataMateria.nombre,
            codigoUnico: dataMateria.codigoUnico,
            correo: dataMateria.correo,
            image: dataMateria.image,
            uidUser: dataMateria.uidUser,
            presente: false,
            atraso: false,
            falta: false,
            estado: true
          })
        } else {
          console.log('entra al else estado');
          this.nominaVista.push({
            nombre: dataMateria.nombre,
            codigoUnico: dataMateria.codigoUnico,
            correo: dataMateria.correo,
            image: dataMateria.image,
            uidUser: dataMateria.uidUser,
            presente: dataMateria.asistencia[ultimoId].presente,
            atraso: dataMateria.asistencia[ultimoId].atraso,
            falta: dataMateria.asistencia[ultimoId].falta,
            estado: true
          })
        }

        this.nominaConsulta.push({
          nombre: dataMateria.nombre,
          codigoUnico: dataMateria.codigoUnico,
          correo: dataMateria.correo,
          image: dataMateria.image,
          uidUser: dataMateria.uidUser,
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

    let tamañoArrayAsistencia = this.nominaConsulta[indexArray].asistencia.length - 1;

    if (tamañoArrayAsistencia === -1) {

      this.agregarArray(indexArray, presente, atraso, falta, true);

    } else if (this.nominaConsulta[indexArray].asistencia[tamañoArrayAsistencia].estado === this.estadoControl) {

      this.agregarArray(indexArray, presente, atraso, falta, true);

    } else {
      this.agregarArrayReemplazar(indexArray, presente, atraso, falta, tamañoArrayAsistencia, true);
    }

  }

  agregarArrayReemplazar(indexArray, presente, atraso, falta, ultimoId, estado) {
    this.nominaConsulta[indexArray].asistencia[ultimoId] = {
      fecha: this.fechaActual,
      dia: this.nombreDay,
      presente: presente,
      atraso: atraso,
      falta: falta,
      estado: estado,
    }
    console.log(this.nominaConsulta);
  }


  almacenarDatos() {
    //idNomina, idMateria, array, fechaHora, estado
      let data = this.authService.updateNomina(this.idNomina, this.idMateria, this.nominaConsulta, this.estado);
  }

  almacenarNominaFinalizado() {
    let cont = -1;
    this.estado = 'presente';
    this.nominaConsulta.forEach(elementCurso => {
      cont = cont + 1;
      console.log('se imprime', elementCurso.asistencia.length);
      let ultimoId = elementCurso.asistencia.length - 1;
      if (ultimoId === -1) {
        this.agregarArray(cont, false, false, true, false);
      } else if (elementCurso.asistencia[ultimoId].estado === this.estadoControl) {
        this.agregarArray(cont, false, false, true, false);
      } else {
        this.agregarArrayReemplazar(cont, elementCurso.asistencia[ultimoId].presente, elementCurso.asistencia[ultimoId].atraso, elementCurso.asistencia[ultimoId].falta, ultimoId, false);
      }


    });
    this.agregarArrayFinalizado();

  }





  async agregarArray(indexArray, presente, atraso, falta, estado) {
    console.log('datos que se insertaran', indexArray, this.nominaConsulta[indexArray].asistencia)
    await this.nominaConsulta[indexArray].asistencia.push({
      fecha: this.fechaActual,
      dia: this.nombreDay,
      presente: presente,
      atraso: atraso,
      falta: falta,
      estado: estado,
    })
  }

  async agregarArrayFinalizado() {
    let data = this.authService.updateNomina(this.idNomina, this.idMateria, this.nominaConsulta, this.estado);
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
    if (image != 'https://firebasestorage.googleapis.com/v0/b/easyacnival.appspot.com/o/imageCurso%2FwithoutUser.jpg?alt=media&token=61ba721c-b7c1-42eb-8712-829f4c465680') {
      this.ventana.open(ViewImageComponent,
        { data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El estudiante no dispone de una imagen de perfil');
    }
  }


  /*
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }*/
}