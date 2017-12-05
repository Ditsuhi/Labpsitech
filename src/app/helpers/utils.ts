import * as _ from 'underscore';
import { UserTable } from '../models/user-table';

export class Utils {

  public static createUsersTable(allData): UserTable[] {
    const users: UserTable[] = [];
    const distinctUserNames = _.uniq(_.pluck(allData, 'user'));
    _.each(distinctUserNames, (name) => {
      const newUser: UserTable = new UserTable();
      newUser.user = name;
      newUser.data = [];
      users.push(newUser);
    });
    return users;
  }

    public static getTime(totalSeconds: number) {

      let hours = Math.trunc(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.trunc(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      hours = +hours;
      minutes = +minutes;
      seconds = +seconds;

      console.log(parseInt(hours + ':' +  minutes + ':' + seconds + ':', 10));
       console.log(typeof (minutes ));
       return parseInt(hours + ':' +  minutes + ':' + seconds + ':',  10);
      // return +hours + ':' + minutes + ':' + seconds;


    }
}

