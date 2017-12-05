import { Component,  OnInit } from '@angular/core';
import { UserService } from '../../@core/data/user.service';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  letter: string = '';
  users: any[] = [];
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  color: string = 'red';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users =  _.uniq(_.pluck(users, 'user'));
    })
  }
  onClick(item) {
    this.letter = item;
  }
  // removeClick(item) {
  //   this.letter = item;
  //   if (this.onClick(item)) {
  //     return users;
  //   }
  // }

}
