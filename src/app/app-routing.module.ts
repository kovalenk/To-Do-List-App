import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartPageComponent} from "./start-page/start-page.component";
import {TodoComponent} from "./todo/todo.component";
import {MonthlyViewComponent} from "./monthly-view/monthly-view.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: StartPageComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'month', component: MonthlyViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
