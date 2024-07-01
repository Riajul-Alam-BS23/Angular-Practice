import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  startTimer(): Observable<number> {
    const source = timer(0, 1000);
    const stopCondition = timer(5000);
    return source.pipe(takeUntil(stopCondition));
  }
}
