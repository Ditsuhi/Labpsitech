import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents, routedProviders } from './maps-routing.module';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
    AngularEchartsModule,
    MyDateRangePickerModule,
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
