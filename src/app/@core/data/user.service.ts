import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore'

@Injectable()
export class UserService {
  selectedUser: any;
  constructor(private http: Http) {}

  getAllUsers() {
      return this.http.get('assets/data/calculateMetrics.json')
        .map((res) => res.json().result.results)
        .map((data) => {
          console.log(data[0].value);
      return  data[0].value
        });
  }

  getUserData(user) {
    return this.getAllUsers()
      .map((users) => {
         users.filter((usr) => {
            return usr.user === user;
         })
      })
  }

  getUsersTable() {
    return this.getAllUsers()
      .subscribe((users) => {
      const distinctUserNames =  _.uniq(_.pluck(users, 'user'))

      })
  }

}
