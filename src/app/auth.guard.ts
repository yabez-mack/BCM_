import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService,private service: CookieService){}
  // constructor(private _http: HttpClient, ) {}

  canActivate() {
    // let l = this._auth.isLoggedIn();
    let l = this.service.get('token');

    if(l){
      return true;
    }else{
      return false;
    }
  }
  
}
