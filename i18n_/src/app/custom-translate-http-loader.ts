

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private baseUrl: string) {}

  public getTranslation(lang: string): Observable<any> {
    const token = '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';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}contents/${lang}`,{headers}).pipe(
      map(files => files.filter(file => file.name !== 'faq.json').map(file => file.download_url)),
      switchMap(urls => forkJoin(urls.map(url => this.http.get(url)))),
      map(response => response.reduce((acc, res) => ({ ...acc, ...res }), {}))
    );
  }

  public getFaqTranslation(lang: string): Observable<any> {
    const token = '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';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}contents/${lang}/faq.json`,{headers}).pipe(
      switchMap((res: any) => {
        const url = res.download_url;
        return this.http.get(url);
      })
    );
  }
  // public getTranslationFaq(lang: string): Observable<any> {
  //   const token = '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';
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get(`${this.baseUrl}contents/${lang}/faq.json`,{headers}).pipe(
  //     switchMap((res: any) => {
  //       const url = res.download_url;
  //       return this.http.get(url);
  //     })
  //   );
  // }
}
