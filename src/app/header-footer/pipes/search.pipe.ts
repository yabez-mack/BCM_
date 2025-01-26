import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if(!value || !args){
      return value;
    }
    args = args.toLowerCase();
    // debugger;
    return (value || value==='0')? value.filter((e:any)=>{
      return JSON.stringify(e).toLowerCase().includes(args);
    }):value;
  }

}
