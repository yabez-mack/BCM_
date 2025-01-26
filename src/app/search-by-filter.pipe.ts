import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByFilter'
})
export class SearchByFilterPipe implements PipeTransform {

  transform(value: any, args1: any, args2: any): any {
    return (value || value=='0')?value.filter((sal:any)=>{
      return null;
    }): value;
  }

}
