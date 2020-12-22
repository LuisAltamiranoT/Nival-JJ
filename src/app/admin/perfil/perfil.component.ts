import { Component, OnInit } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { NombreComponent } from './nombre/nombre.component';

import { AuthService } from 'src/app/services/auth.service';
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
import { EliminarCursoComponent } from './eliminar-curso/eliminar-curso.component';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  //valida la ceacion de la tabla
  validate: boolean = false;

  img = "../../../assets/withoutUser.jpg";
  perfil = "../../../assets/withoutUser.jpg";
  nombre = "";
  apellido = "";
  oficina = "";
  correo = "";
  informacion = "";
  cursos = [];
  materias = [];
  cursoCompleto = [];
  password = "";
  materiaSeleccionada = "";
  nombreMateria = "";

  AnioLectivoInicio = "dd/mm/yyyy";
  AnioLectivoFin = "dd/mm/yyyy";

  val = true;

  // Variables para revisar la parte de encriptación //
  texto: string;
  clave: string;
  textoencriptado: string;
  textodesencriptado: string;
  pass_prueba: string;
  textodesencriptado_mal: string;

  constructor(
    public ventana: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataUser();
    this.materia();
  }

  dataUser() {
    this.authService.getDataUser().subscribe((data) => {
      let dataUser: any = [data.payload.data()];
      this.nombre = dataUser[0].nombre;
      this.apellido = dataUser[0].apellido;
      this.correo = dataUser[0].email;
      this.informacion = dataUser[0].info;
      this.oficina = dataUser[0].oficina;
      this.AnioLectivoInicio = dataUser[0].anioInicio;
      this.AnioLectivoFin = dataUser[0].anioFin;
      if (dataUser[0].photoUrl != '') {
        this.perfil = dataUser[0].photoUrl;
      }
    });
  }

  //curso completo

  cargarData() {
    this.cursoCompleto.length = 0;
    this.materias.forEach(elementMateria => {
      elementMateria.data.cursos.forEach(elementCurso => {
        this.cursoCompleto.push({
          idCurso: elementCurso.uidNomina + '//' + elementMateria.id + '//' + elementCurso.id,
          nombre: elementMateria.data.nombre + ' ' + elementCurso.aula,
          image: elementCurso.image,
          array: elementCurso,
          uidNomina: elementCurso.uidNomina,
          idMateria: elementMateria.id
        })
      });
    });
    this.validate=true;
  }



  materia() {
    this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
      this.cargarData();
    });
  }

  //editar curso
  editarCurso(idCurso: any) {
    this.router.navigate(['edit-curso', idCurso]);
  }

  openAnioLectivoModal() {
    this.openMaterial(EditarAnioComponent,'');
  }

  //al momento de actualizar el nombre se ebe actualizar en las materias que tenga el usuario
  openNombreModal() {
    let info = {
      nombre: this.nombre,
      apellido: this.apellido,
      arrayMaterias: this.materias
    }
    this.openMaterial1(NombreComponent, info);
  }

  openInfoModal() {
    this.openMaterial1(InfoComponent, this.informacion);
  }

  openApellidoModal() {
    let info = {
      nombre: this.nombre,
      apellido: this.apellido,
      arrayMaterias: this.materias
    }
    this.openMaterial1(ApellidoComponent, info);
  }

  openOficinaModal() {
    this.openMaterial1(OficinaComponent, this.oficina);
  }

  openPasswordModal() {
    this.openMaterial(PasswordComponent,'');
  }

  openMateriaModal() {
    let data = {
      nombre: this.nombre + ' ' + this.apellido,
      image: this.perfil
    }
    this.openMaterial1(MateriaComponent, data);
  }

  openEditMateriaModal(nombre: any, idMateria: any) {
    let dataMateria = {
      nombre: nombre,
      id: idMateria,
      array: this.materias
    }
    this.openMaterial1(EditarMateriaComponent, dataMateria);
  }

  openEliminarMateriaModal(data: any, idData: any, dataArray: any) {
    let dataMateria = {
      nombre: data,
      id: idData,
      array: dataArray,
    }
    this.openMaterial1(EliminarDataComponent, dataMateria);
  }

  openEliminarCursoModal(nombre: any, uidNomina: any, image: any, idMateria: any, array: any) {
    let dataMateria = {
      nombre: nombre,
      uidNomina: uidNomina,
      image: image,
      idMateria: idMateria,
      array: array
    }
    this.openMaterial1(EliminarCursoComponent, dataMateria);
  }

  openPhoto() {
    if (this.perfil != '') {
      let info = {
        data: this.perfil,
        array: this.materias
      }
      this.ventana.open(FotoComponent,
        { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
        });
    } else {
      let info = {
        data: 'no-image',
        array: this.materias
      }
      this.ventana.open(FotoComponent,
        { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
        });
    }
  }

  openDeleteModal() {
    let data={
      imagen:this.perfil,
      cursos:this.cursoCompleto
    }
    this.openMaterial(DeleteComponent,data);
  }

  openMaterial(component: any,data:any) {
    this.ventana.open(component,
      { width: ' 25rem',data:data }).afterClosed().subscribe(item => {
        // Aqui va algo que quieras hacer al cerrar el componente
        // yo se poner la actualizacion de la pagina jejjeje
      });
  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {
        this.materia();
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
