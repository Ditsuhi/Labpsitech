import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/data/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users =  _.uniq(_.pluck(users, 'user'));
    })
  }
}
