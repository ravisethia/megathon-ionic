import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home.page';

import { AuthService } from '../../services/auth.service';

@Component({
	templateUrl: 'profile.html'
})
export class profilePage {
	private regform: FormGroup;
	private designation;
	private profileData = {};

	constructor(
		private navCtrl: NavController,
		private fb: FormBuilder,
		private auth: AuthService, public toastCtrl: ToastController
	) {
		this.regform = fb.group({
			fName: ['', Validators.required],
			lName: ['', Validators.required],
			seatLocation: ['', Validators.required],
			designation: ['', Validators.required],
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

		this.navCtrl.pop();
	}	
}
