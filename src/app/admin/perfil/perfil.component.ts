import { Component, OnInit } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { NombreComponent } from './nombre/nombre.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { ApellidoComponent } from './apellido/apellido.component';
import { PasswordComponent } from './password/password.component';
import { DeleteComponent } from './delete/delete.component';
import { MateriaComponent } from './materia/materia.component';
import { OficinaComponent } from './oficina/oficina.component';
import { EditarMateriaComponent } from './editar-materia/editar-materia.component';
import { EliminarDataComponent } from './eliminar-data/eliminar-data.component';
import { EditarAnioComponent } from './editar-anio/editar-anio.component';
import { FotoComponent } from './foto/foto.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  image = "../../../assets/profe.jpg";
  perfil = "../../../assets/perfil.jpg";
  nombre = "";
  apellido = "";
  oficina = "";
  correo = "";
  informacion = "";
  cursos = [];
  materias = [];
  password = "";
  materiaSeleccionada = "";
  nombreMateria = "";

  AnioLectivoInicio = "dd/mm/yyyy";
  AnioLectivoFin = "dd/mm/yyyy";

  val = true;

  constructor(
    public ventana: MatDialog,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataUser();
    this.curso();
    this.materia();
  }

  dataUser() {

    this.authService.getDataUser().subscribe((data) => {
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.correo = data.email;
      this.informacion = data.info;
      this.oficina = data.oficina;
      this.AnioLectivoInicio = data.anioInicio;
      this.AnioLectivoFin = data.anioFin;
      this.perfil = data.photoUrl;
      console.log(data);
    });
  }

  curso() {
    this.authService.getDataCurso().subscribe((data) => {
      this.cursos = [];
      data.forEach((dataCurso: any) => {
        this.cursos.push({
          id: dataCurso.payload.doc.id,
          data: dataCurso.payload.doc.data()
        });
      })
    });
  }

  materia() {
    this.authService.getDataMateria().subscribe((data) => {
      this.materias = [];
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });
  }

  openAnioLectivoModal() {
    this.openMaterial(EditarAnioComponent);
  }

  openNombreModal() {
    this.openMaterial1(NombreComponent, this.nombre);
  }

  openInfoModal() {
    this.openMaterial1(InfoComponent, this.informacion);
  }

  openApellidoModal() {
    this.openMaterial1(ApellidoComponent, this.apellido);
  }

  openOficinaModal() {
    this.openMaterial1(OficinaComponent, this.oficina);
  }

  openPasswordModal() {
    this.openMaterial1(PasswordComponent, this.password);
  }

  openMateriaModal() {
    this.openMaterial(MateriaComponent);
  }

  openEditMateriaModal(data: any, idData: any) {
    let dataMateria = {
      nombre: data,
      id: idData,
      array: this.materias
    }
    this.openMaterial1(EditarMateriaComponent, dataMateria);
  }

  openEliminarMateriaModal(data: any, idData: any) {
    let dataMateria = {
      nombre: data,
      id: idData
    }
    this.openMaterial1(EliminarDataComponent, dataMateria);
  }

  openPhoto() {
    if (this.perfil != "../../../assets/perfil.jpg") {
      this.ventana.open(FotoComponent,
        { width: ' 25rem', data: this.perfil }).afterClosed().subscribe(item => {
        });
    } else {
      this.ventana.open(FotoComponent,
        { width: ' 25rem', data: 'no-image' }).afterClosed().subscribe(item => {
        });
    }
  }

  openDeleteModal() {
    console.log("hay que borar datos");
  }

  openMaterial(component: any) {
    this.ventana.open(component,
      { width: ' 25rem' }).afterClosed().subscribe(item => {
        //this.ListaDepartamentos();
        // Aqui va algo que quieras hacer al cerrar el componente
        // yo se poner la actualizacion de la pagina jejjeje
      });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
      });
  }


  openCurso() {
    if (this.materias.length != 0) {
      this.router.navigate(['curso']);
    } else {
      this.authService.showInfo("Agregue una materia en su lista");
    }
  }
}
