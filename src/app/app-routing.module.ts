import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './components/about/about.component';
import { SettingComponent } from './components/setting/setting.component';
import { MobileAppComponent } from './components/mobile_app/mobile_app.component';

const routes: Routes = [
  {path: '',redirectTo:'home', pathMatch:'full'},
  {path:'home', component: AdminHomepageComponent},
  {path:'about', component:AboutComponent },
  {path: 'login', component: AdminLoginComponent},
  {path:'setting', component: SettingComponent,canActivate: [AuthGuard]},
  {path:'apps', component: MobileAppComponent,canActivate: [AuthGuard]},
  {path: '**',component: AdminHomepageComponent},
  // {path:'blogs', component: SubjectsComponent},
  // {path:'31/migration', component: MigrationComponent, canActivate: [AuthGuard]},
  // {path:'33/manage-students', component: StudentsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const myRoutings = [
                            AdminLoginComponent,
                            AdminHomepageComponent
]
