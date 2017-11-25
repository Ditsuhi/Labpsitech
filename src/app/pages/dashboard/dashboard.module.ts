import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from '../../@core/data/user.service';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    TemperatureDraggerComponent,
    TemperatureComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    TrafficComponent,
    TrafficChartComponent,
    UserCardComponent
  ],
  providers: [
    UserService
  ]
})
export class DashboardModule { }
