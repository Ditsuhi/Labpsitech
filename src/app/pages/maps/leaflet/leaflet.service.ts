import { Injectable } from '@angular/core';
import { configObject } from './../../../@core/data/config.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import calculateMetrics from '../../../../../calculateMetrics.json';
//  const = require('../../../../../calculateMetrics.json');
const calculateMetrics = '/data/calculateMetrics.json';
@Injectable()
export class LeafletService {
  public calculateMetrics;
  private apiUrl = configObject.apiUrl;
  private appId = configObject.appId;
  constructor(private http: Http) {}

  getUsersLocation() {
    return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userLocation`)
      .map((res) => res.json().result.results);
  }

  getUsersConfigs() {
    return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userConfig`)
      .map((res) => res.json().result.results);
  }
  getUsersConfig() {
    return this.http.get(`${this.apiUrl}/metrics-data/${this.appId}/calculateMetrics?application=${this.appId}&session=session1&user=admin`)
      .map((res) => res.json().result.results);
  }

 getFromFile() {

   return this.http.get('assets/data/calculateMetrics.json')
     .map(res => res.json().result.results);
 }
  getUsersConfigData(user) {
    return this.http.get('assets/data/calculateMetrics.json')
      .map((res) => {
        const results = (res.json().result.results)[0].value;

        const userData = results.filter((d) => {
          return d.user === user;
        });
       //  console.log(userData);
        return userData[0];
      })
  }
  // getUsersConfigData(user) {
  //   return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userConfig`)
  //     .map((res) => {
  //       const results = res.json().result.results;
  //       const userData = results.filter((d) => {
  //         return d.user === user;
  //       });
  //       return userData[0];
  //     })
  // }
  //
  // getUsersConfData(user) {
  //   return this.http.get(`${this.apiUrl}/metrics-data/${this.appId}
  //  /calculateMetrics?application=${this.appId}&session=session1&user=admin`)
  //     .map((res) => {
  //       const results = res.json().result.results;
  //       const userData = results.filter((d) => {
  //         return d.user === user;
  //       });
  //
  //       return userData[0];
  //     })
  // }
}
