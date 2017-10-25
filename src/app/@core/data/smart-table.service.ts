import { Injectable } from '@angular/core';
import { LeafletService } from '../../pages/maps/leaflet/leaflet.service';

@Injectable()
export class SmartTableService {

  data: any[];
  constructor() {}

  getData() {
    return this.data;
  }
}


// constructor(private leafletService: LeafletService) {
//   leafletService.getUsersConfig().subscribe((data) => {
//     data.forEach((d, idx) => {
//       this.data.push({
//         id: idx + 1,
//         user: d.user,
//         session: d.session,
//         batch: d.batch ? d.batch : '',
//         experiment: d.experiment,
//         experimentDate: d.experimentDate ? d.experimentDate : '',
//         baseline: d.baseline ? d.baseline : '',
//         minTime: d.min_time ? d.min_time : '',
//         max_time: d.max_time ? d.max_time : '',
//       });
//     });
//   });
// }
