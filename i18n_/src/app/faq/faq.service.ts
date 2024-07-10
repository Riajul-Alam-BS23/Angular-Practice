import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  currentLanguage=new BehaviorSubject<string>(null);

  
  faqs: any[] = [];
  constructor(public translate:TranslateService,
    public route : ActivatedRoute
  ) { }
  updatedData(){
    console.log("I am from FAQ component");
    this.route.data.subscribe(data => {
      console.log(data);
      const faqData = data['faqs'];
      if (faqData && faqData.FAQS) {
        this.translate.setTranslation(this.translate.currentLang || 'en', faqData, true);
        this.translate.use(this.translate.currentLang || 'en');
        this.faqs = faqData.FAQS;
      }
    });
  }
}
