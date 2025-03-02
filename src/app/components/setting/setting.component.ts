import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
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
    username: [''],
    password: [''],
    confirm_password: [''],
    full_name: [''],
    user_id: [''],
    status: ['1'],
    user_type: ['1'],
    image: [''],
  });
  branch_form = this._fb.group({
    branch_name: [''],
    status: ['1'],   
  });
  designation_form = this._fb.group({
    designation: [''],
    status: ['1'],   
  });
  field_form = this._fb.group({
    branch_id: [''],
    field_name: [''],
    status: ['1'],   
  });
  submit_user() {
    let body = {
      username: this.user_form.value.username,
      password: this.user_form.value.password,
      full_name: this.user_form.value.full_name,
      user_id: this.user_id,
      status: this.user_form.value.status,
      user_type: this.user_form.value.user_type,
      image: this.user_form.value.image,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.username) {
      Swal.fire({ title: 'Please Enter User Name', icon: 'info' });
    } else if (!body.password) {
      Swal.fire({ title: 'Please Enter Password', icon: 'info' });
    } else if (!body.full_name) {
      Swal.fire({ title: 'Please Enter Full Name', icon: 'info' });
    } 
     else if (!(this.user_form.value.confirm_password==this.user_form.value.password)) {
      Swal.fire({ title: "Password Didn't Match", icon: 'info' });
    } 
    else {
      this._auth.submit_user(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.user_form.patchValue({
            full_name: '',
            image: '',
            password: '',
            status: '1',
            user_type: '1',
            username: '',
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
  submit_branch() {
    let body = {
      branch_name: this.branch_form.value.branch_name,
      status: this.branch_form.value.status,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    }  else if (!body.branch_name) {
      Swal.fire({ title: 'Please Enter Branch Name', icon: 'info' });
    } else {
      this._auth.add_branch(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.branch_form.patchValue({
            branch_name: '',
            status: '1',
          
          });
          this.get_branch()
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  submit_designation() {
    let body = {
      designation: this.designation_form.value.designation,
      status: this.designation_form.value.status,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    }  else if (!body.designation) {
      Swal.fire({ title: 'Please Enter Designation', icon: 'info' });
    } else {
      this._auth.add_designation(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.designation_form.patchValue({
           designation:'',
            status: '1',
            
          });
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  submit_field() {
    let body = {
      field_name: this.field_form.value.field_name,
      branch_id: this.field_form.value.branch_id,
      status: this.field_form.value.status,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } 
     else if (!body.branch_id) {
      Swal.fire({ title: 'Please Select Branch', icon: 'info' });
    }
     else if (!body.field_name) {
      Swal.fire({ title: 'Please Enter Field Name', icon: 'info' });
    }
     else {
      this._auth.add_mission_field(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.field_form.patchValue({
            field_name: '',
            branch_id: '',
            status: '1',
            
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
  branch_list:any[]=[]
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
    this.get_branch()

    }
  }
}
