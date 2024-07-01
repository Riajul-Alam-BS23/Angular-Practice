import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/products`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}/products/search?q=${query}`);
  }
}
