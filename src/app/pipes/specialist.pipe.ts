import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../entities/Specialist';

@Pipe({
  name: 'specialist'
})
export class SpecialistPipe implements PipeTransform {

  transform(value: unknown): Especialista {
    const specialist = value as Especialista;
    return specialist;
  }

}
