/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  items: any;
  msgVal: string = '';

  constructor(private analytics: AnalyticsService,
              public af: AngularFireDatabase,
              public afAuth: AngularFireAuth) {


    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 50,
      }
    });
    this.user = this.afAuth.authState;

  }


  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string) {
    this.items.push({message: desc});
    this.msgVal = '';
  }



  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
