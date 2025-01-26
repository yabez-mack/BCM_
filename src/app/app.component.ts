import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
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
  constructor(public _auth: AuthService) {}
  url: any;
  login_page: boolean = false;
  onActivate(item: any) {
    let page = item.constructor.name;
   
    if (page == 'AdminLoginComponent') {
      this.login_page = true;
    } else {
      this.login_page = false;
    }
  }
  ngOnInit(): void {
    if (this.url?.indexOf('masterLogin') !== -1) {
      this.login_page = true;
      
    } else {
      this.login_page = false;

    }
  }
}
