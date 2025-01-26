import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx-js-style';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent  implements OnInit{
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
  school_search_form = this._fb.group({
    school: [''],
  });
  school_search_form1 = this._fb.group({
    school: [''],
  });
  bulk_chapter_form = this._fb.group({
    class: ['', Validators.required],
    subject: ['', Validators.required],
    file: ['', Validators.required],

  });
  bulk_topic_form = this._fb.group({
    file: ['', Validators.required],

  });
  schoolsList:any[]=[];
  masterclasses:any[]=[];
  tableData:any[]=[];
  tableTitle:any[]=[];
  subjects2:any[]=[];
  schools: any;
  school_id: any;
  school_id1: any;
  keyword: any = 'school_name';
  get_schools() {
    this._auth.getSchools().subscribe((res) => {
      this.schools = res;
      this.schoolsList = this.schools.schools;
    });
  }
  selected_school(item: any) {
    this.school_id = item.school_id;
  }
  selected_school1(item: any) {
    this.school_id1 = item.school_id;
  }
  chapter2(item: any) {
    //// // console.log(item.target.value)
    let body = {
      school_id: this.service.get('school_id'),
      master_class_id: item.target.value,
    };

    this._auth.getSubjectByMasterClass(body).subscribe((res) => {
      if ((res.status = 'success')) {


        this.subjects2 = res.subjects;
      }
    });
  }
  bulk_upload_subject_chapter(){
    let value:any[]=[]
    let i=0
    
    this.tableData.forEach(element => {
      value.push({master_class_id:element[0],subject_name:element[1],chapter_name:element[2]})
      i++
    });
    let body={school_id:this.school_id,

      chapterBulkUpload:value
    }

 this._auth.bulk_upload_chapters(body).subscribe((res:any)=>{
  if(res.status=='success'){
    Swal.fire({title:'Chapters Upload Successfully',icon:'success'})
    this.tableData=[]
    this.bulk_chapter_form.patchValue({class:"",file:"",subject:""})
    this.school_search_form.patchValue({school:""})
    this.school_id=''
  }
  else{
    Swal.fire({title:res.message,icon:'error'})

  }
 })

  }
  bulk_upload_subject_topic(){
    let value:any[]=[]
    let i=0
    
    this.tableData1.forEach(element => {
      value.push({master_class_id:element[0],subject_name:element[1],chapter_name:element[2],topic_name:element[3]})
      i++
    });
    let body={school_id:this.school_id1,

      topicsBulkUpload:value
    }
    console.log(body)

 this._auth.bulk_upload_topic(body).subscribe((res:any)=>{
  if(res.status=='success'){
    Swal.fire({title:'Chapters Upload Successfully',icon:'success'})
    this.tableData1=[]
    this.tableTitle1=[]
    this.bulk_topic_form.patchValue({file:""})
    this.school_search_form1.patchValue({school:""})
    this.school_id1=''
  }
  else{
    Swal.fire({title:res.message,icon:'error'})

  }
 })

  }
  bulk_chapter_class=this._fb.group({});
  group1:any={}
  bulk_chapters(e:any){
      const target: DataTransfer = <DataTransfer>(<unknown>e.target);
      let fileList = e.target.files;
      let file = fileList[0];
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
  
      let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
      if (file.type.split('/')[1].includes('sheet') && file.size <= 5000000) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  
          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
          /* save data */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
          this.tableData = data;
          this.tableTitle = this.tableData[0];
          
          // this.tableTitle.push('Status');
          this.tableData.shift();
          this.tableData=this.tableData.filter((a:any)=>a!='')
          
          if(this.tableTitle.length>0){
            let i=0
            this.tableTitle.forEach(element => {
              if(i==0&&this.tableTitle[0]=='master class id'){

              }
              else if(i==1&&this.tableTitle[1]=='subject name'){

              }
              else if(i==2&&this.tableTitle[2]=='chapter name'){

              }
              else{
                Swal.fire({title:'Wrong Excel Format Detected',icon:'info'})
                this.tableData=[]
                this.tableTitle=[]
              }
              
              i++
            });
          }
  
  
          
        };
      } else {
        Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
        e.target.value = '';
      }
  }
  bulk_topic(e:any){
      const target: DataTransfer = <DataTransfer>(<unknown>e.target);
      let fileList = e.target.files;
      let file = fileList[0];
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
  
      let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
      if (file.type.split('/')[1].includes('sheet') && file.size <= 5000000) {
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
  
          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
          /* save data */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
          this.tableData1 = data;
          this.tableTitle1 = this.tableData1[0];
          
          // this.tableTitle.push('Status');
          this.tableData1.shift();
          this.tableData1=this.tableData1.filter((a:any)=>a!='')
          
          if(this.tableTitle1.length>0){
            let i=0
            this.tableTitle1.forEach(element => {
              if(i==0&&this.tableTitle1[0]=='master class id'){

              }
              else if(i==1&&this.tableTitle1[1]=='subject name'){

              }
              else if(i==2&&this.tableTitle1[2]=='chapter name'){

              }
              else if(i==3&&this.tableTitle1[3]=='topic name'){

              }
              else{
                Swal.fire({title:'Wrong Excel Format Detected',icon:'info'})
                this.tableData1=[]
                this.tableTitle1=[]
              }
              
              i++
            });
          }
  
  
          
        };
      } else {
        Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
        e.target.value = '';
      }
  }
  tableData1:any[]=[]
  tableTitle1:any[]=[]
  getMasterClass() {
    let body={school_id:this.school_id}
    this._auth.getAllMasterClass(body).subscribe((res) => {
      if ((res.status = 'success')) {
        this.masterclasses = res.master_classes;
      }
    });
  }
  ngOnInit(): void {
    this.get_schools()
  }

}


