import {
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  collasped = false;
  screenWidth = 0;
  sideNavStatus: boolean = false;
  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.collasped = data.collapsed;
  }
  getBodyClass(): string {
    let styleClass = '';
    if (this.collasped && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collasped &&
      this.screenWidth < 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private service: CookieService,
    private cd: ChangeDetectorRef
  ) {
    this.myForm = this._fb.group({
      inputs: this._fb.array([]),
    });
    this.myForm2 = this._fb.group({
      inputs2: this._fb.array([]),
    });
    this.myForm3 = this._fb.group({
      inputs3: this._fb.array([]),
    });
    this.myForm4 = this._fb.group({
      inputs4: this._fb.array([]),
    });
    this.myForm5 = this._fb.group({
      inputs5: this._fb.array([]),
    });
    this.myForm6 = this._fb.group({
      inputs6: this._fb.array([]),
    });
  }
  student_column_form = this._fb.group({});
  group: any = {};
  myForm!: FormGroup;
  myForm2!: FormGroup;
  myForm3!: FormGroup;
  myForm4!: FormGroup;
  myForm5!: FormGroup;
  myForm6!: FormGroup;
  all_column: any[] = [];
  school_search_form = this._fb.group({
    school: [''],
  });
  school_search_form2 = this._fb.group({
    school: [''],
  });
  school_search_form3 = this._fb.group({
    school: [''],
  });
  school_search_form4 = this._fb.group({
    school: [''],
  });
  school_search_form5 = this._fb.group({
    school: [''],
  });
  school_search_form6 = this._fb.group({
    school: [''],
  });
  get inputs() {
    return this.myForm.get('inputs') as FormArray;
  }
  get inputs2() {
    return this.myForm2.get('inputs2') as FormArray;
  }
  get inputs3() {
    return this.myForm3.get('inputs3') as FormArray;
  }
  get inputs4() {
    return this.myForm4.get('inputs4') as FormArray;
  }
  get inputs5() {
    return this.myForm5.get('inputs5') as FormArray;
  }
  get inputs6() {
    return this.myForm6.get('inputs6') as FormArray;
  }
  get_student_column() {
    let body = {};
    this._auth.student_get_column(body).subscribe((res: any) => {
      this.all_column = res.getallColumnDetails;
      this.all_column.forEach((element: any) => {
        this.inputs.push(this._fb.control(element));
      });
      console.log(this.inputs);
    });
  }
  set_value_column(item: any, id: any, type: any) {
    if (type == 1) {
      this.inputs.controls[id].value.custom_title = item.target.value;
    }
    if (type == 2) {
      this.inputs.controls[id].value.category = item.target.value;
    }
    if (type == 3) {
      this.inputs.controls[id].value.field_type = item.target.value;
    }
    if (type == 4) {
      this.inputs.controls[id].value.column_status =
        item.target.checked == true ? 1 : 2;
    }
    if (type == 5) {
      this.inputs.controls[id].value.db_visibility =
        item.target.checked == true ? 1 : 2;
    }
    // console.log(this.inputs.value);
  }
  set_value_column2(item: any, id: any, type: any) {
    // if (type == 1) {
    //   this.inputs.controls[id].value.column_status = item.target.value;
    // }
   

    if (type == 1) {
      this.inputs2.controls[id].value.filter_type =
        item.target.checked == true ? 1 : 2;
    }
    // console.log(this.inputs.value);
  }
  set_value_column3(item: any, id: any, type: any) {
    // if (type == 1) {
    //   this.inputs.controls[id].value.column_status = item.target.value;
    // }
   
    if (type == 1) {
      this.inputs3.controls[id].value.ischecked =
        item.target.checked == true ? 1 : 2;
    }
    // console.log(this.inputs.value);
  }
  set_value_column4(item: any, id: any, type: any) {
    // if (type == 1) {
    //   this.inputs.controls[id].value.column_status = item.target.value;
    // }
    if (type == 2) {
      this.inputs4.controls[id].value.field_type = item.target.value;
    }

    if (type == 1) {
      this.inputs4.controls[id].value.filter_status =
        item.target.checked == true ? 1 : 2;
    }
    // console.log(this.inputs.value);
  }
  set_value_column5(item: any, id: any, type: any) {
      this.inputs5.controls[id].value.ischecked = item.target.checked;

  
  }
  set_value_column6(item: any, id: any, type: any) {
      this.inputs6.controls[id].value.ischecked = item.target.checked;

  
  }
  submit_student_filter() {
   
    let value = this.inputs2.value;
    // value = value.filter((a: any) => a.column_status == 1);
    let body = {
      school_id: this.school_id2,
      column_detail: value,
    };

    console.log(body)
    this._auth.student_submit_filters(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Custom Filters Updated Successfully',
          icon: 'success',
        });
        this.school_id2 == '';
        this.myForm2 = this._fb.group({
          inputs2: this._fb.array([]),
        });
        this.school_search_form2.patchValue({ school: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_student_filter_label() {
    let value = this.inputs3.value;
    // value = value.filter((a: any) => a.ischecked == 1);
    let values:any[]=[]
    value.forEach((element:any) => {
      if(element.ischecked==1){
        values.push({id:element.id})

      }
    });
    let body = {
      school_id: this.school_id3,
      label_detail: values,
    };
    console.log(body);

    this._auth.student_submit_labels(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Custom Filters Updated Successfully',
          icon: 'success',
        });
        this.school_id3 == '';
        this.myForm3 = this._fb.group({
          inputs3: this._fb.array([]),
        });
        this.school_search_form3.patchValue({ school: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_student_filter_table() {
    let value = this.inputs4.value;
    value = value.filter((a: any) => a.filter_status == 1);
    let body = {
      type: 3,
      school_id: this.school_id4,
      FilterData: value,
    };
    console.log(body);

    this._auth.student_submit_filters(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Custom Filters Updated Successfully',
          icon: 'success',
        });
        this.school_id4 == '';
        this.myForm4 = this._fb.group({
          inputs4: this._fb.array([]),
        });
        this.school_search_form4.patchValue({ school: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_student_report_filters() {
    let value = this.inputs6.value;
    console.log(this.inputs6.value)
    value = value.filter((a: any) => a.ischecked == true);
    let body = {
      report_id:this.report_id,
      school_id: this.school_id6,
      column_detail: value,
      type:"1"
    };
    console.log(body);

    this._auth.student_add_report_filters(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Student Report Updated Successfully',
          icon: 'success',
        });
        this.school_id6 == '';
        this.report_id == '';
        this.myForm6 = this._fb.group({
          inputs6: this._fb.array([]),
        });
        this.report_filter_data=[]
        this.report_data1=[]
        this.school_search_form6.patchValue({ school: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_student_report() {
    let value = this.inputs5.value;
    value = value.filter((a: any) => a.ischecked == true);
    let body = {
      school_id: this.school_id5,
      report_detail: value,
    };
    console.log(body);

    this._auth.student_submit_report(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Student Report Updated Successfully',
          icon: 'success',
        });
        this.school_id5 == '';
        this.myForm5 = this._fb.group({
          inputs5: this._fb.array([]),
        });
        this.report_data=[]
        this.school_search_form5.patchValue({ school: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_student_column() {
    let value = this.inputs.value;
    value = value.filter((a: any) => a.column_status == 1);
    let body = {
      school_id: this.school_id,
      column_detail: value,
    };

    for (let i = 0; i <= value.length - 1; i++) {
      if (value[i].custom_title == '') {
        document.getElementById('a' + value[i].id)!.focus();
        Swal.fire({ title: 'Please Enter ' + value[i].title, icon: 'info' });
        break;
      }
      if (value[i].category == '0' || value[i].category == '') {
        document.getElementById('b' + value[i].id)!.focus();
        Swal.fire({ title: 'Please Enter Category', icon: 'info' });
        break;
      }
      if (value[i].field_type == '') {
        document.getElementById('c' + value[i].id)!.focus();
        Swal.fire({ title: 'Please Enter Field Type', icon: 'info' });
        break;
      }

      if (i == value.length - 1) {
        this._auth.student_add_column(body).subscribe((res: any) => {
          if (res.status == 'success') {
            Swal.fire({
              title: 'Custom Column Inserted Successfully',
              icon: 'success',
            });
            this.school_id == '';
            this.all_column = [];
            this.myForm = this._fb.group({
              inputs: this._fb.array([]),
            });
            this.school_search_form.patchValue({ school: '' });
          } else {
            Swal.fire({ title: res.message, icon: 'error' });
          }
        });
      }
    }
  }
  type: any;
  schoolsList: any[] = [];
  schoolNamesFiltered: any;
  schools: any;
  school_id: any;
  keyword: any = 'school_name';
  get_schools() {
    this._auth.getSchools().subscribe((res) => {
      this.schools = res;
      this.schoolsList = this.schools.schools;
    });
  }
  school_id2: any;
  filters_list: any[] = [];
  label_list: any[] = [];
  table_list: any[] = [];
  selected_school2(item: any) {
    this.school_id2 = item.school_id;
    let body = { school_id: item.school_id };
    // let body = { school_id:'' };
    this.myForm2 = this._fb.group({
      inputs2: this._fb.array([]),
    });
    this._auth.student_get_column(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.getallColumnDetails) {
          let values = Object.values(res.getallColumnDetails);
          console.log(values)
          values.forEach((element: any) => {
            if(element.filter_type&&element.column_status==1){
              console.log(element)

              element.school_id = item.school_id;
              delete element.id;
            if (!element.created_by) {
              element.created_by = this.school_id2;
            }
           

            this.inputs2.push(this._fb.control(element));
           
          }
          });
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  selected_school3(item: any) {
    this.school_id3 = item.school_id;
    let body = { school_id: item.school_id };
    // let body = { school_id:'' };
    this.myForm3 = this._fb.group({
      inputs3: this._fb.array([]),
    });
    this._auth.student_get_labels(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.count>0) {

          let values = Object.values(res.getalllabelDetails);
          values.forEach((element: any) => { 
            if(element.student_filter_count_setting_id) {
              element.id=element.student_filter_count_setting_id
              element.ischecked=1
            }           

              
              this.inputs3.push(this._fb.control(element));
          });
          console.log(this.inputs3)
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  school_id4:any
  school_id3:any
  selected_school4(item: any) {
    this.school_id4 = item.school_id;
    let body = { school_id: item.school_id };
    // let body = { school_id:'' };
    this.myForm4 = this._fb.group({
      inputs4: this._fb.array([]),
    });
    this._auth.student_get_filters(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.getFilterDetails) {
          let values = Object.values(res.getFilterDetails);
          values.forEach((element: any) => {
            element.school_id = item.school_id;
            delete element.id;
            if (!element.created_by) {
              element.created_by = this.school_id4;
            }
            if (element.filter_status) {
            } else {
              if (element.field_type == 2) {
                element.filter_status = 1;
              } else {
                element.filter_status = 2;
              }
            }

            if (element.type == 3) {
            
              this.inputs4.push(this._fb.control(element));
            }
          });
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  school_id5:any
  report_data:any[]=[]
  selected_school5(item: any) {
    this.school_id5 = item.school_id;
    let body = { school_id: item.school_id };
    this.report_data = [];
    this.myForm5 = this._fb.group({
      inputs5: this._fb.array([]),
    });
    this._auth.student_get_reports(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if(res.count>0){
          this.report_data=Object.values(res.reportDetails)

          this.report_data.forEach(element => {
            if(element.student_report_id){
              element.ischecked=true
            }
            else{
              element.ischecked=false
            }
            this.inputs5.push(this._fb.control(element));
  
          });
        }
      }
    })
  }
  school_id6:any
  report_filter_data:any[]=[]
  report_data1:any[]=[]
  selected_school6(item: any) {
    this.school_id6 = item.school_id;
    this.report_id = '';
    let body = { school_id: item.school_id };
    this.report_filter_data = [];
    this.myForm6 = this._fb.group({
      inputs6: this._fb.array([]),
    });
    this._auth.student_get_reports(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if(res.count>0){
          this.report_data1=Object.values(res.reportDetails)

          
        }
      }
    })
  }
  report_id:any
  select_report_filters(item: any) {
    let body = { school_id: this.school_id6,report_id:item.target.value };
    this.report_id=item.target.value
    this.report_filter_data = [];
    this.myForm6 = this._fb.group({
      inputs6: this._fb.array([]),
    });
    this._auth.student_get_filter_dynamic(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if(res.count>0){
          this.report_filter_data=Object.values(res.getallColumnDetails)
          this.report_filter_data=this.report_filter_data.filter((a:any)=>a.type==1)
          this.report_filter_data.forEach(element => {
            if(element.student_report_id){
              element.ischecked=true
            }
            else{
              element.ischecked=false
            }
            this.inputs6.push(this._fb.control(element));
  
          });
        }
      }
    })
  }
  selected_school(item: any) {
    this.school_id = item.school_id;
    let body = { school_id: item.school_id };
    this.all_column = [];
    this.myForm = this._fb.group({
      inputs: this._fb.array([]),
    });
    this._auth.student_get_column(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.all_column = res.getallColumnDetails;
        this.all_column = Object.values(this.all_column);
        this.all_column.forEach((element: any) => {
          this.inputs.push(this._fb.control(element));

          if (element.column_status) {
          } else if (
            element.column_name == 'status' ||
            element.column_name == 'student_reg_id' ||
            element.column_name == 'first_name' ||
            element.column_name == 'dob' ||
            element.column_name == 'class_id' ||
            element.column_name == 'school_id' ||
            element.column_name == 'academic_year'
          ) {
            element.column_status = 1;
            element.db_visibility = 1;
          } else {
            element.column_status = 2;
            element.db_visibility = 2;
          }
          if (element.custom_title) {
          } else {
            element.custom_title = element.title;
          }
          if (element.column_id) {
            element.id = element.column_id;
          } else {
          }
          if (element.field_type) {
          } else {
            element.field_type = '';
          }
        });
      } else {
        this.all_column = [];
      }
    });
  }
  check_all_column2(item: any) {
    let i = 0;
    this.inputs2.value.forEach((element: any) => {
      this.inputs2.controls[i].value.filter_type =
        item.target.checked == true ? 1 : 2;      
      i++;
    });
  }
  check_all_column3(item: any) {
    let i = 0;
    this.inputs3.value.forEach((element: any) => {
       
        this.inputs3.controls[i].value.ischecked =
          item.target.checked == true ? 1 : 2;
      i++;
    });
  }
  check_all_column4(item: any) {
    let i = 0;
    this.inputs4.value.forEach((element: any) => {
      if (element.field_type == '2') {
        this.inputs4.controls[i].value.filter_status = 1;
      } else {
        this.inputs4.controls[i].value.filter_status =
          item.target.checked == true ? 1 : 2;
      }
      i++;
    });
  }
  check_all_column6(item: any) {
    let i = 0;
    this.inputs6.value.forEach((element: any) => {
     
        this.inputs6.controls[i].value.ischecked =
          item.target.checked 
      i++;
    });
  }
  check_all_column5(item: any) {
    let i = 0;
    this.inputs5.value.forEach((element: any) => {
     
        this.inputs5.controls[i].value.ischecked =
          item.target.checked 
      i++;
    });
  }
  check_all_column(item: any) {
    let i = 0;
    this.inputs.value.forEach((element: any) => {
      if (
        element.column_name == 'status' ||
        element.column_name == 'student_reg_id' ||
        element.column_name == 'first_name' ||
        element.column_name == 'dob' ||
        element.column_name == 'class_id' ||
        element.column_name == 'school_id' ||
        element.column_name == 'academic_year'
      ) {
        this.inputs.controls[i].value.column_status = 1;
      } else {
        this.inputs.controls[i].value.column_status =
          item.target.checked == true ? 1 : 2;
      }
      i++;
    });
  }
  ngOnInit(): void {
    this.get_schools();
    // this.get_student_column();
  }
}
