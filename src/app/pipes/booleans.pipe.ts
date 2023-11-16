import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleans'
})
export class BooleansPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === true)
    {
      return "Si";
    }
    else
    { 
      if(value === false)
      {
        return "No";
      }
      else
      {
        return value;
      }
    }
  }

}
