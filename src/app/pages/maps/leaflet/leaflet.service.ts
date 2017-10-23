import { Injectable } from '@angular/core';
import { configObject } from './../../../@core/data/config.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeafletService {
  private apiUrl = configObject.apiUrl;
  private appId = configObject.appId;
  constructor(private http: Http) {}

  getUsersLocation() {
    return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userLocation`)
      .map((res) => res.json().result.results);
  }

  getUsersConfigs() {
    return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userConfig`)
      .map((res) => res.json().result.results)
  }

  getUsersConfigData(user) {
    return this.http.get(`${this.apiUrl}/variable-data/${this.appId}/userConfig`)
      .map((res) => {
        const results = res.json().result.results;
        const userData = results.filter((d) => {
          return d.user === user;
        });
        return userData[0];
      })
  }
}
