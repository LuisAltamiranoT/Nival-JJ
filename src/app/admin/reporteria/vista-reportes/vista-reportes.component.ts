import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ViewImageComponent } from '../../curso-group/view-image/view-image.component';
import { MatDialog } from '@angular/material/dialog';




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
            obj[cont + ') ' + element.fecha+' '+element.dia] = 'Presente';
          }
          if (element.atraso === true) {
            cont = cont + 1;
            console.log(element)
            obj[cont + ') ' + element.fecha+' '+element.dia] = 'Atraso';
          }
          if (element.falta === true) {
            cont = cont + 1;
            console.log(element)
            obj[cont + ') ' + element.fecha+' '+element.dia] = 'Falta';
          }
        });
        this.ejemplo.push(obj);
        obj = {};
      });
      //console.log(this.ejemplo);

      for (let v in this.ejemplo[0]) {
        this.displayedColumns.push(v);
      }
      
      //console.log(this.displayedColumns);

      this.dataSource = new MatTableDataSource(this.ejemplo);

    });
    //console.log(this.nominaVista);


  }

  isSticky(colIndex:any) {
    console.log(colIndex)
    if(colIndex==='Numero'){
      return true;
    }
    return false;
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
}







