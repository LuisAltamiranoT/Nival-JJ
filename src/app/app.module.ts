import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgFallimgModule } from 'ng-fallimg';
import { CommonModule } from '@angular/common';

// Código QR
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FormsModule } from '@angular/forms';

// Material 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatCardModule } from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';

// Librerías usadas para barra de navegación
import { MatSidenavModule  } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GuardGuard } from './services/guard.guard';
import { InfoComponent } from './admin/perfil/info/info.component';
import { NombreComponent } from './admin/perfil/nombre/nombre.component';
import { ApellidoComponent } from './admin/perfil/apellido/apellido.component';
import { PasswordComponent } from './admin/perfil/password/password.component';
import { DeleteComponent } from './admin/perfil/delete/delete.component';
import { MateriaComponent } from './admin/perfil/materia/materia.component';
import { CursoGroupComponent } from './admin/curso-group/curso-group.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HorarioComponent } from './admin/horario/horario.component';
import { OficinaComponent } from './admin/perfil/oficina/oficina.component';
import { EliminarDataComponent } from './admin/perfil/eliminar-data/eliminar-data.component';
import { EditarMateriaComponent } from './admin/perfil/editar-materia/editar-materia.component';
import { EditarAnioComponent } from './admin/perfil/editar-anio/editar-anio.component';
import { FotoComponent } from './admin/perfil/foto/foto.component';
import { AddCursoComponent } from './admin/add-curso/add-curso.component';
import { VistaHorarioComponent } from './admin/add-curso/vista-horario/vista-horario.component';
import { VistaCursoComponent } from './admin/vista-curso/vista-curso.component';
import { CodigoQRComponent } from './admin/codigo-qr/codigo-qr.component';
import { EditCursoComponent } from './admin/edit-curso/edit-curso.component';
import { ViewImageComponent } from './admin/curso-group/view-image/view-image.component';
import { EditAulaComponent } from './admin/edit-curso/edit-aula/edit-aula.component';
import { EditEstudianteComponent } from './admin/edit-curso/edit-estudiante/edit-estudiante.component';
import { EditImageComponent } from './admin/edit-curso/edit-image/edit-image.component';
import { AddEstudianteComponent } from './admin/edit-curso/add-estudiante/add-estudiante.component';
import { EditHorarioComponent } from './admin/edit-curso/edit-horario/edit-horario.component';
import { DeleteEstudianteComponent } from './admin/edit-curso/delete-estudiante/delete-estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SendEmailComponent,
    ForgotPasswordComponent,
    PerfilComponent,
    AdminHomeComponent,
    InfoComponent,
    NombreComponent,
    ApellidoComponent,
    PasswordComponent,
    DeleteComponent,
    MateriaComponent,
    CursoGroupComponent,
    FooterComponent,
    HorarioComponent,
    OficinaComponent,
    EliminarDataComponent,
    EditarMateriaComponent,
    EditarAnioComponent,
    FotoComponent,
    AddCursoComponent,
    VistaHorarioComponent,
    VistaCursoComponent,
    CodigoQRComponent,
    EditCursoComponent,
    ViewImageComponent,
    EditAulaComponent,
    EditEstudianteComponent,
    EditImageComponent,
    AddEstudianteComponent,
    EditHorarioComponent,
    DeleteEstudianteComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgFallimgModule.forRoot({
      default: 'assets/add.jpg'
    }),
    //material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    NgxQRCodeModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService,
    GuardGuard,
    {
      provide: BUCKET,
      useValue: 'gs://easyacnival.appspot.com'
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatMenuModule
  ],
})
export class AppModule { }
