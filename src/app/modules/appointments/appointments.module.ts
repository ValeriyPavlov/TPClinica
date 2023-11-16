import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { RequestAppointmentComponent } from './request-appointment/request-appointment.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';


@NgModule({
  declarations: [
    AppointmentsComponent,
    RequestAppointmentComponent,
    ViewAppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    SharedPipesModule
  ]
})
export class AppointmentsModule { }
