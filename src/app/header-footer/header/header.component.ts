import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { SidenavComponent } from '../sidenav/sidenav.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sideNavToggle =  new EventEmitter<boolean>();

  menuStatus: boolean= true;
  screenWidth: number =0 ;
  collapsed: boolean = true;
  module_access: any;
  global_search: boolean = false;
  user_type: any;
  constructor(public _auth: AuthService,
              private router: Router,
              private service: CookieService,
              private sidenav: SidenavComponent
              ){}

  ngOnInit() {
    this._auth.onMenuStatus().subscribe((res: any)=>{
    if (this.screenWidth <= 768) {
      this.menuStatus = true;

    }else{

      this.menuStatus = res;
    }
    });
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.menuStatus=true;
      
      this._auth.emitMenuStatus(this.collapsed);

    }
    this.user_type = this.service.get('user_type');


    
  }

  SideNavToggle(){   
    if (this.screenWidth <= 768) {
      this.collapsed =  true;
      this.menuStatus=true;
      this._auth.emitMenuStatus(true);

    }else{
      this.collapsed = !this.collapsed;
      this._auth.emitMenuStatus(this.collapsed);
    }

   
  }

  logout(e:any){
    e.preventDefault();
    // this.service.deleteAll();
    localStorage.clear();
    sessionStorage.clear()
    this.service.deleteAll()
    // this.router.navigate(['/adminLogin']);
    // window.location.href = this.sidenav.baseUrl+'logout.php';
    window.location.replace('https://schoolknot.com/logout.php');

  }
}
