import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { PerfilComponent } from './admin/perfil/perfil.component';

import { GuardGuard } from './services/guard.guard';
import { CursoGroupComponent } from './admin/curso-group/curso-group.component';
import { HorarioComponent } from './admin/horario/horario.component';
import { AddCursoComponent } from './admin/add-curso/add-curso.component';
import { VistaCursoComponent } from './admin/vista-curso/vista-curso.component';
import { CodigoQRComponent } from './admin/codigo-qr/codigo-qr.component';
import { EditCursoComponent } from './admin/edit-curso/edit-curso.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'forgot-password',
    component: ForgotPasswordComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
