import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages: string[] = ['bn', 'en'];
  constructor(public translate: TranslateService) {}

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
    localStorage.setItem('lang', lang);
  }
}


