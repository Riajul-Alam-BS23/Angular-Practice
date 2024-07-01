import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IMovie {
  title: string;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<IMovie[]> {
    return this.http.get<any>(`https://fakestoreapi.com/products`);
  }

  getTrendingMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`https://fakestoreapi.com/products/category/jewelery`);
  }
}
