import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService {

  constructor(private http: HttpClient,) { }
  token = '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';
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private translateCache: {[key: string]: Observable<any>} = {};
  translateHelper(baseUrl:string,lang:string,excludesFiles:string[]){
    if(this.translateCache[lang]){
      return of(this.translateCache[lang]);
    }
    const currentResponse=this.http.get<any[]>(`${baseUrl}contents/${lang}`,{headers: this.headers}).pipe(
      map(files => files.filter(file => !excludesFiles.includes(file.name)).map(file => file.download_url)),
      switchMap(urls => forkJoin(urls.map(url => this.http.get(url)))),
      map(response => response.reduce((acc, res) => ({ ...acc, ...res }), {}))
    );
    this.translateCache[lang]=currentResponse;
    return currentResponse;
  }
  customTranslateHelper(baseUrl:string,lang:string,excludesFiles:string){
    if(this.translateCache[lang]){
      return of(this.translateCache[lang]);
    }
    const currentResponse= this.http.get(`${baseUrl}contents/${lang}/faq.json`,{headers: this.headers}).pipe(
      switchMap((res: any) => {
        const url = res.download_url;
        return this.http.get(url);
      })
    );
    this.translateCache[lang]=currentResponse;
    return currentResponse;
  }
}
