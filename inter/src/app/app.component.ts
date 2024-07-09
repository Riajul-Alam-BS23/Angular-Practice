import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // products$: Observable<any[]>;

  // // constructor(private productService: ProductService) {}
  // constructor(private http: HttpClient, private translate: TranslateService,private productService: ProductService) {
  //   this.translate.setDefaultLang('fr');
  //   this.translate.use('fr');
  // }
  // ngOnInit() {
  //   this.products$ = this.productService.fetchAndTranslateProducts('fr');
  // }

    constructor(private translateService:TranslateService){
      this.translateService.setDefaultLang('fr');
      this.translateService.use(localStorage.getItem('lang')) || 'fr'; // Set initial language
      document.documentElement.lang=localStorage.getItem('lang');
    }


}

