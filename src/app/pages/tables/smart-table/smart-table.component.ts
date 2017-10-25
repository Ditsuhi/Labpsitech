import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { LeafletService } from '../../maps/leaflet/leaflet.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

  settings = {
    editable: false,
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      user: {
        title: 'Name',
        type: 'string',
      },
      session: {
        title: 'Session',
        type: 'string',
      },
      batch: {
        title: 'Batch',
        type: 'string',
      },
      experiment: {
        title: 'Experiment',
        type: 'string',
      },
      experimentDate: {
        title: 'ExperimentDate',
        type: 'number',
      },
      baseline: {
        title: 'Baseline',
        type: 'number',
      },
      repeatedLocations: {
        title: 'RepeatedLocations',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableService,
    private leafletService: LeafletService,
  ) {
    // leafletService.getUsersConfigs()
    //   .subscribe((results) => {
    //     const data = results;
    //     data.forEach((result, idx) => {
    //       result.id = idx + 1;
    //     });
    //     this.source.load(data);
    //   });
    // const data = this.service.getData();
    // this.source.load(data);
    //
    //   this.leafletService.getUsersConfig().subscribe((data) => {
    //     const res = JSON.parse(data[0].value);
    //     res.forEach(( idx ) => {
    //       res.id = idx + 1;
    //     });
    //    this.source.load(res);
    //    // console.log(res) ;
    //
    // })
    this.leafletService.getFromFile().subscribe((data) => {
      const res = data[0].value;
      res.forEach((idx) => {
        res.id = idx + 1;
      });
      this.source.load(res);
      console.log(data);
    });

  };
  onSelectConfirm(event) {
    console.log('rr', event);
    localStorage.setItem('selectedUser', JSON.stringify(event.selected[0]));
  }
}
