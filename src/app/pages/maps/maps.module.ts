import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { MapsRoutingModule, routedComponents, routedProviders } from './maps-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    MapsRoutingModule,
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
