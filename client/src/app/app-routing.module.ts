import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundsListComponent } from './rounds-list/rounds-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'rounds', pathMatch: 'full'},
  {path: 'rounds', component: RoundsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
