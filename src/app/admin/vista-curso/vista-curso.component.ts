import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-vista-curso',
  templateUrl: './vista-curso.component.html',
  styleUrls: ['./vista-curso.component.css']
})
export class VistaCursoComponent implements OnInit {

  datosEstudiantes = [
    {
      codigo: '4548412',
      nombre: 'Luis',
      presente: true,
      atraso: false,
      falta: false
    },
    {
      codigo: '4548413',
      nombre: 'Jenny',
      presente: false,
      atraso: false,
      falta: true
    },
    {
      codigo: '4548414',
      nombre: 'Mario',
      presente: false,
      atraso: true,
      falta: false
    },
    {
      codigo: '4548415',
      nombre: 'Lucia',
      presente: true,
      atraso: false,
      falta: false
    },
  ]

  nombre: any;
  fechaActual: any;
  nombreDay: any;

  constructor(
  ) { }

  ngOnInit(): void {
    var f = moment();
    this.fechaActual = f.format('DD-MM-YYYY');
    var day = moment(this.fechaActual).day();
    this.nombreDay = moment.weekdays(day).charAt(0).toUpperCase() + moment.weekdays(day).slice(1)
  }

  presente(dato) {
    console.log('dato', dato);
    this.datosEstudiantes[dato].presente = true;
    this.datosEstudiantes[dato].atraso = false;
    this.datosEstudiantes[dato].falta = false;
  }
  atraso(dato) {
    console.log('dato', dato);
    this.datosEstudiantes[dato].presente = false;
    this.datosEstudiantes[dato].atraso = true;
    this.datosEstudiantes[dato].falta = false;
  }
  falta(dato) {
    console.log('dato', dato);
    this.datosEstudiantes[dato].presente = false;
    this.datosEstudiantes[dato].atraso = false;
    this.datosEstudiantes[dato].falta = true;
  }

  showOptionsPresente(event, dato) {
    console.log(event.checked); //true or false
    this.datosEstudiantes[dato].presente = true;
    this.datosEstudiantes[dato].atraso = false;
    this.datosEstudiantes[dato].falta = false;
    console.log('array p', this.datosEstudiantes)
  }

  showOptionsAtraso(event, dato) {
    console.log(event.checked); //true or false
    this.datosEstudiantes[dato].presente = false;
    this.datosEstudiantes[dato].atraso = true;
    this.datosEstudiantes[dato].falta = false;
    console.log('array a', this.datosEstudiantes)
  }

  showOptionsFalta(event, dato) {
    console.log(event.checked); //true or false
    this.datosEstudiantes[dato].presente = false;
    this.datosEstudiantes[dato].atraso = false;
    this.datosEstudiantes[dato].falta = true;
    console.log('array f', this.datosEstudiantes)
  }
}
