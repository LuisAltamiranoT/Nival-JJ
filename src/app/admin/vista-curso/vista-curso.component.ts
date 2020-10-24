import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
moment.locale('es');
import * as xlsx from 'xlsx';


import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Nomina } from '../../shared/models/user.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';




import { UploadExcelService } from '../../auth/services/upload-excel.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-vista-curso',
  templateUrl: './vista-curso.component.html',
  styleUrls: ['./vista-curso.component.css']
})
export class VistaCursoComponent implements OnInit {
  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;

  //array de la nomina de los estudiantes 
  public nominaVista: Nomina[] = [];
  //dato que almacenara el id de la materia
  public dataId: any;
  //tomar la informacion de las asistencias
  public asistencia = [];
  //CODIGO NUEVO TABLA
  displayedColumns: string[] = ['fila', 'codigoUnico', 'nombre', 'presente', 'atraso', 'falta'];
  dataSource = new MatTableDataSource(this.nominaVista);

  //manejar las suscripciones
  private suscripcion1: Subscription;


  nombre: any;
  fechaActual: any;
  nombreDay: any;



  constructor(
    private authService: AuthService,
    public router: Router,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');

    //obtener nomina estudiantes
    console.log('id de la materia seleccionada', this.dataId);
    this.obtenerNomina(this.dataId);


    ////////////////////////////


    var f = moment();
    this.fechaActual = f.format('DD-MM-YYYY'); //fecha actual en string

    var day = moment(this.fechaActual).day();


    this.nombreDay = moment.weekdays(day).charAt(0).toUpperCase() + moment.weekdays(day).slice(1)
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }





  /* ****************************************************************************************************
   *                               PARA LA EXPORTACIÓN DE ARCHIVOS EXCEL
   * ****************************************************************************************************/

  exportToExcel() {
    var i = 0;
    var datosGenerales = [{
      'N°': i = i + 1,
      nombre: 'Jenny',
      apellido: 'Tipan',
      cedula: '12549565984',
    },
    {
      'N°': i = i + 1,
      nombre: 'Luis',
      apellido: 'Altamirano',
      cedula: '2025698',
    },
    ]
    const wse: xlsx.WorkSheet = xlsx.utils.json_to_sheet(datosGenerales);

    const header = Object.keys(datosGenerales[0]); // columns name

    var wscols = [];
    for (var i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wpx: 125 })
    }
    wse["!cols"] = wscols;
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, wse, 'Hoja Asistencia');

    xlsx.writeFile(wb, "Hoja Asistencia" + '.xlsx');
  }



  /////////////////////////////////////////////////////////////////////////////
  //funciones utuizadas en esta pagina
  public obtenerNomina(id) {
    this.suscripcion1=this.authService.getDataCursoId(id).subscribe((data) => {
      this.nominaVista.length = 0;
      data.forEach((dataMateria: any) => {
        this.nominaVista.push({
          id: dataMateria.payload.doc.id,
          codigoUnico: dataMateria.payload.doc.data().codigoUnico,
          nombre: dataMateria.payload.doc.data().nombre,
          presente: false,
          atraso: false,
          falta: false
        })
      });
      this.tabla1.renderRows();
    });
  }

  public generarConsultaActualziacionTabla() {

  }

  showOptionsPresente(event, dato: any, idEstudiante: any) {
    this.nominaVista[dato].presente = true;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = false;
    try {
      let data = {
        estudiante: idEstudiante,
        fecha: this.fechaActual,
        presente: true
      }
      let consulta = this.authService.createAsistencia(this.dataId, data);
      if (consulta) {
        this.authService.showSuccess('EL dato ha sido registrado');
        this.getAsistencia();
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsAtraso(event, dato: any, idEstudiante: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = true;
    this.nominaVista[dato].falta = false;
    try {
      let data = {
        estudiante: idEstudiante,
        fecha: this.fechaActual,
        atraso: true
      }
      let consulta = this.authService.createAsistencia(this.dataId, data);
      if (consulta) {
        this.authService.showSuccess('EL dato ha sido registrado');
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsFalta(event, dato: any, idEstudiante: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = true;
    try {
      let data = {
        estudiante: idEstudiante,
        fecha: this.fechaActual,
        falta: true
      }
      let consulta = this.authService.createAsistencia(this.dataId, data);
      if (consulta) {
        this.authService.showSuccess('EL dato ha sido registrado');
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  getAsistencia() {
    this.asistencia = [];
    console.log(this.dataId, this.fechaActual);
    this.authService.getDataAsistencia(this.dataId, this.fechaActual).subscribe((data) => {
      data.forEach((dataMateria: any) => {
        this.asistencia.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
    });
    console.log(this.asistencia);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
