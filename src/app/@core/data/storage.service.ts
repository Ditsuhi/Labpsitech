import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import { AuthService } from './auth.service';

@Injectable()
export class StorageService {
  storage = firebase.storage();
  storageRef = this.storage.ref('demo-data.json');
  public url: string;
  public urlTest: string;
  public subjectURL: Subject<string> = new Subject();

  constructor(private http: Http, public authService: AuthService) {

    this.authService.subject.subscribe(
      (user) => {
        if (user != null && user.allowed) {
          // this.urlTest = 'https://metrics-api.geotecuji.org/api/v1/variable-data/app-36437104577c4432/userLocation?application=app-36437104577c4432&session=session1&user=galactus';
          // this.urlTest = 'https://metrics-api.geotecuji.org/api/v1/metrics-data/app-36437104577c4432/calculateMetrics?application=app-36437104577c4432&session=session30&user=admin';
          this.storageRef.getDownloadURL().then(
            (url_2) => {
              this.url = url_2;
              this.subjectURL.next(this.url);
            });
        }
      });
  }

  getData() {
    return this.http.get(this.url).map(
    // return this.http.get(this.urlTest).map(
      (res) => {
        return res.json();
      });
  }

}
