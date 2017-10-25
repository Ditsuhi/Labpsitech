import { Injectable } from '@angular/core';

const config = {
  apiUrl: 'https://metrics-api.geotecuji.org/api/v1',
  appId: 'app-36437104577c4432',
  // url: 'https://metrics-api.geotecuji.org/api/v1/metrics-data/app-36437104577c4432/calculateMetrics?',
  // // application=app-36437104577c4432&session=session1&user=admin',
};


// Davidin nash tali heti, ays namboxj commen@ erkalaca smart-table-components-ic;
//
// this.leafletService.getUsersConfig().subscribe((data) => {
//   const res = JSON.parse(data[0].value);
//   const user = 'aaa';
//   const batch = '8-16';
//   // try find our selected user details;
//   for ( let i = 0 ; i < res.length; i++) {
//     if ( user && batch ) {
//       console.log(res[i])}
//   }
//   res.forEach(( idx ) => {
//     res.id = idx + 1;
//     //
//     //
//     //          }
//     // );
//   });
//   this.source.load(res);
//   console.log(res) ;
//
// })
export const configObject = config;

@Injectable()
export class ConfigService {
  public configValues: any;
  constructor() {
    this.configValues = Object.assign({}, config);
  }
}

