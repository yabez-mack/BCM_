import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { EncryptionService } from '../encrypt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  
  constructor(
    private _myFB: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private service: CookieService,
    private encrypt: EncryptionService
  ) {}

  adminLogin = this._myFB.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  
 
  ngOnInit(): void {
    // this.loginAdmin();
  }

  
  loginAdmin() {
      let body = {
        user_name: this.adminLogin.value.username,
        password: this.adminLogin.value.password,
      };

   if(!body.user_name){
    Swal.fire({title:'Please Enter Username',icon:'info'});
    
   }
   else if(!body.password){
    Swal.fire({title:'Please Enter Password',icon:'info'});

   }
   else{

     this._auth.check_login(body).subscribe((res) => {
       if (res.status == 'success') {         
         this.service.set('token',res.token)
         this.service.set('user_id',res.user)
         this.router.navigate(['/home']);
       } else {
         Swal.fire({title:res.message,icon:'error'});
       }
     });
   }
    
  }
}
