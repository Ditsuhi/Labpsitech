/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthService } from './@core/data/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  constructor(
    private analytics: AnalyticsService,
    public authService: AuthService,
    private router: Router) {

    this.authService.subject.subscribe(
      (user) => {
        if (user == null || !user.allowed) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['pages']);
        }
      });
  }

  // ngOnInit(): void {
  //   this.analytics.trackPageViews();
  // }
}
