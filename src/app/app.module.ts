import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MitarbeiterComponent } from './mitarbeiter/mitarbeiter.component';
import { MitarbeiterListeComponent } from './mitarbeiter-liste/mitarbeiter-liste.component';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MitarbeiterComponent,
    MitarbeiterListeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
