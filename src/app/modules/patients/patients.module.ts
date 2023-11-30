import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { HistoryModule } from 'src/app/components/history/history.module';


@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedPipesModule,
    HistoryModule
  ]
})
export class PatientsModule { }
