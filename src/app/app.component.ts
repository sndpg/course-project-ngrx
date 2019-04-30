import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAYfnZSAxvHzNMyzz6F3D085Zw1zb1FwEM',
      authDomain: 'ng-recipe-book-f5fd9.firebaseapp.com'
    });
  }
}
