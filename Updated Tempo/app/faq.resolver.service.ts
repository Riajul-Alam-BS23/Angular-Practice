import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslationService } from './core/services/custom-translation.service';

@Injectable({
  providedIn: 'root'
})
export class FaqResolver implements Resolve<any> {

  constructor(private http: HttpClient, 
    private translate: TranslateService,
    private customTranslationService: CustomTranslationService
  ) {}
  // customTranslationService:CustomTranslationService=Inject(CustomTranslationService);
  baseUrl='https://api.github.com/repos/Riajul-Alam-BS23/i18n__/';

  resolve(): Observable<any> {
    const lang = this.translate.currentLang || 'en';
    return this.customTranslationService.customTranslateHelper(this.baseUrl,lang,'faq.json');
  }
}
















