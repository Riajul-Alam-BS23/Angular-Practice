import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  ngOnInit() { 
    ajax(`https://jsonplaceholder.typicode.com/posts`)
      .pipe(
        map((data:any) => {
          let postTitle= [];
          for (let post of data.response) {
            postTitle.push(post.title);
          }
          return postTitle;
        })
      )
      .subscribe((data: any) => {
      console.log(data);
      })
    ajax.getJSON(`https://jsonplaceholder.typicode.com/posts`)
      .subscribe((data: any) => {
        console.log(data);
      });
    ajax({
      url: `https://jsonplaceholder.typicode.com/posts`,
      method: 'POST',
      headers: {
        myContent: "My web content",
        Authorization: "Bearer " + "jhagd32487264jhadhga#YSGJDGFJHSGFQ",
        Accept: "application/json"
      },
      body: {
        title: "My First Test Post"
      }
    })
      .subscribe((response) => {
      console.log(response);
    })
  }
}
