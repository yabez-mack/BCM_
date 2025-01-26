import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import plugin from 'chartjs-plugin-datalabels';
import { EncryptionService } from '../../encrypt.service';

Chart.register(...registerables);

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css'],
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
    if (!val) {
      let body = {};
      this._auth.dashboard_images(body).subscribe((res: any) => {
        if ((res.status = 'success')) {
          this.program_data = res.data;
          this.program_data = this.program_data.filter(
            (a: any) => a.status == 1 && a.type == 2
          );
          sessionStorage.setItem(
            'program_data',
            JSON.stringify(this.program_data)
          );
        }
      });
    } else {
      this.program_data = JSON.parse(val);
      let body = {};
      setTimeout(() => {
        this._auth.dashboard_images(body).subscribe((res: any) => {
          if ((res.status = 'success')) {
            this.program_data = res.data;
            this.program_data = this.program_data.filter(
              (a: any) => a.status == 1 && a.type == 2
            );
            sessionStorage.setItem(
              'program_data',
              JSON.stringify(this.program_data)
            );
          }
        });
      }, 2000);
    }
  }
}
