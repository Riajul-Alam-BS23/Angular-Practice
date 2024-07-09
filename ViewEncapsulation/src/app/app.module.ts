import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShadowDomComponent } from './shadow-dom/shadow-dom.component';
import { EmulatedComponent } from './emulated/emulated.component';
import { NoneComponent } from './none/none.component';

@NgModule({
  declarations: [
    AppComponent,
    ShadowDomComponent,
    EmulatedComponent,
    NoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
