import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  languages;
  constructor(public translate: TranslateService
    ,public languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.loadLanguage();
    this.languages=this.languageService.languages;
    
  }
  changeLanguage(event: Event) {
    this.languageService.changeLanguage(event);
  }
}
