import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { loggedGuard } from './guards/logged.guard';
import { anyUserGuard } from './guards/any-user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', loadChildren: () =>import('./modules/welcome/welcome.module').then((m) => m.WelcomeModule) },
  { path: 'ingresar', loadChildren: () =>import('./modules/login/login.module').then((m) => m.LoginModule), canActivate: [loggedGuard] },
  { path: 'registrarse', loadChildren: () =>import('./modules/register/register.module').then((m) => m.RegisterModule), canActivate: [loggedGuard] },
  { path: 'usuarios', loadChildren: () =>import('./modules/users/users.module').then((m) => m.UsersModule), canActivate: [adminGuard] },
  { path: 'perfil', loadChildren: () =>import('./modules/my-profile/my-profile.module').then((m) => m.MyProfileModule), canActivate: [anyUserGuard] }, 
  { path: 'turnos', loadChildren: () =>import('./modules/appointments/appointments.module').then((m) => m.AppointmentsModule)}, //canActivate: [anyUserGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
