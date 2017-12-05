import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import * as moment from 'moment';

interface FormatedDate {
  year: number,
  month: number,
  day: number
}

const currentUser = localStorage.getItem('selectedUser');

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
        const distinctUserNames = _.uniq(_.pluck(users, 'user'))
      })

  }

  getUserExpTime(user) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const distinctUserExps = _.uniq(_.pluck(expUser, 'experimentDate')).sort();
        console.log('dist', distinctUserExps);
        const expUserGroup: any[] = [];
        distinctUserExps.forEach((exp) => {
          const expUs = expUser.filter((data) => {
            return data.experimentDate === exp;
          });
          let timeIn = 0, timeOut = 0, countExit = 0, totalDistanceIn = 0, totalDistanceOut = 0;
          expUs.forEach((ss) => {
            timeIn += ss.timeInside;
            timeOut += ss.timeOutside;
            countExit += ss.countExiting;
            totalDistanceIn += ss.totalDistanceInside;
            totalDistanceOut += ss.totalDistanceOutside;
          });
          expUserGroup.push({
            experimentDate: exp,
            totalTimeInside: timeIn,
            totalTimeOutside: timeOut,
            totalCountExiting: countExit,
            totalDistanceInside: totalDistanceIn,
            totalDistanceOutside: totalDistanceOut
          });
          // console.log('exp', exp);
        });
        console.log('exp', expUserGroup);
        return expUserGroup;
      })
  }

  getLocations(user, expd) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          return exp.experimentDate === expd;
        });
        let locations: any[] = [];
        const userLocations = _.pluck(expDate, 'locations');
        userLocations.forEach((data) => {
          locations = _.union(locations, data);
        });
        return {locations}
      })
  }


  // get time for certain user; for using in calendar;
  getTime(user) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const formatedTime: FormatedDate[] = [];
        const distinctUserTimeRange = _.uniq(_.pluck(expUser, 'min_time')).sort();
        distinctUserTimeRange.forEach((date) => {

          const day = moment(date).date();
          const month = moment(date).month() + 1;
          const year = moment(date).year();
          formatedTime.push({year, month, day});
        });
        return formatedTime;
      })
  }


  // get location for certain user, for certain time;
  getLoc(user, time) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          return moment(exp.min_time).format('DD/MM/YYYY') === moment(time).format('DD/MM/YYYY');
        });
        let locations: any[] = [];
        const userLocations = _.pluck(expDate, 'locations');
        userLocations.forEach((data) => {
          locations = _.union(locations, data);
        });
        return {locations}
      })
  }

}
