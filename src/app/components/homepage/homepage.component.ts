import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EncryptionService } from '../../encrypt.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class AdminHomepageComponent implements OnInit {
  sideNavStatus = false;
  studentCount = 0;
  classCount = 0;
  his: any;

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.collasped = data.collapsed;
  }

  collasped = false;
  screenWidth = 0;

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
    private _myFB: FormBuilder,
    private datepipe: DatePipe,
    private service: CookieService,
    private encrypt: EncryptionService
  ) {}
  user_type: any;
  school_id: any;
  today_date: any;
  ay: any;
  today: any;

  token: any;
  base_url: any;
  user_details: any;
  program_data: any[] = [];
  ngOnInit() {
    let data = window.sessionStorage.getItem('user');
    this.token = this.service.get('token');
    // this.user_details=this.encrypt.decryptionAES(data)
    this.today_date = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );
    this.today = this.datepipe.transform(this.today_date, 'yyyy-MM-dd');
    this.program_data = [];
    let val = sessionStorage.getItem('program_data');
    let valid=this.isValidJSON(val)
    if (this.token) {
      let body1 = { token: this.token };
      this._auth.validate_token(body1).subscribe((res: any) => {
        if (res.status == 'success') {
          this.service.set('full_name', res.data.full_name);
          this.service.set('token', res.data.token);
          this.service.set('user_id', res.data.user_id);
        } else {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          // window.location.reload()
        }
      });
    }
    if (!valid) {
      let body = {};

      this._auth.get_events(body).subscribe((res: any) => {
        if ((res.status = 'success')) {
          this.program_data = res.data;
          let current_date= new Date()
          if(this.program_data){

            this.program_data=this.program_data.filter((a:any)=>new Date(String(a.event_start_date)).getTime()>current_date.getTime())
            this.program_data=this.program_data = this.program_data.sort((a: any, b: any) => 
              new Date(String(a.event_start_date)).getTime() - new Date(String(b.event_start_date)).getTime()
            ).slice(0, 5);
          }

          sessionStorage.setItem(
            'program_data',
            JSON.stringify(this.program_data)
          );
        }
      });
    } else {
      let vals:any = sessionStorage.getItem('program_data');
      this.program_data = JSON.parse(vals);
      let body = {};
      setTimeout(() => {
        this._auth.get_events(body).subscribe((res: any) => {
          if ((res.status = 'success')) {
            this.program_data = res.data;
            let current_date= new Date()
            if(this.program_data){

              this.program_data=this.program_data.filter((a:any)=>new Date(String(a.event_start_date)).getTime()>current_date.getTime())
              this.program_data=this.program_data = this.program_data.sort((a: any, b: any) => 
                new Date(String(a.event_start_date)).getTime() - new Date(String(b.event_start_date)).getTime()
              ).slice(0, 5);
            }

            sessionStorage.setItem(
              'program_data',
              JSON.stringify(this.program_data)
            );
          }
        });
      }, 2000);
    }
  }
  isValidJSON(str:any) {
    try {
      JSON.parse(str); 
      return true;  
    } catch (e) {
      return false;  
    }
  }
}
