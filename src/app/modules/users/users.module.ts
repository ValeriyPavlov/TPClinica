import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { SpecialistPipe } from 'src/app/pipes/specialist.pipe';
import { KeysToSpanishPipe } from 'src/app/pipes/keys-to-spanish.pipe';
import { SpecialityPipe } from 'src/app/pipes/speciality.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    SpecialistPipe,
    KeysToSpanishPipe,
    SpecialityPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RegisterModule,
    NgxSpinnerModule
  ]
})
export class UsersModule { }
