import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: string[] = ['en','bn','fr','de'];
  currentLanguage=new BehaviorSubject('en');
  count=0;
  constructor(public translate: TranslateService) {}
  loadLanguage() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.use(lang);
  }
  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    // localStorage.setItem('lang', lang);
    this.currentLanguage.next(lang);
  }
}
