import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateHttpLoader } from './custom-translate-http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http, 'https://api.github.com/repos/Riajul-Alam-BS23/i18n/');
}

// export function HttpLoaderFactory(http: HttpClient) {
//   // let keys = [
//   //   '/faq.json',
//   //   '/headerBox.json'
//   // ]
//   // let data:any[]=[];
//   // for (let key of keys) {
//   //   let d = new TranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', key);
//   //   data.push(d);
//   // }
  
//   // console.log(data);
//   // console.log(data);
//   // // const data = new TranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', '/faq.json');
//   // // console.log( (data));
//   // return data;

  
//   let data;
//    data= new CustomTranslateHttpLoader(http, 'https://raw.githubusercontent.com/Riajul-Alam-BS23/i18n/main/', [
//      '/headerBox.json',
//     '/faq.json'
//    ]);
//   console.log(data)
//   return data;
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
