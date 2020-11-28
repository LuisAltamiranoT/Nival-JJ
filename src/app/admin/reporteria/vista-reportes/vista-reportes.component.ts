import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ViewImageComponent } from '../../curso-group/view-image/view-image.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
moment.locale('es');
// Librería para generar reportes en formato EXCEL
import * as xlsx from 'xlsx';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { FormControl, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css']
})
export class VistaReportesComponent implements OnInit {

  //control de suscripciones
  private suscripcion1: Subscription;
  private suscripcion2: Subscription;
  //validacion de botones
  ValidateButton = false;

  fechaForm = new FormGroup({
    inicio: new FormControl({ value: '', disabled: this.ValidateButton }, Validators.required),
    fin: new FormControl({ value: '', disabled: this.ValidateButton }, Validators.required)
  })

  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<any>;

  displayedColumns: string[] = [];
  //carga la inforamcion que se presentara en la vista
  ejemplo = [];
  //cargar la infromacion para el excel
  excel = [];
  //la inforamcion que se va imprimir
  dataSource;

  //obtiene el id pasado desdde el otra ventana
  dataId;
  //almacena el id de la nomina
  idNomina;
  //almacena el id de la materia
  idMateria;
  //almacena la informacion  de la consulta
  dataNomina: any;
  validate = true;

