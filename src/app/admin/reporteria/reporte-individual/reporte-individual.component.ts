
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-reporte-individual',
  templateUrl: './reporte-individual.component.html',
  styleUrls: ['./reporte-individual.component.css']
})
export class ReporteIndividualComponent implements OnInit {
  cambio = false;
  public validate = true;
  public presente = false;
  public atraso = false;
  public falta = false;
  splitted: any[] = [];//separa los valores de una cadena 
  array: any[]; //el array completo
  indexEstudiante;//posicion del estudiante
  posicionAsistenciaArray;//index donde se encuentra el array a reemplazar
  arrayTemp: any;//se mantiene para realizar el cambio
  arrayTemp2: any;//realiza los cambios
  fecha = '';

  constructor(
    public dialogRef: MatDialogRef<ReporteIndividualComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    //console.log('llega kasjd',this.data.estado);
    /*
      estado:estado,
      index:discol,
      array:this.dataNominaConsulta,
      indexEstudiante:index,
      idMateria:this.idMateria,
      idNomina:this.idNomina
     */
    this.fecha = this.data.index;
    this.array = this.data.array;
    this.indexEstudiante = this.data.indexEstudiante;//posicion en el array

    this.splitted = this.fecha.split(")");
    this.posicionAsistenciaArray = Number(this.splitted[0]);

    this.arrayTemp2 = JSON.parse(JSON.stringify(this.array));


    console.log('Los dos archivos', this.arrayTemp, this.arrayTemp2);

    if (this.data.estado == 'Presente') {
      this.presente = true;
    } else if (this.data.estado == 'Atraso') {
      this.atraso = true;
    } else {
      this.falta = true;
    }
  }

  showOptionsPresente(event) {
    try {
      this.cambio = true;
      this.presente = true;
      this.atraso = false;
      this.falta = false;
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsAtraso(event) {
    try {
      this.cambio = true;
      this.presente = false;
      this.atraso = true;
      this.falta = false;
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsFalta(event) {
    try {
      this.cambio = true;
      this.presente = false;
      this.atraso = false;
      this.falta = true;
    } catch (error) {
      this.authService.showError(error);
    }
  }

  agregarArray() {
    this.validate=false
    if(this.cambio){
      this.arrayTemp2[this.indexEstudiante - 1].asistencia[this.posicionAsistenciaArray - 1].presente = this.presente;
      this.arrayTemp2[this.indexEstudiante - 1].asistencia[this.posicionAsistenciaArray - 1].atraso = this.atraso;
      this.arrayTemp2[this.indexEstudiante - 1].asistencia[this.posicionAsistenciaArray - 1].falta = this.falta;

      const dat = this.authService.updateNominaUnionAsistencia(this.data.idMateria, this.data.idNomina, this.arrayTemp2);
      if (dat) {
        this.validate=true
        this.dialogRef.close();
      } else {
        this.validate = true;
      }

    }else{
      this.validate=true
      this.dialogRef.close();
    }
  }

  dimissModal() {
    this.dialogRef.close();
  }
}
