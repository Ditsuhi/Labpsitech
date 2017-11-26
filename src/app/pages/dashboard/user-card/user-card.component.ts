import { Component, Input } from '@angular/core';
import { UserService } from '../../../@core/data/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-card',
  styleUrls: ['./user-card.component.scss'],
  templateUrl: './user-card.component.html',
})

export class UserCardComponent {
  @Input()
  user: any;

  constructor(public userService: UserService, private router: Router) {}
  selectUser() {
    console.log('this.user', this.user);
    this.userService.selectedUser =  this.user;
  }
  goToMap() {
    this.router.navigate(['../pages/maps/leaflet']);
    console.log('kjfriojg');
  }
  goToChart() {
    this.router.navigate(['../pages/charts/chartjs']);
    console.log('kjfriojg');
  }
}
