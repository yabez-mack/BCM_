import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscriber } from 'rxjs';
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
    file: [''],

  });
  dashboard_program_form = this._fb.group({
    title: [''],
    url: [''],
    detail: [''],
    file: [''],
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
  gallery_list_form = this._fb.group({
    name: [''],
    status: ['1'],   
  });
  gallery_list_form2 = this._fb.group({
    gallery_id: [''],
    file: [''],
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
      file_name: this.file_name,
      file: this.base64code4image,
      status: this.dashboard_casrol_form.value.status,
      detail: this.dashboard_casrol_form.value.detail,
      type: this.dashboard_casrol_form.value.type,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.title) {
      Swal.fire({ title: 'Please Enter Title', icon: 'info' });
    }  else {
      this._auth.submit_dashboard_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.dashboard_casrol_form.patchValue({
            detail: '',
            status: '1',
            title: '',
            type: '1',
            url: '',
            file:''
          });
          this.base64code4image=''
          this.file_name=''
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  submit_gallery_images() {
    let images=this.base64code4image3.split(',')
    let body = {
      file_name: this.file_name3,
      file: images,
      status: this.gallery_list_form2.value.status,
      gallery_id: this.gallery_list_form2.value.gallery_id,
      token: this.token,
    };
    console.log(body)
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (body.file.length==0) {
      Swal.fire({ title: 'Please Select File', icon: 'info' });
    }  else {
      this._auth.set_gallery_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.gallery_list_form2.patchValue({
            status: '1',
            gallery_id: '',           
            file:''
          });
          this.base64code4image3=''
          this.file_name3=''
          this.get_gallery_images();
          
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  save_gallery_list() {
    let body = {
      name: this.gallery_list_form.value.name,
      status: this.gallery_list_form.value.status,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.name) {
      Swal.fire({ title: 'Please Enter Gallery Name', icon: 'info' });
    }  else {
      this._auth.submit_gallery_list(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.gallery_list_form.patchValue({
            status: '1',
            name: '',           
          });
          this.get_gallery_list()
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
      file_name: this.file_name2,
      file: this.base64code4image2,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.title) {
      Swal.fire({ title: 'Please Enter Title', icon: 'info' });
    }  else {
      this._auth.submit_dashboard_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.dashboard_program_form.patchValue({
            detail: '',
            status: '1',
            title: '',
            type: '2',
            url: '',
            file:''
          });
          this.base64code4image2=''
          this.file_name2=''
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  base64code4image:any=''
  file_name:any=''
  file_type:any=''
  onChangeImage = ($event: any) => {
    this.base64code4image = '';
    const files = $event.target.files;


    for (let item of files) {
      if (
        (item.type.split('/')[1] == 'png' ||
          item.type.split('/')[1] == 'jpeg' ||
          item.type.split('/')[1] == 'jpg' ||
          item.type.split('/')[1] == 'bmp') &&
        item.size <= 5000000
      ) {
        this.file_name = item.name;
        this.file_type = item.type.split('/')[1];

        // ||          item.type.split('/')[1] == 'pdf'
        this.convertToBase64(item);
      } else {
        Swal.fire({
          title: 'File Error',
          text: 'Please use Jpeg/Png file less than 5mb',
          icon: 'error',
        });
        $event.target.value = '';
      }
    }
  };
  imageURL:any=''
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
    // //////console.log(file)
    observable.subscribe((d) => {
      if (this.base64code4image) {
        this.base64code4image =
          this.base64code4image + ',' + d.split('base64,')[1];
      } else {
        this.base64code4image = d.split('base64,')[1];
      }
    });
  }
  base64code4image2:any=''
  file_name2:any=''
  onChangeImage2 = ($event: any) => {
    this.base64code4image2 = '';
    const files = $event.target.files;


    for (let item of files) {
      if (
        (item.type.split('/')[1] == 'png' ||
          item.type.split('/')[1] == 'jpeg' ||
          item.type.split('/')[1] == 'jpg' ||
          item.type.split('/')[1] == 'bmp') &&
        item.size <= 5000000
      ) {
        this.file_name2 = item.name;
       

        // ||          item.type.split('/')[1] == 'pdf'
        this.convertToBase642(item);
      } else {
        Swal.fire({
          title: 'File Error',
          text: 'Please use Jpeg/Png file less than 5mb',
          icon: 'error',
        });
        $event.target.value = '';
      }
    }
  };
  imageURL2:any=''
  convertToBase642(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL2 = reader.result as string;
    };
    reader.readAsDataURL(file);
    // //////console.log(file)
    observable.subscribe((d) => {
      if (this.base64code4image2) {
        this.base64code4image2 =
          this.base64code4image2 + ',' + d.split('base64,')[1];
      } else {
        this.base64code4image2 = d.split('base64,')[1];
      }
    });
  }
  base64code4image3:any=''
  file_name3:any=''
  onChangeImage3 = ($event: any) => {
    this.base64code4image3 = '';
    const files = $event.target.files;

    this.file_name3=[]
    for (let item of files) {
      if (
        (item.type.split('/')[1] == 'png' ||
          item.type.split('/')[1] == 'jpeg' ||
          item.type.split('/')[1] == 'jpg' ||
          item.type.split('/')[1] == 'bmp') &&
        item.size <= 5000000
      ) {
        this.file_name3.push(item.name);
       

        // ||          item.type.split('/')[1] == 'pdf'
        this.convertToBase643(item);
      } else {
        Swal.fire({
          title: 'File Error',
          text: 'Please use Jpeg/Png file less than 5mb',
          icon: 'error',
        });
        $event.target.value = '';
      }
    }
  };
  imageURL3:any=''
  convertToBase643(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL2 = reader.result as string;
    };
    reader.readAsDataURL(file);
    // //////console.log(file)
    observable.subscribe((d) => {
      if (this.base64code4image3) {
        this.base64code4image3 =
          this.base64code4image3 + ',' + d.split('base64,')[1];
      } else {
        this.base64code4image3 = d.split('base64,')[1];
      }
    });
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }
  token: any = '';
  user_id: any = '';
  branch_list:any[]=[]
  gallery_list:any[]=[]
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
  get_gallery_list(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_gallery_list(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.gallery_list=res.data
      }
    })

  }
  images_list:any[]=[]
  images_list_filtered:any[]=[]
  get_gallery_images(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_all_gallery_images(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.images_list=res.data
        this.images_list_filtered=this.images_list.filter((a:any)=>a)
      }
    })

  }
  filter_gallery_id:any=''
  filter_images(){
    this.images_list_filtered=this.images_list
    if(this.filter_gallery_id){

      this.images_list_filtered=this.images_list_filtered.filter((a:any)=>a.gallery_id==this.filter_gallery_id)
    }
  }
  delete_image(item:any){
    let id=item.image_url.split('.amazonaws.com/')[1]
    let array=[]
    let array1=[]
    array.push(id)
    array1.push(item.id)
    let body={
      token:this.token,
      image:array,
      id:array1
    }
    Swal.fire({
      title: 'Delete Image?',
      text: 'You will not be able to recover!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'No, keep Image',
    }).then((result) => {
      if (result.value) {
        console.log(body)
        this._auth.delete_gallery_images(body).subscribe((res) => {
          if (res.status == 'success') {
            Swal.fire('Deleted!', 'Image Deleted.', 'success');
          }
          this.get_gallery_images();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('', 'Your Image is safe :)', 'info');
        // this.viewEvents();
      }
    });

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
    this.get_gallery_list()
    this.get_gallery_images()

    }
  }
}
