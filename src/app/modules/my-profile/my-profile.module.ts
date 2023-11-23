import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryModule } from 'src/app/components/history/history.module';





@NgModule({
  declarations: [
    MyProfileComponent,
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyProfileRoutingModule,
    SharedPipesModule,
    HistoryModule
  ],

})
export class MyProfileModule { }
