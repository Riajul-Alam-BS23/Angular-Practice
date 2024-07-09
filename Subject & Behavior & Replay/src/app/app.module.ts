import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddMessageComponent } from './add-message/add-message.component';
import { DisplayMessagesComponent } from './display-messages/display-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMessageComponent,
    DisplayMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
