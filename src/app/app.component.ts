import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'admin';
  isSideNavCollapsed = false;
  screenWidth = 0;
  path: any;
  collasped = false;
  sideNavStatus: boolean = false;
  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.collasped = data.collapsed;
  }
  getBodyClass(): string {
    let styleClass = '';
    if (this.collasped && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collasped &&
      this.screenWidth < 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
  constructor(public _auth: AuthService,private router: Router, private activatedRoute: ActivatedRoute) {}
  activeComponent: any;
  url: any=window.location.href;;
  login_page: boolean = false;
  onActivate(item?: any) {
    let page = item.constructor.name;
    // console.log(page)
    // console.log(this.url)
    // if (page == 'AdminLoginComponent') {
    //   this.login_page = true;
    // } else {
    //   this.login_page = false;
    // }
    this.url=window.location.href
    if (this.url?.indexOf('login') !== -1) {
      this.login_page = true;
      
    } else {
      this.login_page = false;
    }
    // this.router.events.subscribe(() => {
    //   const currentRoute = this.activatedRoute.snapshot.firstChild;
    //   if (currentRoute) {
    //     this.activeComponent = currentRoute.component?.name;
    //     // console.log('Active component:', this.activeComponent);
       
    //   }
    // });
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   const currentRoute = this.activatedRoute.snapshot.firstChild;
    //   const activeComponent = currentRoute ? currentRoute.component?.name : 'Unknown';
    //   // this.activeComponentChanged.emit(activeComponent);
    //   console.log('Active Component:', activeComponent);
    //   if(activeComponent=='AdminLoginComponent'){
    //     this.login_page = true;
        
    //   }
    //   else{
        
    //     this.login_page = false;
    //   }
    // });
    

  }
  ngOnInit(): void {
    this.onActivate()
    // console.log(this.url)
    // this.onActivate()
    // if (this.url?.indexOf('login') !== -1) {
    //   this.login_page = true;
      
    // } else {
    //   this.login_page = false;
    // }
  }
}
