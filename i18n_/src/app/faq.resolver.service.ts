import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslationService } from './core/services/custom-translation.service';

@Injectable({
  providedIn: 'root'
})
export class FaqResolver implements Resolve<any> {
  private baseUrl='https://api.github.com/repos/Riajul-Alam-BS23/i18n/';
  constructor(private http: HttpClient, 
    private translate: TranslateService,
    private customTranslationService: CustomTranslationService
  ) {}
  
  resolve() {
    const lang = this.translate.currentLang || 'en';
    return this.customTranslationService.customTranslateHelper(this.baseUrl,lang,'faq.json');
  }
}
