  //feach para valiar
  fechaInicioNomina;

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
    this.cargar();
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }

  cargar() {
    let obj = {};
    let objExcel = {};

    this.suscripcion1 = this.authService.getDataNominaCursoId(this.idMateria, this.idNomina).subscribe((data) => {
      const dataNomina: any = data.payload.data();
      let filas = 0;
      this.ejemplo.length = 0;
      this.excel.length = 0;
      this.displayedColumns.length = 0;

      //contiene la primera fecha que se tomo la lista asi que es el inicio 
      this.fechaInicioNomina = dataNomina.nomina[0].asistencia[0].fecha;

      if (dataNomina.nomina[0].asistencia.length != 0) {
        this.fechaInicioNomina = dataNomina.nomina[0].asistencia[0].fecha;
        this.ValidateButton = true;
      } else {
        this.ValidateButton = false;
        //desactivar los calendarios y el boton buscar y descargar
      }

      dataNomina.nomina.forEach((dataMateria: any) => {
        filas = filas + 1;
        let cont = 0;
        let porcentaje = 0;

        obj = {
          Numero: filas,
          Imagen: dataMateria.image,
          Nombre: dataMateria.nombre,
        }

        objExcel = {
          Numero: filas,
          Nombre: dataMateria.nombre,
          CodigoUnico: dataMateria.codigoUnico,
          uidUser: dataMateria.uidUser
        }


        dataMateria.asistencia.forEach(element => {
          if (element.presente === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Presente';
            objExcel[cont + ') ' + element.fecha] = 1;
            porcentaje = porcentaje + 1;
          }
          if (element.atraso === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Atraso';
            objExcel[cont + ') ' + element.fecha] = 0.5;
            porcentaje = porcentaje + 0.5;
          }
          if (element.falta === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Falta';
            objExcel[cont + ') ' + element.fecha] = 0;
          }
        });
        obj['Porcentaje'] = ((porcentaje / cont) * 100).toFixed(0) + '%';
        objExcel['Porcentaje'] = ((porcentaje / cont) * 100).toFixed(0) + '%';

        console.log('llega hasta aqui', cont, porcentaje);

        this.ejemplo.push(obj);
        this.excel.push(objExcel);
        obj = {};
        objExcel = {};
      });
      for (let v in this.ejemplo[0]) {
        this.displayedColumns.push(v);
      }
      this.dataSource = new MatTableDataSource(this.ejemplo);
      console.log(this.excel);

      console.log('consulra ', dataNomina);
      console.log('datos de excel', objExcel, this.excel);
      /// IMPRESION DEL EXCEL ---UBICARLE DONDE DEBE SER JEJEJJEJEJEJEEJJEJEJEJJEJEJJEJEJEJJEJ
      this.exportToExcel(this.excel)
    });
  }

  filtrar() {
    const { inicio, fin } = this.fechaForm.value;
    console.log(inicio, fin)
    console.log('inicio', inicio, Date.parse(String(moment(inicio).format("YYYY-MM-DD"))))
    console.log('fin', fin, Date.parse(String(moment(fin).format("YYYY-MM-DD"))))



    let obj = {};
    let objExcel = {};

    this.suscripcion1 = this.authService.getDataNominaCursoId(this.idMateria, this.idNomina).subscribe((data) => {

      this.ejemplo.length = 0;
      this.excel.length = 0;
      this.displayedColumns.length = 0;
      const dataNomina: any = data.payload.data();
      let filas = 0;
      dataNomina.nomina.forEach((dataMateria: any) => {
        //obtiene la inforamcion a presentar

        filas = filas + 1;
        let cont = 0;

        obj = {
          Numero: filas,
          Imagen: dataMateria.image,
          Nombre: dataMateria.nombre,
        }

        objExcel = {
          Numero: filas,
          Nombre: dataMateria.nombre,
          CodigoUnico: dataMateria.codigoUnico,
          uidUser: dataMateria.uidUser
        }
        dataMateria.asistencia.forEach(element => {

          if (element.presente === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Presente';
            objExcel[cont + ') ' + element.fecha] = 1;
          }
          if (element.atraso === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Atraso';
            objExcel[cont + ') ' + element.fecha] = 0.5;
          }
          if (element.falta === true) {
            cont = cont + 1;
            obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Falta';
            objExcel[cont + ') ' + element.fecha] = 0;
          }




          var formato_fecha = element.fecha.split('-')[2] + '-' + element.fecha.split('-')[1] + '-' + element.fecha.split('-')[0] + 'T00:00:00'
          //  let newDate = new Date(formato_fecha);
          let newDate = moment(formato_fecha)
          console.log('fecha', element.fecha);
          console.log('parse', Date.parse(String(moment(newDate).format("YYYY-MM-DD"))))




        });
        this.ejemplo.push(obj);
        this.excel.push(objExcel);
        obj = {};
        objExcel = {};

      });


      for (let v in this.ejemplo[0]) {
        this.displayedColumns.push(v);
      }
      this.dataSource = new MatTableDataSource(this.ejemplo);
      console.log(this.excel);
    });
  }



  isSticky(colIndex: any) {
    //console.log(colIndex)
    if (colIndex === 'Numero') {
      return true;
    }
    return false;
  }

  onclick(fecha: any, index: any, discol: any) {
    console.log(fecha, index, discol);
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

  getColor(data: any) {
    //console.log(data);
    switch (data) {
      case 'Presente':
        return '#21618C';
      case 'Atraso':
        return '#BA4A00 ';
      case 'Falta':
        return '#2E4053';
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

  async onClick() {

    this.validate = false;
    const { inicio } = this.fechaForm.value;
    const { fin } = this.fechaForm.value;
    console.log('inicio', inicio)
    console.log('fin', fin)

  }


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  fecha_fin: any;
  fecha_inicio: any;

  validarFecha(event, form) {
    var f = moment();
    var fechaActual = f.format('YYYY-MM-DD');
    var fecha_fin = moment(event.value).format("YYYY-MM-DD");
    if (form.inicio === '') {
      this.authService.showInfo('Ingrese fecha de inicio de periodo');
      this.fechaForm.patchValue({
        fin: ''
      })
    } else {
      if (Date.parse(moment(form.inicio).format("YYYY-MM-DD")) <= Date.parse(fecha_fin) &&
        Date.parse(moment(form.inicio).format("YYYY-MM-DD")) <= Date.parse(fechaActual) &&
        Date.parse(fecha_fin) <= Date.parse(fechaActual)) {
      }
      else {
        this.authService.showInfo('La fecha fin de periodo debe ser posterior a la fecha de inicio y recuerde que no puede seleccionar fechas posteriores a la actual');
        this.fechaForm.patchValue({
          fin: ''
        })
      }
    }
  }

  exportToExcel(datos) {
    datos.forEach(obj => {
      if (obj === 0) {
        obj = 'Presente';
      }
      console.log('verificar', obj)
    });
    const wse: xlsx.WorkSheet = xlsx.utils.json_to_sheet(datos);
    const headerE = Object.keys(datos[0]); // columns name
    var wscolsE = [];
    for (var i = 0; i < headerE.length; i++) {  // columns length added
      wscolsE.push({ wpx: 75 })
    }
    wse["!cols"] = wscolsE;
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, wse, 'excel');
    xlsx.writeFile(wb, "excel" + '.xlsx');
  }

}







