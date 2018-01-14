import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsTimeComponent } from './chartjs/chartjs-time.component';
import { LeafletService } from '../maps/leaflet/leaflet.service';
import { UserService } from '../../@core/data/user.service';
import { SecondstotimePipe } from './chartjs/secondstotime.pipe';
import { CountExitingComponent } from './chartjs/count-exiting.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

const components = [
  ChartjsBarComponent,
  ChartjsTimeComponent,
  CountExitingComponent,
  SecondstotimePipe,
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    AngularEchartsModule,
    NgxChartsModule,
    ChartModule,
    MyDateRangePickerModule
  ],
  declarations: [...routedComponents, ...components ],
  providers: [
    LeafletService,
    UserService
  ],
})
export class ChartsModule {}
