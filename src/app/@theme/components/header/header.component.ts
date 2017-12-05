import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';
import { UsersService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { UserService } from '../../../@core/data/user.service';
import * as moment from 'moment';

const currentUser = localStorage.getItem('selectedUser');

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    height: '24px',
    width: '28%',
    selectionTxtFontSize: '12px',
    disableUntil: {year: 9999, month: 12, day: 31},
    enableDays: []
  };

  public model: any;

  subscription: any;
  @Input() position: string = 'normal';

  user: any;

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private searchService: NbSearchService,
              private menuService: NbMenuService,
              private usersService: UsersService,
              private userService: UserService,
              private analyticsService: AnalyticsService ) {

    this.userService.getTime(currentUser).subscribe((timeRange) => {
       timeRange.forEach((time) => {
         this.myDatePickerOptions.enableDays.push(time)
       });
       this.model = {date: this.myDatePickerOptions.enableDays[0]};
      console.log('Enable', this.myDatePickerOptions.enableDays);
    });
  }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
    this.subscription = this.searchService.onSearchSubmit()
      .subscribe((data: { term: string, tag: string }) => this.search(data.term));
  }

  onDateChanged(event: IMyDateModel) {
    const chosendateFromCalendar = event.jsdate;
    const date = this.userService.getLoc(currentUser, chosendateFromCalendar).subscribe((d) => {
      console.log('Eeeeeee', d);
    });
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
    console.log('sdddd', term);
  }
}
