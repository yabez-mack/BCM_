import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../header-footer/navbar/navbar.component';
import { AnyComponent } from '@fullcalendar/core/preact';

@Component({
  selector: 'app-mobile_app',
  templateUrl: './mobile_app.component.html',
  styleUrls: ['./mobile_app.component.css'],
})
export class MobileAppComponent implements OnInit {
  // ==========================
  // Pagination variables
  // ==========================
  page = 1;
  pageSize = 10;       // default items per page
  pagedSongs: any[] = [];
  pageSizeOptions = [5, 10, 20, 50, 100];

  token: any = '';
  user_id: any = '';
  song_list: any[] = [];

  searchLyrics: string = '';

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private router: Router,
    private service: CookieService,
    private datepipe: DatePipe,
    private navbar: NavbarComponent
  ) { }

  // ==========================
  // Forms
  // ==========================
  dashboard_casrol_form = this._fb.group({ title: [''], url: [''], detail: [''], type: ['1'], status: ['1'] });
  dashboard_program_form = this._fb.group({ title: [''], url: [''], detail: [''], type: ['2'], status: ['1'] });
  user_form = this._fb.group({ username: [''], password: [''], full_name: [''], user_id: [''], status: ['1'], user_type: ['1'], image: [''] });
  lyrics_form = this._fb.group({ song: [''], name: [''], serial_no: [''], artist: [''], language: [''], album: [''], image: [''], video_url: [''] });
  lyrics_form_edit = this._fb.group({ id: [''], song: [''], name: [''], serial_no: [''], artist: [''], language: [''], album: [''], image: [''], video_url: [''] });

  ngOnInit(): void {
    this.token = this.service.get('token');
    this.user_id = this.service.get('user_id');
    if (this.token) {
      this.get_song_no();
      this.validateToken();
      this.get_songs();
    }
  }

  // ==========================
  // Pagination Methods
  // ==========================
  updatePagedSongs() {
   const filtered = this.song_list.filter(song =>
    !this.searchLyrics || song.name.toLowerCase().includes(this.searchLyrics.toLowerCase())
  );

  const start = (this.page - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  this.pagedSongs = filtered.slice(start, end);
  this.paginatedSongs = this.pagedSongs; // bind to template
  }

  
  goToPage(p: any) { this.page = Number(p); this.updatePagedSongs(); }

  changePageSize(size: number) {
    this.pageSize = size;
    this.page = 1; // reset to first page
    this.updatePagedSongs();
  }

  // ==========================
  // Condensed Pagination Logic
  // ==========================
  get paginationPages(): (number | string)[] {
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      // always show first 3
      pages.push(1, 2, 3);

      const startCurrent = Math.max(this.page - 1, 4);
      const endCurrent = Math.min(this.page + 1, total - 3);

      if (startCurrent > 4) pages.push('...');

      for (let i = startCurrent; i <= endCurrent; i++) pages.push(i);

      if (endCurrent < total - 3) pages.push('...');

      // always show last 3
      pages.push(total - 2, total - 1, total);
    }

    // remove duplicates & invalid pages
    return pages.filter((p: any, idx, arr) => p >= 1 && p <= total && arr.indexOf(p) === idx);
  }
 // Variables
currentPage:any = 1;
itemsPerPage:any = 10;
itemsPerPageOptions = [5, 10, 20, 50];
paginatedSongs: any[] = [];
// song_list: any[] = []; // fetched from API

// Update the current page slice
updatePaginatedSongs() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  const filtered = this.song_list.filter(song =>
    !this.searchLyrics || song.name.toLowerCase().includes(this.searchLyrics.toLowerCase())
  );
  this.paginatedSongs = filtered.slice(start, end);
}

// Pagination methods
nextPage() {
  if (this.currentPage < this.totalPages()) {
    this.currentPage++;
    this.updatePaginatedSongs();
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedSongs();
  }
}

onItemsPerPageChange(event: any) {
  this.itemsPerPage = +event.target.value;
  this.currentPage = 1; // reset to first page
  this.updatePaginatedSongs();
}

totalPages():number {
  const filtered = this.song_list.filter(song =>
    !this.searchLyrics || song.name.toLowerCase().includes(this.searchLyrics.toLowerCase())
  );
  return Number(Math.ceil(filtered.length / this.itemsPerPage));
}
  // ==========================
  // Songs CRUD
  // ==========================
  submit_lyrics(): any {
    const body = { ...this.lyrics_form.value, index: this.lyrics_form.value.serial_no };
    if (!body.name) return Swal.fire({ title: 'Please Enter Song Name', icon: 'info' });
    if (!body.serial_no) return Swal.fire({ title: 'Please Enter Song No.', icon: 'info' });
    if (!body.song) return Swal.fire({ title: 'Please Enter Lyrics', icon: 'info' });

    this._auth.set_songs(body).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
        this.lyrics_form.reset();
        this.get_song_no();
        this.get_songs();
      } else Swal.fire({ title: res.message, icon: 'error' });
    });
  }

  get_song_no() {
    const body = { token: this.token };
    this._auth.get_latest_song_no(body).subscribe((res: any) => {
      if (res.status === 'success') this.lyrics_form.patchValue({ serial_no: res.data });
    });
  }

  edit_song(item: any) { this.lyrics_form_edit.patchValue(item); }

  update_song(): any {
    const body = { ...this.lyrics_form_edit.value, index: this.lyrics_form_edit.value.serial_no };
    if (!body.name) return Swal.fire({ title: 'Please Enter Song Name', icon: 'info' });
    if (!body.serial_no) return Swal.fire({ title: 'Please Enter Song No.', icon: 'info' });
    if (!body.song) return Swal.fire({ title: 'Please Enter Lyrics', icon: 'info' });

    this._auth.update_song(body).subscribe((res: any) => {
      if (res.status === 'success') {
        Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
        this.lyrics_form_edit.reset();
        this.get_songs();
        (<HTMLElement>document.getElementById('close_edit_song')).click();
      } else Swal.fire({ title: res.message, icon: 'error' });
    });
  }

  get_songs() {
    const body = { token: this.token };
    this._auth.get_songs(body).subscribe((res: any) => {
      if (res.status === 'success') {
        this.song_list = res.data;
        this.updatePagedSongs();
      }
    });
  }

  validateToken() {
    const body = { token: this.token };
    this._auth.validate_token(body).subscribe((res: any) => {
      if (res.status === 'success') {
        this.service.set('full_name', res.data.full_name);
        this.service.set('token', res.data.token);
        this.service.set('user_id', res.data.user_id);

        const array = res.data.module_access.split(',');
        if (!array.includes('2')) {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          this.router.navigate(['/home']);
          this.navbar.ngOnInit();
        }
      } else {
        this.service.deleteAll();
        localStorage.clear();
        sessionStorage.clear();
        this.token = '';
      }
    });
  }
}