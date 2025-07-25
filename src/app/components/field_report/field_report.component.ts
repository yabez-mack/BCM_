import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import { NavbarComponent } from '../../header-footer/navbar/navbar.component';
import { QuillConfigService } from '../../quill-config.service';
import { QuillEditorComponent } from 'ngx-quill';
@Component({
  selector: 'app-field_report',
  templateUrl: './field_report.component.html',
  styleUrls: ['./field_report.component.css'],
})
export class FieldReportComponent implements OnInit, AfterViewInit {
  @ViewChild('obstacles_editor', { static: false })
  quillEditorComponent1!: QuillEditorComponent;
  @ViewChild('testimony_editor', { static: false })
  quillEditorComponent2!: QuillEditorComponent;
  @ViewChild('prayer_editor', { static: false })
  quillEditorComponent3!: QuillEditorComponent;
  ngAfterViewInit(): void {
    const editor1 = this.quillEditorComponent1.quillEditor;
    const editor2 = this.quillEditorComponent2.quillEditor;
    const editor3 = this.quillEditorComponent3.quillEditor;
    editor1.format('font', 'monospace'); // or 'monospace'
    editor2.format('font', 'monospace'); // or 'monospace'
    editor3.format('font', 'monospace'); // or 'monospace'
  }

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private route: Router,
    private service: CookieService,
    private datepipe: DatePipe,
    private router: Router,
    private navbar: NavbarComponent,
    private quillConfig: QuillConfigService
  ) {}
  field_report_form = this._fb.group({
    employee_id: [''],
    year: [''],
    month: [''],
    testimony: [''],
    prayer_request: [''],
    new_followers: [''],
    obstacles: [''],
    status: ['1'],
  });

  field_form = this._fb.group({
    branch_id: [''],
    field_name: [''],
    status: ['1'],
  });
  searchReport: any = '';
  submit_dashboard_casrol() {
    let body = {
      // title: this.dashboard_casrol_form.value.title,
      // image_url: this.dashboard_casrol_form.value.url,
      // status: this.dashboard_casrol_form.value.status,
      // detail: this.dashboard_casrol_form.value.detail,
      // type: this.dashboard_casrol_form.value.type,
      token: this.token,
    };
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    }
    // else if (!body.title) {
    //   Swal.fire({ title: 'Please Enter Title', icon: 'info' });
    // } else if (!body.image_url) {
    //   Swal.fire({ title: 'Please Enter URL', icon: 'info' });
    // }
    else {
      this._auth.submit_dashboard_images(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          // this.dashboard_casrol_form.patchValue({
          //   detail: '',
          //   status: '1',
          //   title: '',
          //   type: '1',
          //   url: '',
          // });
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }
  getUsedFonts(delta: any): string[] {
    const fonts = new Set<string>();

    delta.ops.forEach((op: any) => {
      if (op.attributes?.font) {
        fonts.add(op.attributes.font);
      }
    });

    return Array.from(fonts);
  }
  submit_field() {
    // Get Delta (recommended for preserving formats)
    const delta1 = this.quillEditorComponent1.quillEditor.getContents();
    const delta2 = this.quillEditorComponent2.quillEditor.getContents();
    const delta3 = this.quillEditorComponent3.quillEditor.getContents();
    let font1 = this.getUsedFonts(delta1);
    let font2 = this.getUsedFonts(delta2);
    let font3 = this.getUsedFonts(delta3);

    let body = {
      employee_id: this.field_report_form.value.employee_id,
      year: this.field_report_form.value.year,
      month: this.field_report_form.value.month,
      status: this.field_report_form.value.status,
      new_followers: this.field_report_form.value.new_followers,
      testimony: this.field_report_form.value.testimony,
      prayer_request: this.field_report_form.value.prayer_request,
      obstacles: this.field_report_form.value.obstacles,
      obstacle_font: font1[0],
      testimony_font: font2[0],
      prayer_request_font: font3[0],
      token: this.token,
    };
    console.log(body);
    if (!body.token) {
      Swal.fire({ title: 'Please Login', icon: 'info' });
    } else if (!body.employee_id) {
      Swal.fire({ title: 'Please Select Employee', icon: 'info' });
    } else if (!body.year) {
      Swal.fire({ title: 'Please Select Year', icon: 'info' });
    } else if (!body.month) {
      Swal.fire({ title: 'Please Select Month', icon: 'info' });
    } else {
      this._auth.add_field_report(body).subscribe((res: any) => {
        if (res.status == 'success') {
          Swal.fire({ title: 'Submitted Successfully', icon: 'success' });
          this.field_report_form.patchValue({
            employee_id: '',
            month: '',
            prayer_request: '',
            testimony: '',
            year: '',
            new_followers: '',
            obstacles: '',
            status: '1',
          });
          this.get_field_report();
        } else {
          Swal.fire({ title: res.message, icon: 'error' });
        }
      });
    }
  }

  token: any = '';
  user_id: any = '';
  employees_list: any[] = [];
  report_list: any[] = [];
  get_employees() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_employees(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.employees_list = res.data;
      }
    });
  }
  get_field_report() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_field_report(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.report_list = res.data;
      }
    });
  }
  conv_month(item: any) {
    if (item == 0) {
      return 'Jan';
    } else if (item == 1) {
      return 'Feb';
    } else if (item == 2) {
      return 'Mar';
    } else if (item == 3) {
      return 'Apr';
    } else if (item == 4) {
      return 'May';
    } else if (item == 5) {
      return 'June';
    } else if (item == 6) {
      return 'July';
    } else if (item == 7) {
      return 'Aug';
    } else if (item == 8) {
      return 'Sep';
    } else if (item == 9) {
      return 'Oct';
    } else if (item == 10) {
      return 'Nov';
    } else if (item == 11) {
      return 'Dec';
    } else {
      return '-';
    }
  }
  year_list: any[] = [];
  get_year() {
    let body = {
      token: this.service.get('token'),
    };
    this._auth.get_year(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.year_list = res.data;
      }
    });
  }
  text: any;
  tools: any = {
    // imageResize: {},
    // syntax: {
    //   // highlight: (text:any) => hljs.highlightAuto(text).value,
    // },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ font: ['sans-serif', 'monospace', , 'Bamini'] }],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],

      [{ align: [] }],
      ['clean'],
      ['link', 'image', 'video'],
    ],
  };

  downloadPDF(): void {
    const doc = new jsPDF();
    // const doc = new jsPDF('p', 'mm', 'a4');
    // // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
    const element = document.getElementById('contentToExport');

    if (element) {
      doc.html(element, {
        callback: function (doc) {
          doc.save('download.pdf');
        },
      });
    }
    console.log(element);
  }
  print(item: any) {
    let popupWin;
    // printContents = document.getElementById('contentToExport')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // let prayer_request=item.prayer_request.replace(/\n/g, '<br>')
    // let testimony=item.testimony.replace(/\n/g, '<br>')
    let prayer_request = item.prayer_request.trimLeft();
    let testimony = item.testimony.trimLeft();
    if (popupWin) {
      popupWin.document.open();
      popupWin.document.write(`
				<html>
					<head>
          <title>${item.name}</title>
        
          <style type="text/css">
           @font-face {
          font-family: 'Bamini';
          src: url('./Bamini.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
  @media print {
    .no-print {
      display: none !important;
    }
        @font-face {
  font-family: 'Bamini';
  src: url('/Bamini.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
  }
              p {
                font-family: "Times New Roman";
              }

              .padding-main-divcls{
                padding: 5px;
              }

              .text-center{
                text-align: center
              }
              .width-full{
                width: 100%;
              }

              .box{
                  border-style: solid;
                  border-width: 1px;
                  width: 65px;
                  height: 100px;
                  float: right;
                  margin-right: 50px;
                  font-size: 10px;
                  padding: 5px;
              }
              .box-divcls{
                width: 100%;
                display: inline-block;
              }

              .TermsConditionTable, tr , td {
								padding: 4px !important;
							}
							tr, td {
								page-break-inside: avoid !important;
							}
            

							.break-after{
								page-break-after: always;
							}
              .top-border-cls{
                border-top: solid black 1.0pt;
              }
            </style>
            <body onload="window.print();window.close()">
            <div class="row no-print mt-2"style=" justify-content: center;
            align-items: center;"><button onclick="window.print()" class="btn-primary btn" style="width:max-content">PRINT</button></div>
            <div style="width: 100%;height:100%" id="contentToExport">
              <div style="display:flex;justify-content: space-between;align-items: center;flex-direction: row;">

                <img src="assets/images/mono_old.png" style="width:70px"/>
                <h2 class="text-center" style="font-family: Roboto;">
                  BASTAR FOR CHRIST MISSIONARY MOVEMENT
                </h2>
              </div>
              <hr class="border-t-2  border-gray-300" style="margin-top:1rem;margin-bottom: 1rem;">
              <div class="flex flex-wrap "style="width:100%;display:flex;flex-wrap: wrap;font-size:20px">
                <div  style="width:45%;margin-bottom: 1rem;">
                  Missionary Name
                </div>
                <div  style="width:5%">
                  :
                  </div>
                <div style="width: 50%;
                word-break: break-all;
                line-break: auto;
                margin-bottom: 1rem;">
                
                 ${item.name}
                </div>
                <div  style="width:45%">
                  Name of the Field 
                </div>
                <div  style="width:5%">
                  :
                  </div>
                <div style="width: 50%;
                word-break: break-all;
                line-break: auto;
                margin-bottom: 1rem;">
                ${item.field_name}
                </div>
                
                <div  style="width:45%;margin-bottom: 1rem;">
                  Number of People Accepted Christ Last Month
                </div>
                <div  style="width:5%">
                  :
                  </div>
                <div style="width: 50%;
                word-break: break-all;
                line-break: auto;
                margin-bottom: 1rem;">
                ${item.new_followers}
                </div>
                <div  style="width:100%">
                  Obstacles in the Ministry :
               <div style="width: 100%;
                  white-space: break-spaces;
                  padding:5px;font-size:28px;
                  font-family: '${item.obstacle_font}', sans-serif;">
                  ${item.obstacles}
                </div>
                <div  style="width:100%;">
                 Testimony :
                </div>
                
               <div style="width: 100%;
                  white-space: break-spaces;
                  padding:5px;font-size:28px;
                  font-family: '${item.testimony_font}', sans-serif;">
                  ${testimony}
                </div>
                <div  style="width:100%;">
                 Prayer Request :
                </div>
                
              <div style="width: 90%;
                white-space: pre-wrap;
                padding:5px;font-size:28px;
                font-family: '${item.prayer_request_font}', sans-serif;">
                ${prayer_request}
              </div>

              </div>
              

            
            </div>
            </body>
          </head>
        </html>
      `);
      // popupWin.document.close();
    }
  }
  ngOnInit(): void {
    this.token = this.service.get('token');
    this.user_id = this.service.get('user_id');
    if (this.token) {
      let body1 = { token: this.token };
      this._auth.validate_token(body1).subscribe((res: any) => {
        if (res.status == 'success') {
          this.service.set('full_name', res.data.full_name);
          this.service.set('token', res.data.token);
          this.service.set('user_id', res.data.user_id);
          let array = res.data.module_access.split(',');
          if (!array.includes('3')) {
            this.service.deleteAll();
            localStorage.clear();
            sessionStorage.clear();
            this.token = '';
            this.navbar.ngOnInit();
            this.router.navigate(['/home']);
            // window.location.replace('/home')
          }
        } else {
          this.service.deleteAll();
          localStorage.clear();
          sessionStorage.clear();
          this.token = '';
          // window.location.reload()
        }
      });
      this.get_year();
      this.get_employees();
      this.get_field_report();
    }
  }
}
