import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private service: CookieService,
    private datepipe: DatePipe,
    private router: Router
  ) {}
  dashboard_casrol_form = this._fb.group({
    title: [''],
    url: [''],
    detail: [''],
    type: ['1'],
    status: ['1'],
  });
  dashboard_program_form = this._fb.group({
    title: [''],
    url: [''],
    detail: [''],
    type: ['2'],
    status: ['1'],
  });
  user_form = this._fb.group({
    reg_id: [''],
    name: [''],
    adhar: [''],
    designation: [''],
    email: [''],
    education_qualification: [''],
    field_name: [''],
    date_of_birth: [''],
    address: [''],
    people_group: [''],
    language_known: [''],
    date_of_joining: [''],
    contact_no: [''],
    martial_status: [''],
    spouse_name: [''],
    date_of_marriage: [''],
    spouse_occupation: [''],
    father_name: [''],
    mother_name: [''],
    child_1: [''],
    child_2: [''],
    child_3: [''],
    child_4: [''],
    child_5: [''],
    spouse_image: [''],
    signature: [''],
    image: [''],
    comment: [''],
    family_image: [''],
    branch: [''],
    gender: [''],
    status: ['1'],
  });
  submit_user() {
    let body = {
      token: this.token,
     "reg_id":this.user_form.value.reg_id,
        "name":this.user_form.value.name,
        "adhar":this.user_form.value.adhar,
        "designation":this.user_form.value.designation,
        "email":this.user_form.value.email,
        "education_qualification":this.user_form.value.education_qualification,
        "field_name":this.user_form.value.field_name,
        "date_of_birth":this.user_form.value.date_of_birth,
        "address":this.user_form.value.address,
        "people_group":this.user_form.value.people_group,
        "language_known":this.user_form.value.language_known,
        "date_of_joining":this.user_form.value.date_of_joining,
        "contact_no":this.user_form.value.contact_no,
        "martial_status":this.user_form.value.martial_status,
        "spouse_name":this.user_form.value.spouse_name,
        "date_of_marriage":this.user_form.value.date_of_marriage,
        "spouse_occupation":this.user_form.value.spouse_occupation,
        "father_name":this.user_form.value.father_name,
        "mother_name":this.user_form.value.mother_name,
        "child_1":this.user_form.value.child_1,
        "child_2":this.user_form.value.child_2,
        "child_3":this.user_form.value.child_3,
        "child_4":this.user_form.value.child_4,
        "child_5":this.user_form.value.child_5,
        "spouse_image":this.user_form.value.spouse_image,
        "signature":this.user_form.value.signature,
        "image":this.user_form.value.image,
        "comment":this.user_form.value.comment,
        "family_image":this.user_form.value.family_image,
        "branch":this.user_form.value.branch,
        "status":this.user_form.value.status
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.reg_id) {
      Swal.fire({ title: 'Please Enter Registration ID', icon: 'info' });
    } else if (!body.name) {
      Swal.fire({ title: 'Please Enter Name', icon: 'info' });
    } else if (!body.designation) {
      Swal.fire({ title: 'Please Enter Designation', icon: 'info' });
    }     
    else {
      this._auth.set_employee(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.user_form.patchValue({
           address:'',
           adhar:'',branch:'',child_1:'',child_2:'',child_3:'',child_4:'',child_5:'',comment:'',contact_no:'',
           date_of_birth:'',date_of_joining:'',date_of_marriage:'',designation:'',education_qualification:'',email:'',
           family_image:'',father_name:'',field_name:'',image:'',language_known:'',martial_status:'',mother_name:'',
           name:'',people_group:'',reg_id:'',signature:'',spouse_image:'',spouse_name:'',spouse_occupation:'',status:'1'
          });
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  submit_dashboard_casrol() {
    let body = {
      title: this.dashboard_casrol_form.value.title,
      image_url: this.dashboard_casrol_form.value.url,
      status: this.dashboard_casrol_form.value.status,
      detail: this.dashboard_casrol_form.value.detail,
      type: this.dashboard_casrol_form.value.type,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.title) {
      Swal.fire({ title: 'Please Enter Title', icon: 'info' });
    } else if (!body.image_url) {
      Swal.fire({ title: 'Please Enter URL', icon: 'info' });
    } else {
      this._auth.submit_dashboard_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.dashboard_casrol_form.patchValue({
            detail: '',
            status: '1',
            title: '',
            type: '1',
            url: '',
          });
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  submit_dashboard_program() {
    let body = {
      title: this.dashboard_program_form.value.title,
      image_url: this.dashboard_program_form.value.url,
      status: this.dashboard_program_form.value.status,
      detail: this.dashboard_program_form.value.detail,
      type: this.dashboard_program_form.value.type,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.title) {
      Swal.fire({ title: 'Please Enter Title', icon: 'info' });
    } else if (!body.image_url) {
      Swal.fire({ title: 'Please Enter URL', icon: 'info' });
    } else {
      this._auth.submit_dashboard_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.dashboard_program_form.patchValue({
            detail: '',
            status: '1',
            title: '',
            type: '2',
            url: '',
          });
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  token: any = '';
  user_id: any = '';
  get_latest_employee_id(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_latest_employee_id(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.user_form.patchValue({reg_id:res.data})
      }
    })

  }
  get_employee(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_employees(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.employee_list=res.data
      }
    })

  }
  get_designation(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_designation(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.designation_list=res.data
      }
    })

  }
  
  get_branch(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_branch(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.branch_list=res.data
      }
    })

  }
  get_field(){
    let body={
      branch_id:this.user_form.value.branch
    }
    this._auth.get_field(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.field_list=res.data
      }
    })

  }
  field_list_filtered:any[]=[]
  filter_field(){
    this.field_list_filtered=this.field_list.filter((a:any)=>a.branch_id==this.user_form.value.branch)
  }
  conv_status(item:any){
 
    if(item==1){
      return "Active"
    }
    else if(item==2){
      return "InActive"
    }
    else if(item==3){
      return "Resigned"
    }
    else{
      return '-'
    }
  }
  employee_list:any[]=[]
  designation_list:any[]=[]
  branch_list:any[]=[]
  field_list:any[]=[]
  ngOnInit(): void {
    this.token = this.service.get('token');
    this.user_id = this.service.get('user_id');
    if (this.token) {
      let body1 = { token: this.token };
      this._auth.validate_token(body1).subscribe((res: any) => {
        if (res.status == 'success') {
          this.service.set('full_name', res.data.full_name);
          this.service.set('token', res.data.token);
          this.service.set('user_id', res.data.user_id);
        } else {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          // window.location.reload()
        }
      });
      this.get_latest_employee_id()
    }
    this.get_employee()
    this.get_branch()
    this.get_designation()
    this.get_field()
  }
}
