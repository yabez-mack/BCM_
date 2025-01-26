import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'time'})
export class TimeFormat implements PipeTransform {
     transform(time: any,hour?:any): any {
      //  let test1=new RegExp('^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$')
       let test1=/^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/
   if(hour!='hour'){

     if(test1.test(time)&&time!=0){
       let hour = (time.split(':'))[0]
       let min = (time.split(':'))[1]
       let part = hour > 12 ? 'pm' : 'am';
       if(parseInt(hour) == 0)
        hour = 12;
       min = (min+'').length == 1 ? `0${min}` : min;
       hour = hour > 12 ? hour - 12 : hour;
       hour = (hour+'').length == 1 ? `0${hour}` : hour;
       return `${hour}:${min} ${part}`
     }
     else{
       return time
     }
   }
   else{
    if(test1.test(time)&&time!=0){
      let hour = (time.split(':'))[0]
      let min = (time.split(':'))[1]
     
      if(parseInt(hour) == 0)
       hour = 12;
      min = (min+'').length == 1 ? `0${min}` : min;
      hour = hour > 12 ? hour - 12 : hour;
      hour = (hour+'').length == 1 ? `0${hour}` : hour;
      return `${hour}:${min} Hrs`
    }
    else{
      return time
    }
   }
       }
   }