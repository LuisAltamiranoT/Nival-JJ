import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
moment.locale('es');
import * as xlsx from 'xlsx';

import { AuthService } from '../../auth/services/auth.service';
import { UploadExcelService } from '../../auth/services/upload-excel.service'
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
    private authService: AuthService,
    private uploadExcel: UploadExcelService,
    public router: Router,
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
    console.log('array f', this.datosEstudiantes);
    this.exportToExcel();
  }

  /* ****************************************************************************************************
   *                               PARA LA EXPORTACIÓN DE ARCHIVOS EXCEL
   * ****************************************************************************************************/

  exportToExcel() {
    var i = 0;
    var datosGenerales = [{
      'N°': i = i + 1,
      nombre: 'Jenny',
      apellido: 'Tipan',
      cedula: '12549565984',
    },
    {
      'N°': i = i + 1,
      nombre: 'Luis',
      apellido: 'Altamirano',
      cedula: '2025698',
    },
    ]
    const wse: xlsx.WorkSheet = xlsx.utils.json_to_sheet(datosGenerales);

    const header = Object.keys(datosGenerales[0]); // columns name

    var wscols = [];
    for (var i = 0; i < header.length; i++) {  // columns length added
      wscols.push({ wpx: 125 })
    }
    wse["!cols"] = wscols;

    /* wse["!A1"] = {
       fill: {
         patternType: "none", // none / solid
         fgColor: { rgb: "FFFFAA00" },
         bgColor: { rgb: "FFFFFFFF" }
       },
       font: {
         name: 'Times New Roman',
         sz: 16,
         color: { rgb: "#FF000000" },
         bold: true,
         italic: false,
         underline: false
       },
       border: {
         top: { style: "thin", color: { auto: 1 } },
         right: { style: "thin", color: { auto: 1 } },
         bottom: { style: "thin", color: { auto: 1 } },
         left: { style: "thin", color: { auto: 1 } }
       }
     };*/

    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, wse, 'Hoja Asistencia');

    xlsx.writeFile(wb, "Hoja Asistencia" + '.xlsx');


  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();

    const file = ev.target.files[0];
    const formato = file.name.split('.')[1];

    if (this.uploadExcel.validateType(formato)) {

      reader.onload = (event) => {
        const data = reader.result;
        workBook = xlsx.read(data, { type: 'binary' });
        const sheet_name_list = workBook.SheetNames;
        const plantilla = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
        plantilla.forEach(async (data1: any) => {
          // lee los datos de la nomina
          const { nombre_horario, minutos_almuerzo } = data1;
          this.authService.createNomina(nombre_horario, minutos_almuerzo);
        })
      }
      reader.readAsBinaryString(file);
    }
    else {
      this.authService.showError('Este no es un archivo de formato excel')
    }
  }

}
