import { Component, OnDestroy } from '@angular/core';
import { Subscription, interval, takeUntil } from 'rxjs';
import { MovieService } from './movie.service';
import { Unsub } from './Shared/unsub.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent extends Unsub implements OnDestroy{
  data$ = interval(1000);
  lists:any[];
  constructor(private movieService: MovieService) {
    super();
  }
  ngOnInit() {
    // this.data$.subscribe((data) => {
    //   console.log(data);
    // })
    this.movieService.getPopularMovies().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data) => {
      console.log('Popular Movies:', data);
      this.lists = data;
    });

  }
}
