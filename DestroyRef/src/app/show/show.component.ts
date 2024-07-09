import { Component, DestroyRef, Inject, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, interval, takeUntil } from 'rxjs';

// const destroySubscription = () => {
//   const destroy$ = new Subject<void>();
//   inject(DestroyRef).onDestroy(() => {
//     destroy$.next();
//     destroy$.complete();
//     console.log('clear subscription');
//   });
//   return destroy$;
// };

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  title = 'latest-angular';
  // private destroy$ = destroySubscription();

  constructor() {}
  destroyRef=Inject(DestroyRef);
  ngOnInit(): void {

    interval(1000)
      // .pipe(takeUntil(this.destroy$))
      .pipe(
        takeUntilDestroyed()
      )
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnDestroy(): void {}
}
