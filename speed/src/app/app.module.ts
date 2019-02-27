import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search-presenter';
import { ContainerComponent } from './search/search-container';
import { DisplayComponent } from './display/launches-display';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContainerComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
