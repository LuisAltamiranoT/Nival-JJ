import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Libreria para encriptar y desencriptar //
import * as CryptoJS from 'crypto-js'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Nomina } from 'src/app/models/user.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Subscription } from 'rxjs';

import * as moment from 'moment';
import { AsistenciaAnteriorComponent } from '../asistencia-anterior/asistencia-anterior.component';
import { NotificacionSalirComponent } from '../notificacion-salir/notificacion-salir.component';
import { VerImageCursoComponent } from './ver-image-curso/ver-image-curso.component';

import { PuedeDesactivar } from '../../services/can-deactivate.guard';

moment.locale('es');

@Component({
  selector: 'app-vista-curso-actualizado',
  templateUrl: './vista-curso-actualizado.component.html',
  styleUrls: ['./vista-curso-actualizado.component.css']
})
export class VistaCursoActualizadoComponent implements OnInit, PuedeDesactivar {
  @HostListener('window:beforeunload')
  onBeforeUnload() {
    if (this.asistenciaProfesorAnterior.length != 0 || this.asistenciaProfesor.length != 0) {
      return false;
    } else {
      return true;
    }
  }


  //valida la ceacion de la tabla
  validate: boolean = false;

  //validar el boton reportes
  validateReporte:boolean=true;

  img = '../../../assets/withoutUser.jpg';
  //variable que obtiene el codigo rmdomico
  codigo_randomico: any;

  //array de la nomina de los estudiantes obtenida del service
  private nominaEstudiantes: any[] = [];

  //array temp
  private arrayTemp: any[] = [];

  //array conserva los cambios hechos tanto en el server como la fuente manual
  public nominaVista: any[] = [];

  //array con la informacion de la asistencia hecha por el profesor
  private asistenciaProfesor: any[] = [];

  //estado para agregar
  estado = 'presente';

  //numero de veces almacenado
  numeroAlmacenado: number = 0;

  //historial
  public historial: any = [];
  //numero donde se almacena el index de historial
  indexHistorialBusqueda: number = 0;
  //mantiene el estado de mostrar la nomina
  validateSeleccionHistorial: boolean = false;
  //se almacena las modificaciones hechas en la seleccion de una fecha
  private asistenciaProfesorAnterior: any[] = [];

  //control sobre el boton guardar
  validateGuardarInformacion: boolean = false;
  //busqueda
  seleccionBusqueda: any = 'Historial';

  //ejecucion
  contEjecucion: number = 0;




  //manejor de tablas 
  @ViewChild(MatTable) tabla1: MatTable<Nomina>;


  public idNomina: any;
  public idMateria: any;

  //dato que almacenara el id de la materia
  public dataId: any = '';

  //CODIGO NUEVO TABLA
  displayedColumns: string[] = ['fila', 'codigoUnico', 'image', 'nombre', 'presente', 'atraso', 'falta'];
  dataSource: any;


  //manejar las suscripciones
  private suscripcion1: Subscription;
  //manejo de codigo qr
  public codigoQr = '';
  //datos del tiempo
  nombre: any;
  fechaActual: any;
  nombreDay: any;
  hora: any;

  //variable para el numero randomico de 6 cifraas
  codigoDeSeguridad;

  //variable para el qr
  idQr: any;
  NombreMateria: any = '';




  constructor(
    private authService: AuthService,
    public router: Router,
    private _route: ActivatedRoute,
    public ventana: MatDialog
  ) { }

