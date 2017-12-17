import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { AngularEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents, routedProviders } from './maps-routing.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    MyDateRangePickerModule,
    AngularEchartsModule,
  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ...routedProviders,
  ],
})
export class MapsModule { }
