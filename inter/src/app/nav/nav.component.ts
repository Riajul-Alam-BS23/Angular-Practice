import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  lang= new BehaviorSubject<string>('en');
  constructor(){}
  ngOnInit(){
    this.lang.next(localStorage.getItem('lang'));
    console.log(this.lang.getValue());
  }
  changeLang(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedLanguage = target.value;
    localStorage.setItem('lang', selectedLanguage);
    this.lang.next(selectedLanguage);
    console.log(this.lang.getValue())
    // window.location.reload();
  }
}
