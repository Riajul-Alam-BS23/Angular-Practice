import { Component, OnInit, OnDestroy, Inject, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomTranslationService } from '../core/services/custom-translation.service';
import { FAQJSON } from '../faq.model';
import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {
  ok: boolean = true;
  allData: any;
  isOpen: Map<string, boolean> = new Map<string, boolean>();
  private langChangeSubscription: Subscription;
  baseUrl = 'https://api.github.com/repos/Riajul-Alam-BS23/i18n/';
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private http: HttpClient,
    private languageService: LanguageService
  ) { }
  customTranslationService: CustomTranslationService = inject(CustomTranslationService);
  ngOnInit() {
    this.translate.setDefaultLang('en');
    // Subscribe to route data to get FAQs on initial load
    this.route.data.subscribe((data: any) => {
      this.updateFAQs(data['faqs']);
    });

    // Subscribe to language change events
    this.langChangeSubscription
      = this.translate.onLangChange
        .subscribe(() => {
          this.ok = false;
          this.customTranslationService
            .customTranslateHelper(
              this.baseUrl,
              this.translate.currentLang,
              'faq.json'
            ).subscribe((faqData: any) => {
              this.updateFAQs(faqData);
              this.ok = true;
            });
        });

  }

  toggleFAQ(index: number) {
    const key = `Q${index}`;
    this.isOpen.set(key, !this.isOpen.get(key));
  }

  private updateFAQs(faqData: any) {
    this.translate.setTranslation(this.translate.currentLang || 'en', faqData, true);
  }
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
