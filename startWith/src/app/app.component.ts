import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loading = true;
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch products from FakeStoreAPI
    this.http.get<any[]>('https://fakestoreapi.com/products').pipe(
      startWith([]),

    ).subscribe((products: any) => {
      setTimeout(() => {
        console.log("i am on setTimeout", products);
        this.loading = false;
        this.products=products;
      }, 5000);
       // Hide loading indicator once data is loaded
    });
  }
}
