import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Horario } from "src/app/models/horario.interface";
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-edit-horario',
  templateUrl: './edit-horario.component.html',
  styleUrls: ['./edit-horario.component.css']
})
export class EditHorarioComponent implements OnInit {

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
  //est almacena el id de la materia
  public idMateriaSeleccionada = '';
  //controla que sa seleccionada una materia
  public materiaSeleccionada = '';


  //control de suscripciones
  private suscripcion1: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EditHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public infoUser: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /**
     * materiaNombre:this.nombreMateria,
      idMateria:this.uidMateria,
      arrayGuardado: this.dataMateria[0].cursos[this.idIndexCurso],
      arrayCompleto:this.dataMateria,
     */

    console.log(this.infoUser.materiaNombre);
    console.log('tamaño del array guardado', this.infoUser.arrayGuardado.horario.length);
    this.materiaSeleccionada = this.infoUser.materiaNombre + ' - ' + this.infoUser.arrayGuardado.aula;
    this.idMateriaSeleccionada = this.infoUser.idMateria;
    this.materia();

  }
  ngOnDestroy() {
    if(this.suscripcion1){
      this.suscripcion1.unsubscribe();
    }
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
      this.replaceHorario();
    });
  }


  replaceHorario() {
    this.materias.forEach(element => {
      element.data.cursos.forEach(elementCurso => {
        //console.log('cursos', [elementCurso]);
        if ([elementCurso].length != 0) {
          elementCurso.horario.forEach(elementHorario => {
            //console.log('segundo foreach',elementHorario.dia)
            this.horarioVista[elementHorario.posicion][elementHorario.dia] = element.data.nombre + ' - ' + elementCurso.aula;
            if (elementHorario.dia === 'lunes') {
              this.horarioVista[elementHorario.posicion]['LD'] = true;
              this.horarioVista[elementHorario.posicion]['LS'] = false;
            }
            if (elementHorario.dia === 'martes') {
              this.horarioVista[elementHorario.posicion]['MD'] = true;
              this.horarioVista[elementHorario.posicion]['MS'] = false;
            }
            if (elementHorario.dia === 'miercoles') {
              this.horarioVista[elementHorario.posicion]['MiD'] = true;
              this.horarioVista[elementHorario.posicion]['MiS'] = false;
            }
            if (elementHorario.dia === 'jueves') {
              this.horarioVista[elementHorario.posicion]['JD'] = true;
              this.horarioVista[elementHorario.posicion]['JS'] = false;
            }
            if (elementHorario.dia === 'viernes') {
              this.horarioVista[elementHorario.posicion]['VD'] = true;
              this.horarioVista[elementHorario.posicion]['VS'] = false;
            }
          });
        }
      });
    })
    this.replaceHorarioCurso();
  }

  private replaceHorarioCurso() {
    this.infoUser.arrayGuardado.horario.forEach(elementCurso => {
      let cursoId = this.infoUser.idCurso;
      if (elementCurso.dia === 'lunes') {
        this.horarioVista[elementCurso.posicion]['Lid'] = cursoId;
        this.horarioVista[elementCurso.posicion]['LD'] = false;
        this.horarioVista[elementCurso.posicion]['LS'] = true;
      }
      if (elementCurso.dia === 'martes') {
        this.horarioVista[elementCurso.posicion]['Mid'] = cursoId;
        this.horarioVista[elementCurso.posicion]['MD'] = false;
        this.horarioVista[elementCurso.posicion]['MS'] = true;
      }
      if (elementCurso.dia === 'miercoles') {
        this.horarioVista[elementCurso.posicion]['Miid'] = cursoId;
        this.horarioVista[elementCurso.posicion]['MiD'] = false;
        this.horarioVista[elementCurso.posicion]['MiS'] = true;
      }
      if (elementCurso.dia === 'jueves') {
        this.horarioVista[elementCurso.posicion]['Jid'] = cursoId;
        this.horarioVista[elementCurso.posicion]['JD'] = false;
        this.horarioVista[elementCurso.posicion]['JS'] = true;
      }
      if (elementCurso.dia === 'viernes') {
        this.horarioVista[elementCurso.posicion]['Vid'] = cursoId;
        this.horarioVista[elementCurso.posicion]['VD'] = false;
        this.horarioVista[elementCurso.posicion]['VS'] = true;
      }
    });
  }


  setHoraDiaLunes(posicionActual, hora) {
    if (this.horarioVista[posicionActual]['lunes'] != '') {
    } else {
      this.horarioVista[posicionActual]['LS'] = true;
      this.horarioVista[posicionActual]['lunes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'lunes', hora);
    }
  }
  setHoraDiaMartes(posicionActual, hora) {
    if (this.horarioVista[posicionActual]['martes'] != '') {
    } else {
      this.horarioVista[posicionActual]['MS'] = true;
      this.horarioVista[posicionActual]['martes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'martes', hora);
    }
  }
  setHoraDiaMiercoles(posicionActual, hora) {
    if (this.horarioVista[posicionActual]['miercoles'] != '') {
    } else {
      this.horarioVista[posicionActual]['MiS'] = true;
      this.horarioVista[posicionActual]['miercoles'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'miercoles', hora);
    }
  }
  setHoraDiaJueves(posicionActual, hora) {
    if (this.horarioVista[posicionActual]['jueves'] != '') {
    } else {
      this.horarioVista[posicionActual]['JS'] = true;
      this.horarioVista[posicionActual]['jueves'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'jueves', hora);
    }
  }
  setHoraDiaViernes(posicionActual, hora) {
    if (this.horarioVista[posicionActual]['viernes'] != '') {
    } else {
      this.horarioVista[posicionActual]['VS'] = true;
      this.horarioVista[posicionActual]['viernes'] = this.materiaSeleccionada;
      this.agregarDataArrayNuevaMateria(posicionActual, 'viernes', hora);
    }
  }

  ///delete posicion horario
  delHoraDiaLunes(posicionActual) {
    let tamaño = this.infoUser.arrayGuardado.horario.length
    if (tamaño > 1) {
      this.horarioVista[posicionActual]['Lid'] = '';
      this.horarioVista[posicionActual]['LS'] = false;
      this.horarioVista[posicionActual]['lunes'] = '';
      this.quitarDataArrayNuevaMateria(posicionActual, 'lunes');
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaMartes(posicionActual) {
    let tamaño = this.infoUser.arrayGuardado.horario.length
    if (tamaño > 1) {
      this.horarioVista[posicionActual]['Mid'] = '';
      this.horarioVista[posicionActual]['MS'] = false;
      this.horarioVista[posicionActual]['martes'] = '';
      this.quitarDataArrayNuevaMateria(posicionActual, 'martes');
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaMiercoles(posicionActual) {
    let tamaño = this.infoUser.arrayGuardado.horario.length
    if (tamaño > 1) {
      this.horarioVista[posicionActual]['Miid'] = '';
      this.horarioVista[posicionActual]['MiS'] = false;
      this.horarioVista[posicionActual]['miercoles'] = '';
      this.quitarDataArrayNuevaMateria(posicionActual, 'miercoles');
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaJueves(posicionActual) {
    let tamaño = this.infoUser.arrayGuardado.horario.length
    if (tamaño > 1) {
      this.horarioVista[posicionActual]['Jid'] = '';
      this.horarioVista[posicionActual]['JS'] = false;
      this.horarioVista[posicionActual]['jueves'] = '';
      this.quitarDataArrayNuevaMateria(posicionActual, 'jueves');
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }
  delHoraDiaViernes(posicionActual) {
    let tamaño = this.infoUser.arrayGuardado.horario.length
    if (tamaño > 1) {
      this.horarioVista[posicionActual]['Vid'] = '';
      this.horarioVista[posicionActual]['VS'] = false;
      this.horarioVista[posicionActual]['viernes'] = '';
      this.quitarDataArrayNuevaMateria(posicionActual, 'viernes');
    } else {
      this.authService.showInfo('El curso debe tener por lo menos una hora registrada');
    }
  }

  private async quitarDataArrayNuevaMateria(posicion: any, dia: any) {
    for (let i = 0; i < this.infoUser.arrayGuardado.horario.length; i++) {
      if (this.infoUser.arrayGuardado.horario[i].posicion === posicion && this.infoUser.arrayGuardado.horario[i].dia === dia) {
        this.infoUser.arrayGuardado.horario.splice(i, 1);
        break;
      }
    }
  }
  //verificar
  private agregarDataArrayNuevaMateria(posicion: any, dia: any, hora: any) {
    this.infoUser.arrayGuardado.horario.push({
      dia: dia,
      hora: hora,
      posicion: posicion
    });
  }


  async guardarNuevoHorario() {
    try {
      console.log('array completo', this.infoUser.arrayCompleto);
      this.validate = false;
      let data = await this.authService.updateHorario(this.infoUser.arrayCompleto, this.idMateriaSeleccionada);
      if (data) {
        this.validate = true;
        this.dimissModal();
      } else {
        this.validate = true;
      }
    } catch (error) {
      //this.validate = false;
    }

  }

  dimissModal() {
    this.dialogRef.close();
  }

}
