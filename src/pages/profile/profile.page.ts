import { Component } from '@angular/core';
import { Events, NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home.page';

import { AuthService } from '../../services/auth.service';

@Component({
	templateUrl: 'profile.html'
})
export class profilePage {
	private designation;
	private profileData = {
		firstName: '',
		lastName: '',
		location: '',
		designation: ''
	};

	constructor(
		private navCtrl: NavController,
		public events: Events,
		private auth: AuthService, public toastCtrl: ToastController
	) {
	}

	ngOnInit(): void {
		this.auth.retrieveProfileInfo();

		this.events.subscribe('profile:fetched', (profileData) => {
			if(profileData){
				this.profileData.firstName = profileData.firstName;
				this.profileData.lastName = profileData.lastName;
				this.profileData.location = profileData.location;
				this.profileData.designation = profileData.designation;
			}
		});
	}

	onChange(designation) {
		this.designation = designation;
	}

	register() {
		this.navCtrl.setRoot(HomePage);

		this.auth.addProfileInfo(this.profileData);

		let toast = this.toastCtrl.create({
			message: 'Your profile is updated!',
			duration: 3000
		  });
		
		toast.present();
	}	
}
