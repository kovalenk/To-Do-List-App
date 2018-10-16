import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {TodoComponent} from './todo/todo.component';
import {StartPageComponent} from './start-page/start-page.component';
import { AppRoutingModule } from './app-routing.module';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AppComponent, TodoComponent, StartPageComponent, MonthlyViewComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
