import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../header-footer/navbar/navbar.component';

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
    private router: Router,
    private navbar: NavbarComponent

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
  lyrics_form_edit = this._fb.group({
    id: [''],
    song: [''],
    name: [''],
    serial_no: [''],
    artist: [''],
    language: [''],
    album: [''],
    image: [''],
    video_url: [''],
  });
  searchLyrics: any = '';

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
          this.get_song_no()
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  
  
  token: any = '';
  user_id: any = '';
  get_song_no(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_latest_song_no(body).subscribe((res:any)=>{
      if(res.status=='success'){
        this.lyrics_form.patchValue({serial_no:res.data})
      }
    })
  }
  song_list:any[]=[]
  edit_song(item:any){
    
    this.lyrics_form_edit.patchValue({album:item.album,artist:item.artist,id:item.id,image:item.image,language:item.language,name:item.name,serial_no:item.serial_no,song:item.song,video_url:item.video_url});
    // let height=(<HTMLTextAreaElement>document.getElementById('edit_song_lyrics')).scrollHeight
  }
  update_song(){
    let body = {
      id: this.lyrics_form_edit.value.id,
      name: this.lyrics_form_edit.value.name,
      song: this.lyrics_form_edit.value.song,
      serial_no: this.lyrics_form_edit.value.serial_no,
      artist: this.lyrics_form_edit.value.artist,
      image: this.lyrics_form_edit.value.image,
      index: this.lyrics_form_edit.value.serial_no,
      album: this.lyrics_form_edit.value.album,
      language: this.lyrics_form_edit.value.language,
      video_url: this.lyrics_form_edit.value.video_url,
    };
    if (!body.name) {
      Swal.fire({ title: 'Please Enter Song Name', icon: 'info' });
    } else if (!body.serial_no) {
      Swal.fire({ title: 'Please Enter Song No.', icon: 'info' });
    } else if (!body.song) {
      Swal.fire({ title: 'Please Enter Lyrics', icon: 'info' });
    } else {
      this._auth.update_song(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.lyrics_form_edit.reset()
          this.get_songs();
          (<HTMLElement>document.getElementById('close_edit_song')).click()
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  get_songs(){
    let body={
      token:this.service.get('token')
    }
    this._auth.get_songs(body).subscribe((res:any)=>{
      if(res.status=='success'){
       this.song_list=res.data
      }
    })
  }
  base_url:any='https://bcmmovement.in'
  ngOnInit(): void {
    this.token = this.service.get('token');
    this.user_id = this.service.get('user_id');
    if (this.token) {
      this.get_song_no()
      let body1 = { token: this.token };
      this._auth.validate_token(body1).subscribe((res: any) => {
        if (res.status == 'success') {
          this.service.set('full_name', res.data.full_name);
          this.service.set('token', res.data.token);
          this.service.set('user_id', res.data.user_id);
          let array=res.data.module_access.split(',')
          if(!(array.includes('3'))){
            this.service.deleteAll();
            localStorage.clear();
            sessionStorage.clear();
            this.token = '';
            this.router.navigate(['/home'])
            this.navbar.ngOnInit()

          }
        } else {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          // window.location.reload()
        }
      });
      this.get_songs()
    }
  }
}
