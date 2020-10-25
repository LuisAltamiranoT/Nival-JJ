import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { Horario } from "../../../shared/models/horario.interface";
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.css']
})
export class EditHorarioComponent implements OnInit {
  private stateImage: Subscription = null;

  public horarioVista: Horario[] = [
    { hora: '7:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '7:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '8:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '8:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '9:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '9:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '10:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '10:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '11:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '11:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '12:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '12:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '13:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '13:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '14:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '14:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '15:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '15:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '16:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '16:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '17:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '17:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '18:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    //{ hora: '18:30',  lunes: '',Lid:'', LS: false, LD: false, martes: '',Mid:'', MS: false, MD: false, miercoles: '',Miid:'', MiS: false, MiD: false, jueves: '',Jid:'', JS: false, JD: false, viernes: '',Vid:'', VS: false, VD: false },
    { hora: '19:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false },
    { hora: '20:00', lunes: '', Lid: '', LS: false, LD: false, martes: '', Mid: '', MS: false, MD: false, miercoles: '', Miid: '', MiS: false, MiD: false, jueves: '', Jid: '', JS: false, JD: false, viernes: '', Vid: '', VS: false, VD: false }
  ]

  //control de progressbar
  validate = true;
  //carga la informacion de la base de datos
  public materias = [];
  //caraga la informacion del curso
  public curso = [];
  //carga horario guardado
  public horarioGuardado = [];
  //Es el horario que tendra el horario de la materia seleccionada
  public nuevoHorario = [];
  //horario editado
  public horarioEditado = [];




  //est almacena el id de la materia
  public idMateriaSeleccionada = '';
  //controla que sa seleccionada una materia
  public materiaSeleccionada = '';
  //id que permitira obtener el horario del curso
  public idCurso = '';

  //control de suscripciones
  private suscripcion1: Subscription;
  private suscripcion2: Subscription;
  private suscripcion3: Subscription;
  private suscripcion4: Subscription;


  constructor(
    public dialogRef: MatDialogRef<EditHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.infoUser.materiaNombre);
    this.nuevoHorario.length = 0;
    this.materiaSeleccionada = this.infoUser.materiaNombre;
    this.idMateriaSeleccionada = this.infoUser.idMateria;
    this.idCurso = this.infoUser.idCurso;
    this.materia();

    this.stateImage = this.authService.finalizoImage$.subscribe(() => {
      this.finalizeBar();
    })
    console.log(this.nuevoHorario)
  }
  ngOnDestroy() {
    this.stateImage.unsubscribe();
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
    this.suscripcion3.unsubscribe();
    this.suscripcion4.unsubscribe();
  }
  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = this.horarioVista;


  materia() {
    this.suscripcion1 = this.authService.getDataMateria().subscribe((data) => {
      this.materias.length = 0;
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });

    this.suscripcion2 = this.authService.getDataCurso().subscribe((data) => {
      this.curso.length = 0;
      data.forEach((dataMateria: any) => {
        this.curso.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
    });

    this.suscripcion3 = this.authService.getHorario().subscribe((data) => {
      this.horarioGuardado.length = 0;
      data.forEach((dataMateria: any) => {
        this.horarioGuardado.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
      this.replaceHorario();
    });

    this.suscripcion4 = this.authService.getHorarioCursoId(this.idCurso).subscribe((data) => {
      this.nuevoHorario.length = 0;
      data.forEach((dataMateria: any) => {
        this.nuevoHorario.push({
          id: dataMateria.payload.doc.id,
          posicion: dataMateria.payload.doc.data().posicion,
          dia: dataMateria.payload.doc.data().dia,
          idMateria: dataMateria.payload.doc.data().uidMateria,
        })
      });
      this.replaceHorarioCurso();
    });
  }

  replaceHorario() {
    this.materias.forEach(element => {
      this.curso.forEach(elementCurso => {
        if (element.id === elementCurso.data.uidMateria) {
          this.horarioGuardado.forEach(elementHorario => {
            if (elementCurso.id === elementHorario.data.uidCurso) {
              this.horarioVista[elementHorario.data.posicion][elementHorario.data.dia] = element.data.nombre + ' - ' + elementCurso.data.aula;
              if (elementHorario.data.dia === 'lunes') {
                this.horarioVista[elementHorario.data.posicion]['LD'] = true;
                this.horarioVista[elementHorario.data.posicion]['LS'] = false;
              }
              if (elementHorario.data.dia === 'martes') {
                this.horarioVista[elementHorario.data.posicion]['MD'] = true;
                this.horarioVista[elementHorario.data.posicion]['MS'] = false;
              }
              if (elementHorario.data.dia === 'miercoles') {
                this.horarioVista[elementHorario.data.posicion]['MiD'] = true;
                this.horarioVista[elementHorario.data.posicion]['MiS'] = false;
              }
              if (elementHorario.data.dia === 'jueves') {
                this.horarioVista[elementHorario.data.posicion]['JD'] = true;
                this.horarioVista[elementHorario.data.posicion]['JS'] = false;
              }
              if (elementHorario.data.dia === 'viernes') {
                this.horarioVista[elementHorario.data.posicion]['VD'] = true;
                this.horarioVista[elementHorario.data.posicion]['VS'] = false;
              }
            }
          });
        }
      });
    });
  }

  private agregarDataArrayNuevaMateria(posicion: any, dia: any) {
    let data = {
      posicion: posicion,
      dia: dia,
      idMateria: this.idMateriaSeleccionada
    }
    this.horarioEditado.push(data);
  }

  private async quitarDataArrayNuevaMateria(posicion: any, dia: any) {
    console.log(this.horarioEditado)
    for (let i = 0; i < this.horarioEditado.length; i++) {
      if (this.horarioEditado[i].posicion === posicion && this.horarioEditado[i].dia === dia) {
        this.horarioEditado.splice(i, 1);
        this.authService.showSuccess('El registro ha sido eliminado');
        break;
      }
    }
    console.log(this.horarioEditado)
  }

  private replaceHorarioCurso() {
    this.nuevoHorario.forEach(elementCurso => {
      if (elementCurso.dia === 'lunes') {
        this.horarioVista[elementCurso.posicion]['Lid'] = elementCurso.id;
        this.horarioVista[elementCurso.posicion]['LD'] = false;
        this.horarioVista[elementCurso.posicion]['LS'] = true;
      }
      if (elementCurso.dia === 'martes') {
        this.horarioVista[elementCurso.posicion]['Mid'] = elementCurso.id;
        this.horarioVista[elementCurso.posicion]['MD'] = false;
        this.horarioVista[elementCurso.posicion]['MS'] = true;
      }
      if (elementCurso.dia === 'miercoles') {
        this.horarioVista[elementCurso.posicion]['Miid'] = elementCurso.id;
        this.horarioVista[elementCurso.posicion]['MiD'] = false;
        this.horarioVista[elementCurso.posicion]['MiS'] = true;
      }
      if (elementCurso.dia === 'jueves') {
        this.horarioVista[elementCurso.posicion]['Jid'] = elementCurso.id;
        this.horarioVista[elementCurso.posicion]['JD'] = false;
        this.horarioVista[elementCurso.posicion]['JS'] = true;
      }
      if (elementCurso.dia === 'viernes') {
        this.horarioVista[elementCurso.posicion]['Vid'] = elementCurso.id;
        this.horarioVista[elementCurso.posicion]['VD'] = false;
        this.horarioVista[elementCurso.posicion]['VS'] = true;
      }
    });
  }

  setHoraDiaLunes(posicionActual) {
    if (this.horarioVista[posicionActual]['lunes'] != '') {
    } else {
      this.horarioVista[posicionActual]['LS'] = true;
      this.horarioVista[posicionActual]['lunes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'lunes');
    }
  }
  setHoraDiaMartes(posicionActual) {
    if (this.horarioVista[posicionActual]['martes'] != '') {
    } else {
      this.horarioVista[posicionActual]['MS'] = true;
      this.horarioVista[posicionActual]['martes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'martes');
    }
  }
  setHoraDiaMiercoles(posicionActual) {
    if (this.horarioVista[posicionActual]['miercoles'] != '') {
    } else {
      this.horarioVista[posicionActual]['MiS'] = true;
      this.horarioVista[posicionActual]['miercoles'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'miercoles');
    }
  }
  setHoraDiaJueves(posicionActual) {
    if (this.horarioVista[posicionActual]['jueves'] != '') {
    } else {
      this.horarioVista[posicionActual]['JS'] = true;
      this.horarioVista[posicionActual]['jueves'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'jueves');
    }
  }
  setHoraDiaViernes(posicionActual) {
    if (this.horarioVista[posicionActual]['viernes'] != '') {
    } else {
      this.horarioVista[posicionActual]['VS'] = true;
      this.horarioVista[posicionActual]['viernes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'viernes');
    }
  }

  ///delete posicion horario
  delHoraDiaLunes(posicionActual) {
    console.log(this.nuevoHorario.length)
    console.log(this.nuevoHorario)
    if ((this.nuevoHorario.length+this.horarioEditado.length)>1) {
      if (this.horarioVista[posicionActual]['Lid'] != '') {
        this.borrar(this.horarioVista[posicionActual]['Lid']);
        this.horarioVista[posicionActual]['Lid'] = '';
        this.horarioVista[posicionActual]['LS'] = false;
        this.horarioVista[posicionActual]['lunes'] = '';
      } else {
        this.horarioVista[posicionActual]['Lid'] = '';
        this.horarioVista[posicionActual]['LS'] = false;
        this.horarioVista[posicionActual]['lunes'] = '';
        this.quitarDataArrayNuevaMateria(posicionActual, 'lunes');
      }
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaMartes(posicionActual) {
    console.log(this.nuevoHorario.length)
    console.log(this.nuevoHorario)
    if ((this.nuevoHorario.length+this.horarioEditado.length)>1) {
      if (this.horarioVista[posicionActual]['Mid'] != '') {
        this.borrar(this.horarioVista[posicionActual]['Mid']);
        this.horarioVista[posicionActual]['Mid'] = '';
        this.horarioVista[posicionActual]['MS'] = false;
        this.horarioVista[posicionActual]['martes'] = '';
      } else {
        this.horarioVista[posicionActual]['Mid'] = '';
        this.horarioVista[posicionActual]['MS'] = false;
        this.horarioVista[posicionActual]['martes'] = '';
        this.quitarDataArrayNuevaMateria(posicionActual, 'martes');
      }
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaMiercoles(posicionActual) {
    console.log(this.nuevoHorario.length)
    console.log(this.nuevoHorario)
    if ((this.nuevoHorario.length+this.horarioEditado.length)>1) {
      if (this.horarioVista[posicionActual]['Miid'] != '') {
        this.borrar(this.horarioVista[posicionActual]['Miid']);
        this.horarioVista[posicionActual]['Miid'] = '';
        this.horarioVista[posicionActual]['MiS'] = false;
        this.horarioVista[posicionActual]['miercoles'] = '';
      } else {
        this.horarioVista[posicionActual]['Miid'] = '';
        this.horarioVista[posicionActual]['MiS'] = false;
        this.horarioVista[posicionActual]['miercoles'] = '';
        this.quitarDataArrayNuevaMateria(posicionActual, 'miercoles');
      }
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaJueves(posicionActual) {
    console.log(this.nuevoHorario.length)
    console.log(this.nuevoHorario)
    if ((this.nuevoHorario.length+this.horarioEditado.length)>1) {
      if (this.horarioVista[posicionActual]['Jid'] != '') {
        this.borrar(this.horarioVista[posicionActual]['Jid']);
        this.horarioVista[posicionActual]['Jid'] = '';
        this.horarioVista[posicionActual]['JS'] = false;
        this.horarioVista[posicionActual]['jueves'] = '';
      } else {
        this.horarioVista[posicionActual]['Jid'] = '';
        this.horarioVista[posicionActual]['JS'] = false;
        this.horarioVista[posicionActual]['jueves'] = '';
        this.quitarDataArrayNuevaMateria(posicionActual, 'jueves');
      }
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaViernes(posicionActual) {
    console.log(this.nuevoHorario.length)
    console.log(this.nuevoHorario)

    if ((this.nuevoHorario.length+this.horarioEditado.length)>1) {

      if (this.horarioVista[posicionActual]['Vid'] != '') {
        this.borrar(this.horarioVista[posicionActual]['Vid']);
        this.horarioVista[posicionActual]['Vid'] = '';
        this.horarioVista[posicionActual]['VS'] = false;
        this.horarioVista[posicionActual]['viernes'] = '';
      } else {
        this.horarioVista[posicionActual]['Vid'] = '';
        this.horarioVista[posicionActual]['VS'] = false;
        this.horarioVista[posicionActual]['viernes'] = '';
        this.quitarDataArrayNuevaMateria(posicionActual, 'viernes');
      }
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }

  async borrar(idHorario: any) {
    let data = await this.authService.deleteHorario(idHorario);
    if (data != 1) {
    } else {
      this.authService.showSuccess('El registro ha sido eliminado');
    }
  }

  async guardarNuevoHorario() {
    this.validate = false;
    if(this.horarioEditado.length>0){
      console.log(this.horarioEditado)
      await this.authService.updateHorario(this.horarioEditado, this.idCurso);
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }

  finalizeBar() {
    this.nuevoHorario.length = 0;
    this.horarioEditado.length = 0;
    this.dimissModal();
    this.validate = true;
    this.authService.showSuccess('El horario ha sido actualizado');
  }

}
