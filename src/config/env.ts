import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}
export const ENV = {
  //production: false,
  firebase: {
    apiKey: "AIzaSyBu6etrWCrPusHUnR9nw4uqByppCshrhb0",
    authDomain: "lactose-free.firebaseapp.com",
    databaseURL: "https://lactose-free.firebaseio.com",
    projectId: "lactose-free",
    storageBucket: "lactose-free.appspot.com",
    messagingSenderId: "321164635788"
  }
};
