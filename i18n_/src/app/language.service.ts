import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // private currentLang = new BehaviorSubject<string>('en');

  // currentLang$ = this.currentLang.asObservable();

  // constructor(private translate: TranslateService) {
  //   this.translate.onLangChange.subscribe(event => {
  //     this.currentLang.next(event.lang);
  //   });
  // }

  // changeLanguage(lang: string) {
  //   this.translate.use(lang);
  //   this.currentLang.next(lang);
  // }
}
