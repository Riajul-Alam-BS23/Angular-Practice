import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable, catchError, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loading = true;
  products: any[] = [];
  error: string | null =null;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  ngOnInit() {
    this.fetchProducts().subscribe({
      next: (products:any) => {
        this.products = products;
        this.loading = false;
      },
      error: (err:any) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  fetchProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products').pipe(
      // shareReplay(),
      catchError((err:any) => this.errorService.handleError(err))
    );
  }

}
