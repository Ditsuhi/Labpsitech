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

    public static getTime(seconds: number) {

        const hours = Math.trunc(seconds / 3600 );
        const minutes = Math.trunc((seconds / 3600) % 60);
        const newSeconds =  minutes % 60;

       console.log(hours + 'h' +  minutes + 'm' + newSeconds + 's');
       return hours + 'h' + minutes + 'm' + newSeconds;


    }
}

