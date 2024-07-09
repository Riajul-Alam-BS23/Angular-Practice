import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectTitle = 'internationalization';
  products: any[] = [];
  productTitle: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.projectTitle = $localize`${this.projectTitle}`; // Ensure projectTitle is localized

    this.http.get('https://fakestoreapi.com/products')
      .subscribe((products: any[]) => {
        this.products = products;

        // Iterate through products and localize each title
        this.products.forEach(product => {
          this.productTitle = $localize`${product.title}`;
        });
      });
  }
}
