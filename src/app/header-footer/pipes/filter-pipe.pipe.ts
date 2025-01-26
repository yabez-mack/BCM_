import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, args1: any,args2:string): any {
    if(args1===''){
      return value;
    }

    return (value || value==='0') ? value.filter((ele:any)=>{
      return (ele[args2]==args1)
    }) : value;
  }

}
