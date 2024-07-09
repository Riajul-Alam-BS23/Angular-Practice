import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  products: any[] = [];
  languages = ['en', 'bn'];
  currentDate;
  constructor(private http: HttpClient,public  m: TranslateService) {
    // this.InitL();
  }
  ngOnInit(){
    this.currentDate=new Date();
    if(localStorage.getItem('lang')){
      this.translate.use(localStorage.getItem('lang')); 
      this.fetchProducts();
      this.translate.use(localStorage.getItem('lang')); 
    }else{
      localStorage.setItem('lang', 'en');
      this.translate.setDefaultLang('en');
      this.translate.use('en'); 
      this.fetchProducts();  
    }

  }
  fetchProducts() {
    debugger;
    // console.log("Data fat")
    const lang=localStorage.getItem('lang') || 'en';
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    localStorage.setItem('lang',lang);
    console.log(localStorage.getItem('lang'));
    this.translate.use(lang);
    this.fetchProducts();
  }
}
