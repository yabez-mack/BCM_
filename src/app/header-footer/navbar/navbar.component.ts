import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  Injectable,
} from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SidenavComponent } from '../sidenav/sidenav.component';
// import Chart from 'chart.js';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  location: Location;
  mobile_menu_visible: any = 0;
  toggleButton: any;
  sidebarVisible: boolean;

  isCollapsed: boolean = true;

  @Output() sideNavToggle = new EventEmitter<boolean>();
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    public _auth: AuthService,
    private service: CookieService,
    private sidenav: SidenavComponent
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  listTitles: any[] = [];

  menuStatus: boolean = true;
  screenWidth: number = 0;
  collapsed: boolean = true;
  user_type: any;

  token: any;
  full_name: any;
  setdropdown() {
    const dropdownButton = document.getElementById('dropdownButton1');
    const dropdownMenu = document.getElementById('dropdownMenu1');

    if (dropdownMenu?.classList.contains('hidden')) {
      dropdownMenu?.classList.remove('hidden');
    } else {
      dropdownMenu?.classList.add('hidden');
    }

    document.addEventListener('click', (event: any) => {
      if (
        !dropdownButton?.contains(event.target) &&
        !dropdownMenu?.contains(event.target)
      ) {
        dropdownMenu?.classList.add('hidden');
      }
    });
  }
  set_username(item: any, token: any) {
    this.full_name = item;
    this.token = token;
  }
  logout(){
    
  }
  ngOnInit() {
    if (this.service.get('token')) {
      this.token = this.service.get('token');
    }
    // if (!this.token) {
    //   this.token = this.service.get('token');
    // }
    if (this.service.get('full_name')) {
      this.full_name = this.service.get('full_name');
    }
    // if(!this.full_name){
    //   this.full_name = this.service.get('full_name');

    // }

    this._auth.onMenuStatus().subscribe((res: any) => {
      if (this.screenWidth <= 768) {
        this.menuStatus = true;
      } else {
        this.menuStatus = res;
      }
    });
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.menuStatus = true;

      this._auth.emitMenuStatus(this.collapsed);
    }
    this.listTitles = ['any'];
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      //  if ($layer) {
      //    $layer.remove();
      //    this.mobile_menu_visible = 0;
      //  }
    });
  }
  SideNavToggle() {
    if (this.screenWidth <= 768) {
      // this.collapsed =  true;
      // this.menuStatus=true;
      this.collapsed = !this.collapsed;
      this._auth.emitMenuStatus(this.collapsed);
    } else {
      this.collapsed = !this.collapsed;
      this._auth.emitMenuStatus(this.collapsed);
    }
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    const html = document.getElementsByTagName('html')[0];
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }

    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    if (document.getElementById('toggled')) {
      this.toggleButton.classList.remove('toggled');
    }
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      var $layer = document.createElement('div');

      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');

      if (html.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (html.classList.contains('off-canvas-sidebar')) {
        document
          .getElementsByClassName('wrapper-full-page')[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove('nav-open');
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
    // set_mobile_visibility(){
    //   this.mobile_menu_visible = 0;

    // }
  }

  getTitle() {
    var titlee: any = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
