import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {
  private replaySubject = new ReplaySubject<string>(2); // buffer size of 2

  // Observable to expose the replay subject as observable
  public messages$ = this.replaySubject.asObservable();

  constructor() { }

  addMessage(message: string) {
    this.replaySubject.next(message);
  }
}


