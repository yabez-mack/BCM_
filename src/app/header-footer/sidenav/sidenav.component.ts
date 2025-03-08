import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { environment } from 'src/app/environments/environments';
import { filter } from 'rxjs';

// import { ExamsComponent } from 'src/app/exams/exams/exams.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(1turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  id: any;
  path: any;
  school_name: string = '';
  school_logo: any;
  trues: boolean = false;
  baseUrl: any = environment.baseURL;
  baseUrlLocal: any = 'http://localHost:4200/';
  top: any;
  modules: any;
  module: boolean[][] = [];
  sub_module: any[][] = [];
  module_feature: any[][] = [];
  path2: any;
  menuStatus: boolean = true;
  school_id: any;
  imageUrl: any;
  sch_nm: any;
  global_newdashboard: any;
  name_: any;
  username: string = '';
  user_type: any;
  ut: boolean = false;
  sports_type: any;
  security_type: any;
  exam_type: any;
  students_attendance: any;
  enquiry_type: any;
  leave_appliction: any;
  approval: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthService,
    private service: CookieService
  ) {}

  
  @Input() sideNavStatus: boolean = true;

  getPosition(el: any) {
    this.top = el.clientY;
  }
  date_restriction: any;
  class_time_table: any;
  session: any;
  url: any = window.location.href;
  activeRoute:any
  check_active(){
    // let value = window.location.href?.split('/#')[1];
    
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.urlAfterRedirects;  
    });
  }
  token:any=''
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;   
    this._auth.onMenuStatus().subscribe((res: any) => {
      this.collapsed = res;
      this.menuStatus = res;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    });
    if (this.screenWidth <= 768) {
      this._auth.onMenuStatus().subscribe((res: any) => {
        this.collapsed = res;
        this.menuStatus = res;
        this.onToggleSideNav.emit({
          collapsed: this.collapsed,
          screenWidth: this.screenWidth,
        });
      });
    }
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeRoute = event.urlAfterRedirects;  
    });
    if(!this.activeRoute){
      this.activeRoute = window.location.href?.split('/#')[1];

    }
    this.token=this.service.get('token')
    if(this.token)
      {
      let body1={token:this.token}
    this._auth.validate_token(body1).subscribe((res:any)=>{
      if(res.status=='success'){
        this.service.set('full_name',res.data.full_name)
        this.service.set('token',res.data.token)
        this.service.set('user_id',res.data.user_id)
       
      }
      else{
        this.service.deleteAll()
        localStorage.clear();
        sessionStorage.clear()
        this.token=''
        // window.location.reload()
      }
    })}
    this.modules = [];
      
   
      this.modules?.push({
        module_id: '',
        routeLink: '#/home',
        icon: 'fa fa-house',
        module_name: 'Home',
      });
      this.modules?.push({
        module_id: '',
        routeLink: '#/gallery',
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
          routeLink: '#/employees',
          icon: 'fa-solid fa-user-tie',
          module_name: 'Employee',
        });
        this.modules?.push({
          module_id: '',
          routeLink: '#/apps',
          icon: 'fa fa-mobile-button',
          module_name: 'Mobile App',
        });
        this.modules?.push({
          module_id: '',
          routeLink: '#/field-report',
          icon: 'fa-solid fa-file-lines',
          module_name: 'Field Report',
        });
        this.modules?.push({
          module_id: '',
          routeLink: '#/setting',
          icon: 'fa fa-key',
          module_name: 'Setting',
        });
       
      }
      this.modules?.push({
        module_id: '',
        routeLink: '#/contact',
        icon: 'fa fa-user',
        module_name: 'Contacts',
      });
      this.modules?.push({
        module_id: '',
        routeLink: '#/about',
        icon: 'fa fa-address-card',
        module_name: 'About',
      });
      
     
      

    
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this._auth.emitMenuStatus(!this.collapsed);
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    this.collapsed = !this.collapsed;
    this._auth.emitMenuStatus(this.collapsed);
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  accordion(id: any) {
    if (this.id == id) {
      this.id = '';
    } else {
      this.id = id;
    }
  }

  eventList(e: Event) {
    this.trues = true;
  }

  sidenavOver() {
    if (this.menuStatus == false) {
      // this.sideNavStatus = true;
      this.collapsed = true;
      // this._auth.emitMenuStatus(!this.collapsed);
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    } else {
      this.menuStatus = true;
      this.collapsed = true;
    }
  }
  sidenavOut() {
    if (this.menuStatus == true && this.collapsed == true) {
    } else {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }
}
