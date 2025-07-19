import { DatePipe } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../header-footer/navbar/navbar.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  base_url:any='https://bcmmovement.in'
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private service: CookieService,
    private datepipe: DatePipe,
    private router: Router,
    private navbar: NavbarComponent,
  ) {
    this.user_form_edit = this._fb.group({
      id: [''],
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
      date_of_joining: [''],
      contact_no: [''],
      martial_status: [''],
      spouse_name: [''],
      date_of_marriage: [''],
      spouse_occupation: [''],
      father_name: [''],
      mother_name: [''],
      spouse_image: [''],
      signature: [''],
      image: [''],
      comment: [''],
      family_image: [''],
      branch: [''],
      gender: [''],
      status: ['1'],
      language_speak: [''],
      language_write: [''],
      spouse_adhar: [''],
      mut_member: ['1'],
      mut_id: [''],
      bank_name: [''],
      account_name: [''],
      account_number: [''],
      ifsc: [''],
      micr: [''],
      blood_group: [''],
      no_of_children: [0],
      children: this._fb.array([])
    });
    this.user_form = this._fb.group({
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
      date_of_joining: [''],
      contact_no: [''],
      martial_status: [''],
      spouse_name: [''],
      date_of_marriage: [''],
      spouse_occupation: [''],
      father_name: [''],
      mother_name: [''],
      spouse_image: [''],
      signature: [''],
      image: [''],
      comment: [''],
      family_image: [''],
      branch: [''],
      gender: [''],
      status: ['1'],
      language_speak: [''],
      language_write: [''],
      spouse_adhar: [''],
      mut_member: ['2'],
      mut_id: [''],
      bank_name: [''],
      account_name: [''],
      account_number: [''],
      ifsc: [''],
      micr: [''],
      blood_group: [''],
      no_of_children: [0],
      children2: this._fb.array([])
    });
  }
  dashboard_casrol_form = this._fb.group({
    title: [''],
    url: [''],
    detail: [''],
    type: ['1'],
    status: ['1'],
  });
  documents_form = this._fb.group({
    title: [''],
    url: [''],
    file: [''],
    status: ['1'],
  });
  dashboard_program_form = this._fb.group({
    title: [''],
    url: [''],
    detail: [''],
    type: ['2'],
    status: ['1'],
  });
  
  user_form_edit:FormGroup
  user_form:FormGroup
  searchEmployee: any = '';
  submit_user() {
    let body = {
      token: this.token,
      reg_id: this.user_form.value.reg_id,
      name: this.user_form.value.name,
      adhar: this.user_form.value.adhar,
      designation: this.user_form.value.designation,
      email: this.user_form.value.email,
      education_qualification: this.user_form.value.education_qualification,
      field_name: this.user_form.value.field_name,
      date_of_birth: this.user_form.value.date_of_birth,
      address: this.user_form.value.address,
      people_group: this.user_form.value.people_group,

      date_of_joining: this.user_form.value.date_of_joining,
      contact_no: this.user_form.value.contact_no,
      martial_status: this.user_form.value.martial_status,
      spouse_name: this.user_form.value.spouse_name,
      date_of_marriage: this.user_form.value.date_of_marriage,
      spouse_occupation: this.user_form.value.spouse_occupation,
      father_name: this.user_form.value.father_name,
      mother_name: this.user_form.value.mother_name,

      spouse_image: this.user_form.value.spouse_image,
      signature: this.user_form.value.signature,
      comment: this.user_form.value.comment,
      image: this.base64code4image,
      family_image: this.base64code4image2,
      family_image_name: this.file_name2,
      image_name: this.file_name,
      branch: this.user_form.value.branch,
      status: this.user_form.value.status,
      blood_group: this.user_form.value.blood_group,

      // Added fields
      language_speak: this.user_form.value.language_speak,
      language_write: this.user_form.value.language_write,
      spouse_adhar: this.user_form.value.spouse_adhar,
      mut_member: this.user_form.value.mut_member,
      mut_id: this.user_form.value.mut_id,
      bank_name: this.user_form.value.bank_name,
      account_name: this.user_form.value.account_name,
      account_number: this.user_form.value.account_number,
      ifsc: this.user_form.value.ifsc,
      micr: this.user_form.value.micr,
      children:this.user_form.value.children2
    };

    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.reg_id) {
      Swal.fire({ title: 'Please Enter Registration ID', icon: 'info' });
    } else if (!body.name) {
      Swal.fire({ title: 'Please Enter Name', icon: 'info' });
    } else if (!body.designation) {
      Swal.fire({ title: 'Please Enter Designation', icon: 'info' });
    } else {
      this._auth.set_employee(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.user_form.patchValue({
            address: '',
            adhar: '',
            branch: '',
            comment: '',
            contact_no: '',
            date_of_birth: '',
            date_of_joining: '',
            date_of_marriage: '',
            designation: '',
            education_qualification: '',
            email: '',
            family_image: '',
            father_name: '',
            field_name: '',
            image: '',
            martial_status: '',
            mother_name: '',
            name: '',
            people_group: '',
            reg_id: '',
            signature: '',
            spouse_image: '',
            spouse_name: '',
            spouse_occupation: '',
            status: '1',
            language_speak: '',
            language_write: '',
            spouse_adhar: '',
            mut_member: '2',
            mut_id: '',
            bank_name: '',
            account_name: '',
            account_number: '',
            ifsc: '',
            blood_group: '',
            micr: '',
            no_of_children:0
          });
          this.children2.clear()

          this.get_latest_employee_id();
          this.get_employee();
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  update_user() {
    let body = {
      token: this.token,
      id: this.user_form_edit.value.id,
      reg_id: this.user_form_edit.value.reg_id,
      name: this.user_form_edit.value.name,
      adhar: this.user_form_edit.value.adhar,
      designation: this.user_form_edit.value.designation,
      email: this.user_form_edit.value.email,
      education_qualification:
        this.user_form_edit.value.education_qualification,
      field_name: this.user_form_edit.value.field_name,
      date_of_birth: this.user_form_edit.value.date_of_birth,
      address: this.user_form_edit.value.address,
      people_group: this.user_form_edit.value.people_group,
      date_of_joining: this.user_form_edit.value.date_of_joining,
      contact_no: this.user_form_edit.value.contact_no,
      martial_status: this.user_form_edit.value.martial_status,
      spouse_name: this.user_form_edit.value.spouse_name,
      date_of_marriage: this.user_form_edit.value.date_of_marriage,
      spouse_occupation: this.user_form_edit.value.spouse_occupation,
      father_name: this.user_form_edit.value.father_name,
      mother_name: this.user_form_edit.value.mother_name,
      spouse_image: this.user_form_edit.value.spouse_image,
      signature: this.user_form_edit.value.signature,
      comment: this.user_form_edit.value.comment,
      image: this.base64code4image3 ? this.base64code4image3 : this.default_url,
      family_image: this.base64code4image4
        ? this.base64code4image4
        : this.default_url2,
      family_image_name: this.base64code4image4 ? this.file_name4 : '',
      image_name: this.base64code4image3 ? this.file_name3 : '',
      branch: this.user_form_edit.value.branch,
      status: this.user_form_edit.value.status,
      language_speak: this.user_form_edit.value.language_speak,
      language_write: this.user_form_edit.value.language_write,
      spouse_adhar: this.user_form_edit.value.spouse_adhar,
      mut_member: this.user_form_edit.value.mut_member,
      mut_id: this.user_form_edit.value.mut_id,
      bank_name: this.user_form_edit.value.bank_name,
      account_name: this.user_form_edit.value.account_name,
      account_number: this.user_form_edit.value.account_number,
      ifsc: this.user_form_edit.value.ifsc,
      micr: this.user_form_edit.value.micr,
      blood_group: this.user_form_edit.value.blood_group,
      children:this.user_form_edit.value.children
    };

    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.reg_id) {
      Swal.fire({ title: 'Please Enter Registration ID', icon: 'info' });
    } else if (!body.name) {
      Swal.fire({ title: 'Please Enter Name', icon: 'info' });
    } else if (!body.designation) {
      Swal.fire({ title: 'Please Enter Designation', icon: 'info' });
    } else {
      this._auth.update_employee(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.user_form_edit.patchValue({
            id: '',
            address: '',
            adhar: '',
            branch: '',
            comment: '',
            contact_no: '',
            date_of_birth: '',
            date_of_joining: '',
            date_of_marriage: '',
            designation: '',
            education_qualification: '',
            email: '',
            family_image: '',
            father_name: '',
            field_name: '',
            image: '',
            martial_status: '',
            mother_name: '',
            name: '',
            people_group: '',
            reg_id: '',
            signature: '',
            spouse_image: '',
            spouse_name: '',
            spouse_occupation: '',
            status: '',
            language_speak: '',
            language_write: '',
            spouse_adhar: '',
            mut_member: '2',
            mut_id: '',
            bank_name: '',
            account_name: '',
            account_number: '',
            ifsc: '',
            micr: '',
            blood_group: '',
            no_of_children:0,
          });
          this.children.clear();

          this.get_employee();
          (<HTMLElement>document.getElementById('close_edit_employee')).click()
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  default_url: any = '';
  default_url2: any = '';
  employee_id: any = '';
  edit_employee(item: any) {
    this.employee_id = item.id;
    this.default_url = item.image;
    this.default_url2 = item.family_image;
    this.user_form_edit.patchValue({
      address: item.address,
      adhar: item.adhar,
      branch: item.branch,
      comment: item.comment,
      contact_no: item.contact_no,
      date_of_birth: item.date_of_birth,
      date_of_joining: item.date_of_joining,
      date_of_marriage: item.date_of_marriage,
      designation: item.designation,
      education_qualification: item.education_qualification,
      email: item.email,
      // family_image: item.family_image,
      father_name: item.father_name,
      field_name: item.field_name,
      gender: item.gender,
      // image: item.image,
      martial_status: item.martial_status,
      mother_name: item.mother_name,
      name: item.name,
      people_group: item.people_group,
      reg_id: item.reg_id,
      signature: item.signature,
      spouse_image: item.spouse_image,
      spouse_name: item.spouse_name,
      spouse_occupation: item.spouse_occupation,
      status: item.status,
      id: item.id,
      language_speak: item.language_speak || '',
      language_write: item.language_write || '',
      spouse_adhar: item.spouse_adhar || '',
      mut_member: item.mut_member || '2',
      mut_id: item.mut_id || '',
      bank_name: item.bank_name || '',
      account_name: item.account_name || '',
      account_number: item.account_number || '',
      ifsc: item.ifsc || '',
      micr: item.micr || '',
      blood_group: item.blood_group || '',
      no_of_children:item['children']?item['children'].length:0
    });
    this.children.clear();
    if(item['children']){

      item['children'].forEach((child:any) => {
        this.children.push(this.createChild(child));
      });
    }
    // Add a FormGroup for each child in the childrenData
    this.filter_field2();
    this.get_documents_list();
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
  get_latest_employee_id() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_latest_employee_id(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.user_form.patchValue({ reg_id: res.data });
      }
    });
  }
  get_employee() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_employees(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.employee_list = res.data;
      }
    });
  }
  get_designation() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_designation(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.designation_list = res.data;
      }
    });
  }

  get_branch() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_branch(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.branch_list = res.data;
      }
    });
  }
  get_field() {
    let body = {
      branch_id: this.user_form.value.branch,
    };
    this._auth.get_field(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.field_list = res.data;
      }
    });
  }
  field_list_filtered2: any[] = [];
  field_list_filtered: any[] = [];
  filter_field() {
    this.field_list_filtered = this.field_list.filter(
      (a: any) => a.branch_id == this.user_form.value.branch
    );
  }
  filter_field2() {
    this.field_list_filtered2 = this.field_list.filter(
      (a: any) => a.branch_id == this.user_form_edit.value.branch
    );
  }
  conv_status(item: any) {
    if (item == 1) {
      return 'Active';
    } else if (item == 2) {
      return 'InActive';
    } else if (item == 3) {
      return 'Resigned';
    } else if (item == 4) {
      return 'Deceased';
    } else {
      return '-';
    }
  }
  employee_list: any[] = [];
  designation_list: any[] = [];
  branch_list: any[] = [];
  field_list: any[] = [];

  base64code4image: any = '';
  file_name: any = '';
  file_type: any = '';
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
  imageURL: any = '';
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

  base64code4image2: any = '';
  file_name2: any = '';
  file_type2: any = '';
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
  imageURL2: any = '';
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

  base64code4image3: any = '';
  file_name3: any = '';
  file_type3: any = '';
  onChangeImage3 = ($event: any) => {
    this.base64code4image3 = '';
    const files = $event.target.files;

    for (let item of files) {
      if (
        (item.type.split('/')[1] == 'png' ||
          item.type.split('/')[1] == 'jpeg' ||
          item.type.split('/')[1] == 'jpg' ||
          item.type.split('/')[1] == 'bmp') &&
        item.size <= 5000000
      ) {
        this.file_name3 = item.name;

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
  imageURL3: any = '';
  convertToBase643(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL3 = reader.result as string;
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

  base64code4image4: any = '';
  file_name4: any = '';
  onChangeImage4 = ($event: any) => {
    this.base64code4image4 = '';
    const files = $event.target.files;

    for (let item of files) {
      if (
        (item.type.split('/')[1] == 'png' ||
          item.type.split('/')[1] == 'jpeg' ||
          item.type.split('/')[1] == 'jpg' ||
          item.type.split('/')[1] == 'bmp') &&
        item.size <= 5000000
      ) {
        this.file_name4 = item.name;

        // ||          item.type.split('/')[1] == 'pdf'
        this.convertToBase644(item);
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
  imageURL4: any = '';
  convertToBase644(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL4 = reader.result as string;
    };
    reader.readAsDataURL(file);
    // //////console.log(file)
    observable.subscribe((d) => {
      if (this.base64code4image4) {
        this.base64code4image4 =
          this.base64code4image4 + ',' + d.split('base64,')[1];
      } else {
        this.base64code4image4 = d.split('base64,')[1];
      }
    });
  }
  base64code4image5: any = '';
  file_name5: any = '';
  onChangeImage5 = ($event: any) => {
    this.base64code4image5 = '';
    const files = $event.target.files;

    for (let item of files) {
      if (item.size <= 5000000) {
        this.file_name5 = item.name;

        // ||          item.type.split('/')[1] == 'pdf'
        this.convertToBase645(item);
      } else {
        Swal.fire({
          title: 'File Error',
          text: 'Please use file less than 5mb',
          icon: 'error',
        });
        $event.target.value = '';
      }
    }
  };
  imageURL5: any = '';
  convertToBase645(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL5 = reader.result as string;
    };
    reader.readAsDataURL(file);
    // //////console.log(file)
    observable.subscribe((d) => {
      if (this.base64code4image5) {
        this.base64code4image5 =
          this.base64code4image5 + ',' + d.split('base64,')[1];
      } else {
        this.base64code4image5 = d.split('base64,')[1];
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
  upload_document() {
    let body = {
      token: this.token,
      employee_id: this.employee_id,
      user_id: this.user_id,
      status: this.documents_form.value.status,
      title: this.documents_form.value.title,
      file: this.base64code4image5,
      file_name: this.file_name5,
    };
    this._auth.save_employee_document(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'File Uploaded Successfully', icon: 'success' });
        this.get_documents_list();
        this.documents_form.reset();
        this.imageURL5 = '';
        this.base64code4image5 = '';
        this.file_name5 = '';
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  document_list: any[] = [];
  get_documents_list() {
    let body = {
      token: this.token,
      employee_id: this.employee_id,
    };
    this._auth.get_employee_document(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.document_list = res.data;
      }
    });
  }
  delete_file(item: any) {
    let body = {
      token: this.token,
      file: item.url,
      id: item.id,
    };
    Swal.fire({
      title: 'Delete File?',
      text: 'You will not be able to recover!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'No, keep File',
      backdrop: false,
    }).then((result) => {
      if (result.value) {
        this._auth.delete_employee_document(body).subscribe((res) => {
          if (res.status == 'success') {
            Swal.fire('Deleted!', 'File Deleted.', 'success');
          }
          this.get_documents_list();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('', 'Your File is safe :)', 'info');
        // this.viewEvents();
      }
    });
  }
  get children() {
    return (this.user_form_edit.get('children') as FormArray);
  }
  get children2() {
    return (this.user_form.get('children2') as FormArray);
  }
  childrenArray() {
    const noOfChildren = this.user_form_edit.value.no_of_children;
    return Array(noOfChildren).fill(0); // Creates an array of length no_of_children
  }
 

  onNumberOfChildrenChange() {
    const noOfChildren: any = this.user_form_edit.value.no_of_children;
    const currentChildren = this.children.length;

    // If the number of children increases, add more controls
    if (noOfChildren > currentChildren) {
      for (let i = currentChildren; i < noOfChildren; i++) {
        this.children.push(this.createChild());
      }
    }
    // If the number of children decreases, remove excess controls
    if (noOfChildren < currentChildren) {
      for (let i = currentChildren; i > noOfChildren; i--) {
        this.children.removeAt(i - 1);
      }
    }
  }
  onNumberOfChildrenChange2() {
    const noOfChildren: any = this.user_form.value.no_of_children;
    const currentChildren = this.children2.length;

    // If the number of children increases, add more controls
    if (noOfChildren > currentChildren) {
      for (let i = currentChildren; i < noOfChildren; i++) {
        this.children2.push(this.createChild2());
      }
    }
    // If the number of children decreases, remove excess controls
    if (noOfChildren < currentChildren) {
      for (let i = currentChildren; i > noOfChildren; i--) {
        this.children2.removeAt(i - 1);
      }
    }
  }
  createChild(child?:any): FormGroup {
    if(child){
      return this._fb.group({
        child_name: [child.child_name],
        dob: [child.dob],
        gender: [child.gender],
        education: [child.education],
        marital_status: [child.marital_status],
        status: [child.status]
      });
    }
    else{

      return this._fb.group({
        child_name: [''],
        dob: [''],
        gender: [''],
        education: [''],
        marital_status: [''],
        status: [1]
      });
    }
  }
  createChild2(): FormGroup {
   

      return this._fb.group({
        child_name: [''],
        dob: [''],
        gender: [''],
        education: [''],
        marital_status: [''],
        status: [1]
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
          let array = res.data.module_access.split(',');
          if (!array.includes('1')) {
            this.service.deleteAll();
            localStorage.clear();
            sessionStorage.clear();
            this.token = '';
            this.navbar.ngOnInit();
            this.router.navigate(['/home']);
          }
        } else {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          // window.location.reload()
        }
      });
      this.get_latest_employee_id();
    }
    this.get_employee();
    this.get_branch();
    this.get_designation();
    this.get_field();
  }
}