  permitirSalirDeRuta(): boolean | import('rxjs').Observable<boolean> | Promise<boolean> {
    if (this.asistenciaProfesorAnterior.length != 0 || this.asistenciaProfesor.length != 0) {
      const confirmacion = window.confirm('Antes de salir debe guardar la asistencia');
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.dataId = this._route.snapshot.paramMap.get('data');
    console.log(this.dataId)
    let splitted = this.dataId.split("//");
    this.idNomina = splitted[0];
    this.idMateria = splitted[1];
    this.NombreMateria = splitted[2];
    // Función para obtener nómina
    this.obtenerNomina(this.idMateria, this.idNomina);
    // Función moment
    let f = moment();
    // Fecha actual en string
    this.fechaActual = f.format('DD-MM-YYYY');
    // Función day
    var day = moment(f).day();
    // Obtiene el nombre de día del sistema
    this.nombreDay = moment.weekdays(day).charAt(0).toUpperCase() + moment.weekdays(day).slice(1)
    // Obtiene la hora del sistema
    this.hora = moment().format('HH:mm:ss');
    // Generar código randomico
    this.generaNss();
    console.log('randomico', this.codigo_randomico)
  }

  ngOnDestroy() {
    if (this.suscripcion1) {
      this.suscripcion1.unsubscribe();
    }
  }

  public obtenerNomina(idMateria: any, idNomina: any) {
    this.suscripcion1 = this.authService.getDataNominaCursoId(idMateria, idNomina).subscribe((data: any) => {
      this.nominaEstudiantes.length = 0;
      this.nominaVista.length = 0;

      if (this.historial) {
        this.historial.length = 0;
      }

      this.arrayTemp.length = 0;

      if (data.payload.data()) {
        let dataNomina: any = data.payload.data();
        //obtencion de la informacion acerca de la materia
        this.idQr = dataNomina.uidProfesor + '//' + dataNomina.uidMateria + '//' + dataNomina.uidCurso + '//' + data.payload.id + '//' + this.codigo_randomico;
        this.EncriptarData(this.idQr);
        //control del estado actual de la lista
        this.estado = dataNomina.estado;
        this.numeroAlmacenado = parseInt(dataNomina.numeroAlmacenado);
        this.historial = dataNomina.historial;
        
        if(this.numeroAlmacenado >=1){
          this.validateReporte=false;
        }

        console.log('este es el codigo QR', dataNomina.code)
        //contienen la informacion que se encuentra en el server
        this.nominaEstudiantes = dataNomina.nomina.map(element => { return element });

        this.arrayTemp = JSON.parse(JSON.stringify(this.nominaEstudiantes));

        this.nominaVista = this.arrayTemp.map(element => {
          element['presente'] = false;
          element['atraso'] = false;
          element['falta'] = false;
          return element;
        });


        //this.nominaEstudiantes=this.nominaVista.slice();
        this.dataSource = new MatTableDataSource(this.nominaVista);

        if (this.contEjecucion === 0) {
          this.validate = true;
          this.contEjecucion = this.contEjecucion + 1;
        }

        //no se efectuen actualizaciones mientras se revisa informacion
        if (this.validateSeleccionHistorial) {
          //this.validate = true;
          this.replaceVistaFalse();
        } else {
          console.log(this.nominaEstudiantes);
          //this.validate = true;
          this.replaceVista();
        }
      }
    })
  }

  //verifica si ya existe un avlor en la vista
  replaceVista() {
    //la nomina del profesor es la principal
    if (this.asistenciaProfesor.length != 0) {
      this.nominaVista.forEach((dataMateria, index) => {
        console.log(dataMateria);
        let ultimoId = dataMateria.asistencia.length - 1;

        if (ultimoId === -1) {
          dataMateria.presente = false;
          dataMateria.atraso = false;
          dataMateria.falta = false;
          dataMateria.estado = true;
        } else if (dataMateria.asistencia[ultimoId].estado === false) {
          dataMateria.presente = false;
          dataMateria.atraso = false;
          dataMateria.falta = false;
          dataMateria.estado = true;
        } else {
          dataMateria.presente = dataMateria.asistencia[ultimoId].presente;
          dataMateria.atraso = dataMateria.asistencia[ultimoId].atraso;
          dataMateria.falta = dataMateria.asistencia[ultimoId].falta;
          dataMateria.estado = true;
        }
      });
      //recorre array asistencia dada por el profesor
      this.asistenciaProfesor.forEach((asistencia) => {
        //recorre la asistencia de los estudiante en tiempo real
        this.nominaVista.forEach((dataMateria, index) => {
          if (asistencia.correo != dataMateria.correo) {
          } else {
            dataMateria.presente = asistencia.presente;
            dataMateria.atraso = asistencia.atraso;
            dataMateria.falta = asistencia.falta;
            dataMateria.estado = true;
          }
        })
      })
    } else {
      this.nominaVista.forEach((dataMateria, index) => {
        console.log(dataMateria);
        let ultimoId = dataMateria.asistencia.length - 1;

        if (ultimoId === -1) {
          dataMateria.presente = false;
          dataMateria.atraso = false;
          dataMateria.falta = false;
          dataMateria.estado = true;
        } else if (dataMateria.asistencia[ultimoId].estado === false) {
          dataMateria.presente = false;
          dataMateria.atraso = false;
          dataMateria.falta = false;
          dataMateria.estado = true;
        } else {
          dataMateria.presente = dataMateria.asistencia[ultimoId].presente;
          dataMateria.atraso = dataMateria.asistencia[ultimoId].atraso;
          dataMateria.falta = dataMateria.asistencia[ultimoId].falta;
          dataMateria.estado = true;
        }
      });
    }
  }

  replaceVistaTrue() {
    //verifica si la asistencia anterior el profesor no guardo nada 
    if (this.asistenciaProfesorAnterior.length != 0) {
      //solicita la confirmacion para borrar los datos
      this.openModalConfirmacion();
    } else {
      //caso contrario mantiene el boton almacenamiento activo
      this.validateSeleccionHistorial = false;
      //la seleccion de busqueda se cambia a historial
      this.seleccionBusqueda = 'Historial';
      //se realiza el replace vista actual
      this.replaceVista();
      this.validateGuardarInformacion = false;
    }
  }

  replaceVistaFalse() {
    this.nominaVista.forEach((dataMateria) => {
      dataMateria.presente = dataMateria.asistencia[this.indexHistorialBusqueda].presente;
      dataMateria.atraso = dataMateria.asistencia[this.indexHistorialBusqueda].atraso;
      dataMateria.falta = dataMateria.asistencia[this.indexHistorialBusqueda].falta;
    });
  }


  //funciones de agregar asistencia
  showOptionsPresente(event, dato: any, correo: any) {
    this.nominaVista[dato].presente = true;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = false;
    try {
      let presente = true;
      let atraso = false;
      let falta = false;
      if (this.validateSeleccionHistorial) {
        this.almacenarNominaHistorial(presente, atraso, falta, correo);
      } else {
        this.almacenarNomina(presente, atraso, falta, correo);
      }

      //dato es el index del array
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsAtraso(event, dato: any, correo: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = true;
    this.nominaVista[dato].falta = false;

    try {
      let presente = false;
      let atraso = true;
      let falta = false;
      if (this.validateSeleccionHistorial) {
        this.almacenarNominaHistorial(presente, atraso, falta, correo);
      } else {
        this.almacenarNomina(presente, atraso, falta, correo);
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  showOptionsFalta(event, dato: any, correo: any) {
    this.nominaVista[dato].presente = false;
    this.nominaVista[dato].atraso = false;
    this.nominaVista[dato].falta = true;
    try {
      let presente = false;
      let atraso = false;
      let falta = true;
      if (this.validateSeleccionHistorial) {
        this.almacenarNominaHistorial(presente, atraso, falta, correo);
      } else {
        this.almacenarNomina(presente, atraso, falta, correo);
      }
    } catch (error) {
      this.authService.showError(error);
    }
  }

  almacenarNomina(presente: any, atraso: any, falta: any, correo: any) {
    let validate = false;
    if (this.asistenciaProfesor.length != 0) {
      this.asistenciaProfesor.forEach(element => {
        if (element.correo != correo) {
        } else {
          validate = true;
          element.presente = presente,
            element.atraso = atraso,
            element.falta = falta
        }
      });

      if (validate) {
      } else {
        this.asistenciaProfesor.push({
          correo: correo,
          presente: presente,
          atraso: atraso,
          falta: falta
        })
      }
    } else {
      this.asistenciaProfesor.push({
        correo: correo,
        presente: presente,
        atraso: atraso,
        falta: falta
      })
    }
    console.log(this.asistenciaProfesor);
  }


  almacenarNominaHistorial(presente: any, atraso: any, falta: any, correo: any) {
    let validate = false;
    this.validateGuardarInformacion = false;
    if (this.asistenciaProfesorAnterior.length != 0) {
      this.asistenciaProfesorAnterior.forEach(element => {
        if (element.correo != correo) {
        } else {
          validate = true;
          element.presente = presente,
            element.atraso = atraso,
            element.falta = falta
        }
      });

      if (validate) {
      } else {
        this.asistenciaProfesorAnterior.push({
          correo: correo,
          presente: presente,
          atraso: atraso,
          falta: falta
        })
      }
    } else {
      this.asistenciaProfesorAnterior.push({
        correo: correo,
        presente: presente,
        atraso: atraso,
        falta: falta
      })
    }
    console.log(this.asistenciaProfesorAnterior);
  }


  //funciones principales
  //realiza la actualizacion de la nomina
  almacenarNominaFinalizado() {
    this.validate = false;
    //la suscripcion se detiene para no causar daños al almacenamiento
    if (this.suscripcion1) {
      console.log('se ejecuta la unsuscribe')
      this.suscripcion1.unsubscribe();
    }

    //valida si esta activo la seleccion de una asistencia anterio y comprueba si se ha realizado alguna configuracion en esta
    if (this.validateSeleccionHistorial && this.asistenciaProfesorAnterior.length != 0) {
      console.log('se guarda inforamcion de fecha anterior');
      //se ejecuta el almacenamiento de la informacion anterior
      //this.validateGuardarInformacion=true;
      this.guardarFechasAnteriores();

    } else if (this.validateSeleccionHistorial === false) {
      //console.log('se guarda la informacion de presente');
      this.guardarPresente();

    } else {
      this.authService.showInfo('Usted no ha realizado ningun cambio');
      //console.log('no hay que guardar');
    }
  }

  guardarFechasAnteriores() {
    this.asistenciaProfesorAnterior.forEach(asistenciaProfesor => {
      this.nominaEstudiantes.forEach(element => {
        if (asistenciaProfesor.correo != element.correo) {
        } else {
          element.asistencia[this.indexHistorialBusqueda].presente = asistenciaProfesor.presente;
          element.asistencia[this.indexHistorialBusqueda].atraso = asistenciaProfesor.atraso;
          element.asistencia[this.indexHistorialBusqueda].falta = asistenciaProfesor.falta;
        }
      })
    })
    console.log(this.nominaEstudiantes);
    this.almacenamientoDeAsistenciaAnterior();
  }

  async almacenamientoDeAsistenciaAnterior() {
    //solo se guarda la nomina no se realiza ningun cambio

    let data = await this.authService.updateNominaAnterior(this.idNomina, this.idMateria, this.nominaEstudiantes);
    //aqui se envia el desactivamiento del cdigo
    if (data == 10) {
      this.limpiarAnterior();
      this.obtenerNomina(this.idMateria, this.idNomina);
      this.validate = true;
    }
  }

  limpiarAnterior() {
    console.log(this.asistenciaProfesor);
    this.asistenciaProfesorAnterior.length = 0;
    this.validateGuardarInformacion = true;
    console.log(this.asistenciaProfesor);
  }




  guardarPresente() {
    //si se genero un codigo qr este tomara el valor almacenado en la base
    console.log(this.historial)
    if (this.historial.length > (this.numeroAlmacenado)) {

      let index = this.numeroAlmacenado;
      let splitted = this.historial[index].split("//");
      this.nombreDay = splitted[0];
      this.fechaActual = splitted[1];

      //console.log(this.historial[index], this.nombreDay,this.fechaActual);

    } else if (this.historial.length === this.numeroAlmacenado) {
      //si son iguales quiere decir que no se ha utilizado un qr por tanto se toara el valor actual que tengas el profesor
      //console.log('son iguales quiere decir que no se generado ningun qr');
      this.historial.push(this.nombreDay + '//' + this.fechaActual);
    }

    //console.log(this.historial)

    if (this.asistenciaProfesor.length != 0) {
      this.nominaEstudiantes.forEach((element) => {
        if (element.asistencia[this.numeroAlmacenado]) {
          element.asistencia[this.numeroAlmacenado].estado = false
        } else {
          element.asistencia.push({
            atraso: false,
            dia: this.nombreDay,
            estado: false,
            falta: true,
            fecha: this.fechaActual,
            presente: false
          })
        }
      })

      this.asistenciaProfesor.forEach(asistenciaProfesor => {
        this.nominaEstudiantes.forEach(element => {
          if (asistenciaProfesor.correo != element.correo) {
          } else {
            element.asistencia[this.numeroAlmacenado].presente = asistenciaProfesor.presente;
            element.asistencia[this.numeroAlmacenado].atraso = asistenciaProfesor.atraso;
            element.asistencia[this.numeroAlmacenado].falta = asistenciaProfesor.falta;
          }
        })
      })
    } else {
      //se procede a revisar a los estudiantes registrados por qr si no los estan se pondra falta
      this.nominaEstudiantes.forEach((element) => {
        if (element.asistencia[this.numeroAlmacenado]) {
          element.asistencia[this.numeroAlmacenado].estado = false
        } else {
          element.asistencia.push({
            atraso: false,
            dia: this.nombreDay,
            estado: false,
            falta: true,
            fecha: this.fechaActual,
            presente: false
          })
        }
      })
      //console.log('no existen se procede a guardar la base con falta a los restantes', this.asistenciaProfesor);
    }
    //una ves termine se ejecuta la limpieza y almacenamiento y luego dejar como se encontraba
    //console.log(this.nominaEstudiantes);
    this.almacenamientoDeAsistencia();
  }

  async almacenamientoDeAsistencia() {
    this.numeroAlmacenado = this.numeroAlmacenado + 1;
    let nuevoNumeroAlmacenado = String(this.numeroAlmacenado);
    console.log(nuevoNumeroAlmacenado, this.historial);
    let data = await this.authService.updateNomina(this.idNomina, this.idMateria, this.nominaEstudiantes, 'presente', '0', nuevoNumeroAlmacenado, this.historial);//aqui se envia el desactivamiento del cdigo
    if (data == 10) {
      this.Limpiar();
      this.obtenerNomina(this.idMateria, this.idNomina);
      this.validate = true;
    }
  }

  Limpiar() {
    this.asistenciaProfesor.length = 0;
  }

  //cmbia el estado directamente en la base de datos
  changeState() {
    if (this.estado === 'presente') {
      this.estado = 'atraso';
      this.authService.updateNominaEstado(this.idNomina, this.idMateria, 'atraso');
    } else {
      this.authService.updateNominaEstado(this.idNomina, this.idMateria, 'presente');
    }
  }

  //generar codigo qr

  QR() {
    let nuevoHistorial: any;
    nuevoHistorial = JSON.parse(JSON.stringify(this.historial));

    if (this.numeroAlmacenado === this.historial.length) {
      nuevoHistorial.push(this.nombreDay + '//' + this.fechaActual);
    }

    this.codigoDeSeguridad = this.codigo_randomico;
    this.authService.updateNominaEstadoQR(this.idNomina, this.idMateria, this.codigoDeSeguridad, nuevoHistorial);
    //this.obtenerNomina(this.idMateria, this.idNomina);
    this.generaNss();
  }


  //funciones secundarias
  generaNss() {
    this.codigo_randomico = '';
    const characters = 'Dn_S+?Y@hmqy48';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      this.codigo_randomico += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }

  //encriptar cadena Qr
  EncriptarData(valor: any) {
    // variable que almacena los datos a encriptar --- poner los datos a enviar
    var cadena = valor;
    // variable que se usa como clave para encriptar
    var informacion = '2sllmtu2=uTZq@%%jl9w';
    // encriptar data
    this.codigoQr = CryptoJS.AES.encrypt(cadena.trim(), informacion.trim()).toString();
  }



  openModalConfirmacion() {
    //este modal confirmacion se utiliza para confirmar para volver al estado actual de la lista
    this.openMaterial2(NotificacionSalirComponent, 'historial');
  }

  openModalConfirmacionHistorialNuevo() {
    //se solicita la confirmacion del usuario antes de ejecutar una nueva busqueda
    this.openMaterial2(NotificacionSalirComponent, 'HistorialNuevo');
  }

  openVistaAnterior() {
    //verifica si la asistencia anterior existe
    if (this.asistenciaProfesorAnterior.length != 0) {
      //si existe informacion este solicita al usuario confirmacion de salir de la vista
      this.openModalConfirmacionHistorialNuevo();
    } else {
      //el caso contrario es que si el numero almacenado en el servidor existe por lo menos un registro 
      if (this.numeroAlmacenado > 0) {
        //envia informacion al open modal que esta conpuesto por el historial,
        //y el numero d eveces almaenado que me muestre solo el numero de veces que se almaceno
        let data = {
          historial: this.historial,
          numeroAlmacenamiento: this.numeroAlmacenado
        }
        // la informacion se envia al modal
        this.openMaterial1(AsistenciaAnteriorComponent, data);
      } else {
        //este es un mensaje donde indica al usuario que no existe registro
        this.authService.showInfo('Usted no tiene registros de asistencia');
      }
    }

  }

  openMaterial1(component: any, info: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: info }).afterClosed().subscribe(item => {

        if (item) {
          //primero se acoge la variable que me permite verificar si se hizo la seleccion de una fecha del historial
          if (item.busqueda) {
            //si existe se procede a guardar el index de la fecha seleccionada
            this.indexHistorialBusqueda = item.index;
            //se valida que se desactive el boton guardado
            this.validateSeleccionHistorial = true;
            //se cambia el nombre del boton Historial por la fecha seleccionada
            this.seleccionBusqueda = item.fecha;
            //se ejecuta la limpieza y se muestra el regisro de la fecha seleccionada
            this.replaceVistaFalse();
            //se desactiva el boton almacenamiento
            this.validateGuardarInformacion = true;
          } else {
            //si no hizo una seleccion se procede a realizar el caso contrario
            //si la seleccion busqueda ha cambiado de estado Historial a una fecha
            if (this.seleccionBusqueda != 'Historial') {
              //primero se desactiva el boton de almacenamiento
              this.validateGuardarInformacion = true;
              //se procede a llenar la lista con la infroamcion del registro seleccionado anteriormente si lo hay
              this.replaceVistaFalse();
            } else {
              this.validateGuardarInformacion = false;
            }
          }
        }


      });
  }

  openMaterial2(component: any, data: any) {
    this.ventana.open(component,
      { width: ' 25rem', data: '' }).afterClosed().subscribe(item => {
        if (item) {
          if (data === 'historial') {
            //se verifica si el profesor quiere regresar a la lista normal
            if (item) {
              //si el item es true el boton refresh se quita de la vista 
              this.validateSeleccionHistorial = false;
              //se realia la limpieza de la asistencia anterior
              this.limpiezaAsistencia();
              //this.asistenciaProfesorAnterior.length = 0;
              this.replaceVista();
              //se cambia la letras
              this.seleccionBusqueda = 'Historial';
            }

            //si existela variable HistorialNuevo seteado en la funcion
          }

          if (data === 'HistorialNuevo') {
            //primero verfica si se autorizo el cambio obteniendo el true o false 
            if (item) {
              //si es true se procede a la limpieza del array profesor anterior
              this.limpiezaAsistencia()
              //se procede a la seleccion de una nueva fecha
              this.openVistaAnterior();
            }
          }

          console.log('retorna modal seleccion', item);
        }

      });
  }

  limpiezaAsistencia() {
    //primero se limpia el array del profesor que se haya almacenado
    this.asistenciaProfesorAnterior.length = 0;
    //se desactiva el boton almacenamieto ya que no hay datos que almacenar
    this.validateGuardarInformacion = false;
  }

  //navegacion
  onReportes() {
    this.router.navigate(['reportes', this.dataId])
  }
  //funciones buscador
  limpiarBusqueda(input) {
    input.value = '';
    this.dataSource.filter = null;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPhoto(image: any) {
    if (image != '') {
      this.ventana.open(VerImageCursoComponent,
        { width: ' 25rem', data: image }).afterClosed().subscribe(item => {
        });
    } else {
      this.authService.showInfo('El estudiante no dispone de una imagen de perfil');
    }
  }


}
