import { ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  collasped = false;
  screenWidth = 0;
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
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private service: CookieService,
    private cd: ChangeDetectorRef
  ) {}
}
