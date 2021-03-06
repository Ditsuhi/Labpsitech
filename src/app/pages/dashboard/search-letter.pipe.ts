
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:  'searchByLetter'
})

export class SearchByLetterPipe implements PipeTransform {
  transform(users, searchStr: string) {
    if (users.length === 0 || searchStr === '' || searchStr === 'ALL') {
      return users;
    }

    return users.filter((user) => user.toUpperCase().indexOf(searchStr) === 0 ) || users.filter((usr) => usr.user === searchStr);
  }
}
