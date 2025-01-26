import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SortDirective } from './directive/sort.directive';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SubjectChapterSearchPipe } from './pipes/subject-chapter-search.pipe';
import { ToStringPipe } from './pipes/to-string.pipe';
import { TimeFormat } from './pipes/time.pipe';
import { TimeFormat2 } from './pipes/time12.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderFooterModule.rootComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatProgressBarModule,
    NgbModule  
  ],
  exports:[
    HeaderFooterModule.rootComponent
  ]
})
export class HeaderFooterModule {
      static rootComponent = [
                              HeaderComponent,
                              FooterComponent,
                              SidenavComponent,
                              SortDirective,
                              FilterPipePipe,
                              SearchPipe,
                              SubjectChapterSearchPipe,
                              ToStringPipe,
                              TimeFormat,
                              TimeFormat2,
                              NavbarComponent
                            
      ]
}
