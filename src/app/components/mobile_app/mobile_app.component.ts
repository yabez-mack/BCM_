import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mobile_app',
  templateUrl: './mobile_app.component.html',
  styleUrls: ['./mobile_app.component.css'],
})
export class MobileAppComponent implements OnInit {
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
    full_name: [''],
    user_id: [''],
    status: ['1'],
    user_type: ['1'],
    image: [''],
  });
  lyrics_form = this._fb.group({
    song: [''],
    name: [''],
    serial_no: [''],
    artist: [''],
    language: [''],
    album: [''],
    image: [''],
    video_url: [''],
  });

  submit_lyrics() {
    let body = {
      name: this.lyrics_form.value.name,
      song: this.lyrics_form.value.song,
      serial_no: this.lyrics_form.value.serial_no,
      artist: this.lyrics_form.value.artist,
      image: this.lyrics_form.value.image,
      index: this.lyrics_form.value.serial_no,
      album: this.lyrics_form.value.album,
      language: this.lyrics_form.value.language,
      video_url: this.lyrics_form.value.video_url,
    };
    if (!body.name) {
      Swal.fire({ title: 'Please Enter Song Name', icon: 'info' });
    } else if (!body.serial_no) {
      Swal.fire({ title: 'Please Enter Song No.', icon: 'info' });
    } else if (!body.song) {
      Swal.fire({ title: 'Please Enter Lyrics', icon: 'info' });
    } else {
      this._auth.set_songs(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.lyrics_form.reset()
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
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
    } else {
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
    }
  }
}
