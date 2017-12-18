import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';
import { UsersService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { UserService } from '../../../@core/data/user.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';

const currentUser = localStorage.getItem('selectedUser');

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: any;
  @Input() position: string = 'normal';

  user: any;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(
    private sidebarService: NbSidebarService,
    private searchService: NbSearchService,
    private menuService: NbMenuService,
    private usersService: UsersService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router) {}

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.subscription = this.searchService.onSearchSubmit()
      .subscribe((data: { term: string, tag: string }) => this.search(data.term));
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(term) {
    let totalUser = [];
    this.userService.getAllUsers().subscribe((users) => {
      totalUser  =  _.uniq(_.pluck(users, 'user'));
      if ( totalUser.indexOf(term) !== -1) {
        this.router.navigate(['../pages/dashboard']);
        console.log('Valod');
      }
    });
  }
}
