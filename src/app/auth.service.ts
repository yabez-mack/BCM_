import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public otp = new BehaviorSubject<any>({});
  public menuStatus = new BehaviorSubject<any>({});
  private loading: boolean = false;
  private loader: boolean = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setLoader(loader: boolean) {
    this.loader = loader;
  }

  getLoader(): boolean {
    return this.loader;
  }
  isLoggedIn() {
    // let l = sessionStorage.getItem('token');
    let l = this.service.get('token');
    // console.log(l)

    if (l) {
      
      return true;
    } else {
      return false;
    }
  }
  emitSchool(school_details: any) {
    throw new Error('Method not implemented.');
  }

  emitOTP(data: any) {
    this.otp.next(data);
  }

  onOTP<T>(): Observable<T> {
    return this.otp.asObservable();
  }

  emitMenuStatus(data: any) {
    this.menuStatus.next(data);
  }

  onMenuStatus<T>(): Observable<T> {
    return this.menuStatus.asObservable();
  }


  constructor(private _http: HttpClient, private service: CookieService) {}

  dashboard_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_image_casrol`,
      input
    );
  }
  submit_dashboard_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/set_image_casrol`,
      input
    );
  }
  submit_user(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/create_user`,
      input
    );
  }
  check_login(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/validate_user`,
      input
    );
  }
  get_users(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_users`,
      input
    );
  }
  get_module_access(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_module_access`,
      input
    );
  }
  save_module_access(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/save_module_access`,
      input
    );
  }
  get_all_module_access(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_all_module_access`,
      input
    );
  }
  validate_token(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/validate_token`,
      input
    );
  }
  set_songs(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_song`,
      input
    );
  }
  get_songs(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_songs`,
      input
    );
  }
  update_song(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/update_song`,
      input
    );
  }
  set_employee(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_employee`,
      input
    );
  }
  get_latest_employee_id(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_latest_employee_id`,
      input
    );
  }
  get_employees(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_employees`,
      input
    );
  }
  get_branch(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_branch`,
      input
    );
  }
  get_designation(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_designation`,
      input
    );
  }
  get_field(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_fields`,
      input
    );
  }
  add_branch(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_branch`,
      input
    );
  }
  add_mission_field(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_mission_field`,
      input
    );
  }
  add_designation(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_designation`,
      input
    );
  }
  get_year(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_year`,
      input
    );
  }
  add_field_report(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_field_report`,
      input
    );
  }
  get_field_report(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_field_report`,
      input
    );
  }
  get_latest_song_no(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_latest_song_no`,
      input
    );
  }
  update_employee(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/update_employee`,
      input
    );
  }
  submit_gallery_list(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_gallery_list`,
      input
    );
  }
  get_gallery_list(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_gallery_list`,
      input
    );
  }
  set_gallery_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/set_gallery_images`,
      input
    );
  }
  get_all_gallery_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_gallery_images`,
      input
    );
  }
  delete_gallery_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/delete_gallery_images`,
      input
    );
  }
  submit_events(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/set_events`,
      input
    );
  }
  get_events(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_events`,
      input
    );
  }
  save_employee_document(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/set_employee_document`,
      input
    );
  }
  get_employee_document(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_employee_document`,
      input
    );
  }
  delete_employee_document(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/delete_employee_document`,
      input
    );
  }








}
