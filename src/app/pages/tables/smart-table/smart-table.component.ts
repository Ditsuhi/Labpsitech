import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { UserService } from '../../../@core/data/user.service';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit {

  settings = {
    editable: false,
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      user: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableService,
    private userService: UserService,
  ) {


  };
  ngOnInit() {

    this.userService.getAllUsers().subscribe((data) => {
        console.log('Strongo', data );
        this.source.load(Utils.createUsersTable(data));
      });
  }
  onSelectConfirm(event) {
    console.log('rr', event);
    localStorage.setItem('selectedUser', JSON.stringify(event.selected[0].user));
  }
}
