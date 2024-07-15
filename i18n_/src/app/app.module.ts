import { Inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateHttpLoader } from './custom-translate-http-loader';
import { FormsModule } from '@angular/forms';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CustomTranslationService } from './core/services/custom-translation.service';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient,customTranslationService: CustomTranslationService) {
  // const customTranslationService =Inject(CustomTranslationService);
  return new CustomTranslateHttpLoader(http, 'https://api.github.com/repos/Riajul-Alam-BS23/i18n/',customTranslationService);
}

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient,CustomTranslationService]
      }
    })
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
