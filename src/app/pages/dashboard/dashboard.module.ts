import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../@core/data/user.service';
import { HoverDirective } from './user-card/hover.directive';
import { SearchByLetterPipe } from './search-letter.pipe';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    UserCardComponent,
    HoverDirective,
    SearchByLetterPipe
  ],
  providers: [
    UserService
  ]
})
export class DashboardModule { }
