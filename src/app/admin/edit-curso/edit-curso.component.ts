import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

import { MatTable, MatTableDataSource } from '@angular/material/table';

//subscripcion a un observable
import { Subscription } from "rxjs";

import { MatDialog } from '@angular/material/dialog';
import { AddEstudianteComponent } from './add-estudiante/add-estudiante.component';
import { EditEstudianteComponent } from './edit-estudiante/edit-estudiante.component';
import { DeleteEstudianteComponent } from './delete-estudiante/delete-estudiante.component';
import { EditAulaComponent } from './edit-aula/edit-aula.component';
import { EditHorarioComponent } from './edit-horario/edit-horario.component';
import { EditImageComponent } from './edit-image/edit-image.component';
import { ViewImageComponent } from '../curso-group/view-image/view-image.component';
import { VerEditImagenComponent } from '../add-curso/ver-edit-imagen/ver-edit-imagen.component';




@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.css']
})
export class EditCursoComponent implements OnInit {
   //valida la ceacion de la tabla
   validate: boolean = false;
  img='../../../assets/withoutUser.jpg';
  
  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<any>;
  //array de la nomina de los estudiantes 
  public nominaVista = [];
  //contiene el nombre de la materia
  public nombreMateria = "";
  //amacena el array de informacion de materia 
  dataMateria;
  //dato que almacenara el id de la materia
  public dataId: any;
  //almacenar nomina del estudiante
  public idIndexCurso: any;
  
  historial:any[]=[];


  public dataNominaCurso: any;
  //placeholderAula de la aula
  placeholderAula = 'Ejemplo GR1';
  //almacena la imagen del curso
  photoSelected = '';

  idNomina: any;
  idMateria: any;
  idCurso: any;


  private suscripcion1: Subscription;
  private suscripcion2: Subscription;

  editCursoForm = new FormGroup({
    image: new FormControl(''),
  })



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
    this.idCurso = splitted[2];
    this.getMateria(this.idMateria);
    this.getNominaCurso(this.idMateria, this.idNomina);
  }

  ngOnDestroy() {
    if(this.suscripcion1){
      this.suscripcion1.unsubscribe();
    }
    if(this.suscripcion2){
      this.suscripcion2.unsubscribe();
    }
  }

  //CODIGO NUEVO TABLA
  displayedColumns2: string[] = ['fila', 'codigoUnico', 'image', 'correo', 'nombre', 'opciones'];
  dataSource2:any=[];


  getMateria(idMateria: any) {
    this.suscripcion2 = this.authService.getMateriaId(idMateria).subscribe((data) => {
      //dataMateria variable para actualizacion de datos
      this.dataMateria = [data.payload.data()];
      let cont = -1;
      this.nombreMateria = this.dataMateria[0].nombre;
      this.dataMateria.forEach(elementCursos => {
        elementCursos.cursos.forEach(element => {
          cont = cont + 1;
          if (this.idCurso == element.id) {
            this.idIndexCurso = cont;
            this.placeholderAula = element.aula,
              this.photoSelected = element.image
          }
        });
      });
    })
  }



  public getNominaCurso(idMateria: any, idNomina: any) {
    this.suscripcion1 = this.authService.getDataNominaCursoId(idMateria, idNomina).subscribe((data) => {
      this.nominaVista.length = 0;
      const dataNomina: any = data.payload.data();
      this.historial=dataNomina.historial;
      dataNomina.nomina.forEach((dataMateria: any) => {
        this.nominaVista.push({
          nombre: dataMateria.nombre,
          codigoUnico: dataMateria.codigoUnico,
          correo: dataMateria.correo,
          image: dataMateria.image,
          uidUser: dataMateria.uidUser,
          asistencia: dataMateria.asistencia
        })
      });
      this.validate=true;
      this.dataSource2 = new MatTableDataSource(this.nominaVista);
    });
  }

  openDeleteEstudianteModal(nombre: any, posicion: any) {
    let data = {
      idMateria: this.idMateria,
      idNomina: this.idNomina,
      nombre: nombre,
      array: this.nominaVista[posicion]
    }
    this.openMaterial1(DeleteEstudianteComponent, data);
  }


  openEditEstudianteModal(nombre: any, correo: any, codigoUnico: any, posicion: any) {
    let data = {
      idMateria: this.idMateria,
      idNomina: this.idNomina,
      nombre: nombre,
      numero: codigoUnico,
      correo: correo,
      posicion: posicion,
      array: this.nominaVista,
    }
    this.openMaterial1(EditEstudianteComponent, data);
  }

  openAddEstudianteModal() {
    let data = {
      idMateria: this.idMateria,
      idCurso: this.idNomina,
      array: this.nominaVista,
      historial:this.historial
    }
    this.openMaterial1(AddEstudianteComponent, data);
  }

  openEditAulaModal() {
    let data = {
      idMateria: this.idMateria,
      array: this.dataMateria,
      index: this.idIndexCurso,
      nombreAula: this.placeholderAula
    }
    this.openMaterial1(EditAulaComponent, data);
  }

  openEditHorarioModal() {
    let data = {
      materiaNombre: this.nombreMateria,
      idMateria: this.idMateria,
      arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
      arrayCompleto: this.dataMateria,
    }
    this.openMaterial2(EditHorarioComponent, data);
  }

  openPhoto() {
    if (this.photoSelected != " ") {
      let data = {
        image: this.photoSelected,
        idMateria: this.idMateria,
        arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
        arrayCompleto: this.dataMateria,
      }
      this.ventana.open(EditImageComponent,
        { width: ' 25rem', data: data }).afterClosed().subscribe(item => {
        });
    } else {
      let data = {
        image: ' ',
        idMateria: this.idMateria,
        arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
        arrayCompleto: this.dataMateria,
      }
      this.ventana.open(EditImageComponent,
        { width: ' 25rem', data: data }).afterClosed().subscribe(item => {
        });
    }
  }



  openMaterial(component: any) {
    this.ventana.open(component,
      { width: ' 25rem' }).afterClosed().subscribe(item => { });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
      });
  }
  
  openMaterial2(component: any, info: any) {
    this.ventana.open(component,
      { data: info }).afterClosed().subscribe(item => {
        this.getMateria(this.idMateria);
        this.getNominaCurso(this.idMateria, this.idNomina);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  openImage(image: any) {
    if (image != '') {
      this.ventana.open(VerEditImagenComponent,
        { width: ' 25rem',data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El estudiante no dispone de una imagen de perfil.');
    }
  }

  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource2.filter = null;
  }
}

