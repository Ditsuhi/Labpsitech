
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:  'search'
})

export class FilterPipe implements PipeTransform {
  transform(users, searchStr: string) {
    if (users.length === 0 || searchStr === '') {
      return users;
    }

    return users.filter((user) => user.toUpperCase().indexOf(searchStr) === 0 );
  }
}
