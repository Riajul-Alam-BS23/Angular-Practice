import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { CustomTranslateHttpLoader } from './custom-translate-http-loader';

@Injectable({
  providedIn: 'root'
})
export class FaqResolver implements Resolve<any> {
  private loader: CustomTranslateHttpLoader;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.loader = new CustomTranslateHttpLoader(this.http, 'https://api.github.com/repos/Riajul-Alam-BS23/i18n__/');
  }

  resolve(): Observable<any> {
    const lang = this.translate.currentLang || 'en';
    return this.loader.getFaqTranslation(lang).pipe(
      catchError(error => {
        console.error('Failed to load FAQ translations', error);
        return of({});
      })
    );
  }
}



