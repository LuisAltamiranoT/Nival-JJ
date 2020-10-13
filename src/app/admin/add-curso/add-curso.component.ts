import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UploadImageService } from 'src/app/auth/services/upload-image.service';

import { MatDialog } from '@angular/material/dialog';
import { VistaHorarioComponent } from './vista-horario/vista-horario.component';
import { Horario } from "../../shared/models/horario.interface";


interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit {
  //controla que se sea visible el horario
  public validacionDeMateria:boolean=false;
  //controla que sa seleccionada una materia
  public materiaSeleccionada='';
  //est almacena el id de la materia
  public idMateriaSeleccionada='';
  //carga la informacion de la base de datos
  public materias = [];
  //cargar horario actual del usuario
  public horarioProfesor=[];
  //Es el horario que se agregar con el nuevo curso
  public nuevoHorario:any=[];
   //image="";
   placeholder = 'Ingresa informacion sobre el aula';
   private file: any;
   public photoSelected: string | ArrayBuffer;
   private validImage: boolean = false;

  cursoForm = new FormGroup({
    materiaSelect: new FormControl('', [Validators.required, Validators.minLength(1)]),
    image: new FormControl(''),
    aula: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })


  public horarioVista:Horario[]=[
    {hora:'7:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'7:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'8:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'8:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'9:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'9:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'10:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'10:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'11:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'11:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'12:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'12:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'13:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'13:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'14:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'14:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'15:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'15:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'16:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'16:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'17:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'17:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'18:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'18:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'19:00',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false},
    {hora:'19:30',lunes:'',LS:false,LD:false,martes:'',MS:false,MD:false,miercoles:'',MiS:false,MiD:false,jueves:'',JS:false,JD:false,viernes:'',VS:false,VD:false}
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
    private uploadImage: UploadImageService,
    public ventana: MatDialog,
  ) { }

  ngOnInit(): void {
    this.materia();
  }

  displayedColumns = ['hora','lunes','martes','miercoles','jueves','viernes'];
  dataSource = this.horarioVista;

  selectMateria(materia){
    this.validacionDeMateria=true;
    let splitted = materia.split("+//+", 2);
    this.idMateriaSeleccionada=splitted[0];

    if(this.materiaSeleccionada!=''){
      if(this.materiaSeleccionada!=splitted[1]){
        this.materiaSeleccionada=splitted[1]
        this.cambiarNombre();
      }else{

      }
    }else{
      //console.log('entro al else');
      this.materiaSeleccionada=splitted[1];
      console.log(this.materiaSeleccionada);
    }
  }

  private cambiarNombre(){
    let numData=this.nuevoHorario.length;
    if(numData>0){
      for(let i=0;i<numData;i++){
        console.log(this.nuevoHorario[i].posicion," ",this.nuevoHorario[i].dia," ",this.materiaSeleccionada)
        this.horarioVista[this.nuevoHorario[i].posicion][this.nuevoHorario[i].dia]=this.materiaSeleccionada;
        this.nuevoHorario[i].idMateria=this.idMateriaSeleccionada;
      }
    }
  }

  private agregarDataArrayNuevaMateria(posicion:any,dia:any){
    let data={
      posicion:posicion,
      dia:dia,
      idMateria:this.idMateriaSeleccionada
    }
    this.nuevoHorario.push(data);
    console.log(this.nuevoHorario);
  }

  private quitarDataArrayNuevaMateria(posicion:any, dia:any){
    //console.log("All "+this.nuevoHorario);
    for(let i=0;i<this.nuevoHorario.length;i++){
      if(this.nuevoHorario[i].posicion===posicion && this.nuevoHorario[i].dia===dia){
        this.nuevoHorario.splice(i,1);
        break;
      }else{

      }
    }
  }

  setHoraDiaLunes(posicionActual){
    this.horarioVista[posicionActual]['LS']=true;
    this.horarioVista[posicionActual]['lunes']=this.materiaSeleccionada;
    this.agregarDataArrayNuevaMateria(posicionActual,'lunes');
  }
  setHoraDiaMartes(posicionActual){
    this.horarioVista[posicionActual]['MS']=true;
    this.horarioVista[posicionActual]['martes']=this.materiaSeleccionada;
    this.agregarDataArrayNuevaMateria(posicionActual,'martes');
  }
  setHoraDiaMiercoles(posicionActual){
    this.horarioVista[posicionActual]['MiS']=true;
    this.horarioVista[posicionActual]['miercoles']=this.materiaSeleccionada;
    this.agregarDataArrayNuevaMateria(posicionActual,'miercoles');
  }
  setHoraDiaJueves(posicionActual){
    this.horarioVista[posicionActual]['JS']=true;
    this.horarioVista[posicionActual]['jueves']=this.materiaSeleccionada;
    this.agregarDataArrayNuevaMateria(posicionActual,'jueves');
  }
  setHoraDiaViernes(posicionActual){
    this.horarioVista[posicionActual]['VS']=true;
    this.horarioVista[posicionActual]['viernes']=this.materiaSeleccionada;
    this.agregarDataArrayNuevaMateria(posicionActual,'viernes');
  }

  ///delete posicion horario
  delHoraDiaLunes(posicionActual){
    this.horarioVista[posicionActual]['LS']=false;
    this.horarioVista[posicionActual]['lunes']='';
    this.quitarDataArrayNuevaMateria(posicionActual,'lunes');
  }
  delHoraDiaMartes(posicionActual){
    this.horarioVista[posicionActual]['MS']=false;
    this.horarioVista[posicionActual]['martes']='';
    this.quitarDataArrayNuevaMateria(posicionActual,'martes');
  }
  delHoraDiaMiercoles(posicionActual){
    this.horarioVista[posicionActual]['MiS']=false;
    this.horarioVista[posicionActual]['miercoles']='';
    this.quitarDataArrayNuevaMateria(posicionActual,'miercoles');
  }
  delHoraDiaJueves(posicionActual){
    this.horarioVista[posicionActual]['JS']=false;
    this.horarioVista[posicionActual]['jueves']='';
    this.quitarDataArrayNuevaMateria(posicionActual,'jueves');
  }
  delHoraDiaViernes(posicionActual){
    this.horarioVista[posicionActual]['VS']=false;
    this.horarioVista[posicionActual]['viernes']='';
    this.quitarDataArrayNuevaMateria(posicionActual,'viernes');
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.validImage = this.uploadImage.validateType(this.file.type);
      if (this.validImage) {
        const reader = new FileReader();
        reader.onload = e => this.photoSelected = reader.result;
        reader.readAsDataURL(this.file);
      } else {
        this.authService.showError('El archivo seleccionado no es una imagen');
      }
    } else {
      this.validImage = false;
    }
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

  addCurso(data: any) {
    //console.log(data.value);
    let splitted = data.value.materia.split("+//+", 2);
    //console.log(splitted);


    //if (this.validImage) {
    //this.uploadImage.preAddAndUpdate(splitted[1], this.file)
    //}else{
    //this.uploadImage.addCurso2(splitted[1]);
    //}
  }
  openHorario() {
    this.ventana.open(VistaHorarioComponent,
      { width: ' 45rem' }).afterClosed().subscribe(item => {
      });
  }


  public editar(position: any) {
    console.log(position);
  }

  public eliminar(position: any) {
    console.log(position);
  }

  public agregar() {
  }
}
