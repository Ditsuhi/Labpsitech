import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbTokenService } from '@nebular/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../../@core/data/auth.service';
import { UsersService } from '../../../@core/data/users.service';
import { Subject } from 'rxjs/Subject';

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
        <p class="text-warning sub-title">This user  does not have permission.
      <button class="btn btn-block btn-hero-info" (click)="lougOutFromGoogle()">Sign out from Google</button></p></div>
    </nb-auth-block>
  `,
})
export class NgxLoginComponent implements OnInit {
  hidden = false;
  public receivedEmails = false;
  item: FirebaseObjectObservable<any>;
  public emailsSubject: Subject<string[]> = new Subject();
  allowedEmails: string[];
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
    this.topics = this.db.list('/mails', { preserveSnapshot: true });
    console.log(this.topics);
    this.item = this.db.object('/mails', { preserveSnapshot: true });
    console.log(this.item);
    this.item.subscribe(snapshot => {
      console.log(snapshot);
      this.allowedEmails = snapshot.val().split(',');
      console.log(this.allowedEmails);
      this.emailsSubject.next(this.allowedEmails);
      this.receivedEmails = true;
    })
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle()
      .then((data) => {
        console.log(data);
        localStorage.setItem('userName', data.user.displayName);
        console.log(data);
        if (this.allowedEmails.includes(data.user.email)) {
          this.router.navigate(['/pages/dashboard']);
        }else { return this.notAllowed = true; }
    })
  }

  lougOutFromGoogle() {

    window.open('https://accounts.google.com/Logout', '_blank');
    this.router.navigate(['auth/login']);
    localStorage.clear();
    this.notAllowed = false;
  }
}
