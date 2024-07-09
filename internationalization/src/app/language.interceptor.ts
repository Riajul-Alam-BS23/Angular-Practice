// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';

// @Injectable()
// export class LanguageInterceptor implements HttpInterceptor {
//   constructor(private translate: TranslateService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const lang = localStorage.getItem('lang') || 'fr';

//     const request = req.clone({
//       setHeaders: {
//         'Accept-Language': lang
//       }
//     });
//     return next.handle(request);
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class LanguageInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const lang = localStorage.getItem('lang') || 'en';

//     request = request.clone({
//       setHeaders: {
//         'Accept-Language': lang
//       }
//     });
//     return next.handle(request);
//   }
// }
