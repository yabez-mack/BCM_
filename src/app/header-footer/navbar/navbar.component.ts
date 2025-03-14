import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  Injectable,
  HostListener,
} from '@angular/core';
// import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs';
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
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.mobile=true
    }
    else{
      this.mobile=false

    }
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
  setdropdown2() {
    const dropdownButton = document.getElementById('dropdownButton2');
    const dropdownMenu = document.getElementById('dropdownMenu2');

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
  onDropdownItemClick() {
    const dropdownMenu = document.getElementById('dropdownMenu2');
    if (dropdownMenu) {
      dropdownMenu.classList.add('hidden');  // Close the dropdown
    }
  }
  set_username(item: any, token: any) {
    this.full_name = item;
    this.token = token;
  }
  logout(){
    this.service.deleteAll()
    this.router.navigate(['/login']);

    
  }
  modules:any[]=[]
  activeRoute:any
  mobile:any=false
  ngOnInit() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.mobile = true;

    }
    else{
      this.mobile = false;
    }
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
     this.router.events.pipe(
          filter((event:any) => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          this.activeRoute = event.urlAfterRedirects;
          this.activeRoute = this.activeRoute.split('/')[1];  
        });
    if(!this.activeRoute){
      this.activeRoute = window.location.href?.split('/#/')[1];

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
    this.modules = [];
      
   
    this.modules?.push({
      module_id: '',
      routeLink: '/home',
      icon: 'fa fa-house',
      module_name: 'Home',
    });
    this.modules?.push({
      module_id: '',
      routeLink: '/gallery',
      icon: 'fa-solid fa-image',
      module_name: 'Gallery',
    });
    // this.modules?.push({
    //   module_id: '',
    //   routeLink: '#/blogs',
    //   icon: 'fa fa-key',
    //   module_name: 'Blogs',
    // });
    if(this.token){
      this.modules?.push({
        module_id: '',
        routeLink: '/employees',
        icon: 'fa-solid fa-user-tie',
        module_name: 'Employee',
      });
      this.modules?.push({
        module_id: '',
        routeLink: '/apps',
        icon: 'fa fa-mobile-button',
        module_name: 'Mobile App',
      });
      this.modules?.push({
        module_id: '',
        routeLink: '/field-report',
        icon: 'fa-solid fa-file-lines',
        module_name: 'Field Report',
      });
      this.modules?.push({
        module_id: '',
        routeLink: '/setting',
        icon: 'fa fa-key',
        module_name: 'Setting',
      });
     
    }
    this.modules?.push({
      module_id: '',
      routeLink: '/contact',
      icon: 'fa fa-user',
      module_name: 'Contacts',
    });
    this.modules?.push({
      module_id: '',
      routeLink: '/about',
      icon: 'fa fa-address-card',
      module_name: 'About',
    });
    
   
    
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
