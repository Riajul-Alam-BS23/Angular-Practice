


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-faq',
//   templateUrl: './faq.component.html',
//   styleUrls: ['./faq.component.css']
// })
// export class FaqComponent implements OnInit {
//   faqs: any[] = [];
//   isOpen: Map<string, boolean> = new Map<string, boolean>();
//   ok:boolean=false;
//   constructor(
//     private route: ActivatedRoute,
//     private translate: TranslateService
//   ) { }

//   ngOnInit() {
//     console.log("I am from FAQ component");
//     this.route.data.subscribe(data => {
//       console.log(data);
//       const faqData = data['faqs'];
//       if (faqData && faqData.FAQS) {
//         this.translate.setTranslation(this.translate.currentLang || 'en', faqData, true);
//         this.translate.use(this.translate.currentLang || 'en');
//         this.faqs = faqData.FAQS;
//       }
//     });
//   }

//   toggleFAQ(index: number) {
//     const key = `Q${index}`;
//     this.isOpen.set(key, !this.isOpen.get(key));
//   }
// }


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { catchError, map, of, Subscription } from 'rxjs';
// import { LanguageService } from '../language.service';
// import { TranslateService } from '@ngx-translate/core';
// import { CustomTranslateHttpLoader } from '../custom-translate-http-loader';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-faq',
//   templateUrl: './faq.component.html',
//   styleUrls: ['./faq.component.css']
// })
// export class FaqComponent implements OnInit, OnDestroy {
//   faqs: any[] = [];
//   isOpen: Map<string, boolean> = new Map<string, boolean>();
//   languageChangeSubscription: Subscription;
//   private loader: CustomTranslateHttpLoader;
//   constructor(
//     private route: ActivatedRoute,
//     private languageService: LanguageService,
//     private translate: TranslateService,
//     public customTranslateHttpLoader:CustomTranslateHttpLoader,
//     private http: HttpClient
//   ) {
//     this.loader = new CustomTranslateHttpLoader(this.http, 'https://api.github.com/repos/Riajul-Alam-BS23/i18n__/');
//   }

//   ngOnInit() {
//     console.log("I am from FAQ component");

//     // Subscribe to route data to get FAQs on initial load
//     this.route.data.subscribe(data => {
//       this.updateFAQs(data['faqs']);
//     });

//     // Subscribe to language change events
//     this.languageChangeSubscription = this.languageService.currentLang$.subscribe(lang => {
//       this.loader.getTranslationFaq(lang).pipe(
//         map((faqData:any) => {
//           this.route.data.subscribe(data => {
//             const cur=faqData['faqs'];
//             this.updateFAQs(faqData['faqs']);
//             return cur;
//           });
//         })
//       );
//     });
//   }

//   ngOnDestroy() {
//     if (this.languageChangeSubscription) {
//       this.languageChangeSubscription.unsubscribe();
//     }
//   }

//   toggleFAQ(index: number) {
//     const key = `Q${index}`;
//     this.isOpen.set(key, !this.isOpen.get(key));
//   }

//   private loadFAQsForCurrentLanguage() {
//     // Logic to load FAQs based on current language
//     const currentLang = this.translate.currentLang || 'en';
//     // Here you can make a service call or any other logic to fetch FAQs for the current language
//     this.route.data.subscribe(data => {
//       this.updateFAQs(data['faqs']);
//     });
//   }

//   private updateFAQs(faqData: any) {
//     if (faqData && faqData.FAQS) {
//       this.translate.setTranslation(this.translate.currentLang || 'en', faqData, true);
//       this.translate.use(this.translate.currentLang || 'en');
//       this.faqs = faqData.FAQS;
//     }
//   }
// }


import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CustomTranslateHttpLoader } from '../custom-translate-http-loader';
import { HttpClient } from '@angular/common/http';
import { CustomTranslationService } from '../core/services/custom-translation.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, OnDestroy {
  faqs: any[] = [];
  faqsTitle:string;
  allData:any;
  FAQS:any[] = [];
  isOpen: Map<string, boolean> = new Map<string, boolean>();
  private langChangeSubscription: Subscription;
  baseUrl='https://api.github.com/repos/Riajul-Alam-BS23/i18n__/';
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private http: HttpClient,
    private customTranslationService: CustomTranslationService
  ) {}
  // customTranslationService=Inject(CustomTranslationService);
  ngOnInit() {
    console.log("I am from FAQ component");
    // Subscribe to route data to get FAQs on initial load
    this.route.data.subscribe(data => {
      this.updateFAQs(data['faqs']);
    });

    // Subscribe to language change events
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.customTranslationService.customTranslateHelper(this.baseUrl,this.translate.currentLang,'faq.json').subscribe(faqData => {
        console.log("I am on Faq language change =>");
        this.updateFAQs(faqData);
      });
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  toggleFAQ(index: number) {
    const key = `Q${index}`;
    this.isOpen.set(key, !this.isOpen.get(key));
  }

  private updateFAQs(faqData: any) {
    console.log("updated data", faqData)
    if (faqData && faqData.FAQS) {
      this.faqs = faqData.FAQS;
      this.faqsTitle=faqData.TITLE;
      this.allData=faqData;
      this.FAQS=faqData;
      this.translate.setTranslation(this.translate.currentLang || 'en', this.FAQS, true);
    }
  }
}
