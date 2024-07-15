import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { FAQJSON } from '../../faq.model';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService {

  constructor(private http: HttpClient) { }
  token = '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';
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  private translateCache: { [key: string]: any } = {};

  translateHelper(baseUrl:string,lang:string,excludesFiles:string[]){
    const currentResponse=this.http.get<any[]>(`${baseUrl}contents/${lang}`,{headers: this.headers}).pipe(
      map(files => files.filter(file => !excludesFiles.includes(file.name)).map(file => file.download_url)),
      switchMap(urls => forkJoin(urls.map(url => this.http.get(url)))),
      map(response => response.reduce((acc, res) => ({ ...acc, ...res }), {}))
    );
    return currentResponse;
  }
  customTranslateHelper(baseUrl:string,lang:string,inludesFiles:string){
    if(this.translateCache[lang]){
      return of(this.translateCache[lang]);
    }
    const currentResponse= this.http.get(`${baseUrl}contents/${lang}/${inludesFiles}`,{headers: this.headers}).pipe(
      switchMap((res: any) => {
        const url = res.download_url;
        return this.http.get(url);
      })
    );
    this.translateCache[lang] = currentResponse;
    return currentResponse;
  }

}
