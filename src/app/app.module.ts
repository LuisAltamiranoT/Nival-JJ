import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgFallimgModule } from 'ng-fallimg';

//material 
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
import { AuthService } from './auth/services/auth.service';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GuardGuard } from './auth/guard.guard';
import { InfoComponent } from './admin/perfil/info/info.component';
import { NombreComponent } from './admin/perfil/nombre/nombre.component';
import { ApellidoComponent } from './admin/perfil/apellido/apellido.component';
import { PasswordComponent } from './admin/perfil/password/password.component';
import { DeleteComponent } from './admin/perfil/delete/delete.component';
import { CursoComponent } from './admin/curso/curso.component';
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
    CursoComponent,
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
    VistaCursoComponent
  ],
  imports: [
    BrowserModule,
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
    MatCheckboxModule
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
  ]
})
export class AppModule { }
