import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

export const firebaseConfig = {
	fire: {
		apiKey: "AIzaSyDJiEWKZebDy8v-5CHixF327ixlMBHSHL0",
		authDomain: "megathon-f964c.firebaseapp.com",
		databaseURL: "https://megathon-f964c.firebaseio.com",
		projectId: "megathon-f964c",
		storageBucket: "megathon-f964c.appspot.com",
		messagingSenderId: "131083202046"
	}
};
