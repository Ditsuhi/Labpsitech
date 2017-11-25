import { Component } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  users = [
    {
      user: 'qwerty'
    },
    {
      user: 'dfg'
    },
    {
      user: 'vdfvdfv'
    },
    {
      user: 'vdd'
    },
    {
      user: 'vdfv'
    }
  ]
}
