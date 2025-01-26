import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subjectChapterSearch'
})
export class SubjectChapterSearchPipe implements PipeTransform {

  transform(value: any, args0: any, args1: any) : any{
    if(args1 === '' || args0 === ''){
      return value;
    }

    function isBigEnough(sal: any) {
      return (sal.master_class_id == parseInt(args0) || sal.master_class_subject_id == parseInt(args1));
    }

    return value.filter(isBigEnough);
  }

}
