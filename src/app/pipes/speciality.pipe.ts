import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../entities/Speciality';

@Pipe({
  name: 'speciality'
})
export class SpecialityPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    const speciality = value as Especialidad;
    return speciality.description;
  }

}
