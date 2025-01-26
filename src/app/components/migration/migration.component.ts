import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-migration',
  templateUrl: './migration.component.html',
  styleUrls: ['./migration.component.css'],
})
export class MigrationComponent implements OnInit {
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
    private cd: ChangeDetectorRef,
    private _http: HttpClient,
    private datepipe: DatePipe
  ) {
    this.Subject_Form = this._fb.group({
      inputs: this._fb.array([]),
    });
    this.Class_Form = this._fb.group({
      inputs1: this._fb.array([]),
    });
    this.Student_Form = this._fb.group({
      inputs2: this._fb.array([]),
    });
    this.Employee_Form = this._fb.group({
      inputs3: this._fb.array([]),
    });
    this.Teacher_Form = this._fb.group({
      inputs4: this._fb.array([]),
    });
    this.Fee_Form = this._fb.group({
      inputs6: this._fb.array([]),
    });
    this.Concession_Form = this._fb.group({
      inputs5: this._fb.array([]),
    });
    this.Invoice_Form = this._fb.group({
      inputs7: this._fb.array([]),
    });
    this.Student_Marks_Form = this._fb.group({
      inputs8: this._fb.array([]),
    });
  }
  Student_Marks_Form!: FormGroup;
  Invoice_Form!: FormGroup;
  Concession_Form!: FormGroup;
  Fee_Form!: FormGroup;
  Subject_Form!: FormGroup;
  Class_Form!: FormGroup;
  Employee_Form!: FormGroup;
  Student_Form!: FormGroup;
  Teacher_Form!: FormGroup;
  schoolsList: any[] = [];
  keyword: any = 'school_name';
  school_id: any;
  school_id3: any;
  school_search_form = this._fb.group({
    school: [''],
  });
  school_search_form1 = this._fb.group({
    school: [''],
  });
  school_search_form2 = this._fb.group({
    school: [''],
  });
  school_search_form3 = this._fb.group({
    school: [''],
    view_type: ['1'],
  });
  school_search_form4 = this._fb.group({
    school: [''],
  });
  school_search_form5 = this._fb.group({
    school: [''],
  });
  school_search_form6 = this._fb.group({
    school: [''],
    s_date: [''],
    e_date: [''],
  });
  school_search_form7 = this._fb.group({
    school: [''],
    from_class: [''],
    to_class: [''],
    from_exam: [''],
    to_exam: [''],
    from_ay: [''],
    to_ay: [''],
  });
  school_search_form8 = this._fb.group({
    school: [''],
  });
  school_search_form9 = this._fb.group({
    school: [''],
  });
  school_search_form10 = this._fb.group({
    school: [''],
  });
  school_search_form11 = this._fb.group({
    school: [''],
  });
  school_search_form12 = this._fb.group({
    school: [''],
  });
  school_search_form13 = this._fb.group({
    school: [''],
  });
  bulk_attendance_form = this._fb.group({
    file: [''],
    type: ['1'],
    ay: ['11'],
    file2:[''],
    file_type:['1']
  });
  bulk_notification_form = this._fb.group({
    file: [''],
    type: ['1'],
    ay: ['11'],
    file2:[''],
    file_type:['1']
  });
  bulk_homework_form = this._fb.group({
    file: [''],
    file2: [''],
    ay: ['11'],
  });
  bulk_assignment_form = this._fb.group({
    file2: [''],
    file: [''],
    ay: ['11'],
  });
  bulk_circular_form = this._fb.group({
    file: [''],
    ay: ['11'],
  });
  bulk_showcase_form = this._fb.group({
    file: [''],
    ay: ['11'],
  });
  master_class_form = this._fb.group({});
  class_select_form = this._fb.group({});
  employee_select_form = this._fb.group({});
  role_select_form = this._fb.group({});
  fee_term_form = this._fb.group({});
  fee_head_form = this._fb.group({});
  group: any = {};
  group2: any = {};
  group3: any = {};
  group4: any = {};
  group5: any = {};
  group6: any = {};

  get inputs() {
    return this.Subject_Form.get('inputs') as FormArray;
  }
  get inputs1() {
    return this.Class_Form.get('inputs1') as FormArray;
  }
  get inputs2() {
    return this.Student_Form.get('inputs2') as FormArray;
  }
  get inputs3() {
    return this.Employee_Form.get('inputs3') as FormArray;
  }
  get inputs4() {
    return this.Teacher_Form.get('inputs4') as FormArray;
  }
  get inputs5() {
    return this.Concession_Form.get('inputs5') as FormArray;
  }
  get inputs6() {
    return this.Fee_Form.get('inputs6') as FormArray;
  }
  get inputs7() {
    return this.Invoice_Form.get('inputs7') as FormArray;
  }
  get inputs8() {
    return this.Student_Marks_Form.get('inputs8') as FormArray;
  }

  get_schools() {
    let body = {};
    this.schoolsList = [];
    this._auth.migration_schools(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.schoolsList = res.getallSchool;
      }
    });
  }
  subject_list: any[] = [];
  selected_school(item: any) {
    this.school_id = item.school_id;
    let body = {
      school_id: item.school_id,
    };
    this.Subject_Form = this._fb.group({
      inputs: this._fb.array([]),
    });
    this.subject_list = [];
    this.tableData1.clear();
    // (<HTMLInputElement>document.getElementById('my-file-selector')).value = '';
    this._auth.view_subjects(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.subject_list = res.subjects;
        if (res.count == 0) {
          this.subject_list = [];
        }
        this.subject_list.forEach((element) => {
          if (element.subject_type) {
          } else {
            element.subject_type = '';
          }
          if (element.subject_category) {
          } else {
            element.subject_category = '';
          }
          if (element.IB_subject) {
          } else {
            element.IB_subject = '';
          }
          this.inputs.push(this._fb.control(element));

          this.tableData1.add(
            String(
              element.subject_name +
                ',' +
                element.subject_type +
                ',' +
                element.subject_category
            )
          );
        });
      }
    });
  }
  school_id4: any;
  school_id5: any;
  fee_sets = new Set();
  selected_school4(item: any) {
    let other_school_id = item.other_school_id;
    let other_org_id = item.other_org_id;
    this.school_id4 = item.school_id;
    let body = {
      school_id: item.school_id,
    };
    this.Fee_Form = this._fb.group({
      inputs6: this._fb.array([]),
    });
    this.fee_list = [];
    this.new_fee_list = [];
    // this.tableData1.clear();
    this._auth.get_school_fee(body).subscribe((res: any) => {
      this.fee_list = [];
      if (res.status == 'success') {
        this.fee_list = res.fee_heads;
        let fee_terms = res.fee_terms;
        console.log(fee_terms);
        let i = 0;
        this.fee_list.forEach((element: any) => {
          element.fee_term = [];
          element.index = i;
          fee_terms.forEach((elements: any) => {
            if (element.assigned_id == elements.fee_head_assigned_id) {
              element.fee_term.push(elements);
            }
          });
          i++;
        });
        console.log(this.fee_list);
      }
      this._auth.get_all_students(body).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.count > 0) {
            this.student_list = res.students;
            let i = 0;
            this.student_list.forEach((element) => {
              element.index = i;
              this.student_set1.add(element.student_reg_id);

              i++;
            });
          }
        }
        this._http
          .get(
            ` https://api.patasala.in/api/schoolknot/studentFeePlans/` +
              other_org_id +
              `/` +
              other_school_id
          )
          .subscribe((res: any) => {
            this.new_fee_list = res;
            console.log(res);
            this.new_fee_list.forEach((element: any) => {
              if (this.student_set1.has(String(element.StudentId))) {
                element.std_reg_id = element.StudentId;
                element.school_id = this.school_id4;
                element.fee = element.AssignedAmount;
                let val: any;
                val = this.fee_list.filter(
                  (a: any) => element.FeeHeadName == a.fee_head
                );
                let index = '';
                // console.log(index)
                element.assigned_id = '';
                element.term_id = '';
                if (val[0]) {
                  let terms = val[0].fee_term.filter(
                    (a: any) => element.TermName == a.term_name
                  );
                  if (terms[0]) {
                    element.assigned_id = terms[0].fee_head_assigned_id;
                    element.term_id = terms[0].term_id;
                  }
                  index = val[0].index;
                }
                element.fee_index = index;
                const value = this._fb.group({
                  school_id: [this.school_id4],
                  index: [element.fee_index],
                  std_reg_id: [element.StudentId],
                  fee: [element.AssignedAmount],
                  assigned_id: [element.assigned_id ? element.assigned_id : ''],
                  term_id: [element.term_id ? element.term_id : ''],
                  valid: [
                    element.term_id && element.assigned_id ? true : false,
                  ],
                });
                this.inputs6.push(value);
              } else {
                console.log(element);
                console.log('not present');
              }
            });
          });
      });
    });
  }
  new_concession_list: any[] = [];
  concession_list: any[] = [];
  fee_list1: any[] = [];
  selected_school5(item: any) {
    let other_school_id = item.other_school_id;
    let other_org_id = item.other_org_id;
    this.school_id5 = item.school_id;
    let body = {
      school_id: item.school_id,
    };
    this.Concession_Form = this._fb.group({
      inputs5: this._fb.array([]),
    });
    this.fee_list1 = [];
    this.concession_list = [];
    this.new_concession_list = [];
    // this.tableData1.clear();
    this._auth.get_school_fee(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.fee_list1 = res.fee_heads;
        this.concession_list = res.concessionsDetails;
        let fee_terms = res.fee_terms;
        console.log(fee_terms);
        let i = 0;
        this.fee_list1.forEach((element: any) => {
          element.fee_term = [];
          element.index = i;
          fee_terms.forEach((elements: any) => {
            if (element.assigned_id == elements.fee_head_assigned_id) {
              element.fee_term.push(elements);
            }
          });
          i++;
        });
        console.log(this.concession_list);
      }
      this._auth.get_all_students(body).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.count > 0) {
            this.student_list = res.students;
            let i = 0;
            this.student_list.forEach((element) => {
              element.index = i;
              this.student_set2.add(element.student_reg_id);

              i++;
            });
          }
        }
      });
      this._http
        .get(
          `https://api.patasala.in/api/schoolknot/studentConcessions/` +
            other_org_id +
            `/` +
            other_school_id
        )
        .subscribe((res: any) => {
          this.new_concession_list = res;
          console.log(res);
          this.new_concession_list.forEach((element: any) => {
            element.std_reg_id = element.StudentId;
            element.school_id = this.school_id5;
            element.fee = element.AssignedAmount;
            let val: any;
            let cons: any;
            val = this.fee_list1.filter(
              (a: any) => element.FeeHeadName == a.fee_head
            );

            cons = this.concession_list.filter(
              (a: any) => element.ConcessionCategoryName == a.title
            );

            let index = '';
            // console.log(index)
            element.assigned_id = '';
            element.term_id = '';
            element.concession_amount = element.ConcessionAmount;

            if (cons[0]) {
              element.concession_id = cons[0].id;
            }

            if (val[0]) {
              let terms = val[0].fee_term.filter(
                (a: any) => element.TermName == a.term_name
              );
              if (terms[0]) {
                element.assigned_id = terms[0].fee_head_assigned_id;
                element.term_id = terms[0].term_id;
              }
              index = val[0].index;
            }
            element.fee_index = index;
            const value = this._fb.group({
              school_id: [this.school_id5],
              index: [element.fee_index],
              std_reg_id: [element.StudentId],
              concession_amount: [element.ConcessionAmount],
              assigned_id: [element.assigned_id ? element.assigned_id : ''],
              term_id: [element.term_id ? element.term_id : ''],
              concession_id: [
                element.concession_id ? element.concession_id : '',
              ],
              concession_reason: [
                element.concession_reason ? element.concession_reason : '',
              ],
              valid: [
                element.term_id && element.assigned_id && element.concession_id
                  ? true
                  : false,
              ],
            });

            this.inputs5.push(value);
          });
        });
    });
  }
  fee_list2 = [];
  invoice_list: any[] = [];
  new_invoice_list: any[] = [];
  student_list3: any[] = [];
  class_list2: any[] = [];
  school_id6: any;
  school_id7: any;
  other_school_id1: any;
  other_school_id: any;
  other_org_id1: any;
  other_org_id: any;
  set_school_for_fee(item: any) {
    this.other_school_id = item.other_school_id;
    this.other_org_id = item.other_org_id;
    this.school_id6 = item.school_id;
  }
  set_school_for_exam(item: any) {
    this.school_search_form7.patchValue({
      from_class: '',
      from_exam: '',
      to_class: '',
      to_exam: '',
      from_ay:'',
      to_ay:''
    });
    this.Student_Marks_Form = this._fb.group({
      inputs8: this._fb.array([]),
    });
    this.student_exam_marks = [];
    this.exam_id = [];
    this.class = '';
    this.school_exam_list = [];
    this.class_name = '';
    this.other_school_id1 = item.other_school_id;
    this.other_org_id1 = item.other_org_id;
    this.school_id7 = item.school_id;
    let body = { school_id: this.school_id7 };
    this._http
    .get(
      `https://api.patasala.in/api/schoolknot/academicyears/all/` +
        this.other_org_id1 ).subscribe((res:any)=>{
          this.patsala_ay=res
        })
    this._auth.getAllClasses(body).subscribe((res: any) => {
      this.class_list2 = res.classes;
    });
  }
  school_exam_list: any[] = [];
  exam_list: any[] = [];
  student_exam_marks: any[] = [];
  class_name: any;
  get_exams(item: any) {
    if(this.school_search_form7.value.from_ay&&this.school_search_form7.value.to_ay){
      let id = item.target.value;
      let class_details = this.class_list2.filter((a: any) => a.class_id == id);
      console.log(class_details[0]);
      let class_id = class_details[0].class_id;
      let array = [];
      array.push(class_id);
      this.class_name = class_details[0].class_name;
      let body = {
        class_ids: array,
        school_id: this.school_id7,
        academic_year: this.school_search_form7.value.to_ay,
      };
      this._auth.get_school_exams(body).subscribe((res: any) => {
        this.school_exam_list = res.exams;
      });
      this._http
        .get(
          `https://api.patasala.in/api/schoolKnot/examDefinitions/` +
            this.other_org_id1 +
            `/` +
            this.other_school_id1 +
            '/'+this.school_search_form7.value.from_ay+'/' +
            this.class_name
        )
        .subscribe((res: any) => {
          this.exam_list = res;
          console.log(res);
        });
    }

    else{
      Swal.fire({title:'Please Select Academic Years',icon:'info'})

    }
    
  }
  class: any;
  exam_id: any;
  category_list: any[] = [];
  exam_subjects_list: any[] = [];
  patsala_ay:any[]=[]
  excel_sheet1(){
      const EXCEL_EXTENSION = '.xlsx';
      let name = 'marks_report';
      const worksheet = XLSX.utils.json_to_sheet(this.student_exam_marks);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet');
  
      XLSX.writeFile(wb, name + EXCEL_EXTENSION);
  }
  selected_school7() {
    console.log(this.school_search_form7.value);
    let body = {
      exam_id: this.school_search_form7.value.to_exam,
      class_id: this.school_search_form7.value.from_class,
      subject_category: '1',
    };
    this.exam_id = body.exam_id;
    this.class = body.class_id;
    this._auth.get_school_exams_details(body).subscribe((result: any) => {
      if (result.status == 'success') {
        this.exam_subjects_list = result.exam_subjects;
      }
      this._auth.get_exam_categories(body).subscribe((ress: any) => {
        if (ress.status == 'success') {
          this.category_list = ress.categories;
          if(ress.count==0){
            Swal.fire({title:'Categories Not added in schoolknot Exams',icon:'info'})
          }
        }

     
        this._http
          .get(
            `https://api.patasala.in/api/schoolKnot/examMarks/` +
              this.other_org_id1 +
              `/` +
              this.other_school_id1 +
              '/'+this.school_search_form7.value.from_ay+'/' +
              this.class_name +
              '/' +
              this.school_search_form7.value.from_exam
          )
          .subscribe((res: any) => {
            this.student_exam_marks = res;
            this.student_exam_marks.forEach((element: any) => {
              let val = '';
              let values = this.exam_subjects_list.filter(
                (a: any) =>
                  a.subject_name.toLowerCase() ==
                  element.Subject.toLowerCase()
              );
              if (values[0]) {
                val = values[0].subject_id;
                element.subject_id = values[0].subject_id;
                element.es_id = values[0].es_id;
                element.category_id = values[0].id;
              }
              console.log(values);
              const value = this._fb.group({
                school_id: [this.school_id7],
                student_reg_id: [element.AdmissionNumber],
                class: [element.Class],
                exam: [values[0] ? values[0].exam_id : ''],
                subject_id: [values[0] ? values[0].subject_id : ''],
                es_id: [values[0] ? values[0].es_id : ''],
                category_id: [this.category_list[0].id],
                marks: [element.Marks ? element.Marks : ''],
                max_marks: [element.MaxMarks ? element.MaxMarks : ''],
                valid: [
                  element.subject_id &&
                  element.es_id &&
                  element.category_id &&
                  element.Marks <= element.MaxMarks
                    ? true
                    : false,
                ],
              });
              this.inputs8.push(value);
            });
            console.log(res);
          });
      });
    });
  }
  set_marks_category(item:any){
// console.log(this.inputs8.value)
// let i=0
// this.inputs8.value.forEach((element:any) => {
//   this.inputs8.value[i]['category_id']=item.target.value
//   i++
// });
let unchecked_values = this.inputs8.value;

this.Student_Marks_Form = this._fb.group({
  inputs8: this._fb.array([]),
});
console.log(unchecked_values)
unchecked_values.forEach((element: any) => {
  const value = this._fb.group({
    school_id: [this.school_id7],
    student_reg_id: [element.student_reg_id],
    class: [element.class],
    exam: [element.exam_id ? element.exam_id : ''],
    subject_id: [element.subject_id ? element.subject_id : ''],
    es_id: [element.es_id ? element.es_id : ''],
    category_id: [item.target.value ? item.target.value : ''],
    marks: [element.marks ? element.marks : ''],
    max_marks: [element.max_marks ? element.max_marks : ''],
    valid: [
      element.subject_id &&
      element.es_id &&
      item.target.value &&
      (this.isNumber(element.marks)
        ? element.marks <= element.max_marks
        : element.marks)
        ? true
        : false,
    ],
  });
  this.inputs8.push(value);
})
  }
  school_id8: any;
  school_id9: any;
  school_id10: any;
  school_id11: any;
  school_id12: any;
  class_list3: any[]=[];
  class_list4: any[]=[];
  student_list2: any[]=[];
  employee_list2: any[]=[];
  teacher_list2: any[]=[];
  student_list4: any[]=[];
  selected_school8(item: any) {
    // console.log(this.school_search_form8.value);
    this.school_id8 = item.school_id;
    let body = {school_id:this.school_id8,
      status: 'all',

    };
    this._auth.get_all_students(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.count > 0) {
          this.student_list4 = res.students;
          this.student_list4.forEach((element:any)=>{
            
            let first = element.first_name.replace(/ +/g, '')
            let middle = element.middle_name.replace(/ +/g, '')
            let last = element.last_name.replace(/ +/g, '')
            let fathername = element.father_name.replace(/ +/g, '')
            let mothername = element.mother_name.replace(/ +/g, '')
                        element.fullname=first+middle+last
                        element.fathername=fathername
                        element.mothername=mothername
                      })
        }
      }
    })
    this._auth.getEmployees(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.count > 0) {
          this.employee_list2=res.employees
          this.employee_list2.forEach((element:any)=>{
            
let name = element.full_name.replace(/ +/g, '')
            element.fullname=name
          })
        }
      }
    })
    this._auth.getTeachers(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.count > 0) {
          this.teacher_list2=res.teachers
          this.teacher_list2.forEach((element:any)=>{
            
            let first = element.first_name.replace(/ +/g, '')
            let middle = element.middle_name.replace(/ +/g, '')
            let last = element.last_name.replace(/ +/g, '')
                        element.fullname=first+middle+last
                      })
        }
      }
    })

  }
  selected_school9(item: any) {
    // console.log(this.school_search_form8.value);
    this.school_id9 = item.school_id;
    let body = {school_id:this.school_id9};
    this._auth.getAllClasses(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.class_list3 = [];
        if (res.count > 0) {

          this.class_list3 = res.classes;
              this.class_list3.forEach((element:any)=>{
                if(element.subject_name){
                  element.subject_names=element.subject_name.split(', ')

                }
                else{
                  element.subject_names=[]
                }
        })
        
        }
      }
    })


  }
  selected_school10(item: any) {
    // console.log(this.school_search_form8.value);
    this.school_id10 = item.school_id;
    let body = {school_id:this.school_id10};
    this._auth.getAllClasses(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.class_list4 = [];
        if (res.count > 0) {

          this.class_list4 = res.classes;
              this.class_list4.forEach((element:any)=>{
                if(element.subject_name){
                  element.subject_names=element.subject_name.split(', ')

                }
                else{
element.subject_names=[]
                }
        })
        
        }
      }
    })
  }
  selected_school11(item: any) {
    // console.log(this.school_search_form8.value);
    let body = {};
    this.school_id11 = item.school_id;
  }
  selected_school12(item: any) {
    // console.log(this.school_search_form8.value);
    let body = {};
    this.school_id12 = item.school_id;
  }
  school_id13:any
  student_list5:any[]=[]
  selected_school13(item: any) {
    // console.log(this.school_search_form8.value);
    this.school_id13 = item.school_id;
    let body = {school_id:this.school_id13,
      status: 'all',

    };
    this._auth.get_all_students(body).subscribe((res: any) => {
      if (res.status == 'success') {
        if (res.count > 0) {
          this.student_list5 = res.students;
         
      }
    }
    })
  }
  bulk_notification2(e: any) {
    this.bulk_notification_form.patchValue({file:""})

    this.tableData3 = [];
    this.tableTitle3 = [];
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    let fileList = e.target.files;
    let file = fileList[0];
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
    if (file.type.split('/')[1].includes('json') && file.size <= 5000000) {
      const reader: FileReader = new FileReader();

      reader.readAsText(target.files[0]);
      reader.onload = (e: any) => {
        let binarystr:any 
        binarystr = e.target.result;
        if(binarystr){
          binarystr=JSON.parse(binarystr)
          let value:any=[]
          value=binarystr.reportdata
          let keys=Object.keys(value[0])
          let valid_keys=['admissionNumber','fromTeacherOrParent','fromName','toName','messageTitle','messageBody','sentDateTime']
          let found3:any
          let bool=true
          valid_keys.forEach((elements:any) => {
            found3 = keys.some((el:any) => el == elements);
           
          
            if(!found3){
              bool=false
            }
          });
          if(bool){
    this.tableTitle3=['Admission No','From','To','Subject','Message','Status']
          let i=0
          value.forEach((element:any) => {
            let val=false
            let val2=false
            let type=''
            let type2=''
            let from_reg_id=''
            let to_reg_id=''
            if(element.fromTeacherOrParent=='From parent'){
              // if(this.student_list4.length>0){
              //   let from_name=element.fromName.replace(/ +/g, '')
              //   let to_name=element.toName.replace(/ +/g, '')
              //   const found= this.student_list4.filter(el => el.fullname == from_name);
              //   const found2= this.student_list4.filter(el => el.fathername == from_name);
              //   const found3= this.student_list4.filter(el => el.mothername == from_name);
               
              //   if(found.length>0||found2.length>0||found3.length>0){
              //     if(found.length>0){
              //       from_reg_id=found[0].student_reg_id
              //     }
              //     if(found2.length>0){
              //       from_reg_id=found2[0].student_reg_id
                    
              //     }
              //     if(found3.length>0){
              //       from_reg_id=found3[0].student_reg_id

              //     }
              //     val=true                
              //     type='1'
              //   }
                           
              // }
              val=true
              type='1'
              from_reg_id=element.admissionNumber
              if(this.employee_list2.length>0){
                let to_name=element.toName.replace(/ +/g, '')
                const found2= this.employee_list2.filter(el => el.fullname == to_name);
                
                if(found2.length>0){
                  to_reg_id=found2[0].emp_reg_id
                  
                  val2=true                
                  type2='3'
                }              
              }
              if(this.teacher_list2.length>0){
                let to_name=element.toName.replace(/ +/g, '')
                const found2= this.teacher_list2.filter(el => el.fullname == to_name);
                
                if(found2.length>0){
                  to_reg_id=found2[0].teacher_reg_id
                  val2=true                
                  type2='2'
                }              
              }
            }
            else{

              // if(this.student_list4.length>0){
              //   let to_name=element.toName.replace(/ +/g, '')
             
              //   const found4= this.student_list4.filter(el => el.fullname == to_name);
              //   const found5= this.student_list4.filter(el => el.fathername == to_name);
              //   const found6= this.student_list4.filter(el => el.mothername == to_name);
               
              //   if(found4.length>0||found5.length>0||found6.length>0){
              //     if(found4.length>0){
              //     to_reg_id=found4[0].student_reg_id
              //     }
              //     if(found5.length>0){
              //     to_reg_id=found5[0].student_reg_id
              //     }
              //     if(found6.length>0){
              //     to_reg_id=found6[0].student_reg_id
              //     }
              //     val2=true                
              //     type2='1'
              //   }              
              // }
              val2=true
              type2='1'
              to_reg_id=element.admissionNumber
              if(this.employee_list2.length>0){
                let from_name=element.fromName.replace(/ +/g, '')
                let to_name=element.toName.replace(/ +/g, '')
                const found= this.employee_list2.filter(el => el.fullname == from_name);
                // const found2= this.employee_list2.filter(el => el.fullname == to_name);
                if(found.length>0){
                  from_reg_id=found[0].emp_reg_id

                  val=true                
                  type='3'
                }
                // if(found2.length>0){
                //   to_reg_id=found2[0].emp_reg_id

                //   val2=true                
                //   type2='3'
                // }              
              }
              if(this.teacher_list2.length>0){
                let from_name=element.fromName.replace(/ +/g, '')
                let to_name=element.toName.replace(/ +/g, '')
                const found= this.teacher_list2.filter(el => el.fullname == from_name);
                // const found2= this.teacher_list2.filter(el => el.fullname == to_name);
                if(found.length>0){
                  from_reg_id=found[0].teacher_reg_id

                  val=true                
                  type='2'
                }
                // if(found2.length>0){
                //   to_reg_id=found2[0].teacher_reg_id

                //   val2=true                
                //   type2='2'
                // }              
              }
            }



            this.tableData2[i]=[from_reg_id,to_reg_id,type,type2,element.messageTitle,element.messageBody,this.datepipe.transform(element.sentDateTime,'yyyy-MM-dd HH:mm:ss'),element.seenDateTime?2:1,val&&val2]

            i++
          });
        }
        else{

          Swal.fire({ title: 'Wrong JSON File', icon: 'info' });
        this.bulk_notification_form.patchValue({file2:""})
        }
        
      }

      };
    } else {
      Swal.fire({ title: 'Only JSON File Allowed', icon: 'info' });
    this.bulk_notification_form.patchValue({file2:""})

    }
  }
  bulk_notification(e: any) {
    this.bulk_notification_form.patchValue({file2:""})

    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    let fileList = e.target.files;
    this.base64code4image = e.target;
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData2 = data;
        this.tableTitle2 = this.tableData2[0];

        // this.tableTitle.push('Status');
        this.tableData2.shift();
        this.tableData2 = this.tableData2.filter((a: any) => a != '');
        this.tableData2.forEach((element) => {
          element[3] = this.datepipe.transform(element[3], 'dd/MM/yyyy');
          // this.tableData5[4]=
        });
        if (this.tableTitle2.length > 0) {
          let i = 0;
          this.tableTitle2.forEach((element) => {
            if (i == 0 && this.tableTitle2[0] == 'Registration ID') {
            } else if (i == 1 && this.tableTitle2[1] == 'Subject') {
            } else if (i == 2 && this.tableTitle2[2] == 'Message') {
            } else if (i == 3 && this.tableTitle2[3] == 'Datetime') {
            } else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.tableData2 = [];
              this.tableTitle2 = [];
              this.base64code4image = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
      e.target.value = '';
      this.bulk_notification_form.patchValue({file:""})

    }
  }
  bulk_homework(e: any) {
    this.bulk_homework_form.patchValue({file2:""})
    this.tableData3 = [];
    this.tableTitle3 = [];
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData3 = data;
        this.tableTitle3 = this.tableData3[0];

        this.tableTitle3.push('Status');
        this.tableData3.shift();
        this.tableData3 = this.tableData3.filter((a: any) => a != '');
        this.tableData3.forEach((element) => {
          element[4] = this.datepipe.transform(element[4], 'yyyy-MM-dd');
          // this.tableData3[4]=
          let val=false
            if(this.class_list3.length>0){
              let found:any
              found= this.class_list3.filter(el => el.class_name == element[0]);
              if(found.length==0){
                val=false
              }
              else{
                let j=0;
                let found2:any
                found.forEach((elements:any) => {
                  
                  found2 = found[j].subject_names.some((el:any) => el == element[1]);
              
                  if(found2){
                    val=true
                  }
                  j++
                });
              }
            }
            element[5]=val

        });
        if (this.tableTitle3.length > 0) {
          let i = 0;
          this.tableTitle3.forEach((element) => {
            if (i == 0 && this.tableTitle3[0] == 'Class Name') {
            } else if (i == 1 && this.tableTitle3[1] == 'Subject Name') {
            } else if (i == 2 && this.tableTitle3[2] == 'Note') {
            } else if (i == 3 && this.tableTitle3[3] == 'File name') {
            } else if (i == 4 && this.tableTitle3[4] == 'Date') {
            }
            else if (i == 5 && this.tableTitle3[5] == 'Status') {
            } else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.tableData3 = [];
              this.tableTitle3 = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
    this.bulk_homework_form.patchValue({file:""})

    }
  }
  bulk_homework2(e: any) {
    this.bulk_homework_form.patchValue({file:""})

    this.tableData3 = [];
    this.tableTitle3 = [];
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    let fileList = e.target.files;
    let file = fileList[0];
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
    if (file.type.split('/')[1].includes('json') && file.size <= 5000000) {
      const reader: FileReader = new FileReader();

      reader.readAsText(target.files[0]);
      reader.onload = (e: any) => {
        let binarystr:any 
        binarystr = e.target.result;
        if(binarystr){
          binarystr=JSON.parse(binarystr)
          let value:any=[]
          value=binarystr.reportdata
          let keys=Object.keys(value[0])
          let valid_keys=['class','section','diary','physicalFileName','entrydate']
          let found3:any
          let bool=true
          valid_keys.forEach((elements:any) => {
            found3 = keys.some((el:any) => el == elements);
           
          
            if(!found3){
              bool=false
            }
          });
          if(bool){
    this.tableTitle3=['Class Name','Subject Name','Note','File Name','Date','Status']
          let i=0
          value.forEach((element:any) => {
            let val=false
            if(this.class_list3.length>0){
              let found:any
               found= this.class_list3.filter((el:any) => el.class_name == element.class+'-'+element.section);
               
               if(found.length==0){
                 console.log(found)
                 val=false
                }
              else{
                let j=0;
                let found2:any
                found.forEach((elements:any) => {
                  
                  found2 = found[j].subject_names.some((el:any) => el == element.subject);
                  if(found2){
                    val=true
                  }
                  j++
                });
              }
            }
            this.tableData3[i]=[element.class+'-'+element.section,element.subject,element.diary,element.physicalFileName,this.datepipe.transform( element.entrydate,'yyyy-MM-dd'),val]

            i++
          });
        }
        else{

          Swal.fire({ title: 'Wrong JSON File', icon: 'info' });
        this.bulk_homework_form.patchValue({file2:""})
        }
        
      }

      };
    } else {
      Swal.fire({ title: 'Only JSON File Allowed', icon: 'info' });
    this.bulk_homework_form.patchValue({file2:""})

    }
  }
  bulk_assignment2(e: any) {
    this.bulk_assignment_form.patchValue({file:""})  

    this.tableData4 = [];
    this.tableTitle4 = [];
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    let fileList = e.target.files;
    let file = fileList[0];
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
    if (file.type.split('/')[1].includes('json') && file.size <= 5000000) {
      const reader: FileReader = new FileReader();

      reader.readAsText(target.files[0]);
      reader.onload = (e: any) => {
        let binarystr:any 
        binarystr = e.target.result;
        if(binarystr){
          binarystr=JSON.parse(binarystr)
          let value:any=[]
          value=binarystr.reportdata
          let keys=Object.keys(value[0])
          let valid_keys=['class','section','name','files','createddate','instructions']
          let found3:any
          let bool=true
          valid_keys.forEach((elements:any) => {
            found3 = keys.some((el:any) => el == elements);
           
          
            if(!found3){
              bool=false
            }
          });
          if(bool){
            this.tableTitle4=['Class Name','Subject Name','Title','File Name','Date','Description','Status']
          
            let i=0
            value.forEach((element:any) => {
              let val=false
              if(this.class_list4.length>0){
                let found:any
                 found= this.class_list4.filter(el => el.class_name == element.class+'-'+element.section);
                if(found.length==0){
                  val=false
                }
                else{
                  let j=0;
                  let found2:any
                  found.forEach((elements:any) => {
                    found2 = found[j].subject_names.some((el:any) => el == element.subject);
                   
                  
                    if(found2){
                      val=true
                    }
                    j++
                  });
                }
              }
              this.tableData4[i]=[element.class+'-'+element.section,element.subject,element.name,element.files,this.datepipe.transform( element.createddate,'yyyy-MM-dd'),element.instructions,val]
  
              i++
            });
          }
          else{

            Swal.fire({ title: 'Wrong JSON File', icon: 'info' });
          this.bulk_assignment_form.patchValue({file2:""})  
            
          }
          
        
      }

      };
    } else {
      Swal.fire({ title: 'Only JSON File Allowed', icon: 'info' });
    this.bulk_assignment_form.patchValue({file2:""})  

    }
  }
  bulk_assignment(e: any) {
    this.bulk_assignment_form.patchValue({file2:""})

    this.tableData4 = [];
    this.tableTitle4 = [];
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData4 = data;
        this.tableTitle4 = this.tableData4[0];

        this.tableTitle4.push('Status');
        this.tableData4.shift();
        this.tableData4 = this.tableData4.filter((a: any) => a != '');
        this.tableData4.forEach((element) => {
          element[4] = this.datepipe.transform(element[4], 'yyyy-MM-dd');
          let val=false
            if(this.class_list4.length>0){
              let found:any
               found= this.class_list4.filter(el => el.class_name == element[0]);
              if(found.length==0){
                val=false
              }
              else{
                let j=0;
                let found2:any
                found.forEach((elements:any) => {
                  
                  found2 = found[j].subject_names.some((el:any) => el == element[1]);
                
                  if(found2){
                    val=true
                  }
                  j++
                });
              }
            }
            element[6]=val

          // this.tableData4[4]=
        });
        if (this.tableTitle4.length > 0) {
          let i = 0;
          this.tableTitle4.forEach((element) => {
            if (i == 0 && this.tableTitle4[0] == 'Class Name') {
            } else if (i == 1 && this.tableTitle4[1] == 'Subject Name') {
            } else if (i == 2 && this.tableTitle4[2] == 'Title') {
            } else if (i == 3 && this.tableTitle4[3] == 'File name') {
            } else if (i == 4 && this.tableTitle4[4] == 'Date') {
            } else if (i == 5 && this.tableTitle4[5] == 'Description') {
            }
            else if (i == 6 && this.tableTitle4[6] == 'Status') {
            } else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.bulk_assignment_form.patchValue({file:""})  
              this.tableData4 = [];
              this.tableTitle4 = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
    this.bulk_assignment_form.patchValue({file:""})  

    }
  }
  bulk_attendance(e: any) {
    this.bulk_attendance_form.patchValue({file2:""})

    this.tableData7 = [];
    this.tableTitle7 = [];
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { raw:false,header: 1, dateNF:'yyyy-mm-dd'}); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData7 = data;
        this.tableTitle7 = this.tableData7[0];

        this.tableTitle7.push('Status');
        this.tableData7.shift();
        this.tableData7 = this.tableData7.filter((a: any) => a != '');
        this.tableData7.forEach((element) => {
          let val1=false
          // element[1] = this.datepipe.transform(element[1], 'yyyy-MM-dd');
          if(isValidDate(element[1])){
            val1=true
          }
          let val=false
            if(this.student_list5.length>0){
               const found= this.student_list5.some(el => el.student_reg_id == element[0]);
              if(found){
                val=true
              }
              
            }
            element[2]=val&&val1

          // this.tableData7[4]=
        });
        if (this.tableTitle7.length > 0) {
          let i = 0;
          this.tableTitle7.forEach((element) => {
            if (i == 0 && this.tableTitle7[0] == 'Student Reg ID (Mandatory)') {
            } else if (i == 1 && this.tableTitle7[1] == 'Date (dd-mm-YYYY)') {
            } 
            else if (i == 2 && this.tableTitle7[2] == 'Status') {
            } else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.bulk_assignment_form.patchValue({file:""})  
              this.tableData7 = [];
              this.tableTitle7 = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
    this.bulk_assignment_form.patchValue({file:""})  

    }
  }

  bulk_circular(e: any) {
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData5 = data;
        this.tableTitle5 = this.tableData5[0];

        // this.tableTitle.push('Status');
        this.tableData5.shift();
        this.tableData5 = this.tableData5.filter((a: any) => a != '');
        this.tableData5.forEach((element) => {
          element[4] = this.datepipe.transform(element[4], 'yyyy/MM/dd');
          // this.tableData5[4]=
        });
        if (this.tableTitle5.length > 0) {
          let i = 0;
          this.tableTitle5.forEach((element) => {
            if (i == 0 && this.tableTitle5[0] == 'Class Name') {
            } else if (i == 1 && this.tableTitle5[1] == 'Title') {
            } else if (i == 2 && this.tableTitle5[2] == 'File name') {
            } else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.tableData5 = [];
              this.tableTitle5 = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
    }
    console.log(this.tableData5);
  }
  bulk_showcase(e: any) {
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
        const wb: XLSX.WorkBook = XLSX.read(binarystr, {
          type: 'binary',
          cellText: false,
          cellDates: true,
        });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        this.tableData6 = data;
        this.tableTitle6 = this.tableData6[0];

        // this.tableTitle.push('Status');
        this.tableData6.shift();
        this.tableData6 = this.tableData6.filter((a: any) => a != '');
        this.tableData6.forEach((element) => {
          element[3] = this.datepipe.transform(element[3], 'yyyy-MM-dd');
          // this.tableData6[4]=
        });
        if (this.tableTitle6.length > 0) {
          let i = 0;
          this.tableTitle6.forEach((element) => {
            if (i == 0 && this.tableTitle6[0] == 'Class Name') {
            } else if (i == 1 && this.tableTitle6[1] == 'Title') {
            } 
            else if (i == 2 && this.tableTitle6[2] == 'File name') {
            }
            else if (i == 3 && this.tableTitle6[3] == 'Date') {
            }
             else {
              Swal.fire({ title: 'Wrong Excel Format Detected', icon: 'info' });
              this.tableData6 = [];
              this.tableTitle6 = [];
            }

            i++;
          });
        }
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
    }
    console.log(this.tableData6);
  }
  base64code4image: any;
  tableData7: any[] = [];
  tableData6: any[] = [];
  tableData5: any[] = [];
  tableData4: any[] = [];
  tableData3: any[] = [];
  tableTitle3: any[] = [];
  tableTitle4: any[] = [];
  tableTitle5: any[] = [];
  tableTitle6: any[] = [];
  tableTitle7: any[] = [];
  noti_array: any[] = [];
  subjects: any[] = [];
  cat: any;

  clear_bulk() {
    this.bulk_notification_form.patchValue({ file: '' });
    this.noti_array = [];
    this.subjects = [];
    this.base64code4image = '';
  }

  a_y: any;
  bulk_upload_notification() {
    this.cat = this.bulk_notification_form.value.type;
    this.a_y = this.bulk_notification_form.value.ay;
    const formData = new FormData();
    console.log(this.base64code4image.files);
    // const inputEls: HTMLInputElement = this.inputEl.nativeElement;
    // formData.append('file',this.inputEl.files.item(0));
    formData.append('booklist', this.base64code4image.files.item(0));
    formData.append('school_id', this.school_id8);
    formData.append('sender_id', this.school_id8);
    formData.append('category_type', this.cat);
    formData.append('academic_year', this.a_y);

    if (this.base64code4image) {
      this._auth
        .migration_notification_bulk_upload(formData)
        .subscribe((res: any) => {
          if (res.status == 'success') {
            Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
            this.tableData2 = [];

            this.tableTitle2 = [];
            this.noti_array = [];
            this.subjects = [];
            this.school_id8 = '';
            this.school_search_form8.patchValue({ school: '' });
            this.bulk_notification_form.patchValue({ file: '', type: '1' });
          } else {
            Swal.fire({ title: res.message, icon: 'error' });
          }
        });
      // this._http.post('https://schoolknot.com/api_new/admin_dashboard/insert_bulk_notification_new.php', formData).subscribe((res:any)=>{

      // })
    } else {
      Swal.fire({ title: 'Please Select Excel File', icon: 'info' });
    }
  }
  selected_school6() {
    let body = {
      school_id: this.school_id6,
    };
    this.Invoice_Form = this._fb.group({
      inputs7: this._fb.array([]),
    });
    this.fee_list2 = [];
    this.invoice_list = [];
    this.new_invoice_list = [];
    // this.tableData1.clear();
    this._auth.get_school_fee(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.fee_list2 = res.fee_heads;
        this.concession_list = res.concessionsDetails;
        let fee_terms = res.fee_terms;
        console.log(fee_terms);
        let i = 0;
        this.fee_list2.forEach((element: any) => {
          element.fee_term = [];
          element.index = i;
          fee_terms.forEach((elements: any) => {
            if (element.assigned_id == elements.fee_head_assigned_id) {
              element.fee_term.push(elements);
            }
          });
          i++;
        });
      }
      this._auth.get_all_students(body).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.count > 0) {
            this.student_list3 = res.students;
            let i = 0;
            this.student_list3.forEach((element) => {
              element.index = i;
              this.student_set3.add(element.student_reg_id);

              i++;
            });
          }
        }
      });
      this._http
        .get(
          `https://api.patasala.in/api/schoolknot/studentpayments/` +
            this.other_org_id +
            `/` +
            this.other_school_id +
            '/' +
            this.school_search_form6.value.s_date +
            '/' +
            this.school_search_form6.value.e_date
        )
        .subscribe((res: any) => {
          this.new_invoice_list = res;
          console.log(res);
          this.new_invoice_list.forEach((element: any) => {
            element.std_reg_id = element.StudentAdmissionNumber;
            element.school_id = this.school_id6;
            element.fee = element.AssignedAmount;
            let val: any;
            val = this.fee_list2.filter(
              (a: any) => element.FeeTypeName == a.fee_head
            );

            let index = '';
            // console.log(index)
            element.assigned_id = '';
            element.term_id = '';

            if (val[0]) {
              let terms = val[0].fee_term.filter(
                (a: any) => element.InstalmentName == a.term_name
              );
              element.assigned_id = terms[0].fee_head_assigned_id;
              element.term_id = terms[0].term_id;
              index = val[0].index;
            }
            element.fee_index = index;
            const value = this._fb.group({
              school_id: [this.school_id5],
              index: [element.fee_index],
              std_reg_id: [element.StudentAdmissionNumber],
              assigned_id: [element.assigned_id ? element.assigned_id : ''],
              term_id: [element.term_id ? element.term_id : ''],
              concession_id: [
                element.concession_id ? element.concession_id : '',
              ],

              valid: [
                element.term_id && element.assigned_id && element.concession_id
                  ? true
                  : false,
              ],
            });

            this.inputs5.push(value);
          });
        });
    });
  }
  bulk_upload_notification2() {
    let value: any[] = [];
    let i = 0;

    this.tableData2.forEach((element) => {
      if(element[8]){

        value.push({
          from_reg_id: element[0],
        to_reg_id: element[1],
        from_type: element[2],
        to_type: element[3],
        subject: element[4],
        message: element[5],
        date: element[6],
        status: element[7],
      });
    }
      i++;
    });
    let body = {
      school_id: this.school_id8,
      academic_year: this.bulk_notification_form.value.ay,
      notificationBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_notification_bulk_upload_2(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData2 = [];
        this.tableTitle2 = [];
        this.school_id8 = '';
        this.school_search_form8.patchValue({ school: '' });
        this.bulk_notification_form.patchValue({ file: '',file2:'' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  bulk_upload_homework() {
    let value: any[] = [];
    let i = 0;

    this.tableData3.forEach((element) => {
      if(element[5]){

        value.push({
          class_name: element[0],
        subject_name: element[1],
        note: element[2],
        file_name: element[3],
        date: element[4],
      });
    }
      i++;
    });
    let body = {
      school_id: this.school_id9,
      academic_year: this.bulk_homework_form.value.ay,
      homeworkBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_homework_bulk_upload(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData3 = [];
        this.tableTitle3 = [];
        this.school_id9 = '';
        this.school_search_form9.patchValue({ school: '' });
        this.bulk_homework_form.patchValue({ file: '',file2:'' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  bulk_upload_attendance() {
    let value: any[] = [];
    let i = 0;

    this.tableData7.forEach((element) => {
      if(element[2]){

        value.push({
          registration_number: element[0],
          date: element[1],
      });
    }
      i++;
    });
    let body = {
      school_id: this.school_id13,
      academic_year: this.bulk_attendance_form.value.ay,
      attendanceBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_student_attendance_bulk(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData7 = [];

        this.tableTitle7 = [];
        this.school_id13 = '';
        this.school_search_form13.patchValue({ school: '' });
        this.bulk_attendance_form.patchValue({ file: '',file2:'' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  bulk_upload_assignment() {
    let value: any[] = [];
    let i = 0;

    this.tableData4.forEach((element) => {
      if(element[6]){

        value.push({
        class_name: element[0],
        subject_name: element[1],
        title: element[2],
        file_name: element[3],
        date: element[4],
        description: element[5],
      });
    }
      i++;
    });
    let body = {
      school_id: this.school_id10,
      academic_year: this.bulk_homework_form.value.ay,
      assignmentBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_assignment_bulk_upload(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData4 = [];

        this.tableTitle4 = [];
        this.school_id10 = '';
        this.school_search_form10.patchValue({ school: '' });
        this.bulk_assignment_form.patchValue({ file: '',file2:'' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  bulk_upload_circular() {
    let value: any[] = [];
    let i = 0;

    this.tableData5.forEach((element) => {
      value.push({
        class_name: element[0],
        title: element[1],
        file_name: element[2],
      });
      i++;
    });
    let body = {
      school_id: this.school_id11,
      academic_year: this.bulk_circular_form.value.ay,
      circularBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_circular_bulk_upload(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData5 = [];

        this.tableTitle5 = [];
        this.school_id11 = '';
        this.school_search_form11.patchValue({ school: '' });
        this.bulk_circular_form.patchValue({ file: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  bulk_upload_showcase() {
    let value: any[] = [];
    let i = 0;

    this.tableData6.forEach((element) => {
      value.push({
        class_name: element[0],
        title: element[1],
        file_name: element[2],
        date: element[3],
      });
      i++;
    });
    let body = {
      school_id: this.school_id12,
      academic_year: this.bulk_showcase_form.value.ay,
      showcaseBulkUpload: value,
    };
    console.log(body);

    this._auth.migration_showcase_bulk_upload(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Uploaded Successfully', icon: 'success' });
        this.tableData6 = [];

        this.tableTitle6 = [];
        this.school_id12 = '';
        this.school_search_form12.patchValue({ school: '' });
        this.bulk_showcase_form.patchValue({ file: '' });
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
  }
  submit_fees() {
    let checked_values = this.inputs6.value.filter((a: any) => a.valid);
    let unchecked_values = this.inputs6.value.filter((a: any) => !a.valid);
    let body = {
      feeDetails: checked_values,
    };

    // if (filter_array(values, '')) {
    //   Swal.fire({ title: 'Please Enter All Fields', icon: 'info' });
    // } else {
    this._auth.get_student_fee_assign(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Fees Assigned Successfully', icon: 'success' });
        if (unchecked_values) {
          this.Fee_Form = this._fb.group({
            inputs6: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            const value = this._fb.group({
              school_id: [this.school_id4],
              index: [element.fee_index],
              std_reg_id: [element.std_reg_id],
              fee: [element.fee],
              assigned_id: [element.assigned_id],
              term_id: [element.term_id],
              valid: [element.term_id && element.assigned_id ? true : false],
            });
            this.inputs6.push(value);
          });
        } else {
          this.school_search_form4.patchValue({ school: '' });
          this.Fee_Form = this._fb.group({
            inputs6: this._fb.array([]),
          });
          this.fee_list = [];
          this.new_fee_list = [];
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
    // }
    console.log(body);
  }
  submit_concession() {
    let checked_values = this.inputs5.value.filter((a: any) => a.valid);
    let unchecked_values = this.inputs5.value.filter((a: any) => !a.valid);
    let body = {
      concessionDetails: checked_values,
    };

    this._auth.get_student_fee_concession(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Fees Assigned Successfully', icon: 'success' });
        if (unchecked_values) {
          this.Concession_Form = this._fb.group({
            inputs5: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            const value = this._fb.group({
              school_id: [this.school_id5],
              index: [element.index],
              std_reg_id: [element.std_reg_id],
              concession_amount: [element.concession_amount],
              assigned_id: [element.assigned_id],
              term_id: [element.term_id],
              concession_id: [element.concession_id],
              concession_reason: [element.concession_reason],
              valid: [
                element.term_id && element.assigned_id && element.concession_id
                  ? true
                  : false,
              ],
            });

            this.inputs5.push(value);
          });
        } else {
          this.school_search_form5.patchValue({ school: '' });
          this.Concession_Form = this._fb.group({
            inputs5: this._fb.array([]),
          });
          this.fee_list1 = [];
          this.concession_list = [];
          this.new_concession_list = [];
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
    // }
    console.log(body);
  }
  submit_exam_marks() {
    let checked_values = this.inputs8.value.filter((a: any) => a.valid);
    let unchecked_values = this.inputs8.value.filter((a: any) => !a.valid);
    let body = {
      exam_id: this.exam_id,
      updated_by: this.employee_id,
      school_id: this.school_id7,
      students: checked_values,
    };
    console.log(body);

    // if (this.filter_array_concession(values, '')) {
    //   Swal.fire({ title: 'Please Enter All Fields', icon: 'info' });
    // } else {
    this._auth.submit_bulk_exam_marks(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Exam Marks Submitted Successfully',
          icon: 'success',
        });
        if (unchecked_values) {
          this.Student_Marks_Form = this._fb.group({
            inputs8: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            const value = this._fb.group({
              school_id: [this.school_id7],
              student_reg_id: [element.student_reg_id],
              class: [element.class],
              exam: [element.exam_id ? element.exam_id : ''],
              subject_id: [element.subject_id ? element.subject_id : ''],
              es_id: [element.es_id ? element.es_id : ''],
              category_id: [element.category_id ? element.category_id : ''],
              marks: [element.marks ? element.marks : ''],
              max_marks: [element.max_marks ? element.max_marks : ''],
              valid: [
                element.subject_id &&
                element.es_id &&
                element.category_id &&
                (this.isNumber(element.marks)
                  ? element.marks <= element.max_marks
                  : element.marks)
                  ? true
                  : false,
              ],
            });
            this.inputs8.push(value);
          });
        } else {
          this.school_search_form7.patchValue({
            school: '',
            from_class: '',
            from_exam: '',
            to_class: '',
            to_exam: '',
            from_ay:'',
            to_ay:''
          });
          this.Student_Marks_Form = this._fb.group({
            inputs8: this._fb.array([]),
          });
          this.student_exam_marks = [];
          this.exam_id = body.exam_id = [];
          this.class = '';
          this.school_exam_list = [];
          this.class_name = '';
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
    // }
    console.log(body);
  }
  fee_list: any[] = [];
  new_fee_list: any[] = [];
  class_list: any[] = [];
  subject_list1: any[] = [];
  school_id1: any;
  classes_set = new Set();
  employee_set = new Set();
  selected_school1(item: any) {
    let other_school_id = item.other_school_id;
    let other_org_id = item.other_org_id;
    this.school_id1 = item.school_id;
    let body = {
      school_id: item.school_id,
    };
    this.getmasterclass();
    this.Class_Form = this._fb.group({
      inputs1: this._fb.array([]),
    });
    this.classes_set.clear();
    this._auth.view_subjects(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.subject_list1 = res.subjects;
      }
      this._auth.getAllClasses(body).subscribe((res: any) => {
        if (res.status == 'success') {
          this.class_list = [];
          if (res.count > 0) {
            this.class_list = res.classes;
            this.class_list.forEach((element) => {
              if (element.subject_id) {
                element.subject_ids = element.subject_id.split(',');
              } else {
                element.subject_ids = [];
              }
              element.subject_id = this.subject_list1.filter((one: any) =>
                element.subject_ids.some((two: any) => one.subject_id == two)
              );

              if (
                element.master_class_id >= 1 &&
                element.master_class_id <= 4
              ) {
                element.class_group = 1;
              } else if (
                element.master_class_id >= 5 &&
                element.master_class_id <= 9
              ) {
                element.class_group = 2;
              } else if (
                element.master_class_id >= 10 &&
                element.master_class_id <= 12
              ) {
                element.class_group = 3;
              } else if (
                element.master_class_id >= 13 &&
                element.master_class_id <= 14
              ) {
                element.class_group = 4;
              } else if (
                element.master_class_id >= 15 &&
                element.master_class_id <= 16
              ) {
                element.class_group = 5;
              } else if (
                element.master_class_id >= 17 &&
                element.master_class_id <= 19
              ) {
                element.class_group = 6;
              } else {
                element.class_group = '';
              }
              this.classes_set.add(
                String(
                  element.class_name +
                    element.master_class_id +
                    element.class_group +
                    element.class_type
                )
              );
              this.inputs1.push(this._fb.control(element));
              this.group[element.id] = this._fb.control(
                element.master_class_id
              );
            });
          }
        }
        this._http
          .get(
            `https://api.patasala.in/api/schoolknot/classSectionSubjects/` +
              other_org_id +
              `/` +
              other_school_id
          )
          .subscribe((res: any) => {
            this.new_class_list = res;

            this.new_class_list.forEach((element: any) => {
              element.class_name = element.ClassSectionName;
              element.master_class_id = element.DefaultClassId;
              element.id = element.SectionId;
              element.class_type = element.Board;
              element.school_id = this.school_id1;
              element.class_id = '';
              element.class_strength = 0;
              element.timetable = 0;
              element.teacher_id = '';
              element.employee_id1 = '';
              element.updated_by = '';
              if (element.DefaultClassId >= 1 && element.DefaultClassId <= 4) {
                element.class_group = 1;
              } else if (
                element.DefaultClassId >= 5 &&
                element.DefaultClassId <= 9
              ) {
                element.class_group = 2;
              } else if (
                element.DefaultClassId >= 10 &&
                element.DefaultClassId <= 12
              ) {
                element.class_group = 3;
              } else if (
                element.DefaultClassId >= 13 &&
                element.DefaultClassId <= 14
              ) {
                element.class_group = 4;
              } else if (
                element.DefaultClassId >= 15 &&
                element.DefaultClassId <= 16
              ) {
                element.class_group = 5;
              } else if (
                element.DefaultClassId >= 17 &&
                element.DefaultClassId <= 19
              ) {
                element.class_group = 6;
              } else {
                element.class_group = '';
              }

              element.subject_id = this.subject_list1.filter((one: any) =>
                element.Subjects.some(
                  (two: any) =>
                    one.subject_name == two.SubjectName.split(' (')[0] &&
                    one.Optional == two.subject_category &&
                    one.SubjectType == two.subject_type
                )
              );
              element.Subjects = this.subject_list1.filter((one: any) =>
                element.Subjects.some(
                  (two: any) =>
                    one.subject_name == two.SubjectName.split(' (')[0] &&
                    one.Optional == two.subject_category &&
                    one.SubjectType == two.subject_type
                )
              );

              if (
                this.classes_set.has(
                  String(
                    element.ClassSectionName +
                      element.DefaultClassId +
                      element.class_group +
                      element.Board
                  )
                )
              ) {
              } else {
                this.classes_set.add(
                  String(
                    element.ClassSectionName +
                      element.DefaultClassId +
                      element.class_group +
                      element.Board
                  )
                );
                this.class_list.push(element);
                this.inputs1.push(this._fb.control(element));
                this.group[element.id] = this._fb.control(
                  element.master_class_id
                );
              }
            });

            this.master_class_form = this._fb.group(this.group);
          });
        this.master_class_form = this._fb.group(this.group);
      });
    });
  }
  school_id2: any;
  class_list1: any[] = [];
  student_list: any[] = [];
  student_set = new Set();
  student_set1 = new Set();
  student_set2 = new Set();
  student_set3 = new Set();
  student_boolean: boolean = false;
  async selected_school2(item: any) {
    let other_school_id = item.other_school_id;
    let other_org_id = item.other_org_id;
    this.school_id2 = item.school_id;
    let body = {
      school_id: item.school_id,
    };
    this.show_student = false;
    this.getmasterclass();
    this.Student_Form = this._fb.group({
      inputs2: this._fb.array([]),
    });
    this.student_set.clear();
    await this._auth.getAllClasses(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.class_list1 = [];
        if (res.count > 0) {
          this.class_list1 = res.classes;
        }
      }
      this._auth.get_all_students(body).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.count > 0) {
            this.student_list = res.students;
            let i = 0;
            this.student_list.forEach((element) => {
              delete element.id;
              element.index = i;
              element.ids = element.student_id;
              this.student_set.add(element.student_reg_id);
              this.group2[element.ids] = this._fb.control(element.class_id);
              this.inputs2.push(this._fb.control(element));

              i++;
            });
            this.class_select_form = this._fb.group(this.group2);
          }
        }
      });
    });

    this._http
      .get(
        `https://api.patasala.in/api/schoolknot/studentData/` +
          other_org_id +
          `/` +
          other_school_id
      )
      .subscribe((res: any) => {
        this.new_student_list = res;
        console.log(this.new_student_list);
        let k = 0;
        this.new_student_list.forEach((element: any) => {
          if (this.student_set.has(element.StudentId)) {
            let value: any;
            value = this.inputs2.value;
            let indexs = value.filter(
              (a: any) => a.student_reg_id == element.StudentId
            );
            if (indexs[0]?.student_id) {
              let index = indexs[0]?.index;
              this.inputs2.value[index]!.class_name = element.Class;
              this.inputs2.value[index]!.class_names = [];
              this.inputs2.value[index]!.class_names.push(
                this.inputs2.value[index]!.class_name
              );
              this.inputs2.value[index]!.class_ids = this.class_list1.filter(
                (one: any) =>
                  this.inputs2.value[index]!.class_names.some(
                    (two: any) => one.class_name == two
                  )
              );
              this.inputs2.value[index].school_id = this.school_id2;
              this.inputs2.value[index].aadhar_number = element.AadharNumber
                ? element.AadharNumber
                : '';
              this.inputs2.value[index].academic_year = 11;
              this.inputs2.value[index].area = element.Area ? element.Area : '';
              this.inputs2.value[index].bank_account_number =
                element.BankAccountNumber ? element.BankAccountNumber : '';
              this.inputs2.value[index].bank_name = element.Bankname
                ? element.Bankname
                : '';
              this.inputs2.value[index].biometric_id = element.BiometricID
                ? element.BiometricID
                : '';
              this.inputs2.value[index].birth_place = element.BirthPlace
                ? element.BirthPlace
                : '';
              this.inputs2.value[index].blood_group = element.BloodGroup
                ? element.BloodGroup
                : '';
              this.inputs2.value[index].caste = element.Caste
                ? element.Caste
                : '';
              this.inputs2.value[index].caste_category =
                element.CasteCategory1GENERAL2OBC3SC4ST
                  ? this.conv_category(element.CasteCategory1GENERAL2OBC3SC4ST)
                  : '';
              this.inputs2.value[index].dob2 = element.CheckDOB1YES2NO
                ? this.conv_tc(element.CheckDOB1YES2NO)
                : '';
              this.inputs2.value[index].report_card =
                element.CheckReportCard1YES2NO
                  ? this.conv_tc(element.CheckReportCard1YES2NO)
                  : '';
              this.inputs2.value[index].tc = element.CheckTC1YES2NO
                ? this.conv_tc(element.CheckTC1YES2NO)
                : '';
              this.inputs2.value[index].city = element.City ? element.City : '';
              this.inputs2.value[index].class_roll_num = element.ClassRoll
                ? element.ClassRoll
                : '';
              this.inputs2.value[index].correspondence_address =
                element.CorrespondenceAddress
                  ? element.CorrespondenceAddress
                  : '';
              this.inputs2.value[index].country = element.Country
                ? element.Country
                : '';
              this.inputs2.value[index].dob = this.convert_dob(
                element.DateofBirth
              );
              this.inputs2.value[index].doj = this.convert_dob(
                element.DateofJoining
              );
              this.inputs2.value[index].emergency_address =
                element.EmergencyAddress ? element.EmergencyAddress : '';
              this.inputs2.value[index].emergency_email = element.EmergencyEmail
                ? element.EmergencyEmail
                : '';
              this.inputs2.value[index].emergency_mobile =
                element.EmergencyMobileNo ? element.EmergencyMobileNo : '';
              this.inputs2.value[index].emergency_name = element.EmergencyName
                ? element.EmergencyName
                : '';
              this.inputs2.value[index].emergency_relationship =
                element.EmergencyRelationship
                  ? element.EmergencyRelationship
                  : '';
              this.inputs2.value[index].father_aadhaar_number =
                element.FatherAadhaarNumber ? element.FatherAadhaarNumber : '';
              this.inputs2.value[index].father_other_mobile =
                element.FatherAlternateMobile
                  ? element.FatherAlternateMobile
                  : '';
              this.inputs2.value[index].parent_email = element.FatherEmail
                ? element.FatherEmail
                : '';
              this.inputs2.value[index].parent_income = element.FatherIncome
                ? element.FatherIncome
                : '';
              this.inputs2.value[index].father_occupation =
                element.FatherOccupation ? element.FatherOccupation : '';
              this.inputs2.value[index].father_org = element.FatherOrganization
                ? element.FatherOrganization
                : '';
              this.inputs2.value[index].father_qualification =
                element.FatherQualification ? element.FatherQualification : '';
              this.inputs2.value[index].residence_phone = element.FathersMobile
                ? String(element.FathersMobile).length == 10
                  ? element.FathersMobile
                  : String(element.FathersMobile).length == 11
                  ? String(element.FathersMobile).startsWith('0')
                    ? String(element.FathersMobile).slice(1, 11)
                    : String(element.FathersMobile).slice(1, 11)
                  : String(element.FathersMobile).length == 12
                  ? String(element.FathersMobile).startsWith('91')
                    ? String(element.FathersMobile).slice(2, 12)
                    : String(element.FathersMobile).slice(2, 12)
                  : String(element.FathersMobile).length == 13
                  ? String(element.FathersMobile).startsWith('+91')
                    ? String(element.FathersMobile).slice(3, 13)
                    : String(element.FathersMobile).slice(3, 13)
                  : ''
                : '';
              this.inputs2.value[index].father_name = element.FathersName
                ? element.FathersName
                : '';
              this.inputs2.value[index].food_habbits = element.FoodHabbits
                ? element.FoodHabbits
                : '';
              this.inputs2.value[index].form_filling_date = this.convert_dob(
                element.FormFillingDateDDMMYYYY
              );
              this.inputs2.value[index].gender = element.Gender
                ? element.Gender
                : '';
              this.inputs2.value[index].guardian_aadhar_number =
                element.GuardianAadharNumber
                  ? element.GuardianAadharNumber
                  : '';
              this.inputs2.value[index].guardian_email = element.GuardianEmail
                ? element.GuardianEmail
                : '';
              this.inputs2.value[index].guardian_local_address =
                element.GuardianLocalAddress
                  ? element.GuardianLocalAddress
                  : '';
              this.inputs2.value[index].guardian_mobile = element.GuardianMobile
                ? element.GuardianMobile
                : '';
              this.inputs2.value[index].guardian_name = element.GuardianName
                ? element.GuardianName
                : '';
              this.inputs2.value[index].guardian_name_of_organization =
                element.GuardianNameofOrganization
                  ? element.GuardianNameofOrganization
                  : '';
              this.inputs2.value[index].guardian_occupation =
                element.GuardianOccupation ? element.GuardianOccupation : '';
              this.inputs2.value[index].guardian_qualification =
                element.GuardianQualification
                  ? element.GuardianQualification
                  : '';
              this.inputs2.value[index].height = element.Height
                ? element.Height
                : '';
              this.inputs2.value[index].hostel = element.Hostel
                ? element.Hostel
                : '';
              this.inputs2.value[index].house = element.House
                ? element.House
                : '';
              this.inputs2.value[index].identification_marks =
                element.IdentificationMark1 ? element.IdentificationMark1 : '';
              this.inputs2.value[index].identification_marks1 =
                element.IdentificationMark2 ? element.IdentificationMark2 : '';
              this.inputs2.value[index].ifsc_code = element.IFSCcode
                ? element.IFSCcode
                : '';
              this.inputs2.value[index].joining_academic_year =
                element.JoiningAcademicYear
                  ? element.JoiningAcademicYear == '2021-22'
                    ? '8'
                    : element.JoiningAcademicYear == '2022-23'
                    ? '9'
                    : element.JoiningAcademicYear == '2023-24'
                    ? '10'
                    : element.JoiningAcademicYear == '2024-25'
                    ? '11'
                    : element.JoiningAcademicYear == '2025-26'
                    ? '12'
                    : element.JoiningAcademicYear
                  : '';
              this.inputs2.value[index].language_spoken = element.LanguageSpoken
                ? element.LanguageSpoken
                : '';
              this.inputs2.value[index].mother_aadhaar_number =
                element.MotherAadhaarNumber ? element.MotherAadhaarNumber : '';
              this.inputs2.value[index].mother_other_mobile =
                element.MotherAlternateMobile
                  ? element.MotherAlternateMobile
                  : '';
              this.inputs2.value[index].mother_email = element.MotherEmail
                ? element.MotherEmail
                : '';
              this.inputs2.value[index].mother_income = element.MotherIncome
                ? element.MotherIncome
                : '';
              this.inputs2.value[index].mother_mobile =
                element.MotherMobileNumber
                  ? String(element.MotherMobileNumber).length == 10
                    ? element.MotherMobileNumber
                    : String(element.MotherMobileNumber).length == 11
                    ? String(element.MotherMobileNumber).startsWith('0')
                      ? String(element.MotherMobileNumber).slice(1, 11)
                      : String(element.MotherMobileNumber).slice(1, 11)
                    : String(element.MotherMobileNumber).length == 12
                    ? String(element.MotherMobileNumber).startsWith('91')
                      ? String(element.MotherMobileNumber).slice(2, 12)
                      : String(element.MotherMobileNumber).slice(2, 12)
                    : String(element.MotherMobileNumber).length == 13
                    ? String(element.MotherMobileNumber).startsWith('+91')
                      ? String(element.MotherMobileNumber).slice(3, 13)
                      : String(element.MotherMobileNumber).slice(3, 13)
                    : ''
                  : '';
              this.inputs2.value[index].mother_occupation =
                element.MotherOccupation ? element.MotherOccupation : '';
              this.inputs2.value[index].mother_org = element.MotherOrganization
                ? element.MotherOrganization
                : '';
              this.inputs2.value[index].mother_name = element.MothersName
                ? element.MothersName
                : '';
              this.inputs2.value[index].mother_qualification =
                element.MotherQualification ? element.MotherQualification : '';
              this.inputs2.value[index].mother_tongue = element.MotherTongue
                ? element.MotherTongue
                : '';
              this.inputs2.value[index].nationality = element.Nationality
                ? element.Nationality
                : '';
              this.inputs2.value[index].passport_number = element.PassportNumber
                ? element.PassportNumber
                : '';
              this.inputs2.value[index].pincode = element.Pincode
                ? element.Pincode
                : '';
              this.inputs2.value[index].previous_school = element.PreviousSchool
                ? element.PreviousSchool
                : '';
              this.inputs2.value[index].religion = element.Religion
                ? element.Religion
                : '';
              this.inputs2.value[index].father_residential_address =
                element.ResidentialAddress ? element.ResidentialAddress : '';
              this.inputs2.value[index].school_email = element.SchoolEmail
                ? element.SchoolEmail
                : '';
              this.inputs2.value[index].sibling1_class = element.Sibling1Class
                ? element.Sibling1Class
                : '';
              this.inputs2.value[index].sibling1_name = element.Sibling1Name
                ? element.Sibling1Name
                : '';
              this.inputs2.value[index].sibling1_school = element.Sibling1School
                ? element.Sibling1School
                : '';
              this.inputs2.value[index].sibling2_class = element.Sibling2Class
                ? element.Sibling2Class
                : '';
              this.inputs2.value[index].sibling2_name = element.Sibling2Name
                ? element.Sibling2Name
                : '';
              this.inputs2.value[index].sibling2_school = element.Sibling2School
                ? element.Sibling2School
                : '';
              this.inputs2.value[index].sports = element.Sports
                ? element.Sports
                : '';
              this.inputs2.value[index].star_information =
                element.StarInformation ? element.StarInformation : '';
              this.inputs2.value[index].state = element.State
                ? element.State
                : '';
              this.inputs2.value[index].state_enrollment_no =
                element.StateEnrollmentNo ? element.StateEnrollmentNo : '';
              this.inputs2.value[index].student_email = element.StudentEmail
                ? element.StudentEmail
                : '';
              this.inputs2.value[index].first_name = element.StudentFirstName
                ? element.StudentFirstName
                : '';
              this.inputs2.value[index].middle_name = element.StudentMiddleName
                ? element.StudentMiddleName
                : '';
              this.inputs2.value[index].last_name = element.StudentLastName
                ? element.StudentLastName
                : '';
              this.inputs2.value[index].sub_caste = element.SubCaste
                ? element.SubCaste
                : '';
              this.inputs2.value[index].transport_status =
                element.Transport1YES2NO
                  ? this.conv_tc(element.Transport1YES2NO)
                  : '';
              this.inputs2.value[index].weight = element.Weight
                ? element.Weight
                : '';
              this.inputs2.value[index].whatsapp_no = element.WhatsappNo
                ? element.WhatsappNo
                : '';
              this.inputs2.value[index].student_reg_id = element.StudentId
                ? element.StudentId
                : '';
              this.inputs2.value[index].school_admission_number =
                element.StudentRegistrationID
                  ? element.StudentRegistrationID
                  : '';
              this.inputs2.value[index].ids =
                element.StudentRegistrationID + element.StudentId;

              this.inputs2.value[index].admission_done_by =
                element.AdmissionDoneBy ? element.AdmissionDoneBy : '';
              this.inputs2.value[index].admission_done_by = element.Description
                ? element.Description
                : '';
              this.inputs2.value[index].status =
                element.IsActive == 0 ? 1 : element.IsActive == 1 ? 2 : 2;
              this.inputs2.value[index].admitted_class =
                element.FirstAdmissionClass ? element.FirstAdmissionClass : '';
              this.inputs2.value[index].joining_academic_year =
                element.JoiningAcademicYear
                  ? element.JoiningAcademicYear == '2021-22'
                    ? '8'
                    : element.JoiningAcademicYear == '2022-23'
                    ? '9'
                    : element.JoiningAcademicYear == '2023-24'
                    ? '10'
                    : element.JoiningAcademicYear == '2024-25'
                    ? '11'
                    : element.JoiningAcademicYear == '2025-26'
                    ? '12'
                    : element.JoiningAcademicYear
                  : '';
              this.inputs2.value[index].class_id =
                this.inputs2.value[index]!.class_ids[0]?.class_id;

              if (
                this.inputs2.value[index].class_id &&
                this.inputs2.value[index].student_reg_id &&
                this.inputs2.value[index].first_name &&
                this.inputs2.value[index].residence_phone &&
                this.inputs2.value[index].dob
              ) {
                if (
                  String(this.inputs2.value[index].residence_phone).length < 10
                ) {
                  this.inputs2.value[index].ischecked = false;
                } else if (
                  String(this.inputs2.value[index].residence_phone).startsWith(
                    '6'
                  ) ||
                  String(this.inputs2.value[index].residence_phone).startsWith(
                    '7'
                  ) ||
                  String(this.inputs2.value[index].residence_phone).startsWith(
                    '8'
                  ) ||
                  String(this.inputs2.value[index].residence_phone).startsWith(
                    '9'
                  )
                ) {
                  this.inputs2.value[index].ischecked = true;
                } else {
                  this.inputs2.value[index].ischecked = false;
                }
              } else {
                this.inputs2.value[index].ischecked = false;
              }
            }
          } else {
            element.class_name = element.Class;
            element.class_names = [];
            element.class_names.push(element.class_name);
            element.class_ids = this.class_list1.filter((one: any) =>
              element.class_names.some((two: any) => one.class_name == two)
            );
            element.school_id = this.school_id2;
            element.admitted_class = element.FirstAdmissionClass
              ? element.FirstAdmissionClass
              : '';
            element.joining_academic_year = element.JoiningAcademicYear;
            element.JoiningAcademicYear
              ? element.JoiningAcademicYear == '2021-22'
                ? '8'
                : element.JoiningAcademicYear == '2022-23'
                ? '9'
                : element.JoiningAcademicYear == '2023-24'
                ? '10'
                : element.JoiningAcademicYear == '2024-25'
                ? '11'
                : element.JoiningAcademicYear == '2025-26'
                ? '12'
                : element.JoiningAcademicYear
              : '';
            element.aadhar_number = element.AadharNumber
              ? element.AadharNumber
              : '';
            element.academic_year = 11;
            element.area = element.Area ? element.Area : '';
            element.bank_account_number = element.BankAccountNumber
              ? element.BankAccountNumber
              : '';
            element.bank_name = element.Bankname ? element.Bankname : '';
            element.biometric_id = element.BiometricID
              ? element.BiometricID
              : '';
            element.birth_place = element.BirthPlace ? element.BirthPlace : '';
            element.blood_group = element.BloodGroup ? element.BloodGroup : '';
            element.caste = element.Caste ? element.Caste : '';
            element.caste_category = element.CasteCategory1GENERAL2OBC3SC4ST
              ? this.conv_category(element.CasteCategory1GENERAL2OBC3SC4ST)
              : '';
            element.dob2 = element.CheckDOB1YES2NO
              ? this.conv_tc(element.CheckDOB1YES2NO)
              : '';
            element.report_card = element.CheckReportCard1YES2NO
              ? this.conv_tc(element.CheckReportCard1YES2NO)
              : '';
            element.tc = element.CheckTC1YES2NO
              ? this.conv_tc(element.CheckTC1YES2NO)
              : '';
            element.city = element.City ? element.City : '';
            element.class_roll_num = element.ClassRoll ? element.ClassRoll : '';
            element.correspondence_address = element.CorrespondenceAddress
              ? element.CorrespondenceAddress
              : '';
            element.country = element.Country ? element.Country : '';
            element.dob = this.convert_dob(element.DateofBirth);
            element.doj = this.convert_dob(element.DateofJoining);
            element.emergency_address = element.EmergencyAddress
              ? element.EmergencyAddress
              : '';
            element.emergency_email = element.EmergencyEmail
              ? element.EmergencyEmail
              : '';
            element.emergency_mobile = element.EmergencyMobileNo
              ? element.EmergencyMobileNo
              : '';
            element.emergency_name = element.EmergencyName
              ? element.EmergencyName
              : '';
            element.emergency_relationship = element.EmergencyRelationship
              ? element.EmergencyRelationship
              : '';
            element.father_aadhaar_number = element.FatherAadhaarNumber
              ? element.FatherAadhaarNumber
              : '';
            element.father_other_mobile = element.FatherAlternateMobile
              ? element.FatherAlternateMobile
              : '';
            element.parent_email = element.FatherEmail
              ? element.FatherEmail
              : '';
            element.parent_income = element.FatherIncome
              ? element.FatherIncome
              : '';
            element.mother_qualification = element.MotherQualification
              ? element.MotherQualification
              : '';
            element.father_occupation = element.FatherOccupation
              ? element.FatherOccupation
              : '';
            element.father_org = element.FatherOrganization
              ? element.FatherOrganization
              : '';
            element.father_qualification = element.FatherQualification
              ? element.FatherQualification
              : '';
            element.residence_phone = element.FathersMobile;
            element.FathersMobile
              ? String(element.FathersMobile).length == 10
                ? element.FathersMobile
                : String(element.FathersMobile).length == 11
                ? String(element.FathersMobile).startsWith('0')
                  ? String(element.FathersMobile).slice(1, 11)
                  : String(element.FathersMobile).slice(1, 11)
                : String(element.FathersMobile).length == 12
                ? String(element.FathersMobile).startsWith('91')
                  ? String(element.FathersMobile).slice(2, 12)
                  : String(element.FathersMobile).slice(2, 12)
                : String(element.FathersMobile).length == 13
                ? String(element.FathersMobile).startsWith('+91')
                  ? String(element.FathersMobile).slice(3, 13)
                  : String(element.FathersMobile).slice(3, 13)
                : ''
              : '';
            element.father_name = element.FathersName
              ? element.FathersName
              : '';
            element.food_habbits = element.FoodHabbits
              ? element.FoodHabbits
              : '';
            element.form_filling_date = this.convert_dob(
              element.FormFillingDateDDMMYYYY
            );
            element.gender = element.Gender ? element.Gender : '';
            element.guardian_aadhar_number = element.GuardianAadharNumber
              ? element.GuardianAadharNumber
              : '';
            element.guardian_email = element.GuardianEmail
              ? element.GuardianEmail
              : '';
            element.guardian_local_address = element.GuardianLocalAddress
              ? element.GuardianLocalAddress
              : '';
            element.guardian_mobile = element.GuardianMobile
              ? element.GuardianMobile
              : '';
            element.guardian_name = element.GuardianName
              ? element.GuardianName
              : '';
            element.guardian_name_of_organization =
              element.GuardianNameofOrganization
                ? element.GuardianNameofOrganization
                : '';
            element.guardian_occupation = element.GuardianOccupation
              ? element.GuardianOccupation
              : '';
            element.guardian_qualification = element.GuardianQualification
              ? element.GuardianQualification
              : '';
            element.height = element.Height ? element.Height : '';
            element.hostel = element.Hostel ? element.Hostel : '';
            element.house = element.House ? element.House : '';
            element.identification_marks = element.IdentificationMark1
              ? element.IdentificationMark1
              : '';
            element.identification_marks1 = element.IdentificationMark2
              ? element.IdentificationMark2
              : '';
            element.ifsc_code = element.IFSCcode ? element.IFSCcode : '';
            element.joining_academic_year = element.JoiningAcademicYear;
            element.JoiningAcademicYear
              ? element.JoiningAcademicYear == '2021-22'
                ? '8'
                : element.JoiningAcademicYear == '2022-23'
                ? '9'
                : element.JoiningAcademicYear == '2023-24'
                ? '10'
                : element.JoiningAcademicYear == '2024-25'
                ? '11'
                : element.JoiningAcademicYear == '2025-26'
                ? '12'
                : element.JoiningAcademicYear
              : '';
            element.language_spoken = element.LanguageSpoken
              ? element.LanguageSpoken
              : '';
            element.mother_aadhaar_number = element.MotherAadhaarNumber
              ? element.MotherAadhaarNumber
              : '';
            element.mother_other_mobile = element.MotherAlternateMobile
              ? element.MotherAlternateMobile
              : '';
            element.mother_email = element.MotherEmail
              ? element.MotherEmail
              : '';
            element.mother_income = element.MotherIncome
              ? element.MotherIncome
              : '';
            element.mother_mobile = element.MotherMobileNumber;
            element.MotherMobileNumber
              ? String(element.MotherMobileNumber).length == 10
                ? element.MotherMobileNumber
                : String(element.MotherMobileNumber).length == 11
                ? String(element.MotherMobileNumber).startsWith('0')
                  ? String(element.MotherMobileNumber).slice(1, 11)
                  : String(element.MotherMobileNumber).slice(1, 11)
                : String(element.MotherMobileNumber).length == 12
                ? String(element.MotherMobileNumber).startsWith('91')
                  ? String(element.MotherMobileNumber).slice(2, 12)
                  : String(element.MotherMobileNumber).slice(2, 12)
                : String(element.MotherMobileNumber).length == 13
                ? String(element.MotherMobileNumber).startsWith('+91')
                  ? String(element.MotherMobileNumber).slice(3, 13)
                  : String(element.MotherMobileNumber).slice(3, 13)
                : ''
              : '';
            element.mother_occupation = element.MotherOccupation
              ? element.MotherOccupation
              : '';
            element.mother_org = element.MotherOrganization
              ? element.MotherOrganization
              : '';
            element.mother_name = element.MothersName
              ? element.MothersName
              : '';
            element.mother_tongue = element.MotherTongue
              ? element.MotherTongue
              : '';
            element.nationality = element.Nationality
              ? element.Nationality
              : '';
            element.passport_number = element.PassportNumber
              ? element.PassportNumber
              : '';
            element.pincode = element.Pincode ? element.Pincode : '';
            element.previous_school = element.PreviousSchool
              ? element.PreviousSchool
              : '';
            element.religion = element.Religion ? element.Religion : '';
            element.father_residential_address = element.ResidentialAddress
              ? element.ResidentialAddress
              : '';
            element.school_email = element.SchoolEmail
              ? element.SchoolEmail
              : '';
            element.sibling1_class = element.Sibling1Class
              ? element.Sibling1Class
              : '';
            element.sibling1_name = element.Sibling1Name
              ? element.Sibling1Name
              : '';
            element.sibling1_school = element.Sibling1School
              ? element.Sibling1School
              : '';
            element.sibling2_class = element.Sibling2Class
              ? element.Sibling2Class
              : '';
            element.sibling2_name = element.Sibling2Name
              ? element.Sibling2Name
              : '';
            element.sibling2_school = element.Sibling2School
              ? element.Sibling2School
              : '';
            element.sports = element.Sports ? element.Sports : '';
            element.star_information = element.StarInformation
              ? element.StarInformation
              : '';
            element.state = element.State ? element.State : '';
            element.state_enrollment_no = element.StateEnrollmentNo
              ? element.StateEnrollmentNo
              : '';
            element.student_email = element.StudentEmail
              ? element.StudentEmail
              : '';
            element.first_name = element.StudentFirstName
              ? element.StudentFirstName
              : '';
            element.middle_name = element.StudentMiddleName
              ? element.StudentMiddleName
              : '';
            element.last_name = element.StudentLastName
              ? element.StudentLastName
              : '';
            element.sub_caste = element.SubCaste ? element.SubCaste : '';
            element.transport_status = element.Transport1YES2NO
              ? this.conv_tc(element.Transport1YES2NO)
              : '';
            element.weight = element.Weight ? element.Weight : '';
            element.whatsapp_no = element.WhatsappNo ? element.WhatsappNo : '';
            element.ids = element.StudentRegistrationID + element.StudentId;
            element.school_admission_number = element.StudentRegistrationID
              ? element.StudentRegistrationID
              : '';
            element.student_reg_id = element.StudentId ? element.StudentId : '';
            element.admission_done_by = element.AdmissionDoneBy
              ? element.AdmissionDoneBy
              : '';
            element.description = element.Description
              ? element.Description
              : '';
            element.class_id = element.class_ids[0]?.class_id;
            element.student_id = '';
            element.residence_address = '';
            element.status =
              element.IsActive == 0 ? 1 : element.IsActive == 1 ? 2 : 2;
            element.parent_login_status = '';
            element.password = '';
            element.user_type = '';
            element.updated_by = '';
            element.pwd_update_date = '';
            element.gcm_id = '';
            element.device_id = '';
            element.comment_block = '';
            element.created = '';
            element.character_name = '';
            element.last_class_attended = '';
            element.additional_information = '';
            element.promotion_granted_to = '';
            element.tc_number = '';
            element.bank_reference_number = '';
            element.fee_remark = '';
            element.asthamatic = '';
            element.audit_restriction = '';
            element.dnd_status = '';
            element.late_fee_applicable_settings = '';
            element.profile_update_status = '';
            element.staff_parent = '';
            element.scholarship_status = '';
            element.fee_type = '';
            element.nri = '';

            if (
              element.class_id &&
              element.student_reg_id &&
              element.first_name &&
              element.residence_phone &&
              element.dob
            ) {
              if (String(element.residence_phone).length < 10) {
                element.ischecked = false;
              } else if (
                String(element.residence_phone).startsWith('6') ||
                String(element.residence_phone).startsWith('7') ||
                String(element.residence_phone).startsWith('8') ||
                String(element.residence_phone).startsWith('9')
              ) {
                element.ischecked = true;
              } else {
                element.ischecked = false;
              }
            } else {
              element.ischecked = false;
            }

            // this.student_set.add(element.StudentRegistrationID);
            this.group2[element.ids] = this._fb.control(element.class_id);

            // }
            this.inputs2.push(this._fb.control(element));
            this.class_select_form = this._fb.group(this.group2);
          }

          this.class_select_form = this._fb.group(this.group2);
          if (k == this.new_student_list.length - 1) {
            this.inputs2.value.forEach((element: any) => {
              let values = this.inputs2.value.filter(
                (a: any) => a.student_reg_id == element.student_reg_id
              );
              if (values.length > 1) {
                values.forEach((elements: any) => {
                  elements.ischecked = false;
                  elements.dublicate = true;
                });
              }
            });
          }
          k++;
        });
      });

    this.show_student = true;
    // this.master_class_form = this._fb.group(this.group);
  }
  show_student: boolean = false;
  student_inputs: any[] = [
    { title: 'Student Reg ID', name: 'student_reg_id', type: '1' },
    { title: 'First Name', name: 'first_name', type: '1' },
    { title: 'Middle Name', name: 'middle_name', type: '1' },
    { title: 'Last Name', name: 'last_name', type: '1' },
    { title: 'Father Mobile', name: 'residence_phone', type: '4' },
    { title: 'DOB', name: 'dob', type: '3' },
    { title: 'Class Name', name: 'class_id', type: '5' },
    // { title: 'Admitted Class', name: 'admitted_class', type: '1' },
    // {
    //   title: 'Joining Academic Year',
    //   name: 'joining_academic_year',
    //   type: '1',
    // },
    // { title: 'Adhar No.', name: 'aadhar_number', type: '2' },
    // { title: 'Area', name: 'area', type: '1' },
    // { title: 'Bank Acc. No.', name: 'bank_account_number', type: '2' },
    // { title: 'Bank Name', name: 'bank_name', type: '1' },
    // { title: 'Biometric Id', name: 'biometric_id', type: '1' },
    // { title: 'Birth Place', name: 'birth_place', type: '1' },
    // { title: 'Blood Group', name: 'blood_group', type: '1' },
    // { title: 'Caste', name: 'caste', type: '1' },
    // { title: 'Caste Category', name: 'caste_category', type: '7' },
    // { title: 'DOB(Yes/No)', name: 'dob2', type: '8' },
    // { title: 'Report Card', name: 'report_card', type: '1' },
    // { title: 'TC', name: 'tc', type: '8' },
    // { title: 'City', name: 'city', type: '1' },
    // { title: 'Class Roll No.', name: 'class_roll_num', type: '1' },
    // {
    //   title: 'Correspondence Address',
    //   name: 'correspondence_address',
    //   type: '1',
    // },
    // { title: 'Country', name: 'country', type: '1' },
    // { title: 'Date of Joining', name: 'doj', type: '3' },
    // { title: 'Emergency Address', name: 'emergency_address', type: '1' },
    // { title: 'Emergency Email', name: 'emergency_email', type: '1' },
    // { title: 'Emergency Mobile', name: 'emergency_mobile', type: '4' },
    // { title: 'Emergency Name', name: 'emergency_name', type: '1' },
    // {
    //   title: 'Emergency Relationship',
    //   name: 'emergency_relationship',
    //   type: '1',
    // },
    // { title: 'Father Name', name: 'father_name', type: '1' },
    // { title: 'Father Adhar No.', name: 'father_aadhaar_number', type: '2' },
    // { title: 'Father Other Mobile', name: 'father_other_mobile', type: '4' },
    // { title: 'Father Email', name: 'parent_email', type: '1' },
    // { title: 'Father Income', name: 'parent_income', type: '2' },
    // { title: 'Father Occupation', name: 'father_occupation', type: '1' },
    // { title: 'Father Organization', name: 'father_org', type: '1' },
    // { title: 'Father Qualification', name: 'father_qualification', type: '1' },
    // { title: 'Food Habbits', name: 'food_habbits', type: '1' },
    // { title: 'Form Filling Date', name: 'form_filling_date', type: '3' },
    // { title: 'Gender', name: 'gender', type: '6' },
    // { title: 'Guardian Adhar No.', name: 'guardian_aadhar_number', type: '2' },
    // { title: 'Guardian Email', name: 'guardian_email', type: '1' },
    // {
    //   title: 'Guardian Local Address',
    //   name: 'guardian_local_address',
    //   type: '1',
    // },
    // { title: 'Guardian Mobile', name: 'guardian_mobile', type: '4' },
    // { title: 'Guardian Name', name: 'guardian_name', type: '1' },
    // {
    //   title: 'Guardian Organization',
    //   name: 'guardian_name_of_organization',
    //   type: '1',
    // },
    // { title: 'Guardian Occupation', name: 'guardian_occupation', type: '1' },
    // {
    //   title: 'Guardian Qualification',
    //   name: 'guardian_qualification',
    //   type: '1',
    // },
    // { title: 'Height', name: 'height', type: '1' },
    // { title: 'Hostel', name: 'hostel', type: '1' },
    // { title: 'House', name: 'house', type: '1' },
    // { title: 'Identification Mark ', name: 'identification_marks', type: '1' },
    // {
    //   title: 'Identification Mark 2',
    //   name: 'identification_marks1',
    //   type: '1',
    // },
    // { title: 'IFSC Code', name: 'ifsc_code', type: '1' },
    // {
    //   title: 'Joining Academic Year',
    //   name: 'joining_academic_year',
    //   type: '1',
    // },
    // { title: 'Language Spoken', name: 'language_spoken', type: '1' },
    // { title: 'Mother Adhar No.', name: 'mother_aadhaar_number', type: '2' },
    // { title: 'Mother Other Mobile', name: 'mother_other_mobile', type: '4' },
    // { title: 'Mother Email', name: 'mother_email', type: '1' },
    // { title: 'Mother Income', name: 'mother_income', type: '2' },
    // { title: 'Mother Mobile', name: 'mother_mobile', type: '4' },
    // { title: 'Mother Occupation', name: 'mother_occupation', type: '1' },
    // { title: 'Mother Organization', name: 'mother_org', type: '1' },
    // { title: 'Mother Name', name: 'mother_name', type: '1' },
    // { title: 'Mother Tongue', name: 'mother_tongue', type: '1' },
    // { title: 'Nationality', name: 'nationality', type: '1' },
    // { title: 'Passport No.', name: 'passport_number', type: '1' },
    // { title: 'Pincode', name: 'pincode', type: '2' },
    // { title: 'Previous School', name: 'previous_school', type: '1' },
    // { title: 'Religion', name: 'religion', type: '1' },
    // {
    //   title: 'Father Residential Address',
    //   name: 'father_residential_address',
    //   type: '1',
    // },
    // { title: 'School Email', name: 'school_email', type: '1' },
    // { title: 'Sibling 1 Class', name: 'sibling1_class', type: '1' },
    // { title: 'Sibling 1 Name', name: 'sibling1_name', type: '1' },
    // { title: 'Sibling 1 School', name: 'sibling1_school', type: '1' },
    // { title: 'Sibling 2 Class', name: 'sibling2_class', type: '1' },
    // { title: 'Sibling 2 Name', name: 'sibling2_name', type: '1' },
    // { title: 'Sibling 2 School', name: 'sibling2_school', type: '1' },
    // { title: 'Sports', name: 'sports', type: '1' },
    // { title: 'Star Information', name: 'star_information', type: '1' },
    // { title: 'State', name: 'state', type: '1' },
    // { title: 'State Enrol No.', name: 'state_enrollment_no', type: '1' },
    // { title: 'Student Email', name: 'student_email', type: '1' },
    // { title: 'Sub Caste', name: 'sub_caste', type: '1' },
    // { title: 'Transport Status', name: 'transport_status', type: '8' },
    // { title: 'Weight', name: 'weight', type: '1' },
    // { title: 'Whatsapp No.', name: 'whatsapp_no', type: '4' },
    // { title: 'Admission Done By', name: 'admission_done_by', type: '1' },
    // { title: 'Description', name: 'description', type: '1' },
  ];
  conv_category(item: any) {
    if (item == 'GENERAL') {
      return '1';
    } else if (item == 'OBC') {
      return '2';
    } else if (item == 'SC') {
      return '3';
    } else if (item == 'ST') {
      return '4';
    } else if (item == 'OC') {
      return '1';
    } else {
      return '';
    }
  }
  conv_tc(item: any) {
    if (item == 'YES') {
      return '1';
    } else if (item == 'NO') {
      return '2';
    } else {
      return '';
    }
  }
  new_employee_list: any[] = [];
  employee_list: any[] = [];
  teacher_set = new Set();
  new_staff_set = new Set();
  async selected_school3(item: any) {
    let other_school_id = item.other_school_id;
    let other_org_id = item.other_org_id;
    this.school_id3 = item.school_id;
    let body = {
      school_id: item.school_id,
      status: 'all',
    };
    this.Employee_Form = this._fb.group({
      inputs3: this._fb.array([]),
    });
    this.Teacher_Form = this._fb.group({
      inputs4: this._fb.array([]),
    });
    this.employee_list = [];
    this.new_staff_set.clear();
    this.employee_set.clear();
    this.teacher_set.clear();
    this.show_staff = false;
    await this._auth.getAllClasses(body).subscribe((res: any) => {
      if (res.status == 'success') {
        this.class_list1 = res.classes;
      }
      this._auth.getTeachers(body).subscribe((res: any) => {
        if (res.status == 'success') {
          if (res.count > 0) {
            let i = 0;
            res.teachers.forEach((element: any) => {
              element.index = i;
              element.existing = true;
              delete element.id;

              this.teacher_set.add(element.teacher_reg_id.toLowerCase());
              element.staff_reg_id = element.teacher_reg_id;
              element.staff_id = element.teacher_id;
              element.dob = element.date_of_birth;
              // this.group3[element.student_reg_id] = this._fb.control(element.class_id);
              if (
                element.role_id &&
                element.teacher_reg_id &&
                element.first_name &&
                element.residence_phone &&
                // element.dob &&
                element.date_of_joining
              ) {
                if (String(element.residence_phone).length < 10) {
                  element.ischecked = false;
                } else if (
                  String(element.residence_phone).startsWith('6') ||
                  String(element.residence_phone).startsWith('7') ||
                  String(element.residence_phone).startsWith('8') ||
                  String(element.residence_phone).startsWith('9')
                ) {
                  element.ischecked = true;
                } else {
                  element.ischecked = false;
                }
              } else {
                element.ischecked = false;
              }
              this.inputs4.push(this._fb.control(element));
              element.school_id = this.school_id3;
              this.group4[element.teacher_reg_id] = this._fb.control(
                element.role_id
              );
              i++;
            });
            this.role_select_form = this._fb.group(this.group4);
          }
        }
        this._auth.getEmployees(body).subscribe((res: any) => {
          if (res.status == 'success') {
            if (res.count > 0) {
              let j = 0;
              res.employees.forEach((element: any) => {
                delete element.id;
                element.index = j;
                element.existing = true;
                this.employee_set.add(element.emp_reg_id.toLowerCase());
                element.staff_reg_id = element.emp_reg_id;
                element.staff_id = element.employee_id;
                element.dob = element.date_of_birth;
                // this.group3[element.student_reg_id] = this._fb.control(element.class_id);
                if (
                  element.role_id &&
                  element.emp_reg_id &&
                  element.first_name &&
                  element.mobile &&
                  // element.dob &&
                  element.date_of_joining
                ) {
                  if (String(element.mobile).length < 10) {
                    element.ischecked = false;
                  } else if (
                    String(element.mobile).startsWith('6') ||
                    String(element.mobile).startsWith('7') ||
                    String(element.mobile).startsWith('8') ||
                    String(element.mobile).startsWith('9')
                  ) {
                    element.ischecked = true;
                  } else {
                    element.ischecked = false;
                  }
                } else {
                  element.ischecked = false;
                }
                this.inputs3.push(this._fb.control(element));
                element.school_id = this.school_id3;

                this.group4[element.emp_reg_id] = this._fb.control(
                  element.role_id
                );
                this.role_select_form = this._fb.group(this.group4);

                j++;
              });
            }
          }
        });
      });
    });

    // this._auth.all_staff_report(body).subscribe((res: any) => {
    // if (res.status == 'success') {
    //   if (res.count > 0) {
    //     this.employee_list = res.staff;
    //     // this.employee_list = [];
    //     let i = 0;
    //     let j = 0;
    //     this.employee_list.forEach((element) => {
    //       if (element.emp_type == 'teacher') {

    //       } else {

    //       }
    //       // this.employee_select_form = this._fb.group(this.group3);
    //     });
    //   }
    // }

    this._http
      .get(
        `https://api.patasala.in/api/schoolknot/teacherData/` +
          other_org_id +
          `/` +
          other_school_id
      )
      .subscribe((res: any) => {
        this.new_employee_list = res;
        let i = 0;
        this.new_employee_list.forEach((element: any) => {
          // if (this.new_staff_set.has(element.StaffCode.toLowerCase())) {
          //   // console.log('dublicate');
          // } else {
          //   this.new_staff_set.add(element.StaffCode.toLowerCase());
          // }

          if (element.IsTeacher == 'true') {
            if (this.teacher_set.has(element.StaffCode.toLowerCase())) {
              let value: any;
              value = this.inputs4.value;
              console.log(element.StaffCode);
              let indexs = value.filter(
                (a: any) => a.teacher_reg_id == element.StaffCode
              );
              if (indexs[0]?.teacher_reg_id) {
                let index = indexs[0]?.index;
                // this.inputs4.value[index].school_id = this.school_id2;
                this.inputs4.value[index].school_id = this.school_id3;
                this.inputs4.value[index].first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                this.inputs4.value[index].middle_name =
                  element.EmployeeMiddleName ? element.EmployeeMiddleName : '';
                this.inputs4.value[index].last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                this.inputs4.value[index].house = element.House
                  ? element.House
                  : '';
                this.inputs4.value[index].residence_address =
                  element.ResidentialAddress ? element.ResidentialAddress : '';
                this.inputs4.value[index].mobile =
                  // ? element.Mobile
                  // : '';
                  element.Mobile
                    ? String(element.Mobile).length == 10
                      ? element.Mobile
                      : String(element.Mobile).length == 11
                      ? String(element.Mobile).startsWith('0')
                        ? String(element.Mobile).slice(1, 11)
                        : String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).length == 12
                      ? String(element.Mobile).startsWith('91')
                        ? String(element.Mobile).slice(2, 12)
                        : String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).length == 13
                      ? String(element.Mobile).startsWith('+91')
                        ? String(element.Mobile).slice(3, 13)
                        : String(element.Mobile).slice(3, 13)
                      : ''
                    : '';
                this.inputs4.value[index].alternate_phone =
                  element.AlternatePhoneNo ? element.AlternatePhoneNo : '';
                this.inputs4.value[index].father_name = element.FathersName
                  ? element.FathersName
                  : '';
                this.inputs4.value[index].mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                this.inputs4.value[index].gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                this.inputs4.value[index].blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                this.inputs4.value[index].bank_name = element.BankName
                  ? element.BankName
                  : '';
                this.inputs4.value[index].bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                this.inputs4.value[index].ifsc_code = element.IFSCCode
                  ? element.IFSCCode
                  : '';
                this.inputs4.value[index].pf_no = element.PFNumber
                  ? element.PFNumber
                  : '';
                this.inputs4.value[index].pt_no = element.PTNumber
                  ? element.PTNumber
                  : '';
                this.inputs4.value[index].aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                this.inputs4.value[index].pan_number = element.PANNumber
                  ? element.PANNumber
                  : '';
                this.inputs4.value[index].esi_number = element.ESINumber
                  ? element.ESINumber
                  : '';
                this.inputs4.value[index].lic_number = element.LicNumber
                  ? element.LicNumber
                  : '';
                this.inputs4.value[index].lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                this.inputs4.value[index].religion = element.Religion
                  ? element.Religion
                  : '';
                this.inputs4.value[index].caste = element.Caste
                  ? element.Caste
                  : '';
                this.inputs4.value[index].sub_caste = element.SubCaste
                  ? element.SubCaste
                  : '';
                this.inputs4.value[index].marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                this.inputs4.value[index].marriage_anniversary =
                  element.MarriageAnniversary
                    ? element.MarriageAnniversary
                    : '';
                this.inputs4.value[index].spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                this.inputs4.value[index].child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                this.inputs4.value[index].child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                this.inputs4.value[index].child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                this.inputs4.value[index].child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                this.inputs4.value[index].education_qualification =
                  element.EducationQualification
                    ? element.EducationQualification
                    : '';
                this.inputs4.value[index].designation = element.Designation
                  ? element.Designation
                  : '';
                this.inputs4.value[index].personal_email_id =
                  element.PersonnelEmailid ? element.PersonnelEmailid : '';
                this.inputs4.value[index].official_email_id =
                  element.OfficialEmailid ? element.OfficialEmailid : '';
                this.inputs4.value[index].biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                this.inputs4.value[index].self_attendance =
                  element.SelfAttendance ? element.SelfAttendance : '';
                this.inputs4.value[index].login_time = element.LoginTime
                  ? element.LoginTime
                  : '';
                this.inputs4.value[index].logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                this.inputs4.value[index].nationality = element.Nationality
                  ? element.Nationality
                  : '';
                this.inputs4.value[index].experience = element.Experience
                  ? element.Experience
                  : '';
                this.inputs4.value[index].employment_type =
                  element.EmploymentType ? element.EmploymentType : '';
                this.inputs4.value[index].employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                this.inputs4.value[index].teacher_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                this.inputs4.value[index].staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';

                this.inputs4.value[index].email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                this.inputs4.value[index].created_date = '';
                this.inputs4.value[index].modified_date = '';
                this.inputs4.value[index].police_verification_receipt = '';
                this.inputs4.value[index].type = '';
                this.inputs4.value[index].role_id = 2;
                this.inputs4.value[index].status = 2;
                this.inputs4.value[index].last_working_date = '';
                this.inputs4.value[index].handover = '';
                this.inputs4.value[index].teacher_login_status = '';
                this.inputs4.value[index].user_type = '';
                this.inputs4.value[index].pwd_update_date = '';
                this.inputs4.value[index].gcm_id = '';
                this.inputs4.value[index].device_id = '';
                this.inputs4.value[index].role = element.MaxLevelRole.Role;
                this.inputs4.value[index].residence_phone = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                this.inputs4.value[index].dob = this.convert_dob(element.DOB);
                this.inputs4.value[index].date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                // this.role_select_form = this._fb.group(this.group4);

                if (
                  this.inputs4.value[index].role_id &&
                  this.inputs4.value[index].teacher_reg_id &&
                  this.inputs4.value[index].first_name &&
                  this.inputs4.value[index].mobile &&
                  // this.inputs4.value[index].dob &&
                  this.inputs4.value[index].date_of_joining
                ) {
                  if (String(this.inputs4.value[index].mobile).length < 10) {
                    this.inputs4.value[index].ischecked = false;
                  } else if (
                    String(this.inputs4.value[index].mobile).startsWith('6') ||
                    String(this.inputs4.value[index].mobile).startsWith('7') ||
                    String(this.inputs4.value[index].mobile).startsWith('8') ||
                    String(this.inputs4.value[index].mobile).startsWith('9')
                  ) {
                    this.inputs4.value[index].ischecked = true;
                  } else {
                    this.inputs4.value[index].ischecked = false;
                  }
                } else {
                  this.inputs4.value[index].ischecked = false;
                }
              }
            } else {
              if (this.new_staff_set.has(element.StaffCode.toLowerCase())) {
                element.school_id = this.school_id3;
                element.first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                element.middle_name = element.EmployeeMiddleName
                  ? element.EmployeeMiddleName
                  : '';
                element.last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                element.house = element.House ? element.House : '';
                element.residence_address = element.ResidentialAddress
                  ? element.ResidentialAddress
                  : '';
                element.mobile = element.Mobile ? element.Mobile : '';
                element.alternate_phone = element.AlternatePhoneNo
                  ? element.AlternatePhoneNo
                  : '';
                element.father_name = element.FathersName
                  ? element.FathersName
                  : '';
                element.mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.bank_name = element.BankName ? element.BankName : '';
                element.bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                element.ifsc_code = element.IFSCCode ? element.IFSCCode : '';
                element.pf_no = element.PFNumber ? element.PFNumber : '';
                element.pt_no = element.PTNumber ? element.PTNumber : '';
                element.aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                element.pan_number = element.PANNumber ? element.PANNumber : '';
                element.esi_number = element.ESINumber ? element.ESINumber : '';
                element.lic_number = element.LicNumber ? element.LicNumber : '';
                element.lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                element.religion = element.Religion ? element.Religion : '';
                element.caste = element.Caste ? element.Caste : '';
                element.sub_caste = element.SubCaste ? element.SubCaste : '';
                element.marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                element.marriage_anniversary = element.MarriageAnniversary
                  ? element.MarriageAnniversary
                  : '';
                element.spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                element.child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                element.child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                element.child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                element.child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                element.education_qualification = element.EducationQualification
                  ? element.EducationQualification
                  : '';
                element.designation = element.Designation
                  ? element.Designation
                  : '';
                element.personal_email_id = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.official_email_id = element.OfficialEmailid
                  ? element.OfficialEmailid
                  : '';
                element.biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                element.self_attendance = element.SelfAttendance
                  ? element.SelfAttendance
                  : '';
                element.login_time = element.LoginTime ? element.LoginTime : '';
                element.logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                element.nationality = element.Nationality
                  ? element.Nationality
                  : '';
                element.experience = element.Experience
                  ? element.Experience
                  : '';
                element.employment_type = element.EmploymentType
                  ? element.EmploymentType
                  : '';
                element.employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                element.teacher_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                element.email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.created_date = '';
                element.modified_date = '';
                element.police_verification_receipt = '';
                element.type = '';
                element.role_id = 2;
                element.teacher_id = '';
                element.status = 2;
                element.last_working_date = '';
                element.handover = '';
                element.teacher_login_status = '';
                element.user_type = '';
                element.pwd_update_date = '';
                element.gcm_id = '';
                element.device_id = '';
                element.role = element.MaxLevelRole.Role;
                element.residence_phone = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                element.dob = this.convert_dob(element.DOB);
                element.date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                // this.teacher_set.add(element.StaffCode.toLowerCase());
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                // this.role_select_form = this._fb.group(this.group4);

                if (
                  element.role_id &&
                  element.teacher_reg_id &&
                  element.first_name &&
                  element.residence_phone &&
                  // element.dob &&
                  element.date_of_joining
                ) {
                  if (String(element.residence_phone).length < 10) {
                    element.ischecked = false;
                  } else if (
                    String(element.residence_phone).startsWith('6') ||
                    String(element.residence_phone).startsWith('7') ||
                    String(element.residence_phone).startsWith('8') ||
                    String(element.residence_phone).startsWith('9')
                  ) {
                    element.ischecked = true;
                  } else {
                    element.ischecked = false;
                  }
                } else {
                  element.ischecked = false;
                }
                this.inputs4.push(this._fb.control(element));
              } else {
                element.school_id = this.school_id3;
                element.first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                element.middle_name = element.EmployeeMiddleName
                  ? element.EmployeeMiddleName
                  : '';
                element.last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                element.house = element.House ? element.House : '';
                element.residence_address = element.ResidentialAddress
                  ? element.ResidentialAddress
                  : '';
                element.mobile = element.Mobile ? element.Mobile : '';
                element.alternate_phone = element.AlternatePhoneNo
                  ? element.AlternatePhoneNo
                  : '';
                element.father_name = element.FathersName
                  ? element.FathersName
                  : '';
                element.mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.bank_name = element.BankName ? element.BankName : '';
                element.bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                element.ifsc_code = element.IFSCCode ? element.IFSCCode : '';
                element.pf_no = element.PFNumber ? element.PFNumber : '';
                element.pt_no = element.PTNumber ? element.PTNumber : '';
                element.aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                element.pan_number = element.PANNumber ? element.PANNumber : '';
                element.esi_number = element.ESINumber ? element.ESINumber : '';
                element.lic_number = element.LicNumber ? element.LicNumber : '';
                element.lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                element.religion = element.Religion ? element.Religion : '';
                element.caste = element.Caste ? element.Caste : '';
                element.sub_caste = element.SubCaste ? element.SubCaste : '';
                element.marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                element.marriage_anniversary = element.MarriageAnniversary
                  ? element.MarriageAnniversary
                  : '';
                element.spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                element.child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                element.child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                element.child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                element.child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                element.education_qualification = element.EducationQualification
                  ? element.EducationQualification
                  : '';
                element.designation = element.Designation
                  ? element.Designation
                  : '';
                element.personal_email_id = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.official_email_id = element.OfficialEmailid
                  ? element.OfficialEmailid
                  : '';
                element.biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                element.self_attendance = element.SelfAttendance
                  ? element.SelfAttendance
                  : '';
                element.login_time = element.LoginTime ? element.LoginTime : '';
                element.logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                element.nationality = element.Nationality
                  ? element.Nationality
                  : '';
                element.experience = element.Experience
                  ? element.Experience
                  : '';
                element.employment_type = element.EmploymentType
                  ? element.EmploymentType
                  : '';
                element.employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                element.teacher_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                element.email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.created_date = '';
                element.modified_date = '';
                element.police_verification_receipt = '';
                element.type = '';
                element.role_id = 2;
                element.teacher_id = '';
                element.status = 2;
                element.last_working_date = '';
                element.handover = '';
                element.teacher_login_status = '';
                element.user_type = '';
                element.pwd_update_date = '';
                element.gcm_id = '';
                element.device_id = '';
                element.role = element.MaxLevelRole.Role;
                element.residence_phone = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                element.dob = this.convert_dob(element.DOB);
                element.date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                this.new_staff_set.add(element.StaffCode.toLowerCase());
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                // this.role_select_form = this._fb.group(this.group4);

                if (
                  element.role_id &&
                  element.teacher_reg_id &&
                  element.first_name &&
                  element.residence_phone &&
                  // element.dob &&
                  element.date_of_joining
                ) {
                  if (String(element.residence_phone).length < 10) {
                    element.ischecked = false;
                  } else if (
                    String(element.residence_phone).startsWith('6') ||
                    String(element.residence_phone).startsWith('7') ||
                    String(element.residence_phone).startsWith('8') ||
                    String(element.residence_phone).startsWith('9')
                  ) {
                    element.ischecked = true;
                  } else {
                    element.ischecked = false;
                  }
                } else {
                  element.ischecked = false;
                }
                this.inputs4.push(this._fb.control(element));
              }
            }
            // this.teacher_set_1.push()
          } else {
            // console.log(this.new_staff_set)
            // if (this.new_staff_set.has(element.StaffCode.toLowerCase())) {
            //   console.log('dublicate');
            // } else {
            //   this.new_staff_set.add(element.StaffCode.toLowerCase());
            // }
            if (this.employee_set.has(element.StaffCode.toLowerCase())) {
              let value: any;
              value = this.inputs3.value;
              let indexs = value.filter(
                (a: any) => a.emp_reg_id == element.StaffCode
              );

              if (indexs[0]?.emp_reg_id) {
                let index = indexs[0]?.index;
                // this.inputs2.value[index].school_id = this.school_id2;
                // this.inputs2.value[index].school_id = this.school_id3;
                this.inputs3.value[index].school_id = this.school_id3;
                this.inputs3.value[index].first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                this.inputs3.value[index].middle_name =
                  element.EmployeeMiddleName ? element.EmployeeMiddleName : '';
                this.inputs3.value[index].last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                this.inputs3.value[index].house = element.House
                  ? element.House
                  : '';
                this.inputs3.value[index].residence_address =
                  element.ResidentialAddress ? element.ResidentialAddress : '';
                this.inputs3.value[index].mobile = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                this.inputs3.value[index].alternate_phone =
                  element.AlternatePhoneNo ? element.AlternatePhoneNo : '';
                this.inputs3.value[index].father_name = element.FathersName
                  ? element.FathersName
                  : '';
                this.inputs3.value[index].mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                this.inputs3.value[index].gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                this.inputs3.value[index].blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                this.inputs3.value[index].bank_name = element.BankName
                  ? element.BankName
                  : '';
                this.inputs3.value[index].bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                this.inputs3.value[index].ifsc_code = element.IFSCCode
                  ? element.IFSCCode
                  : '';
                this.inputs3.value[index].pf_no = element.PFNumber
                  ? element.PFNumber
                  : '';
                this.inputs3.value[index].pt_no = element.PTNumber
                  ? element.PTNumber
                  : '';
                this.inputs3.value[index].aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                this.inputs3.value[index].pan_number = element.PANNumber
                  ? element.PANNumber
                  : '';
                this.inputs3.value[index].esi_number = element.ESINumber
                  ? element.ESINumber
                  : '';
                this.inputs3.value[index].lic_number = element.LicNumber
                  ? element.LicNumber
                  : '';
                this.inputs3.value[index].lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                this.inputs3.value[index].religion = element.Religion
                  ? element.Religion
                  : '';
                this.inputs3.value[index].caste = element.Caste
                  ? element.Caste
                  : '';
                this.inputs3.value[index].sub_caste = element.SubCaste
                  ? element.SubCaste
                  : '';
                this.inputs3.value[index].marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                this.inputs3.value[index].marriage_anniversary =
                  element.MarriageAnniversary
                    ? element.MarriageAnniversary
                    : '';
                this.inputs3.value[index].spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                this.inputs3.value[index].child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                this.inputs3.value[index].child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                this.inputs3.value[index].child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                this.inputs3.value[index].child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                this.inputs3.value[index].education_qualification =
                  element.EducationQualification
                    ? element.EducationQualification
                    : '';
                this.inputs3.value[index].designation = element.Designation
                  ? element.Designation
                  : '';
                this.inputs3.value[index].personal_email_id =
                  element.PersonnelEmailid ? element.PersonnelEmailid : '';
                this.inputs3.value[index].official_email_id =
                  element.OfficialEmailid ? element.OfficialEmailid : '';
                this.inputs3.value[index].biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                this.inputs3.value[index].self_attendance =
                  element.SelfAttendance ? element.SelfAttendance : '';
                this.inputs3.value[index].login_time = element.LoginTime
                  ? element.LoginTime
                  : '';
                this.inputs3.value[index].logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                this.inputs3.value[index].nationality = element.Nationality
                  ? element.Nationality
                  : '';
                this.inputs3.value[index].experience = element.Experience
                  ? element.Experience
                  : '';
                this.inputs3.value[index].employment_type =
                  element.EmploymentType ? element.EmploymentType : '';
                this.inputs3.value[index].employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                this.inputs3.value[index].emp_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                this.inputs3.value[index].staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                this.inputs3.value[index].blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                this.inputs3.value[index].email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                this.inputs3.value[index].created_date = '';
                this.inputs3.value[index].modified_date = '';
                this.inputs3.value[index].police_verification_receipt = '';
                this.inputs3.value[index].type =
                  element.HaveSubjectsToTeach == 'true' ? 2 : 1;
                this.inputs3.value[index].role_id =
                  element.MaxLevelRole.RoleId == 2
                    ? 1
                    : element.MaxLevelRole.RoleId == 5
                    ? 13
                    : element.MaxLevelRole.RoleId == 6
                    ? 2
                    : element.MaxLevelRole.RoleId == 7
                    ? 6
                    : element.MaxLevelRole.RoleId == 8
                    ? 166
                    : element.MaxLevelRole.RoleId == 9
                    ? 7
                    : element.MaxLevelRole.RoleId == 10
                    ? 161
                    : element.MaxLevelRole.RoleId == 11
                    ? 182
                    : element.MaxLevelRole.RoleId == 12
                    ? 8
                    : element.MaxLevelRole.RoleId == 13
                    ? 24
                    : element.MaxLevelRole.RoleId == 14
                    ? 18
                    : element.MaxLevelRole.RoleId == 16
                    ? 52
                    : '';
                this.inputs3.value[index].status = 1;
                this.inputs3.value[index].dob = this.convert_dob(element.DOB);
                this.inputs3.value[index].date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                this.inputs3.value[index].role = element.MaxLevelRole.Role;
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                if (
                  this.inputs3.value[index].role_id &&
                  this.inputs3.value[index].emp_reg_id &&
                  this.inputs3.value[index].first_name &&
                  this.inputs3.value[index].mobile &&
                  // this.inputs3.value[index].dob &&
                  this.inputs3.value[index].date_of_joining
                ) {
                  if (String(this.inputs3.value[index].mobile).length < 10) {
                    console.log('1:' + this.inputs3.value.emp_reg_id);
                    this.inputs3.value[index].ischecked = false;
                  } else if (
                    String(this.inputs3.value[index].mobile).startsWith('6') ||
                    String(this.inputs3.value[index].mobile).startsWith('7') ||
                    String(this.inputs3.value[index].mobile).startsWith('8') ||
                    String(this.inputs3.value[index].mobile).startsWith('9')
                  ) {
                    this.inputs3.value[index].ischecked = true;
                  } else {
                    console.log('2:' + this.inputs3.value.emp_reg_id);

                    this.inputs3.value[index].ischecked = false;
                  }
                } else {
                  console.log('3:' + this.inputs3.value.emp_reg_id);

                  this.inputs3.value[index].ischecked = false;
                }
              }
              // this.role_select_form = this._fb.group(this.group4);
            } else {
              if (this.new_staff_set.has(element.StaffCode.toLowerCase())) {
                // console.log(element.StaffCode);
                element.school_id = this.school_id3;
                element.first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                element.middle_name = element.EmployeeMiddleName
                  ? element.EmployeeMiddleName
                  : '';
                element.last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                element.house = element.House ? element.House : '';
                element.residence_address = element.ResidentialAddress
                  ? element.ResidentialAddress
                  : '';
                element.mobile = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                element.alternate_phone = element.AlternatePhoneNo
                  ? element.AlternatePhoneNo
                  : '';
                element.father_name = element.FathersName
                  ? element.FathersName
                  : '';
                element.mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                element.gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.bank_name = element.BankName ? element.BankName : '';
                element.bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                element.ifsc_code = element.IFSCCode ? element.IFSCCode : '';
                element.pf_no = element.PFNumber ? element.PFNumber : '';
                element.pt_no = element.PTNumber ? element.PTNumber : '';
                element.aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                element.pan_number = element.PANNumber ? element.PANNumber : '';
                element.esi_number = element.ESINumber ? element.ESINumber : '';
                element.lic_number = element.LicNumber ? element.LicNumber : '';
                element.lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                element.religion = element.Religion ? element.Religion : '';
                element.caste = element.Caste ? element.Caste : '';
                element.sub_caste = element.SubCaste ? element.SubCaste : '';
                element.marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                element.marriage_anniversary = element.MarriageAnniversary
                  ? element.MarriageAnniversary
                  : '';
                element.spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                element.child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                element.child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                element.child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                element.child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                element.education_qualification = element.EducationQualification
                  ? element.EducationQualification
                  : '';
                element.designation = element.Designation
                  ? element.Designation
                  : '';
                element.personal_email_id = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.official_email_id = element.OfficialEmailid
                  ? element.OfficialEmailid
                  : '';
                element.biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                element.self_attendance = element.SelfAttendance
                  ? element.SelfAttendance
                  : '';
                element.login_time = element.LoginTime ? element.LoginTime : '';
                element.logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                element.nationality = element.Nationality
                  ? element.Nationality
                  : '';
                element.experience = element.Experience
                  ? element.Experience
                  : '';
                element.employment_type = element.EmploymentType
                  ? element.EmploymentType
                  : '';
                element.employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                element.emp_reg_id = element.StaffCode ? element.StaffCode : '';
                element.staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.created_date = '';
                element.modified_date = '';
                element.police_verification_receipt = '';
                element.type = element.HaveSubjectsToTeach == 'true' ? 2 : 1;
                element.role_id =
                  element.MaxLevelRole.RoleId == 2
                    ? 1
                    : element.MaxLevelRole.RoleId == 5
                    ? 13
                    : element.MaxLevelRole.RoleId == 6
                    ? 2
                    : element.MaxLevelRole.RoleId == 7
                    ? 6
                    : element.MaxLevelRole.RoleId == 8
                    ? 166
                    : element.MaxLevelRole.RoleId == 9
                    ? 7
                    : element.MaxLevelRole.RoleId == 10
                    ? 161
                    : element.MaxLevelRole.RoleId == 11
                    ? 182
                    : element.MaxLevelRole.RoleId == 12
                    ? 8
                    : element.MaxLevelRole.RoleId == 13
                    ? 24
                    : element.MaxLevelRole.RoleId == 14
                    ? 18
                    : element.MaxLevelRole.RoleId == 16
                    ? 52
                    : '';
                element.status = 1;
                element.dob = this.convert_dob(element.DOB);
                element.date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                element.role = element.MaxLevelRole.Role;
                // this.employee_set.add(element.StaffCode.toLowerCase());
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                if (
                  element.role_id &&
                  element.emp_reg_id &&
                  element.first_name &&
                  element.mobile &&
                  // element.dob &&
                  element.date_of_joining
                ) {
                  if (String(element.mobile).length < 10) {
                    element.ischecked = false;
                  } else if (
                    String(element.mobile).startsWith('6') ||
                    String(element.mobile).startsWith('7') ||
                    String(element.mobile).startsWith('8') ||
                    String(element.mobile).startsWith('9')
                  ) {
                    element.ischecked = true;
                  } else {
                    element.ischecked = false;
                  }
                } else {
                  element.ischecked = false;
                }

                this.inputs3.push(this._fb.control(element));
              } else {
                element.school_id = this.school_id3;
                element.first_name = element.EmployeeFirstName
                  ? element.EmployeeFirstName
                  : '';
                element.middle_name = element.EmployeeMiddleName
                  ? element.EmployeeMiddleName
                  : '';
                element.last_name = element.EmployeeLastName
                  ? element.EmployeeLastName
                  : '';
                element.house = element.House ? element.House : '';
                element.residence_address = element.ResidentialAddress
                  ? element.ResidentialAddress
                  : '';
                element.mobile = element.Mobile
                  ? String(element.Mobile).length == 10
                    ? element.Mobile
                    : String(element.Mobile).length == 11
                    ? String(element.Mobile).startsWith('0')
                      ? String(element.Mobile).slice(1, 11)
                      : String(element.Mobile).slice(1, 11)
                    : String(element.Mobile).length == 12
                    ? String(element.Mobile).startsWith('91')
                      ? String(element.Mobile).slice(2, 12)
                      : String(element.Mobile).slice(2, 12)
                    : String(element.Mobile).length == 13
                    ? String(element.Mobile).startsWith('+91')
                      ? String(element.Mobile).slice(3, 13)
                      : String(element.Mobile).slice(3, 13)
                    : ''
                  : '';
                element.alternate_phone = element.AlternatePhoneNo
                  ? element.AlternatePhoneNo
                  : '';
                element.father_name = element.FathersName
                  ? element.FathersName
                  : '';
                element.mother_name = element.MothersName
                  ? element.MothersName
                  : '';
                element.gender = element.Gender
                  ? element.Gender == 'M'
                    ? 'male'
                    : element.Gender == 'F'
                    ? 'female'
                    : ''
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.bank_name = element.BankName ? element.BankName : '';
                element.bank_account = element.BankAccountNo
                  ? element.BankAccountNo
                  : '';
                element.ifsc_code = element.IFSCCode ? element.IFSCCode : '';
                element.pf_no = element.PFNumber ? element.PFNumber : '';
                element.pt_no = element.PTNumber ? element.PTNumber : '';
                element.aadhar_number = element.AadharNumber
                  ? element.AadharNumber
                  : '';
                element.pan_number = element.PANNumber ? element.PANNumber : '';
                element.esi_number = element.ESINumber ? element.ESINumber : '';
                element.lic_number = element.LicNumber ? element.LicNumber : '';
                element.lic_validity = element.LicValidity
                  ? element.LicValidity
                  : '';
                element.religion = element.Religion ? element.Religion : '';
                element.caste = element.Caste ? element.Caste : '';
                element.sub_caste = element.SubCaste ? element.SubCaste : '';
                element.marital_status = element.MaritalStatus
                  ? element.MaritalStatus
                  : '';
                element.marriage_anniversary = element.MarriageAnniversary
                  ? element.MarriageAnniversary
                  : '';
                element.spouse_name = element.SpouseName
                  ? element.SpouseName
                  : '';
                element.child1_name = element.Child1Name
                  ? element.Child1Name
                  : '';
                element.child2_name = element.Child2Name
                  ? element.Child2Name
                  : '';
                element.child3_name = element.Child3Name
                  ? element.Child3Name
                  : '';
                element.child4_name = element.Child4Name
                  ? element.Child4Name
                  : '';
                element.education_qualification = element.EducationQualification
                  ? element.EducationQualification
                  : '';
                element.designation = element.Designation
                  ? element.Designation
                  : '';
                element.personal_email_id = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.official_email_id = element.OfficialEmailid
                  ? element.OfficialEmailid
                  : '';
                element.biometric_id = element.BiometricId
                  ? element.BiometricId
                  : '';
                element.self_attendance = element.SelfAttendance
                  ? element.SelfAttendance
                  : '';
                element.login_time = element.LoginTime ? element.LoginTime : '';
                element.logout_time = element.LogoutTime
                  ? element.LogoutTime
                  : '';
                element.nationality = element.Nationality
                  ? element.Nationality
                  : '';
                element.experience = element.Experience
                  ? element.Experience
                  : '';
                element.employment_type = element.EmploymentType
                  ? element.EmploymentType
                  : '';
                element.employee_type = element.EmployeeType
                  ? element.EmployeeType
                  : '';
                element.emp_reg_id = element.StaffCode ? element.StaffCode : '';
                element.staff_reg_id = element.StaffCode
                  ? element.StaffCode
                  : '';
                element.blood_group = element.BloodGroup
                  ? element.BloodGroup
                  : '';
                element.email = element.PersonnelEmailid
                  ? element.PersonnelEmailid
                  : '';
                element.created_date = '';
                element.modified_date = '';
                element.police_verification_receipt = '';
                element.type = element.HaveSubjectsToTeach == 'true' ? 2 : 1;
                element.role_id =
                  element.MaxLevelRole.RoleId == 2
                    ? 1
                    : element.MaxLevelRole.RoleId == 5
                    ? 13
                    : element.MaxLevelRole.RoleId == 6
                    ? 2
                    : element.MaxLevelRole.RoleId == 7
                    ? 6
                    : element.MaxLevelRole.RoleId == 8
                    ? 166
                    : element.MaxLevelRole.RoleId == 9
                    ? 7
                    : element.MaxLevelRole.RoleId == 10
                    ? 161
                    : element.MaxLevelRole.RoleId == 11
                    ? 182
                    : element.MaxLevelRole.RoleId == 12
                    ? 8
                    : element.MaxLevelRole.RoleId == 13
                    ? 24
                    : element.MaxLevelRole.RoleId == 14
                    ? 18
                    : element.MaxLevelRole.RoleId == 16
                    ? 52
                    : '';
                element.status = 1;
                element.dob = this.convert_dob(element.DOB);
                element.date_of_joining = this.convert_dob(
                  element.EmployeeDateofJoining
                );
                element.role = element.MaxLevelRole.Role;
                this.new_staff_set.add(element.StaffCode.toLowerCase());
                this.group4[element.EmployeeID] = this._fb.control(
                  element.role_id
                );
                if (
                  element.role_id &&
                  element.emp_reg_id &&
                  element.first_name &&
                  element.mobile &&
                  // element.dob &&
                  element.date_of_joining
                ) {
                  if (String(element.mobile).length < 10) {
                    element.ischecked = false;
                  } else if (
                    String(element.mobile).startsWith('6') ||
                    String(element.mobile).startsWith('7') ||
                    String(element.mobile).startsWith('8') ||
                    String(element.mobile).startsWith('9')
                  ) {
                    element.ischecked = true;
                  } else {
                    element.ischecked = false;
                  }
                } else {
                  element.ischecked = false;
                }

                this.inputs3.push(this._fb.control(element));
              }
            }

            // this.role_select_form = this._fb.group(this.group4);
          }
          this.role_select_form = this._fb.group(this.group4);

          if (i == this.new_employee_list.length - 1) {
            this.show_staff = true;
            this.inputs3.value.forEach((element: any) => {
              let values = this.inputs3.value.filter(
                (a: any) => a.emp_reg_id == element.emp_reg_id
              );
              if (values.length > 1) {
                values.forEach((elements: any) => {
                  elements.ischecked = false;
                  elements.dublicate = true;
                });
              }
            });
            this.inputs4.value.forEach((element: any) => {
              let values = this.inputs4.value.filter(
                (a: any) => a.teacher_reg_id == element.teacher_reg_id
              );
              if (values.length > 1) {
                values.forEach((elements: any) => {
                  elements.ischecked = false;
                  elements.dublicate = true;
                });
              }
            });
          }
          i++;
        });
      });

    // this.master_class_form = this._fb.group(this.group);
    // });
    // });
    //   });
    // });
  }
  show_staff: boolean = false;
  staff_inputs: any[] = [
    { title: 'Role ID', name: 'role_id', type: '5' },
    { title: 'Reg ID', name: 'emp_reg_id', type: '12' },
    { title: 'First Name', name: 'first_name', type: '1' },
    { title: 'Middle Name', name: 'middle_name', type: '1' },
    { title: 'Last Name', name: 'last_name', type: '1' },
    { title: 'DOB', name: 'dob', type: '3' },
    { title: 'Date of Joining', name: 'date_of_joining', type: '3' },
    { title: 'Mobile', name: 'mobile', type: '4' },
    { title: 'House', name: 'house', type: '1' },
    { title: 'Residence Address', name: 'residence_address', type: '1' },
    { title: 'Alternate Mobile', name: 'alternate_phone', type: '4' },
    { title: 'Father Name', name: 'father_name', type: '1' },
    { title: 'Mother Name', name: 'mother_name', type: '1' },
    { title: 'Gender', name: 'gender', type: '6' },
    { title: 'Blood Group', name: 'blood_group', type: '1' },
    { title: 'Bank Name', name: 'bank_name', type: '1' },
    { title: 'Bank Account', name: 'bank_account', type: '1' },
    { title: 'IFSC', name: 'ifsc_code', type: '1' },
    { title: 'PF No.', name: 'pf_no', type: '1' },
    { title: 'PT No.', name: 'pt_no', type: '1' },
    { title: 'Adhar No.', name: 'aadhar_number', type: '2' },
    { title: 'PAN', name: 'pan_number', type: '1' },
    { title: 'ESI', name: 'esi_number', type: '1' },
    { title: 'LIC No.', name: 'lic_number', type: '1' },
    { title: 'LIC VAlidity', name: 'lic_validity', type: '3' },
    { title: 'Religion', name: 'religion', type: '1' },
    { title: 'Caste', name: 'caste', type: '1' },
    { title: 'Sub Caste', name: 'sub_caste', type: '1' },
    { title: 'Martial Status', name: 'marital_status', type: '8' },
    { title: 'Marriage Anniversary', name: 'marriage_anniversary', type: '3' },
    { title: 'Spouse Name', name: 'spouse_name', type: '1' },
    { title: 'Child 1 Name', name: 'child1_name', type: '1' },
    { title: 'Child 2 Name', name: 'child2_name', type: '1' },
    { title: 'Child 3 Name', name: 'child3_name', type: '1' },
    { title: 'Child 4 Name', name: 'child4_name', type: '1' },
    {
      title: 'Education Qualification',
      name: 'education_qualification',
      type: '1',
    },
    { title: 'Designation', name: 'designation', type: '1' },
    { title: 'Personal Email', name: 'personal_email_id', type: '1' },
    { title: 'Official Email', name: 'official_email_id', type: '1' },
    { title: 'Biometric', name: 'biometric_id', type: '1' },
    { title: 'Self-Attendance', name: 'self_attendance', type: '1' },
    { title: 'Login Time', name: 'login_time', type: '9' },
    { title: 'Logout Time', name: 'logout_time', type: '9' },
    { title: 'Nationality', name: 'nationality', type: '1' },
    { title: 'Experience', name: 'experience', type: '1' },
    { title: 'Email', name: 'email', type: '1' },
    { title: 'Teaching Staff', name: 'type', type: '8' },
    { title: 'Employment Type', name: 'employment_type', type: '11' },
    { title: 'Employee Type', name: 'employee_type', type: '10' },
  ];
  role_list: any[] = [];
  get_roles() {
    let body = {};
    this._auth.get_role_id(body).subscribe((res) => {
      if ((res.status = 'success')) {
        this.role_list = res.targets;

        this.role_list.sort((a: any, b: any) => {
          return a.role_name.toLowerCase() < b.role_name.toLowerCase() ? -1 : 1;
        });
      }
    });
  }
  filter_array_student(a: any, obj: any) {
    var i = a.length;
    while (i--) {
      let values = Object.values(a[i]);
      let key = Object.keys(a[i]);
      var j = values.length;
      while (j--) {
        if (key[j] == 'ischecked') {
          if (values[j] === false) {
            return true;
          }
        }
      }
    }
    return false;
  }
  filter_array_concession(a: any, obj: any) {
    var i = a.length;
    while (i--) {
      let values = Object.values(a[i]);
      let key = Object.keys(a[i]);
      var j = values.length;
      while (j--) {
        if (key[j] == 'valid') {
          if (values[j] === false) {
            return true;
          }
        }
      }
    }
    return false;
  }
  submit_student() {
    this.Student_Form.patchValue({ school_id: this.school_id2 });

    let checked_values = this.inputs2.value.filter((a: any) => a.ischecked);
    let unchecked_values = this.inputs2.value.filter((a: any) => !a.ischecked);
    let body: any;
    console.log(checked_values);
    body = {
      school_id: this.school_id2,
      studentDetails: checked_values,
      // this.Student_Form.value.inputs2,
    };
    console.log(body);

    // return false;

    // else{

    this._auth.add_students(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({ title: 'Students Added Successfully', icon: 'success' });
        if (unchecked_values) {
          // this.show_student=false
          // this.Student_Form.value.inputs2=unchecked_values
          this.Student_Form = this._fb.group({
            inputs2: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            this.group2[element.ids] = this._fb.control(element.class_id);
            this.inputs2.push(this._fb.control(element));
          });
          this.class_select_form = this._fb.group(this.group2);
          // this.show_student=true
        } else {
          this.school_id2 == '';
          this.student_list = [];
          this.new_student_list = [];
          this.Student_Form = this._fb.group({
            inputs2: this._fb.array([]),
          });
          this.school_search_form2.patchValue({ school: '' });
        }
      } else {
        Swal.fire({ title: res.message, icon: 'error' });
      }
    });
    // }
  }
  convert_dob(input: any) {
    if (input) {
      var datePart = input.match(/\d+/g),
        year = datePart[2],
        month = datePart[1],
        day = datePart[0];

      return year + '-' + month + '-' + day;
    } else {
      return '';
    }
  }
  new_class_list: any[] = [];
  new_student_list: any[] = [];
  set_value_column(item: any, id: any, type: any) {
    if (type == 1) {
      this.inputs.controls[id].value.subject_name = item.target.value;
    }
    if (type == 2) {
      this.inputs.controls[id].value.subject_code = item.target.value;
    }
    if (type == 3) {
      this.inputs.controls[id].value.subject_category = item.target.value;
    }
    if (type == 4) {
      this.inputs.controls[id].value.subject_type = item.target.value;
    }
    if (type == 5) {
      this.inputs.controls[id].value.IB_subject = item.target.value;
    }
  }
  set_value_column2(item: any, id: any, values: any) {
    this.inputs2.controls[id].value[values] = item.target.value;
    if (
      this.inputs2.controls[id].value.class_id &&
      this.inputs2.controls[id].value.student_reg_id &&
      this.inputs2.controls[id].value.first_name &&
      this.inputs2.controls[id].value.residence_phone &&
      this.inputs2.controls[id].value.dob
    ) {
      if (String(this.inputs2.controls[id].value.residence_phone).length < 10) {
        this.inputs2.controls[id].value.ischecked = false;
      } else if (
        String(this.inputs2.controls[id].value.residence_phone).startsWith(
          '6'
        ) ||
        String(this.inputs2.controls[id].value.residence_phone).startsWith(
          '7'
        ) ||
        String(this.inputs2.controls[id].value.residence_phone).startsWith(
          '8'
        ) ||
        String(this.inputs2.controls[id].value.residence_phone).startsWith('9')
      ) {
        this.inputs2.controls[id].value.ischecked = true;
      } else {
        this.inputs2.controls[id].value.ischecked = false;
      }
    } else {
      this.inputs2.controls[id].value.ischecked = false;
    }
    this.inputs2.value.forEach((element: any) => {
      let values = this.inputs2.value.filter(
        (a: any) => a.student_reg_id == element.student_reg_id
      );
      if (values.length > 1) {
        values.forEach((elements: any) => {
          elements.ischecked = false;
          elements.dublicate = true;
        });
      }
      if (values.length == 1) {
        values[0].dublicate = false;
        if (
          values[0].class_id &&
          values[0].student_reg_id &&
          values[0].first_name &&
          values[0].residence_phone &&
          values[0].dob
        ) {
          if (String(values[0].residence_phone).length < 10) {
            values[0].ischecked = false;
          } else if (
            String(values[0].residence_phone).startsWith('6') ||
            String(values[0].residence_phone).startsWith('7') ||
            String(values[0].residence_phone).startsWith('8') ||
            String(values[0].residence_phone).startsWith('9')
          ) {
            values[0].ischecked = true;
          } else {
            values[0].ischecked = false;
          }
        } else {
          values[0].ischecked = false;
        }
      }
    });
  }
  set_value_column3(item: any, id: any, types: any) {
    this.inputs3.controls[id].value[types] = item.target.value;
    if (
      this.inputs3.controls[id].value.role_id &&
      this.inputs3.controls[id].value.emp_reg_id &&
      this.inputs3.controls[id].value.first_name &&
      this.inputs3.controls[id].value.mobile &&
      this.inputs3.controls[id].value.date_of_joining
    ) {
      if (String(this.inputs3.controls[id].value.mobile).length < 10) {
        this.inputs3.controls[id].value.ischecked = false;
      } else if (
        String(this.inputs3.controls[id].value.mobile).startsWith('6') ||
        String(this.inputs3.controls[id].value.mobile).startsWith('7') ||
        String(this.inputs3.controls[id].value.mobile).startsWith('8') ||
        String(this.inputs3.controls[id].value.mobile).startsWith('9')
      ) {
        this.inputs3.controls[id].value.ischecked = true;
      } else {
        this.inputs3.controls[id].value.ischecked = false;
      }
    } else {
      this.inputs3.controls[id].value.ischecked = false;
    }
    this.inputs3.value.forEach((element: any) => {
      // console.log(element)
      let values = this.inputs3.value.filter(
        (a: any) => a.emp_reg_id == element.emp_reg_id
      );
      if (values.length > 1) {
        values.forEach((elements: any) => {
          elements.ischecked = false;
          elements.dublicate = true;
        });
      }
      if (values.length == 1) {
        values[0].dublicate = false;
        if (
          values[0].role_id &&
          values[0].emp_reg_id &&
          values[0].first_name &&
          values[0].mobile &&
          values[0].date_of_joining
        ) {
          if (String(values[0].mobile).length < 10) {
            values[0].ischecked = false;
          } else if (
            String(values[0].mobile).startsWith('6') ||
            String(values[0].mobile).startsWith('7') ||
            String(values[0].mobile).startsWith('8') ||
            String(values[0].mobile).startsWith('9')
          ) {
            values[0].ischecked = true;
          } else {
            values[0].ischecked = false;
          }
        } else {
          values[0].ischecked = false;
        }
      }
    });
  }
  set_value_column4(item: any, id: any, types: any) {
    this.inputs4.controls[id].value[types] = item.target.value;
    if (
      this.inputs4.controls[id].value.role_id &&
      this.inputs4.controls[id].value.teacher_reg_id &&
      this.inputs4.controls[id].value.first_name &&
      this.inputs4.controls[id].value.residence_phone &&
      this.inputs4.controls[id].value.date_of_joining
    ) {
      if (String(this.inputs4.controls[id].value.residence_phone).length < 10) {
        this.inputs4.controls[id].value.ischecked = false;
      } else if (
        String(this.inputs4.controls[id].value.residence_phone).startsWith(
          '6'
        ) ||
        String(this.inputs4.controls[id].value.residence_phone).startsWith(
          '7'
        ) ||
        String(this.inputs4.controls[id].value.residence_phone).startsWith(
          '8'
        ) ||
        String(this.inputs4.controls[id].value.residence_phone).startsWith('9')
      ) {
        this.inputs4.controls[id].value.ischecked = true;
      } else {
        this.inputs4.controls[id].value.ischecked = false;
      }
    } else {
      this.inputs4.controls[id].value.ischecked = false;
    }
    this.inputs4.value.forEach((element: any) => {
      let values = this.inputs4.value.filter(
        (a: any) => a.teacher_reg_id == element.teacher_reg_id
      );
      if (values.length > 1) {
        values.forEach((elements: any) => {
          elements.ischecked = false;
          elements.dublicate = true;
        });
      }
      if (values.length == 1) {
        values[0].dublicate = false;
        if (
          values[0].role_id &&
          values[0].teacher_reg_id &&
          values[0].first_name &&
          values[0].mobile &&
          // values[0].dob &&
          values[0].date_of_joining
        ) {
          if (String(values[0].mobile).length < 10) {
            values[0].ischecked = false;
          } else if (
            String(values[0].mobile).startsWith('6') ||
            String(values[0].mobile).startsWith('7') ||
            String(values[0].mobile).startsWith('8') ||
            String(values[0].mobile).startsWith('9')
          ) {
            values[0].ischecked = true;
          } else {
            values[0].ischecked = false;
          }
        } else {
          values[0].ischecked = false;
        }
      }
    });
  }
  set_value_column5(item: any, id: any, types: any) {
    this.inputs6.controls[id].value[types] = item.target.value;
  }
  set_value_column6(item: any, id: any, types: any) {
    if (types == 'index') {
      let value = this.fee_list.filter(
        (a: any) => a.assigned_id == item.target.value
      );
      console.log(value);
      this.inputs6.controls[id].value[types] =
        value.length > 0 ? value[0].index : '';

      this.inputs6.controls[id].value['term_id'] = '';
    }
    this.inputs6.controls[id].value['valid'] =
      this.inputs6.controls[id].value['term_id'] &&
      this.inputs6.controls[id].value['assigned_id']
        ? true
        : false;
    // this.inputs6.patchValue({valid:''})
  }
  set_value_column7(item: any, id: any, types: any) {
    if (types == 'index') {
      let value = this.fee_list1.filter(
        (a: any) => a.assigned_id == item.target.value
      );
      this.inputs5.controls[id].value[types] =
        value.length > 0 ? value[0].index : '';

      this.inputs5.controls[id].value['term_id'] = '';
    }
    this.inputs5.controls[id].value['valid'] =
      this.inputs5.controls[id].value['term_id'] &&
      this.inputs5.controls[id].value['assigned_id'] &&
      this.inputs5.controls[id].value['concession_id']
        ? true
        : false;
    // this.inputs6.patchValue({valid:''})
  }
  set_value_column8(item: any, id: any, types: any) {
    if (types == 'subject_id') {
      let subject_id = item.target.value;

      let value = this.exam_subjects_list.filter(
        (a: any) => a.subject_id == subject_id
      );
      this.inputs8.controls[id].value[types] = item.target.value;
      if (value[0]) {
        this.inputs8.controls[id].value['es_id'] = value[0].es_id;
      }
    } else {
      this.inputs8.controls[id].value[types] = item.target.value;
    }
    console.log(this.inputs8.controls[id].value);
    this.inputs8.controls[id].value['valid'] =
      this.inputs8.controls[id].value['subject_id'] &&
      this.inputs8.controls[id].value['es_id'] &&
      this.inputs8.controls[id].value['category_id'] &&
      (this.isNumber(this.inputs8.controls[id].value['marks'])
        ? this.inputs8.controls[id].value['marks'] <=
          this.inputs8.controls[id].value['max_marks']
        : this.inputs8.controls[id].value['marks'])
        ? true
        : false;
    // this.inputs6.patchValue({valid:''})
  }
  set_value_column1(item: any, id: any, type: any) {
    if (type == 1) {
      this.inputs1.controls[id].value.class_name = item.target.value;
    }
    if (type == 2) {
      this.inputs1.controls[id].value.master_class_id = item.target.value;
      if (item.target.value >= 1 && item.target.value <= 4) {
        this.inputs1.controls[id].value.class_group = 1;
      } else if (item.target.value >= 5 && item.target.value <= 9) {
        this.inputs1.controls[id].value.class_group = 3;
      } else if (item.target.value >= 10 && item.target.value <= 12) {
        this.inputs1.controls[id].value.class_group = 4;
      } else if (item.target.value >= 13 && item.target.value <= 16) {
        this.inputs1.controls[id].value.class_group = 5;
      } else if (item.target.value >= 17 && item.target.value <= 19) {
        this.inputs1.controls[id].value.class_group = 2;
      } else {
        this.inputs1.controls[id].value.class_group = '';
      }
    }
    if (type == 3) {
      this.inputs1.controls[id].value.subject_category = item.target.value;
    }
    if (type == 4) {
      this.inputs1.controls[id].value.class_group = item.target.value;
    }
    if (type == 5) {
      this.inputs1.controls[id].value.class_type = item.target.value;
    }
  }
  submit_subject() {
    this.Subject_Form.patchValue({ school_id: this.school_id });
    let body: any;
    body = {
      school_id: this.school_id,
      subjectDetail: this.Subject_Form.value.inputs,
    };
    this._auth.add_subjects(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Subjects Added Successfully',
          icon: 'success',
        });
        this.school_id == '';
        this.subject_list = [];
        this.Subject_Form = this._fb.group({
          inputs: this._fb.array([]),
        });
        (<HTMLInputElement>document.getElementById('my-file-selector')).value =
          '';
        this.school_search_form.patchValue({ school: '' });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }
  submit_class() {
    this.Class_Form.patchValue({ school_id: this.school_id1 });
    let body: any;
    body = {
      school_id: this.school_id1,
      classsDetail: this.Class_Form.value.inputs1,
    };
    this._auth.add_classes(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Classes Added Successfully',
          icon: 'success',
        });
        this.school_id1 == '';
        this.class_list = [];
        this.Class_Form = this._fb.group({
          inputs1: this._fb.array([]),
        });
        // (<HTMLInputElement>document.getElementById('my-file-selector')).value = '';
        this.school_search_form1.patchValue({ school: '' });
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }
  submit_employee() {
    this.Employee_Form.patchValue({ school_id: this.school_id3 });
    let body: any;
    let checked_values = this.inputs3.value.filter((a: any) => a.ischecked);
    let unchecked_values = this.inputs3.value.filter((a: any) => !a.ischecked);
    body = {
      school_id: this.school_id3,
      empDetails: checked_values,
    };
    this._auth.add_employees(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Employees Added Successfully',
          icon: 'success',
        });
        if (unchecked_values) {
          this.Employee_Form = this._fb.group({
            inputs3: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            this.inputs3.push(this._fb.control(element));
          });
        } else {
          this.Employee_Form = this._fb.group({
            inputs3: this._fb.array([]),
          });
          this.school_search_form3.patchValue({ school: '', view_type: '1' });
        }
        // this.school_id3 == '';
        // this.employee_list = [];
        // this.new_employee_list = [];
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }
  submit_teacher() {
    this.Teacher_Form.patchValue({ school_id: this.school_id3 });
    let body: any;
    let checked_values = this.inputs4.value.filter((a: any) => a.ischecked);
    let unchecked_values = this.inputs4.value.filter((a: any) => !a.ischecked);
    body = {
      school_id: this.school_id3,
      techDetails: checked_values,
    };
    this._auth.add_teachers(body).subscribe((res: any) => {
      if (res.status == 'success') {
        Swal.fire({
          title: 'Employees Added Successfully',
          icon: 'success',
        });
        // this.school_id3 == '';
        // this.employee_list = [];
        // this.new_employee_list = [];
        if (unchecked_values) {
          this.Teacher_Form = this._fb.group({
            inputs4: this._fb.array([]),
          });
          unchecked_values.forEach((element: any) => {
            this.inputs4.push(this._fb.control(element));
          });
        } else {
          this.Teacher_Form = this._fb.group({
            inputs4: this._fb.array([]),
          });
          this.school_search_form3.patchValue({ school: '', view_type: '1' });
        }
      } else {
        Swal.fire({
          title: res.message,
          icon: 'error',
        });
      }
    });
  }
  tableData: any[] = [];
  tableData2: any[] = [];
  tableTitle: any[] = [];
  tableTitle2: any[] = [];
  tableData1 = new Set();

  upload_subject_excel(e: any) {
    this.tableData = [];
    this.tableTitle = [];
    const target: DataTransfer = <DataTransfer>(<unknown>e.target);
    let fileList = e.target.files;
    let file = fileList[0];
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    let extension = file.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
    if (
      file.type.split('/')[1].includes('sheet') ||
      (file.type.split('/')[1].includes('csv') && file.size <= 5000000)
    ) {
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
        let data: any[] = [];
        data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}
        let table: any[] = [];
        if (data.length > 0) {
          this.Subject_Form = this._fb.group({
            inputs: this._fb.array([]),
          });
        }
        // let table2: any[] = [];
        // table2 = data.shift();
        // this.tableTitle = table2[0];
        // data = data.shift();
        let i = 0;
        data.forEach((element: any) => {
          if (i != 0) {
            if (element[3] != 1) {
            } else {
              if (element[1]) {
              } else {
                element[1] = '';
              }
              if (element[2]) {
              } else {
                element[2] = '';
              }
              if (element[3]) {
              } else {
                element[3] = '';
              }
              if (
                this.tableData1.has(
                  String(
                    element[0].trim() + ',' + element[1] + ',' + element[2]
                  )
                )
              ) {
              } else {
                this.subject_list.push({
                  subject_name: element[0].trim(),
                  school_id: this.school_id,
                  status: 2,
                  updated_by: this.school_id,
                  subject_code: '',
                  subject_type: element[1],
                  subject_category: element[2],
                  subject_id: '',
                });
              }
              this.tableData1.add(
                element[0] + ',' + element[1] + ',' + element[2]
              );
            }
          }
          i++;
        });
        // this.tableData.filter(
        //   (item: any, index: any) => this.tableData.indexOf(item) === index
        // );
        table = Array.from(this.tableData1);
        table.forEach((element: any) => {
          element = element.split(',');
          this.tableData.push(element);
        });
        // this.tableTitle = this.tableData[0];
        // this.tableData.shift();

        let k = 0;

        this.subject_list.forEach((element: any) => {
          let data = {
            subject_name: element.subject_name,
            school_id: this.school_id,
            status: element.status,
            updated_by: this.school_id,
            subject_code: element.subject_code,
            subject_type: element.subject_type,
            subject_category: element.subject_category,
            subject_id: element.subject_id,
          };
          if (element.subject_id) {
            this.inputs.push(this._fb.control(element));
          } else {
            this.inputs.push(this._fb.control(data));
          }
          k++;
        });
      };
    } else {
      Swal.fire({ title: 'Only Excel File Allowed', icon: 'info' });
      e.target.value = '';
    }
  }
  hasDuplicates(arr: any) {
    var counts = [];

    for (var i = 0; i <= arr.length; i++) {
      if (counts[arr[i]] === undefined) {
        counts[arr[i]] = 1;
      } else {
        return true;
      }
    }
    return false;
  }
  master_classes: any[] = [];
  getmasterclass() {
    let body = {
      school_id: this.school_id1,
      // school_id: 'SC1008',
    };
    this._auth.getByMasterClass(body).subscribe((res) => {
      if (res.status == 'success') {
        this.master_classes = [];
        let master_classes = res.master_classes;
        master_classes.forEach((element: any) => {
          this.master_classes.push({
            class_name: element.class_name,
            id: element.id,
            ischecked: false,
          });
        });
      }
    });
  }
  employee_id: any;
  isNumber(val: any): boolean {
    // return typeof val === 'number';
    return !isNaN(val);
  }
  academic_year_list: any;
  get_academic_year() {
    let body = {
      school_id: this.service.get('school_id'),
    };

    this._auth.get_academic_year(body).subscribe((res) => {
      if (res.status == 'success') {
        this.academic_year_list = res.academicYears.sort((a: any, b: any) => {
          return a.id > b.id ? 1 : -1;
        });
      }
    });
  }
  ngOnInit(): void {
    this.get_schools();
    this.get_roles();
    this.get_academic_year();
    this.employee_id = atob(this.service.get('staff_id'));
    // this.getmasterclass()
  }
}
function filter_array(a: any, obj: any) {
  var i = a.length;
  while (i--) {
    let values = Object.values(a[i]);
    var j = values.length;
    while (j--) {
      if (values[j] === obj) {
        return true;
      }
    }
  }
  return false;
}
function isValidDate(dateString:any) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx)) return false;  // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}
