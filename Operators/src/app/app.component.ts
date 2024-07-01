import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild,AfterViewInit } from '@angular/core'
import { switchMap, filter, fromEvent, interval, from, map, of, delay,mergeMap,concatMap,flatMap, exhaustMap, merge, range, concat } from 'rxjs'

interface Coordinate {
  x: number
  y: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{





  
  @ViewChild('btn') btn!: ElementRef;
  API = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {
    
  }
  static Count: number  = 1;
  ngAfterViewInit() {
    console.log(this.btn.nativeElement); 
    fromEvent(this.btn.nativeElement, 'click')
      .pipe(
        switchMap(() => { // concatMap, mergeMap, exhaustMap
          AppComponent.Count++;
          console.log(AppComponent.Count);
          return this.http.get(`${this.API}/posts/1`).pipe(delay(2000));
        })
      )
      .subscribe({
        next: (res) => console.log(res,' ',AppComponent.Count),
        error: (err) => console.error(err),
        complete: () => console.log('Request completed successfully')
      });
  }



  ar: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // res=from([1, 2, 3]).pipe(map((x:any) => x * x)).subscribe((v:any) => console.log(`value: ${v}`));
  
  ngOnInit () {
    // of(1, 2, 3)
    //   .pipe(
    //     map(x => {
    //       console.log(x * x)
    //       return x * x
    //     })
    //   )
    //   .subscribe(v => console.log(`value: ${v}`))

    // const clicks = fromEvent<PointerEvent>(document, 'click')
    // const positions = clicks.pipe(
    //   map(ev => {
    //     const currentCoordinate: Coordinate = { x: ev.clientX, y: ev.clientY }
    //     return currentCoordinate
    //   })
    // )

    // positions.subscribe((res: Coordinate) => {
    //   console.log(`Clicked at (${res.x}, ${res.y})`)
    // })
    // // const temp = interval(this.ar)
    // const seconds = interval(1000) // Emits every 1000 milliseconds (1 second)
    // // seconds.subscribe(value => console.log(value))

    // console.log("Code for advantage of pipe")
    // const source$ = of(1, 2, 3, 4, 5)

    // // Applying operators using pipe
    // const result$ = source$.pipe(
    //   map(x => x + 1),
    //   filter(x => x > 2),
    //   map(x => x * 2)
    // )

    // result$.subscribe(value => console.log(value))


    // const foo$ = from([1, 2, 3, 4, 5]).pipe(map((response:any) => {
    //   return response * 10;
    // }))
    // foo$.subscribe((x: any) => console.log(x));
    

    const example = (operator: any) => {
      from([1,2,3,4,5])
        .pipe(
          operator((data: any) => { return of(data).pipe(delay(5000)) })
        )
        .subscribe({
          next: (value: any) => { console.log(value); },
          error: (err: any) => { console.error(err); },
          complete: () => { console.log(`${operator.name} completed successfully`) }
        });
    };
    // example(mergeMap);// emit all value after X seconds
    // example(concatMap); // emit every value after X seconds
    // example(flatMap);// emit all value after X seconds
    // example(flatMap);// emit all value after X seconds
    // example(switchMap);// emit last value after X seconds
    // example(exhaustMap);// emit all value after X seconds



    // const example2 = (operator: any) => {
    //   from(this.ar).pipe(
    //     operator((data: any) => {
    //       return of(data).pipe(delay(5000));
    //     })
    //   )
    //   .subscribe({
    //     next: (value: any) => { console.log(value); },
    //     error: (err: any) => { console.error(err); },
    //     complete: () => { console.log(`${operator.name} completed successfully`); }
    //   });
    // };
    // example2(mergeMap);



    of('jhon', 'Bryan', 'Jane')
      .pipe(
        switchMap((name: string) => {
          return of(`Hello ${name}`);
        })
      )
      .subscribe((nameWithGreetings: string) => {
        console.log(nameWithGreetings);
      });
    // avoid switchMap with HTTP database requests: POST, PUT, PATCH and DELETE
    // use mergeMap instead

    // //Merge
    // const source1$ = interval(6000).pipe(
    //   map((x:number)=>'Merge1: '+ x)
    // );
    // const source2$ = interval(3000).pipe(
    //   map((x:number)=>'Merge2: '+ x)
    // );

    // const merged$ = merge(source1$, source2$);
    
    // merged$.subscribe((value:any) => {
    //   console.log(value);
    // })

    const source1$ = range(0,3).pipe(
      map((x:number)=>'Merge1: '+ x)
    );
    const source2$ = range(6,5).pipe(
      map((x:number)=>'Merge2: '+ x)
    );

    const merged$ = concat(source1$, source2$);
    
    merged$.subscribe((value:any) => {
      console.log(value);
    })

    // mergeMap again
    of('Hello')
      .pipe(
      mergeMap(v => {
        return of(v+ ' World').pipe(delay(3000));
      }))
      .subscribe((value: any) => {
         console.log(value);
       }
    )
  }
}




