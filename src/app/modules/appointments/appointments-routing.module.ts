import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: AppointmentsComponent
  },
  {
    path: 'solicitar', component: RequestAppointmentComponent, canActivate: [authGuard]
  },
  {
    path: 'turnos', component: ViewAppointmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
