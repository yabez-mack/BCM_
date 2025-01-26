import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class ToStringPipe implements PipeTransform {

  transform(input: any): string{ //string type
    return String(input) ;
 } }

