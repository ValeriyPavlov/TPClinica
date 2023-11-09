import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { AdminComponent } from './form/admin/admin.component';
import { PatientComponent } from './form/patient/patient.component';
import { SpecialistComponent } from './form/specialist/specialist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    RegisterComponent,
    AdminComponent,
    PatientComponent,
    SpecialistComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderModule,
    NgxSpinnerModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
