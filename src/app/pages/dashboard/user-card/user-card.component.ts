import { Component, Input } from '@angular/core';
import { UserService } from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-user-card',
  styleUrls: ['./user-card.component.scss'],
  templateUrl: './user-card.component.html',
})

export class UserCardComponent {
  @Input()
  user: any;

  constructor(public userService: UserService ) {}
  selectUser() {
    console.log('this.user', this.user);
    this.userService.selectedUser =  this.user;
  }
  goToMap() {
    console.log('kjfriojg');
  }
  goToChart() {

  }
}
