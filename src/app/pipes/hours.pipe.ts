import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(parseFloat(value) % 1 == 0)
    {
      return `${value}:00`;
    }
    else
    {
      return `${Math.floor(value)}:30`;
    }
  }

}
