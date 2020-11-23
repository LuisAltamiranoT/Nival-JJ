import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { Nomina } from '../../../shared/models/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

// Libreria para encriptar y desencriptar //
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css']
})
export class VistaReportesComponent implements OnInit {

  anioForm = new FormGroup({
    inicio: new FormControl(''),
    fin: new FormControl('')
  })

  //array de la nomina de los estudiantes 
  public nominaVista: Nomina[] = [];

  // Manejo de tablas
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;

  //CODIGO NUEVO TABLA
  displayedColumns: string[] = ['fila', 'codigoUnico', 'nombre', 'reporte'];
  dataSource = new MatTableDataSource(this.nominaVista);

  //dato que almacenara el id de la materia
  public dataId: any;

  // Variables para revisar la parte de encriptación //
  texto_i: string;
  texto_f: string;
  validar: string;
  textoencriptado: string;
  textodesencriptado: string;
  pass_prueba: string;
  textodesencriptado_mal: string;

  //manejar las suscripciones
  private suscripcion1: Subscription;

  constructor(
    private authService: AuthService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    this.obtenerNomina(this.dataId);
    this.periodoFiltro('null', 'null');
  }

  // Funcion para encriptar //
  periodoFiltro(texto_i: string, texto_f: string) {
    this.validar = '1869-08-30';
    this.fecha_inicio = CryptoJS.AES.encrypt(texto_i.trim(), this.validar.trim()).toString();
    this.fecha_fin = CryptoJS.AES.encrypt(texto_f.trim(), this.validar.trim()).toString();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Método para ingresar fcehas para filtrar información
  verCalendario: boolean = false;
  activar: boolean = false;
  presentarCalendario(seleccionado: boolean) {
    this.activar = seleccionado;
    if (this.activar === true) {
      this.verCalendario = true;
    }
    else {
      this.verCalendario = false;
      this.anioForm.patchValue({
        inicio: '',
        fin: ''
      })
    }
  }

  public obtenerNomina(id) {
    this.suscripcion1 = this.authService.getDataCursoId(id).subscribe((data) => {
      this.nominaVista.length = 0;
      data.forEach((dataMateria: any) => {
        this.nominaVista.push({
          id: dataMateria.payload.doc.id,
          codigoUnico: dataMateria.payload.doc.data().codigoUnico,
          nombre: dataMateria.payload.doc.data().nombre,
        })
      });
      this.tabla1.renderRows();
    });
  }

  fecha_fin: any;
  fecha_inicio: any;
  validarFecha(event, form) {
    var fecha_fin = moment(event.value).format("YYYY-MM-DD");
    if (form.inicio === '') {
      this.authService.showInfo('Ingrese fecha de inicio de periodo');
      this.anioForm.patchValue({
        fin: ''
      })
    } else {
      if (Date.parse(moment(form.inicio).format("YYYY-MM-DD")) <= Date.parse(fecha_fin)) {
        this.periodoFiltro(String(moment(form.inicio).format("YYYY-MM-DD")), fecha_fin);
      }
      else {
        this.authService.showInfo('La fecha fin de periodo debe ser posterior a la fecha de inicio');
        this.anioForm.patchValue({
          fin: ''
        })
      }
    }
  }

}
