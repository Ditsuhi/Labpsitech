import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore'

@Injectable()
export class UserService {
  selectedUser: any;
  locations: [{
    latitude: number,
    longitude: number
  }];
  constructor(private http: Http) {
    this.selectedUser = localStorage.getItem('selectedUser');
  }

  getAllUsers() {
      return this.http.get('assets/data/calculateMetrics.json')
        .map((res) => res.json().result.results)
        .map((data) => data[0].value);
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

  getUserExpTime(user) {
    return this.getAllUsers()
      .map((users) => {
        console.log(users);
        const distinctUserExps =  _.uniq(_.pluck(users, 'experimentDate')).sort();
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expUserGroup: any[] = [];
        distinctUserExps.forEach((exp) => {
          const expUs = expUser.filter((data) => {
            return data.experimentDate === exp;
          });
          let timeIn = 0, timeOut = 0, countExit = 0, totalDistanceIn = 0, totalDistanceOut = 0;

          expUs.forEach((ss) => {
            console.log('sss', ss);
            timeIn += ss.timeInside;
            timeOut += ss.timeOutside;
            countExit += ss.countExiting;
            totalDistanceIn += ss.totalDistanceInside;
            totalDistanceOut += ss.totalDistanceOutside;
            // this.locations.push(ss.locations.forEach((data) => {
            //   data.filter((dat) => {
            //     const coordinates =  _.uniq(_.pluck(dat, 'batch')).sort();
            //     const coord = [];
            //     coord.push([dat.latitude, dat.longitude]);
            //     console.log(coord);
            //   })
            // }));
          });
          expUserGroup.push({
            experimentDate: exp,
            totalTimeInside: timeIn,
            totalTimeOutside: timeOut,
            totalCountExiting: countExit,
            totalDistanceInside: totalDistanceIn,
            totalDistanceOutside: totalDistanceOut,
            locations: location
          });
        });
        console.log(expUserGroup);
        return expUserGroup;
      })
  }

}
