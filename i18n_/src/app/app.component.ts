import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FaqService } from './faq/faq.service';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: string[] = ['bn', 'en'];
  constructor(public translate: TranslateService,public faqService:FaqService,public languageService:LanguageService) {}

  ngOnInit(): void {
    this.loadLanguage();
  }

  loadLanguage() {
    const lang = localStorage.getItem('lang') || 'en';
    this.translate.use(lang);
  }

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    // this.faqService.currentLanguage.next(lang);
    // this.languageService.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
