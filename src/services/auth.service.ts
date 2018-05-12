import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import * as database from 'firebase/database';

console.log(database.Reference);

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth, public events: Events) {
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
			location: profileData.location
			//photoUrl: profileData.photoUrl
    });
	}

	retrieveProfileInfo() {
		let profileRef = firebase.database().ref('users/' + this.afAuth.auth.currentUser.uid);
		let self = this;

		profileRef.on('value', function(profile) {
			self.events.publish('profile:fetched', profile.val());
		});
	}

  	retrieveQuestions() {
		let QuestionRef = firebase.database().ref().child('questions');
		let self = this;

		QuestionRef.on('value', function(question) {
			self.events.publish('questions:fetched', question.val());
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

	postAnswer(answerData) {
		// Get a key for a new Post.
		const newPostKey = firebase.database().ref().child('answers').push(answerData).key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		let updates = {};
		updates['/answers/' + newPostKey] = answerData;
		updates['users/' + this.afAuth.auth.currentUser.uid + '/' + newPostKey] = answerData;

		firebase.database().ref().update(updates);
	}

	retriveAnswer(questionId) {
		let self = this;
		console.log(questionId);
		firebase.database().ref().child('answers').orderByChild("questionId").equalTo(questionId).on("child_added", function(data) {
			self.events.publish('answer:fetched', data.val());
		});
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
