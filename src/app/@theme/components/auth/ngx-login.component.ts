import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN, NbAuthResult, NbAuthService, NbTokenService } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../../@core/data/auth.service';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { log } from 'util';
import { UsersService } from '../../../@core/data/users.service';


@Component({
  selector: 'ngx-login',
  template: `
    <nb-auth-block>
      <h2 class="title">Sign In
      
      </h2>
      <small class="form-text sub-title">Hello! Sign in with your Google account</small>
     
      <button  class="btn btn-block btn-hero-success"
               [class.btn-pulse]="submitted"
               (click)="loginWithGoogle()">
        Sign In
      </button>
      <br>
      <div *ngIf="notAllowed">
        <p class="text-warning sub-title">This user  does not have permission.</p></div>
     
    </nb-auth-block>
  `,
})
export class NgxLoginComponent implements OnInit {
  notAllowed = false;
  topics: FirebaseListObservable<any[]>;
  user = null;

  constructor(
              private auth: AuthService,
              public db: AngularFireDatabase,
              public nbToken: NbTokenService,
              public router: Router,
              public usersService: UsersService) {
  }

  ngOnInit() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.topics = this.db.list('/mails');
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle()
      .then((data) => {
        this.router.navigate(['/pages/dashboard']);
        this.usersService.setUserName(data.user.displayName);
        console.log(data.user.displayName);
      })
      .catch((error) => {
      if (error) {this.notAllowed = true; }

      })

  }
}
