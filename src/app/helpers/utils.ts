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
}
