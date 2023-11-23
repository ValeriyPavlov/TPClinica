import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { HistoryModule } from 'src/app/components/history/history.module';




@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RegisterModule,
    NgxSpinnerModule,
    SharedPipesModule,
    HistoryModule
  ],

})
export class UsersModule { }
