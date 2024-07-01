import { Component } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css'
})
export class TempComponent {
  private unsubscribeSubject = new Subject<void>();
  count = 0;

  ngOnInit() {
    interval(1000)
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((val) => {
        this.count = val;
        console.log(this.count);
      });
  }

  // unsubscribe when component is destroyed
  // to prevent memory leaks and unwanted behavior
  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
