import { AfterViewInit, ElementRef, OnInit, ViewChild, input } from '@angular/core';
import { Component } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('calendar', { read: ElementRef, static: true }) calendar: ElementRef;
  @ViewChild('inputField', { read: ElementRef, static: false }) inputField: ElementRef;
  
  loadCalender() {
    console.log("i am on loadCalender")
    console.log(this.calendar.nativeElement.value);
    this.inputField.nativeElement.value = this.calendar.nativeElement.value;
  }
  ngAfterViewInit(): void {
    console.log("i am in ngAfterViewInit")
    console.log(this.calendar)
  }
  ngOnInit(): void {
    console.log("i am in ngOnInit")
    console.log(this.calendar)
  }
  firstInputValue: string; 
  
  updateSecondInput(event: any) {
    const secondInput = event.target.nextElementSibling;
    secondInput.value = event.target.value;
  }
  onChange() {
  }


}
