import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-vista-reportes',
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css']
})
export class VistaReportesComponent implements OnInit {
  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<any>;



  displayedColumns: string[] = [];
  //columnsToDisplay: string[] = this.displayedColumns.slice();

  ejemplo = [];
  dataSource;
  dataId;
  idNomina;
  idMateria;
  dataNomina: any;

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

  cargar() {
    var obj = {};
    this.authService.getDataNominaCursoId(this.idMateria, this.idNomina).subscribe((data) => {
      const dataNomina: any = data.payload.data();
      let filas=0;
      dataNomina.nomina.forEach((dataMateria: any) => {
        filas=filas+1;
        let cont = 0;
        obj = {
          Numero: filas,
          Imagen: dataMateria.image,
          Nombre: dataMateria.nombre,
        }
        dataMateria.asistencia.forEach(element => {
          if (element.presente === true) {
            cont = cont + 1;
            console.log(element)
            obj[cont + ') ' + element.fecha] = 'Presente';
          }
          if (element.atraso === true) {
            cont = cont + 1;
            console.log(element)
            obj[cont + ') ' + element.fecha] = 'Atraso';
          }
          if (element.falta === true) {
            cont = cont + 1;
            console.log(element)
            obj[cont + ') ' + element.fecha] = 'Falta';
          }
        });
        this.ejemplo.push(obj);
        obj = {};
      });
      console.log(this.ejemplo);

      for (let v in this.ejemplo[0]) {
        this.displayedColumns.push(v);
      }
      
      console.log(this.displayedColumns);

      this.dataSource = new MatTableDataSource(this.ejemplo);

      /*
      var obj = {};
for (let i in this.listecidenKisi ){
    for( let v of this.listecidenVazife[i].vazifeSonuclar){
        obj[v.name] = v.value;
    }
    this.vzfPuanTablo.push(obj);
    obj={};
}
       */

      //console.log('ultimo index', ultimoId),
      //console.log('este es el estado anterior', estado)



    });
    //console.log(this.nominaVista);


  }


}








/*
const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
        this.columnsToDisplay.push(this.displayedColumns[randomColumn]); */



