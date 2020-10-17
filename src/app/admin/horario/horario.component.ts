import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Horario } from "../../shared/models/horario.interface";


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  
  public horarioVista: Horario[] = [
    { hora: '7:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '7:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '8:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '8:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '9:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '9:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '10:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '10:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '11:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '11:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '12:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '12:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '13:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '13:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '14:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '14:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '15:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '15:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '16:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '16:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '17:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '17:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '18:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    //{ hora: '18:30', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '19:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''},
    { hora: '20:00', lunes: '',LC:'',Lid:'', martes: '',MC:'',Mid:'',miercoles: '', MiC:'',Miid:'', jueves: '',JC:'',Jid:'', viernes: '',VC:'',Vid:''}
  ]

//carga la informacion de la base de datos
public materias = [];
 //caraga la informacion del curso
 public curso = [];
 //carga horario guardado
 public horarioGuardado = [];
//colores para cada materia
private color=['DARKSLATEGRAY','CADETBLUE','CORAL','FIREBRICK','TEAL','INDIANRED','DARKSLATEBLUE','SEAGREEN','BROWN','LIGHTSLATEGRAY'];

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMateria();
  }

  displayedColumns = ['hora', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = this.horarioVista;


  getMateria() {
    this.materias = [];
    this.authService.getDataMateria().subscribe((data) => {
      data.forEach((dataMateria: any) => {
        this.materias.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        });
      })
    });

    this.authService.getDataCurso().subscribe((data) => {
      this.curso = [];
      data.forEach((dataMateria: any) => {
        this.curso.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
    });

    this.horarioGuardado = [];
    this.authService.getHorario().subscribe((data) => {
      data.forEach((dataMateria: any) => {
        this.horarioGuardado.push({
          id: dataMateria.payload.doc.id,
          data: dataMateria.payload.doc.data()
        })
      });
      this.replaceHorario();
    });
  }

  replaceHorario() {
    console.log('Se ejecuta el replace');
    let cont =0;
    this.materias.forEach(element => {
      this.curso.forEach(elementCurso => {
        if (element.id === elementCurso.data.uidMateria) {
          if(cont<this.color.length-1){
            cont=cont+1
          }else{
            cont=0;
          }
          this.horarioGuardado.forEach(elementHorario => {
            if (elementCurso.id === elementHorario.data.uidCurso) {
              this.horarioVista[elementHorario.data.posicion][elementHorario.data.dia] = element.data.nombre + ' - ' + elementCurso.data.aula;
              if (elementHorario.data.dia === 'lunes') {
                this.horarioVista[elementHorario.data.posicion]['LC'] = this.color[cont];
                this.horarioVista[elementHorario.data.posicion]['Lid'] = elementCurso.id;
              }
              if (elementHorario.data.dia === 'martes') {
                this.horarioVista[elementHorario.data.posicion]['MC'] = this.color[cont];
                this.horarioVista[elementHorario.data.posicion]['Mid'] = elementCurso.id;
              }
              if (elementHorario.data.dia === 'miercoles') {
                this.horarioVista[elementHorario.data.posicion]['MiC'] = this.color[cont];
                this.horarioVista[elementHorario.data.posicion]['Miid'] =elementCurso.id;
              }
              if (elementHorario.data.dia === 'jueves') {
                this.horarioVista[elementHorario.data.posicion]['JC'] = this.color[cont];
                this.horarioVista[elementHorario.data.posicion]['Jid'] = elementCurso.id;
              }
              if (elementHorario.data.dia === 'viernes') {
                this.horarioVista[elementHorario.data.posicion]['VC'] = this.color[cont];
                this.horarioVista[elementHorario.data.posicion]['Vid'] =elementCurso.id;
              }
            }
          });
        }
      });
    });
  }

  
  openCurso(id:any) {
    this.router.navigate(['vista-curso']);
  }
 

}
