import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, interval, take, takeUntil, timer } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // values: any[] = [];
  // completed = false;
  // private subscription: Subscription;
  // constructor(private timerService: TimerService) { }
  // ngOnInit(): void {
  //   this.subscription = this.timerService.startTimer().subscribe({
  //     next: (value) => this.values.push(value),
  //     error: (err) => console.error('Error: ' + err),
  //     complete: () => this.completed = true
  //   });

  //   // Observable that emits a value every second
  //   const source = interval(4000);

  //   // Observable that emits a single value after 5 seconds
  //   const stopCondition = timer(10000);

  //   // Use the takeUntil operator to stop the source observable after 5 seconds
  //   this.subscription = source.pipe(takeUntil(stopCondition)).subscribe({
  //     next: (value) => this.values.push("next2: ",value),
  //     error: (err) => console.error('Error: ' + err),
  //     complete: () => this.completed = true
  //   });


  // }

  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }
  
  //2
  // private unsubscribeSubject = new Subject<void>();
  // count = 0;
  // showComponent: boolean = false;
  // ngOnInit() {
  //   interval(1000)
  //     .pipe(takeUntil(this.unsubscribeSubject))
  //     .subscribe(val => this.count = val);
  // }

  // ngOnDestroy() {
  //   this.unsubscribeSubject.next();
  //   this.unsubscribeSubject.complete();
  // }
  // onChange() {
  //   this.showComponent = !this.showComponent;
  //   this.unsubscribeSubject.next();
  //   this.unsubscribeSubject.complete();
  // }

  //3
  // clicks$: Observable<any>;
  // private subscription: Subscription;

  // ngOnInit() {
  //   const button = document.getElementById('myButton');
  //   if (button) {
  //     // Create an observable that emits a value every time the button is clicked
  //     this.clicks$ = fromEvent(button, 'click').pipe(
  //       take(5) // Emit only the first 5 click events
  //     );

  //     // Create an observable that emits a value after 10 seconds
  //     const stopCondition$ = timer(10000);

  //     // Use takeUntil to complete the clicks$ observable after 10 seconds
  //     this.subscription = fromEvent(button, 'click').pipe(
  //       take(5),
  //       takeUntil(stopCondition$)
  //     ).subscribe({
  //       next: (event) => console.log('Button clicked'),
  //       error: (err) => console.error('Error: ' + err),
  //       complete: () => console.log('Completed')
  //     });
  //   }
  // }

  // ngOnDestroy() {
  //   // Unsubscribe to avoid memory leaks
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }


  //4
  private destroy$ = new Subject<void>();

  ngOnInit() {
    const mediaQueryList = window.matchMedia('(min-width: 600px)');
    fromEvent(mediaQueryList, 'change').pipe(takeUntil(this.destroy$)).subscribe(event => {
      console.log('Media query changed', event);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
