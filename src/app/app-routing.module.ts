import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from './start-page/start-page.component';
import {MainViewComponent} from './main-view/main-view.component';
import {TestViewComponent} from "./test-view/test-view.component";

const routes: Routes = [
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: 'start', component: StartPageComponent},
  {path: 'main', component: MainViewComponent},
  {path: 'test', component: TestViewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
