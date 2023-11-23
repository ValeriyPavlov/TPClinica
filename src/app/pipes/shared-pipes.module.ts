import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleansPipe } from './booleans.pipe';
import { KeysToSpanishPipe } from './keys-to-spanish.pipe';
import { SpecialistPipe } from './specialist.pipe';
import { SpecialityPipe } from './speciality.pipe';
import { HoursPipe } from './hours.pipe';
import { DatesPipe } from './dates.pipe';



@NgModule({
  declarations: [
    BooleansPipe,
    KeysToSpanishPipe,
    SpecialistPipe,
    SpecialityPipe,
    HoursPipe,
    DatesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BooleansPipe,
    KeysToSpanishPipe,
    SpecialistPipe,
    SpecialityPipe,
    HoursPipe,
    DatesPipe
  ]
})
export class SharedPipesModule { }
