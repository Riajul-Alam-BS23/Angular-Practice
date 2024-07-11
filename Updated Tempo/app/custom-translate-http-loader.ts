

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CustomTranslationService } from './core/services/custom-translation.service';
import { Inject } from '@angular/core';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, 
    private baseUrl: string,
    private customTranslationService: CustomTranslationService
  ) {}
  public getTranslation(lang: string): Observable<any> {
    const excludesFiles=['faq.json'];
    return this.customTranslationService.translateHelper(this.baseUrl,lang,excludesFiles);
  }
}
