import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(value == undefined)
    {
      return value;
    }
    else
    {
      let day = value.substring(0, 2);
      let month = value.substring(3, 5);
      return day + '-' + month;
    }
  }
}
