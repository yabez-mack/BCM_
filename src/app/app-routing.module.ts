import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { StudentsComponent } from './components/students/students.component';
import { MigrationComponent } from './components/migration/migration.component';
import { AboutComponent } from './components/about/about.component';
import { LogoutComponent } from './logout/logout.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  {path: '',redirectTo:'home', pathMatch:'full'},
  {path:'home', component: AdminHomepageComponent},
  {path:'about', component:AboutComponent },
  {path: 'login', component: AdminLoginComponent},
  {path: '**',component: AdminHomepageComponent},
  {path:'setting', component: SettingComponent, canActivate: [AuthGuard]},
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
