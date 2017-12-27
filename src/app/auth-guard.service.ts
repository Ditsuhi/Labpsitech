import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './@core/data/auth.service';
import { DatabaseService } from './@core/data/database.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private databaseService: DatabaseService,
              private router: Router) {
  }

  canActivate() {
    if (this.databaseService.receivedEmails === true ) {
    return true; }
  //   return this.authService.isAuthenticated()
  // .do(authenticated => {
  //     if (!authenticated) {
  //       this.router.navigate(['auth/login']);
  //     }
  //   });
  }
}
