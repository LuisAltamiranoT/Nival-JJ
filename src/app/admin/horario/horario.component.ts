import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Horario } from "src/app/models/horario.interface";
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {


  public horarioVista: Horario[] = [
    { hora: '7:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '7:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '8:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '8:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '9:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '9:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '10:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '10:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '11:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '11:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '12:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '12:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '13:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '13:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '14:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '14:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '15:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '15:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '16:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '16:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '17:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '17:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '18:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    //{ hora: '18:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '19:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' },
    { hora: '20:00', lunes: '', LC: '', Lid: '', martes: '', MC: '', Mid: '', miercoles: '', MiC: '', Miid: '', jueves: '', JC: '', Jid: '', viernes: '', VC: '', Vid: '' }
  ]

  //control de suscripciones
  private suscripcion1: Subscription;

  //carga la informacion de la base de datos
  public materias = [];
  //carga horario guardado

  //valida la ceacion de la tabla
  validate: boolean = false;

  private color = ['DARKSLATEGRAY', 'CADETBLUE', 'CORAL', 'FIREBRICK', 'TEAL', 'INDIANRED', 'DARKSLATEBLUE', 'SEAGREEN', 'BROWN', 'LIGHTSLATEGRAY'];

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMateria();
  }

  ngOnDestroy() {
    this.suscripcion1.unsubscribe();
  }

  displayedColumns: string[] = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = new MatTableDataSource(this.horarioVista);


  getMateria() {
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
    let cont = 0;
    this.materias.forEach(element => {
      element.data.cursos.forEach(elementCurso => {
        if ([elementCurso].length!=0) {
          if (cont < this.color.length - 1) {
            cont = cont + 1
          } else {
            cont = 0;
          }
          elementCurso.horario.forEach(elementHorario => {
            let idCurso = elementCurso.uidNomina+'//'+element.id;
              this.horarioVista[elementHorario.posicion][elementHorario.dia] = element.data.nombre + ' - ' + elementCurso.aula;
              if (elementHorario.dia === 'lunes') {
                this.horarioVista[elementHorario.posicion]['LC'] = this.color[cont];
                this.horarioVista[elementHorario.posicion]['Lid'] = idCurso;
              }
              if (elementHorario.dia === 'martes') {
                this.horarioVista[elementHorario.posicion]['MC'] = this.color[cont];
                this.horarioVista[elementHorario.posicion]['Mid'] = idCurso;
              }
              if (elementHorario.dia === 'miercoles') {
                this.horarioVista[elementHorario.posicion]['MiC'] = this.color[cont];
                this.horarioVista[elementHorario.posicion]['Miid'] = idCurso;
              }
              if (elementHorario.dia === 'jueves') {
                this.horarioVista[elementHorario.posicion]['JC'] = this.color[cont];
                this.horarioVista[elementHorario.posicion]['Jid'] = idCurso;
              }
              if (elementHorario.dia === 'viernes') {
                this.horarioVista[elementHorario.posicion]['VC'] = this.color[cont];
                this.horarioVista[elementHorario.posicion]['Vid'] = idCurso;
              }
            
          });
        }
      });
    });
    this.validate=true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openCurso(id: any) {
    this.router.navigate(['vista-cursoActualizado', id]);
  }

  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource.filter = null;
  }

}
