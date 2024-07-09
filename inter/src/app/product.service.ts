import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// import translate from '@vitalets/google-translate-api';
import { translate } from '@vitalets/google-translate-api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products');
  }

  translateText(text: string, targetLang: string): Observable<string> {
    return from(translate(text, { to: targetLang })).pipe(
      map((res: any) => res.text)
    );
  }

  fetchAndTranslateProducts(targetLang: string): Observable<any[]> {
    return this.fetchProducts().pipe(
      switchMap(products => {
        const translatedProducts$ = products.map(product =>
          this.translateProduct(product, targetLang)
        );
        return from(Promise.all(translatedProducts$));
      })
    );
  }

  private translateProduct(product: any, targetLang: string): Promise<any> {
    const translatedProduct = { ...product };
    return Promise.all([
      this.translateText(product.title, targetLang).toPromise().then(translatedTitle => translatedProduct.title = translatedTitle),
      this.translateText(product.description, targetLang).toPromise().then(translatedDescription => translatedProduct.description = translatedDescription),
      this.translateText(`Price: ${product.price} USD`, targetLang).toPromise().then(translatedPrice => translatedProduct.price = translatedPrice)
    ]).then(() => translatedProduct);
  }
}
