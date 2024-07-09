import { Component, OnInit } from '@angular/core';
import { ReplayService } from '../replay.service';

@Component({
  selector: 'app-display-messages',
  templateUrl: './display-messages.component.html'
})
export class DisplayMessagesComponent implements OnInit {
  messages: string[] = [];

  constructor(private replayService: ReplayService) {}

  ngOnInit(): void {
    this.replayService.messages$.subscribe(message => {
      this.messages.push(message);
    });
  }
}
