import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {StartPageComponent} from './start-page/start-page.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainViewComponent} from './main-view/main-view.component';
import {MaterialModule} from "./material";
// import {AddModal} from "./main-view/main-view.component";
import {DialogOverviewExample } from './dialog-overview-example/dialog-overview-example.component';

@NgModule({
  declarations: [AppComponent, StartPageComponent, MainViewComponent, DialogOverviewExample],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
