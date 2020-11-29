import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { PerfilComponent } from './admin/perfil/perfil.component';
import { PasswordForgotComponent } from 'src/app/auth/password-forgot/password-forgot.component';

import { GuardGuard } from './services/guard.guard';
import { CursoGroupComponent } from './admin/curso-group/curso-group.component';
import { HorarioComponent } from './admin/horario/horario.component';
import { AddCursoComponent } from './admin/add-curso/add-curso.component';
import { VistaCursoComponent } from './admin/vista-curso/vista-curso.component';
import { CodigoQRComponent } from './admin/codigo-qr/codigo-qr.component';
import { EditCursoComponent } from './admin/edit-curso/edit-curso.component';
import { VistaReportesComponent } from './admin/reporteria/vista-reportes/vista-reportes.component';
import { ReporteIndividualComponent } from './admin/reporteria/reporte-individual/reporte-individual.component';

const routes: Routes = [
  {
    path:' ',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'verification-email',
    component: SendEmailComponent
  },
  {
    path: 'password-forgot',
    component: PasswordForgotComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'curso',
    component: AddCursoComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'curso-group',
    component: CursoGroupComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'vista-curso/:data',
    component: VistaCursoComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'horario',
    component: HorarioComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'codigo/:data',
    component: CodigoQRComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'edit-curso/:data',
    component: EditCursoComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'reportes/:data',
    component: VistaReportesComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'reporte-individual/:data/:dataE/:dataI/:dataF',
    component: ReporteIndividualComponent,
    canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
