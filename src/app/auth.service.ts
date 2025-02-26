import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public otp = new BehaviorSubject<any>({});
  public menuStatus = new BehaviorSubject<any>({});
  public fileBaseUrl = `${environment.baseURL}uploads/schools/`;
  public baseUrl = environment.baseURLTesting;
  public baseUrl2 = `https://alt1.schoolknot.com/`;
imageUrl=`${environment.baseURL}/uploads/schools/`
  private loading: boolean = false;
  private loader: boolean = false;

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }

  setLoader(loader: boolean) {
    this.loader = loader;
  }

  getLoader(): boolean {
    return this.loader;
  }
  isLoggedIn() {
    // let l = sessionStorage.getItem('token');
    let l = this.service.get('token');
    // console.log(l)

    if (l) {
      
      return true;
    } else {
      return false;
    }
  }
  emitSchool(school_details: any) {
    throw new Error('Method not implemented.');
  }

  emitOTP(data: any) {
    this.otp.next(data);
  }

  onOTP<T>(): Observable<T> {
    return this.otp.asObservable();
  }

  emitMenuStatus(data: any) {
    this.menuStatus.next(data);
  }

  onMenuStatus<T>(): Observable<T> {
    return this.menuStatus.asObservable();
  }


  constructor(private _http: HttpClient, private service: CookieService) {}

  dashboard_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/get_image_casrol`,
      input
    );
  }
  submit_dashboard_images(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/set_image_casrol`,
      input
    );
  }
  submit_user(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/create_user`,
      input
    );
  }
  check_login(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/validate_user`,
      input
    );
  }
  validate_token(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/validate_token`,
      input
    );
  }
  set_songs(input: any) {
    return this._http.post<any>(
      `https://api.bcmmovement.in/lyric/add_song`,
      input
    );
  }
  set_employee(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/add_employee`,
      input
    );
  }
  get_latest_employee_id(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/get_latest_employee_id`,
      input
    );
  }
  get_employees(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/get_employees`,
      input
    );
  }
  get_branch(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/get_branch`,
      input
    );
  }
  get_designation(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/get_designation`,
      input
    );
  }
  get_field(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/get_fields`,
      input
    );
  }
  add_branch(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/add_branch`,
      input
    );
  }
  add_mission_field(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/add_mission_field`,
      input
    );
  }
  add_designation(input: any) {
    return this._http.post<any>(
      `http://127.0.0.1:8000/lyric/add_designation`,
      input
    );
  }











  // others
  master_login(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/staff_login.php`,
      input
    );
  }

  getDynamicModulesTypes(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getModulesPagesTypeBased.php`,
      input
    );
  }
  getDynamicModules(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/staff_module_page_access.php`,
      input
    );
  }
  getSchools() {
    return this._http.get(this.baseUrl + `schoolapp-updated/get-schools.php`);
  }

  
  getschoolbyschool_id(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getModulesPagesTypeBased.php`,
      input
    );
  }

  view_subjects(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/view_subjects.php`,
      input
    );
  }

  getClasses(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getclasses.php`,
      input
    );
  }
  getAllClasses(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_all_classes.php`,
      input
    );
  }
  getByMasterClass(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getMasterClasses.php`,
      input
    );
  }
  get_student_by_school(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getStudentsbySchool.php`,
      input
    );
  }
  get_all_students(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getStudents.php`,
      input
    );
  }
  //Student Module

  student_get_column(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_column_details.php`,
      input
    );
  }
  student_get_school_column(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_column_detailsbySchool.php`,
      input
    );
  }
  student_add_column(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/add_column_details.php`,
      input
    );
  }
  student_get_filters(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_filter_details.php`,
      input
    );
  }
  student_submit_filters(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/add_filter_details.php`,
      input
    );
  }
  student_get_labels(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_label_details.php`,
      input
    );
  }
  student_submit_labels(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/add_label_details.php`,
      input
    );
  }
  student_get_reports(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_report_details.php`,
      input
    );
  }
  student_submit_report(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/add_report_details.php`,
      input
    );
  }
  student_get_report_filters(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_reportColumn_details.php`,
      input
    );
  }
  student_add_report_filters(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/add_report_filter_details.php`,
      input
    );
  }
  student_get_filter_dynamic(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_report_filter_details.php`,
      input
    );
  }

  //Boarding House
  excel_upload_boarding_house(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/bulk_upload_boarding_house_local_gurdian.php`,
      input
    );
  }

  // School config
  add_enquiry_config(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_enquiry_config.php`,
      input
    );
  }
  get_library_column_details(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/library/get_library_column_details.php`,
      input
    );
  }
  add_library_column_details(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/library/add_library_column_details.php`,
      input
    );
  }
  add_enquiry_custom_fields(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_enquiry_custom_fields.php`,
      input
    );
  }
  get_custom_enquiry_field(input: any) {
    return this._http.post<any>(
      this.baseUrl + `/api_new/master_admin/get_custom_enquiry_field.php`,
      input
    );
  }
  get_enquiry_config(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_enquiry_config.php`,
      input
    );
  }

  //STREAM
  get_stream_subject(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_stream_subject.php`,
      input
    );
  }
  get_stream(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_stream.php`,
      input
    );
  }
  add_stream_subject(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_stream_subject.php`,
      input
    );
  }



  // TYPES
  get_custom_enquiry_type(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_custom_enquiry_type.php`,
      input
    );
  }
  add_custom_enquiry_types(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_custom_enquiry_types.php`,
      input
    );
  }
  // SOURCE
  get_custom_enquiry_sources(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_custom_enquiry_source.php`,
      input
    );
  }
  add_custom_enquiry_sources(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_custom_enquiry_sources.php`,
      input
    );
  }
  // TABS
  get_custom_enquiry_tabs(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_custom_enquiry_tabs.php`,
      input
    );
  }
  add_custom_enquiry_tabs(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_custom_enquiry_tabs.php`,
      input
    );
  }
  get_enquiry_desc_details(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_enquiry_desc_details.php`,
      input
    );
  }
  add_enquiry_desc_details(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_enquiry_desc_details.php`,
      input
    );
  }
  // Exams

  getAllMasterClass(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getMasterClasses.php`,
      input
    );
  }
  get_subject_by_master_class(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_subject_by_master_class.php`,
      input
    );
  }
  get_enquiry_exam_subjects(input:any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_enquiry_exam_subjects.php`,input
      
    );
  }
  add_enquiry_subject_marks(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_enquiry_subject_marks.php`,
      input
    );
  }

  // Categories

  add_form_category(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_form_category.php`,
      input
    );
  }
  get_enquiry_form_category(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_enquiry_form_category.php`,
      input
    );
  }

  //Migration
  migration_schools(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/get_other_schools.php`,
      input
    );
  }
  add_subjects(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_subjectDetails.php`,
      input
    );
  }
  add_classes(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_classDetails.php`,
      input
    );
  }
  add_students(input: any) {
    return this._http.post<any>(
      this.baseUrl2 + `api_new/master_admin/add_student_migration.php`,
      input
    );
  }
  all_staff_report(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/all_staff_report.php`,
      input
    );
  }
  add_employees(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_empDetails.php`,
      input
    );
  }
  add_teachers(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_techDetails.php`,
      input
    );
  }
  get_role_id(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getEmployeeRoles.php`,
      input
    );
  }
  get_school_fee(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get_feehead_and_term.php`,
      input
    );
  }
  get_student_fee_assign(input: any) {
    return this._http.post<any>(
      this.baseUrl2 + `api_new/master_admin/add_bulk_upload_fee_assign.php`,
      input
    );
  }
  get_student_fee_concession(input: any) {
    return this._http.post<any>(
      this.baseUrl2 + `api_new/master_admin/add-bulk-upload-concession.php`,
      input
    );
  }
  get_school_exams(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getExams.php`,
      input
    );
  }
  get_school_exams_details(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getExamDetails.php`,
      input
    );
  }
  get_exam_categories(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/getExamCategories.php`,
      input
    );
  }
  submit_bulk_exam_marks(input: any) {
    return this._http.post<any>(
      this.baseUrl2 + `api_new/master_admin/saveBulkExamCategoryMarks-patashala.php`,
      input
    );
  }
  getTeachers(input: any) {
    return this._http.post<any>(
      this.baseUrl + 'schoolapp-updated/get-teachers.php',
      input
    );
  }
  getEmployees(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/get-employees.php`,
      input
    );
  }
  migration_notification_bulk_upload(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/insert_bulk_notification.php`,
      input
    );
  }
  migration_homework_bulk_upload(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_bulkhomework_details.php`,
      input
    );
  }
  migration_assignment_bulk_upload(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_bulk_upload_assignment.php`,
      input
    );
  }
  migration_circular_bulk_upload(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_bulk_circulars.php`,
      input
    );
  }
  migration_showcase_bulk_upload(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_bulk_showcase.php`,
      input
    );
  }
  migration_notification_bulk_upload_2(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/notification_migration.php`,
      input
    );
  }
  migration_student_attendance_bulk(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/add_bulk_student_attendance.php`,
      input
    );
  }
  get_academic_year(input: any) {
    return this._http.post<any>(
      this.baseUrl + `schoolapp-updated/get-academic-years.php`,
      input
    );
  }
  

  //Subjects

  getSubjectByMasterClass(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/getSubjectByMasterClass.php`,
      input
    );
  }

  bulk_upload_chapters(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/bulk_chapter_upload.php`,
      input
    );
  }
  bulk_upload_topic(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/admin_dashboard/bulk_topic_upload.php`,
      input
    );
  }
  
  //Boarding House
  
  bulk_upload_bed_validate(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/bulk_bed_allocation_validation.php`,
      input
    );
  }
  bulk_upload_bed(input: any) {
    return this._http.post<any>(
      this.baseUrl + `api_new/master_admin/bulk_upload_bed_allocation.php`,
      input
    );
  }


}
