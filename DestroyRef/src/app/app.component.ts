import { Component, ElementRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ShowComponent } from './show/show.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  show:boolean=false;
  onClick() {
    this.show=!this.show;
  }
  @ViewChild(ShowComponent) child: ShowComponent;
 
  ngOnInit(): void {
     interval(1000)
       .pipe(takeUntilDestroyed(this.child.destroyRef))
       .subscribe((count) => console.log(count));
  }
}
