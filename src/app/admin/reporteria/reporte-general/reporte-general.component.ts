import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth.service';
import { Nomina } from 'src/app/models/user.interface';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// Libreria para encriptar y desencriptar //
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  //manejar las suscripciones
  private suscripcion1: Subscription;
  private suscripcion2: Subscription;

  //contiene el uidMateria
  public uidMateria = "";
  //contiene el nombre de la materia
  public nombreMateria = "";
  //dato que almacenara el id del curso
  public dataId: any;
  //dato que almacenara la fecha de inicio
  public fecha_inicio: any;
  //dato que almacenara la fecha final
  public fecha_fin: any;

  //array de la nomina de los estudiantes 
  public nominaVista: Nomina[] = [];

  // Manejo de tablas
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;

  //CODIGO NUEVO TABLA
  displayedColumns: string[] = ['fila', 'codigoUnico', 'nombre', 'asistencia'];
  dataSource = new MatTableDataSource(this.nominaVista);
  constructor(
    private authService: AuthService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    this.getCurso(this.dataId);
    this.obtenerNomina(this.dataId);
    this.verFiltroPeriodo();
    console.log('fechas', this.fecha_inicio, this.fecha_fin);
  }

  // Funcion para encriptar //
  verFiltroPeriodo() {
    var validar = '1869-08-30';
    this.fecha_inicio = CryptoJS.AES.decrypt(this._route.snapshot.paramMap.get('dataI').trim(), validar.trim()).toString(CryptoJS.enc.Utf8);
    this.fecha_fin = CryptoJS.AES.decrypt(this._route.snapshot.paramMap.get('dataF').trim(), validar.trim()).toString(CryptoJS.enc.Utf8);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCurso(idCurso: any) {
    this.suscripcion1 = this.authService.getCursoId(idCurso).subscribe((data) => {
      let dataCurso: any = [data.payload.data()];
      this.uidMateria = dataCurso[0].uidMateria;
      this.getMateria(this.uidMateria);
    });

  }

  getMateria(idMateria: any) {
    this.suscripcion2 = this.authService.getMateriaId(idMateria).subscribe((data) => {
      let dataMateria: any = [data.payload.data()];
      this.nombreMateria = dataMateria[0].nombre;
    })
  }

  public obtenerNomina(id) {
    this.suscripcion1 = this.authService.getCursoId(id).subscribe((data) => {
      this.nominaVista.length = 0;
     /* data.forEach((dataMateria: any) => {
        this.nominaVista.push({
          id: dataMateria.payload.doc.id,
          codigoUnico: dataMateria.payload.doc.data().codigoUnico,
          nombre: dataMateria.payload.doc.data().nombre,
        })
      });*/
      this.tabla1.renderRows();
    });
  }

}
