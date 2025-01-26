import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService){}

  canActivate() {
    let l = this._auth.isLoggedIn();
    if(l){
      return true;
    }else{
      return false;
    }
  }
  
}
