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

    const h = Math.trunc(totalSeconds / 3600);
    totalSeconds = totalSeconds - 3600 * h;
    const m = Math.trunc(totalSeconds / 60);
    const s = Math.trunc(totalSeconds -  60 * m);

    return (h < 10 ? '0' + h : h) +  ':'  + (m < 10 ? '0' + m : m) +  ':'  + (s < 10 ? '0' + s: s);
  }
}

