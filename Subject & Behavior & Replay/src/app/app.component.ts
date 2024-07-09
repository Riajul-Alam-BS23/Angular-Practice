import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  messages = new ReplaySubject<string>(10);
  showMessageTemplate: boolean = false;
  messsageList: string;
  newMessage: string=null;

  sendMessage() {
    this.messages.next(this.newMessage);
  }
  showMessage() { 
    this.messages.subscribe((messages) => {
      this.messsageList = messages;
      console.log(this.messsageList)
    })
    this.showMessageTemplate = true;
  }
  hideMessage() {
    this.showMessageTemplate = false;
    this.messsageList = null;
  }
}
