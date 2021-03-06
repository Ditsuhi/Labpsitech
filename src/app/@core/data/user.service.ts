import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'underscore';
import * as moment from 'moment';
import { LeafletService } from '../../pages/maps/leaflet/leaflet.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface FormatedDate {
  year: number,
  month: number,
  day: number
}
const currentUser = localStorage.getItem('selectedUser');

@Injectable()
export class UserService {
  time: any;
  selectedUser: any;
  locations: [{
    latitude: number,
    longitude: number
  }];

  constructor(private http: Http, private leafletService: LeafletService) {
    this.selectedUser = localStorage.getItem('selectedUser');
  }

  getAllUsers() {
    return this.http.get('assets/data/calculateMetrics.json')
    // return this.http.get('https://metrics-api.geotecuji.org/api/v1/metrics-data/app-36437104577c4432/calculateMetrics?application=app-36437104577c4432&session=session1&user=admin')
      .map((res) => res.json().result.results)
      // .map((data) => JSON.parse(data[0].value));
      .map((data) => data[0].value);
  }

  getUserCalendarTime(user, time) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          const chosenMax = moment.utc(exp.max_time).format('DD-MM-YYYY' ) ;
          const chosenMin = moment.utc(exp.min_time).format('DD-MM-YYYY' ) ;
          const end = moment(time.end).subtract(1, 'month').add(1, 'days').format('DD-MM-YYYY');
          const start = moment(time.start).subtract(1, 'month').format('DD-MM-YYYY');
          return chosenMin >= start && chosenMax < end;
        });
        const timeArr = [];
        const timePluck = _.pluck(expDate, 'min_time');
        timePluck.forEach((timee) => {
          const form = moment(timee).format('DD-MM-YYYY');
          timeArr.push(form);
        });
        const distinctUserExps = _.uniq(timeArr);
        const expUserGroup: any[] = [];
        distinctUserExps.forEach((exp) => {
          const expUs = expUser.filter((data) => {
            return moment(data.min_time).format('DD-MM-YYYY') === exp;
          });
          let totalDistanceOut = 0, timeIn = 0, timeOut = 0, countExit = 0;
          expUs.forEach((ss) => {
            totalDistanceOut += ss.totalDistanceOutside;
            timeIn += ss.timeInside;
            timeOut += ss.timeOutside;
            countExit += ss.countExiting;
          });
          expUserGroup.push({
            experimentDate: exp,
            totalDistanceOutside: totalDistanceOut,
            totalTimeInside: timeIn,
            totalTimeOutside: timeOut,
            totalCountExiting: countExit,
          });
        });
        return expUserGroup;
      })
  }

  getBatchCalendar(user, time, batch) {

    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          const chosenMax = moment.utc(exp.max_time).format('DD-MM-YYYY' ) ;
          const chosenMin = moment.utc(exp.min_time).format('DD-MM-YYYY' ) ;
          const end = moment(time.end).subtract(1, 'month').add(1, 'days').format('DD-MM-YYYY');
          const start = moment(time.start).subtract(1, 'month').format('DD-MM-YYYY');
          return chosenMin >= start && chosenMax < end;
        });
        const timeArr = [];
        const timePluck = _.pluck(expDate, 'min_time');
        timePluck.forEach((timee) => {
          const form = moment(timee).format('DD-MM-YYYY');
          timeArr.push(form);
        });
        const distinctUserExps = _.uniq(timeArr);
        const expUserGroup: any[] = [];
        distinctUserExps.forEach((exp) => {
          const expUs = expUser.filter((data) => {
            return moment(data.min_time).format('DD-MM-YYYY') === exp && data.batch === batch;
          });
          let totalDistanceOutside = 0, timeIn = 0, timeOut = 0,  countExit = 0;
          expUs.forEach((ss) => {
            totalDistanceOutside = ss.totalDistanceOutside;
            timeIn = ss.timeInside;
            timeOut = ss.timeOutside;
            countExit = ss.countExiting;
          });
          expUserGroup.push({
            experimentDate: exp,
            totalDistanceOutside: totalDistanceOutside,
            totalTimeInside: timeIn,
            totalTimeOutside: timeOut,
            totalCountExiting: countExit,
          });
        });
        return expUserGroup;
      })
  }


  getUserExpTime(user) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const distinctUserExps = _.uniq(_.pluck(expUser, 'experimentDate')).sort();
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
          console.log(timeIn, 'timeIn');
          console.log(timeOut, 'timeOut');
        });
        return expUserGroup;
      })
  };

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
  getTotalLocations(user, time) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          const chosen = moment(exp.min_time).format('DD-MM-YYYY' ) ;
          const end = moment(time.end).subtract(1, 'month').add(1, 'days').format('DD-MM-YYYY');
          const start = moment(time.start).subtract(1, 'month').format('DD-MM-YYYY');
          return chosen >= start && chosen <= end;
        });
        let locations: any[] = [];
        const userLocations = _.pluck(expDate, 'locations');
        userLocations.forEach((data) => {
          locations = _.union(locations, data);
        });
        return {locations}
      })
  }

  getBatchLocations(user, time, batch) {
    return this.getAllUsers()
      .map((users) => {
        const expUser = users.filter((usr) => {
          return usr.user === user;
        });
        const expDate = expUser.filter((exp) => {
          const chosen = moment(exp.min_time).format('DD-MM-YYYY' ) ;
          const end = moment(time.end).subtract(1, 'month').add(1, 'days').format('DD-MM-YYYY');
          const start = moment(time.start).subtract(1, 'month').format('DD-MM-YYYY');
          return chosen >= start && chosen <= end && (exp.batch === batch || batch === '0-24');
          // return moment(exp.min_time).format('DD/MM/YYYY') === moment(time).format('DD/MM/YYYY') && exp.batch === batch;
        });
        let locations: any[] = [];
        const userLocations = _.pluck(expDate, 'locations');
        userLocations.forEach((data) => {
          locations = _.union(locations, data);
        });
        return {locations}
      })

  }

  getUsersRadius(user) {
    let radius: number;
    return this.leafletService.getUsersConfigs().map((users) => {
      const expUser = users.filter((usr) => {
        return usr.user === user;
      });
      radius = expUser[0].radius;
      return radius;
    });
  }

  getUsersConfigLoc(user) {
    const homeLocation = [];
    return this.leafletService.getUsersConfigs().map((users) => {
      const expUser = users.filter((usr) => {
        return usr.user === user;
      });
      homeLocation.push(expUser[0].userlocation.latitude, expUser[0].userlocation.longitude);
      console.log(homeLocation);
      return homeLocation;
    });
  }

  getUserTime() {
    return this.time;
  }

  setUserTime(time) {
    this.time = time;
  }
}
