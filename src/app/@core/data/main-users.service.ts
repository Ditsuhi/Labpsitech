import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainUser } from '../../models/user.model';


@Injectable()
export class MainUsersService {
  constructor(private http: Http) {
  }

  getUserByEmail(email: string): Observable<MainUser> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .map((response: Response) => response.json())
      .map((user: MainUser[]) => user[0] ? user[0] : undefined);
  }

  createNewUser(user: MainUser): Observable<MainUser> {
    return this.http.post('http://localhost:3000/users', user)
      .map((response: Response) => response.json());
  }
}
