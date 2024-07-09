// import { HttpClient } from '@angular/common/http';
// import { TranslateLoader } from '@ngx-translate/core';
// import { Observable, forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';

// export class CustomTranslateHttpLoader implements TranslateLoader {
//   constructor(private http: HttpClient, private baseUrl: string, private files: string[]) {}

//   public getTranslation(lang: string): Observable<any> {
//     const requests = this.files.map(file => this.http.get(`${this.baseUrl}${lang}${file}`));
    
//     return forkJoin(requests).pipe(
//       map(response => {
//         return response.reduce((acc, res) => {
//           return { ...acc, ...res };
//         }, {});
//       })
//     );
//   }
// }


import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private baseUrl: string) {}

  public getTranslation(lang: string): Observable<any> {
    // Fetch the list of files in the language directory
    return this.http.get<any[]>(`${this.baseUrl}contents/${lang}`).pipe(
      // Extract the file names and construct the URLs to fetch their content
      map(files => files.map(file => file.download_url)),
      // Fetch the content of each file
      switchMap(urls => {
        const requests = urls.map(url => this.http.get(url));
        return forkJoin(requests);
      }),
      // Merge the content of all files into a single object
      map(response => {
        return response.reduce((acc, res) => {
          return { ...acc, ...res };
        }, {});
      })
    );
  }
}
