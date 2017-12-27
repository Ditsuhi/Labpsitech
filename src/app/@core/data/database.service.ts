import { Injectable } from '@angular/core';

import {AngularFireDatabase,
  FirebaseObjectObservable} from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatabaseService {

  public receivedEmails = false;
  item: FirebaseObjectObservable<any>;
  public emailsSubject: Subject<string[]> = new Subject();
  allowedEmails: string[];

  constructor(public afDB: AngularFireDatabase) {
    this.item = this.afDB.object('/mails', { preserveSnapshot: true });
    console.log(this.item);

    this.item.subscribe(snapshot => {
      this.allowedEmails = snapshot.val().split(',');
      this.emailsSubject.next(this.allowedEmails);
      this.receivedEmails = true;
    });
    console.log(this.item);
  }

  getEmails() {
    return this.allowedEmails;
  }
}
