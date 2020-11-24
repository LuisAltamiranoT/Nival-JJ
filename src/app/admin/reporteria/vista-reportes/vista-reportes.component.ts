import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { AuthService } from 'src/app/services/auth.service';
import { Nomina } from 'src/app/models/user.interface';
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
  displayedColumns: string[] = ['fila', 'codigoUnico', 'image', 'nombre', 'reporte'];
  dataSource = new MatTableDataSource(this.nominaVista);

  //dato que almacenara el id de la materia
  public dataId: any;
  public idNomina: any;
  public idMateria: any;
  //array original de nomina de estudiante
  private nominaConsulta: any = [];

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
    //console.log(this.dataId);
    let splitted = this.dataId.split("//");
    this.idNomina = splitted[0];
    this.idMateria = splitted[1];
    this.periodoFiltro('null', 'null');
    this.obtenerNomina(this.idMateria, this.idNomina);
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
            //correo: dataMateria.correo,
            //image: dataMateria.image,
          })
        } else {
          console.log('entra a else')
          if (dataMateria.asistencia[ultimoId].estado == true) {
            console.log('entra al estado');
            this.nominaVista.push({
              nombre: dataMateria.nombre,
              codigoUnico: dataMateria.codigoUnico,
              //correo: dataMateria.correo,
              //image: dataMateria.image,
            })
          } else {
            console.log('entra al else estado');
            this.nominaVista.push({
              nombre: dataMateria.nombre,
              codigoUnico: dataMateria.codigoUnico,
              //correo: dataMateria.correo,
              // image: dataMateria.image,
            })
          }
        }
        this.nominaConsulta.push({
          nombre: dataMateria.nombre,
          codigoUnico: dataMateria.codigoUnico,
          correo: dataMateria.correo,
          image: dataMateria.image,
        })
      });
      this.tabla1.renderRows();
    });
    //console.log(this.nominaVista);
  }

  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource.filter = null;
  }

}
