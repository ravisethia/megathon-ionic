import { Component } from '@angular/core';
import { Events, NavController, ToastController,IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home.page';

import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the ProfileAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-app',
  templateUrl: 'profile-app.html'
})
export class ProfileAppPage {

  	private designation;
	private profileData = {
		firstName: '',
		lastName: '',
		location: '',
		designation: '',
		initials:''
	};

	constructor(
		private navCtrl: NavController,
		public events: Events,
		private auth: AuthService, public toastCtrl: ToastController
	) {
	}

	ngOnInit(): void {

		this.events.subscribe('profile:fetched', (profileData) => {
			if(profileData){
				this.profileData.firstName = profileData.firstName;
				this.profileData.lastName = profileData.lastName;
				this.profileData.location = profileData.location;
				this.profileData.designation = profileData.designation;
				this.profileData.initials = profileData.firstName.charAt(0)+profileData.lastName.charAt(0);
			}
		});
		this.auth.retrieveProfileInfo();
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
