import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN, NbAuthResult, NbAuthService } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface User {
  email: string,
}

@Component({
  selector: 'ngx-login',
  template: `
    <nb-auth-block>
      <h2 class="title">Sign In {{usr |json}}
        <!--<ul *ngFor="let user of users | async">-->
          <!--<li> {{user.password }}</li>-->
        <!--</ul>-->
      </h2>
      <small class="form-text sub-title">Hello! Sign in with your username or email</small>
      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">
        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>
        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+"
                 class="form-control" placeholder="Email address" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>
        <!--<div class="form-group">-->
          <!--<label for="input-password" class="sr-only">Password</label>-->
          <!--<input name="password" [(ngModel)]="user.password" type="password" id="input-password"-->
                 <!--class="form-control" placeholder="Password" #password="ngModel"-->
                 <!--[class.form-control-danger]="password.invalid && password.touched"-->
                 <!--[required]="getConfigValue('forms.validation.password.required')"-->
                 <!--[minlength]="getConfigValue('forms.validation.password.minLength')"-->
                 <!--[maxlength]="getConfigValue('forms.validation.password.maxLength')">-->
          <!--<small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">-->
            <!--Password is required!-->
          <!--</small>-->
          <!--<small-->
            <!--class="form-text error"-->
            <!--*ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">-->
            <!--Password should contains-->
            <!--from {{ getConfigValue('forms.validation.password.minLength') }}-->
            <!--to {{ getConfigValue('forms.validation.password.maxLength') }}-->
            <!--characters-->
          <!--</small>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="form-group accept-group col-sm-12">&ndash;&gt;-->
          <!--<nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">Remember me</nb-checkbox>-->
        <!--</div>-->
        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Sign In
        </button>
      </form>
      <!--<div class="links">-->
      <!--<small class="form-text">-->
        <!--Don't have an account? <a routerLink="/auth/register" routerLinkActive="active"><strong>Sign Up</strong></a>-->
      <!--</small>-->
    <!--</div>-->
    </nb-auth-block>
  `,
})
export class NgxLoginComponent implements OnInit {
  notAllowed = false;

  constructor(public authService: AuthService, private router: Router) {

    this.authService.subject.subscribe(
      (user) => {
        if (user == null) {
          console.log('User null');
          this.notAllowed = false;
        } else if (!user.allowed) {
          console.log('User not allowed');
          this.notAllowed = true;
        } else {
          console.log('User bien');
          this.notAllowed = false;
        }
      });
  }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithGoogle();
  }

  lougOutFromGoogle() {
    window.open('https://accounts.google.com/Logout', '_blank');
  }

  // redirectDelay: number = 0;
  // showMessages: any = {};
  // provider: string = '';
  // res: any = [];
  //
  // errors: string[] = [];
  // messages: string[] = [];
  // user: any = {};
  // submitted: boolean = false;
  //
  // usersCol: AngularFirestoreCollection<User>;
  // users: Observable<User[]>;
  // usr: User[];
  //
  // constructor(
  //   protected service: NbAuthService,
  //   @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
  //   protected router: Router,
  //   private afs: AngularFirestore,
  // ) {
  //
  //   this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
  //   this.showMessages = this.getConfigValue('forms.login.showMessages');
  //   this.provider = this.getConfigValue('forms.login.provider');
  // }
  //
  // ngOnInit() {
  //   this.usersCol = this.afs.collection('users');
  //   this.users = this.usersCol.valueChanges();
  // }
  //
  //
  // login(): void {
  //   // let res = [];
  //   console.log(this.res);
  //   this.users.subscribe((users) => {
  //       this.res = users.filter((usr) => {
  //         return usr.email === this.user.email
  //       })
  //     }
  //   );
  //   if (this.res.length) {
  //     this.router.navigate(['pages/dashboard']);
  //     console.log(this.res);
  //
  //
  //     this.errors = this.messages = [];
  //     this.submitted = true;
  //
  //     this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
  //         this.submitted = false;
  //
  //         if (result.isSuccess()) {
  //           this.messages = result.getMessages();
  //         } else {
  //           this.errors = result.getErrors();
  //         }
  //
  //         const redirect = result.getRedirect();
  //         if (redirect) {
  //           setTimeout(() => {
  //             return this.router.navigateByUrl(redirect);
  //           }, this.redirectDelay);
  //         }
  //       });
  //     }
  //
  // }
  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.config, key, null);
  // }
}
