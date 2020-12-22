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

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { elementAt } from 'rxjs/operators';
import { ReporteIndividualComponent } from '../reporte-individual/reporte-individual.component';
import { VerImageComponent } from '../ver-image/ver-image.component';

@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css']
})
export class VistaReportesComponent implements OnInit {
  spinner: boolean = false;

  img = '../../../../assets/withoutUser.jpg';

  //control de suscripciones
  private suscripcion1: Subscription;
  //validacion de botones
  ValidateButton = false;

  fechaForm = new FormGroup({
    inicio: new FormControl({ value: '', disabled: this.ValidateButton }),
    fin: new FormControl({ value: '', disabled: this.ValidateButton })
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
  dataNominaConsulta: any[] = [];

  //control botones
  validate = true;
  limpiarInput = false;

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
    if (this.suscripcion1) {
      this.suscripcion1.unsubscribe();
    }
  }

  cargar() {
    let obj = {};
    let objExcel = {};

    this.suscripcion1 = this.authService.getDataNominaCursoId(this.idMateria, this.idNomina).subscribe((data) => {
      //si existe algun dato ejecutar
      if (data.payload.data()) {
        const dataNomina: any = data.payload.data();
        //cuenta las filas que se van agragando a la vista 
        let filas = 0;
        //es el array que se va a cargar en la vista 
        this.ejemplo.length = 0;
        //el numero de columnas que se setearan
        this.displayedColumns.length = 0;
        //este es el array de donde se obtendra para las consultas
        this.dataNominaConsulta.length = 0;

        //el objetivo es separarar el excel
        this.excel.length = 0;



        //desactivar los calendarios y el boton buscar y descargar
        if (dataNomina.historial) {
          if (dataNomina.historial.length != 0) {
            this.ValidateButton = true;
          } else {
            this.ValidateButton = false;
          }
        } else {
          this.ValidateButton = false;
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
          }


          dataMateria.asistencia.forEach(element => {
            cont = cont + 1;
            if (element.presente === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Presente';
              objExcel[cont + ') ' + element.fecha] = 1;
              porcentaje = porcentaje + 1;
            }
            if (element.atraso === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Atraso';
              objExcel[cont + ') ' + element.fecha] = 0.5;
              porcentaje = porcentaje + 0.5;
            }
            if (element.falta === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Falta';
              objExcel[cont + ') ' + element.fecha] = 0;
            }
          });
          obj['Porcentaje'] = ((porcentaje / cont) * 100).toFixed(0) + '%';
          objExcel['Porcentaje'] = ((porcentaje / cont) * 100).toFixed(0) + '%';

          this.ejemplo.push(obj);

          this.excel.push(objExcel);

          this.dataNominaConsulta.push(dataMateria);
          obj = {};
          objExcel = {};
        });

        //se carga la informacion en la tabla
        for (let v in this.ejemplo[0]) {
          this.displayedColumns.push(v);
        }


        //se carga la inforamcion a la tabla
        this.dataSource = new MatTableDataSource(this.ejemplo.sort());

        //frenar al spinner
        this.spinner = true;
      }
    });
  }


  filtrar() {

    this.ValidateButton = false;
    if (this.suscripcion1) {
      this.suscripcion1.unsubscribe();
    }


    //se realiza la limpieza
    this.limpiarInput = true;

    //obtengo los valores para realizar la filtracion de datos
    const { inicio, fin } = this.fechaForm.value;

    //cuenta las filas que se van agragando a la vista 
    let filas = 0;

    //es el array que se va a cargar en la vista 
    this.ejemplo.length = 0;

    //el numero de columnas que se setearan
    this.displayedColumns.length = 0;

    //el objetivo es separarar el excel
    this.excel.length = 0;
    let obj = {};
    let objExcel = {};

    //primer caso
    //si por alguna razon logra activar el boton  se imprimira la informacion 
    if (inicio == '' && fin == '') {
      this.authService.showInfo('Información ingresada no valida');
    } else if (inicio != '' && fin == '') {

      this.dataNominaConsulta.forEach(dataMateria => {
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
        }

        dataMateria.asistencia.forEach(element => {
          var formato_fecha = element.fecha.split('-')[2] + '-' + element.fecha.split('-')[1] + '-' + element.fecha.split('-')[0] + 'T00:00:00';
          let newDate = moment(formato_fecha)
          cont = cont + 1;
          if (Date.parse(String(moment(newDate).format("YYYY-MM-DD"))) >= Date.parse(String(moment(inicio).format("YYYY-MM-DD")))) {
            if (element.presente === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Presente';
              objExcel[cont + ') ' + element.fecha] = 1;
            }
            if (element.atraso === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Atraso';
              objExcel[cont + ') ' + element.fecha] = 0.5;
            }
            if (element.falta === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Falta';
              objExcel[cont + ') ' + element.fecha] = 0;
            }
          }
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

    } else {
      this.dataNominaConsulta.forEach(dataMateria => {
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
        }

        dataMateria.asistencia.forEach(element => {
          var formato_fecha = element.fecha.split('-')[2] + '-' + element.fecha.split('-')[1] + '-' + element.fecha.split('-')[0] + 'T00:00:00';
          let newDate = moment(formato_fecha)
          cont = cont + 1;

          if (Date.parse(String(moment(newDate).format("YYYY-MM-DD"))) >= Date.parse(String(moment(inicio).format("YYYY-MM-DD"))) && Date.parse(String(moment(newDate).format("YYYY-MM-DD"))) <= Date.parse(String(moment(fin).format("YYYY-MM-DD")))) {
            if (element.presente === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Presente';
              objExcel[cont + ') ' + element.fecha] = 1;
            }
            if (element.atraso === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Atraso';
              objExcel[cont + ') ' + element.fecha] = 0.5;
            }
            if (element.falta === true) {
              obj[cont + ') ' + element.fecha + ' ' + element.dia] = 'Falta';
              objExcel[cont + ') ' + element.fecha] = 0;
            }
          }
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
    }
  }

  isSticky(colIndex: any) {
    if (colIndex === 'Numero') {
      return true;
    }
    return false;
  }

  openPhoto(image: any) {
    if (image != '') {
      this.ventana.open(VerImageComponent,
        { data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El estudiante no dispone de una imagen de perfil');
    }
  }

  getColor(data: any) {
    switch (data) {
      case 'Presente':
        return '#3f51b5';
      case 'Atraso':
        return '#E2B657';
      case 'Falta':
        return '#D94949';
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

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  limpiarImput() {
    this.fechaForm.patchValue({ inicio: "" });
    this.fechaForm.patchValue({ fin: "" });
    this.limpiarInput = false;
    //cargar informacion
    this.spinner = false;
    this.cargar();
  }

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
        this.limpiarInput = true;
      }
      else {
        this.authService.showInfo('La fecha fin de periodo debe ser posterior a la fecha de inicio y recuerde que no puede seleccionar fechas posteriores a la actual');
        this.fechaForm.patchValue({
          fin: ''
        })
      }
    }
  }

  exportToExcel() {

    const wse: xlsx.WorkSheet = xlsx.utils.json_to_sheet(this.excel);
    const headerE = Object.keys(this.excel[0]); // columns name
    var wscolsE = [];
    for (var i = 0; i < headerE.length; i++) {  // columns length added
      wscolsE.push({ wpx: 75 })
    }
    wse["!cols"] = wscolsE;
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, wse, 'excel');
    xlsx.writeFile(wb, "excel" + '.xlsx');
  }

  //activa modal

  onclick(estado: any, index: any, discol: any) {
    if (this.suscripcion1) {
      this.suscripcion1.unsubscribe();
    }
    let data = {
      estado: estado,
      index: discol,
      array: this.dataNominaConsulta,
      indexEstudiante: index,
      idMateria: this.idMateria,
      idNomina: this.idNomina
    }
    this.openMaterial1(ReporteIndividualComponent, data);
  }


  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
        if (item) {
          this.spinner = false;
          this.cargar();
        }else{
        }
      });
  }

  activarBusqueda() {
    this.limpiarInput = true;
  }
}
