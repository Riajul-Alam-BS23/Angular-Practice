import { Component } from '@angular/core';
import { ReplayService } from '../replay.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html'
})
export class AddMessageComponent {
  message: string;

  constructor(private replayService: ReplayService) {}

  addMessage() {
    this.replayService.addMessage(this.message);
    this.message = '';
  }
}
