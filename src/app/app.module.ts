import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, myRoutings } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SearchByFilterPipe } from './search-by-filter.pipe';
import { HeaderFooterModule } from './header-footer/header-footer.module';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import { LoadingInterceptor } from './loading.interceptor';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SearchfilterPipe } from './searchfilter.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AboutComponent } from './components/about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CasrolComponent } from './components/casrol/casrol.component';
import { SettingComponent } from './components/setting/setting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MobileAppComponent } from './components/mobile_app/mobile_app.component';
import { EmployeeComponent } from './components/employee/employee.component';




@NgModule({
  declarations: [
    AppComponent,
    myRoutings,
    SearchByFilterPipe,
    SearchByFilterPipe,
    AboutComponent,
    CasrolComponent,
    SettingComponent,
    MobileAppComponent,
    EmployeeComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTooltipModule,
    HeaderFooterModule,
    SweetAlert2Module.forRoot(),
    Ng2ImgMaxModule,
    AutocompleteLibModule,
    NgbModule,
    MatTabsModule, 
   

  ],
  providers: [CookieService, DatePipe,{provide: LocationStrategy, useClass:HashLocationStrategy},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }