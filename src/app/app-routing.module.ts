import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MitarbeiterListeComponent } from './mitarbeiter-liste/mitarbeiter-liste.component';


const routes: Routes = [
  {path: "", component: MitarbeiterListeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
