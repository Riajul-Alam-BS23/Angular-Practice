import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:any[]=[];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    
    this.http.get('https://fakestoreapi.com/products')
    .subscribe((products: any[])=>{
      this.products=products;
    });
  }
}
