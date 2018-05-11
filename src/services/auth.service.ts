import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import * as database from 'firebase/database';

console.log(database.Reference);

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	addProfileInfo(profileData) {
		return firebase.database().ref('users/' + this.afAuth.auth.currentUser.uid).set({
      firstName: profileData.firstName,
			lastName: profileData.lastName,
			designation: profileData.designation,
			location: profileData.location,
			photoUrl: profileData.photoUrl
    });
	}

  retrieveQuestions() {
		let starCountRef = firebase.database().ref().child('questions');
		starCountRef.on('value', function(snapshot) {
			console.log('hello', snapshot.val());
			for(let propName in snapshot.val()) {
				if(snapshot.val().hasOwnProperty(propName)) {
					let propValue = snapshot.val()[propName];
					console.log(propValue);
					// do something with each element here
				}
			}
		});
	}

	addQuestion(questionData) {
	  // Get a key for a new Post.
	  const newPostKey = firebase.database().ref().child('questions').push(questionData).key;

	  // Write the new post's data simultaneously in the posts list and the user's post list.
	  let updates = {};
	  updates['/questions/' + newPostKey] = questionData;
	  updates['users/' + this.afAuth.auth.currentUser.uid + '/' + newPostKey] = questionData;

	  firebase.database().ref().update(updates);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
			.then(() => {
				return this.afAuth.auth.getRedirectResult().then( result => {
					// This gives you a Google Access Token.
					// You can use it to access the Google API.
					let token = result.credential.accessToken;
					// The signed-in user info.
					let user = result.user;
					console.log(token, user);
				}).catch(function(error) {
					// Handle Errors here.
					alert(error.message);
				});
			});
		}
	}

}
