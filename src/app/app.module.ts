/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { AngularFireModule } from 'angularfire2';
import { FormsModule } from '@angular/forms';
import { AuthService } from './@core/data/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseService } from './@core/data/database.service';
import { StorageService } from './@core/data/storage.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

 const firebaseConfig = {
   apiKey: 'AIzaSyBtYAO-ciYN5dbi83JCYK2hpTlY15XN38k',
   authDomain: 'labpsitec-4097d.firebaseapp.com',
   databaseURL: 'https://labpsitec-4097d.firebaseio.com',
   projectId: 'labpsitec-4097d',
   storageBucket: 'labpsitec-4097d.appspot.com',
   messagingSenderId: '242241850585'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule,
    FormsModule,
    AngularFireDatabaseModule,


    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    AngularFireAuth,
    DatabaseService,
    StorageService,
    AuthGuard,
    { provide: APP_BASE_HREF,  useValue: '/'},
  ],
})
export class AppModule {
}
