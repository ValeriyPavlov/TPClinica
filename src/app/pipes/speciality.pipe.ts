import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../entities/Speciality';

@Pipe({
  name: 'speciality'
})
export class SpecialityPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {
    const speciality = value as Especialidad;
    if(speciality.description)
    {
      return speciality.description;
    }
    else
    {
      return value;
    }
    
  }

}
