import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { ChartjsBarComponent } from './chartjs/chartjs-bar.component';
import { ChartjsLineComponent } from './chartjs/chartjs-line.component';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartjsMultipleXaxisComponent } from './chartjs/chartjs-multiple-xaxis.component';
// import { ChartjsBarHorizontalComponent } from './chartjs/chartjs-bar-horizontal.component';
import { ChartjsRadarComponent } from './chartjs/chartjs-radar.component';
// import { D3BarComponent } from './d3/d3-bar.component';
// import { D3LineComponent } from './d3/d3-line.component';
// import { D3PieComponent } from './d3/d3-pie.component';
// import { D3AreaStackComponent } from './d3/d3-area-stack.component';
// import { D3PolarComponent } from './d3/d3-polar.component';
// import { D3AdvancedPieComponent } from './d3/d3-advanced-pie.component';
// import { EchartsLineComponent } from './echarts/echarts-line.component';
// import { EchartsPieComponent } from './echarts/echarts-pie.component';
// import { EchartsBarComponent } from './echarts/echarts-bar.component';
// import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
// import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
// import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
// import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { LeafletService } from '../maps/leaflet/leaflet.service';
import { UserService } from '../../@core/data/user.service';
import { SecondstotimePipe } from './chartjs/secondstotime.pipe';
// import { ComboChartComponent } from './combo-chart/combo-chart.component';
// import { ComboSeriesVerticalComponent } from './combo-chart/combo-series-vertical.component';
// import { NormalizedBarVerticalComponent } from './chartjs/normalized-bar-vertical.component';
import { ChartjsMixedComponent } from './chartjs/chartjs-mixed.component';

const components = [
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  // ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  // NormalizedBarVerticalComponent,
  ChartjsMixedComponent
  // ComboChartComponent,
  // ComboSeriesVerticalComponent
  // D3BarComponent,
  // D3LineComponent,
  // D3PieComponent,
  // D3AreaStackComponent,
  // D3PolarComponent,
  // D3AdvancedPieComponent,
  // EchartsLineComponent,
  // EchartsPieComponent,
  // EchartsBarComponent,
  // EchartsMultipleXaxisComponent,
  // EchartsAreaStackComponent,
  // EchartsBarAnimationComponent,
  // EchartsRadarComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    AngularEchartsModule,
    ChartModule
  ],
  declarations: [...routedComponents, ...components ],
  providers: [
    LeafletService,
    UserService,
    SecondstotimePipe
  ],
})
export class ChartsModule {}
