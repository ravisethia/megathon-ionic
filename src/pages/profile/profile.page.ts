import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';

@Component({
	templateUrl: 'profile.html'
})
export class profilePage {
	public items: any[];
	regform: FormGroup;


	constructor(
		private navCtrl: NavController,
		fb: FormBuilder
	) {
		this.regform = fb.group({
			fName: ['', Validators.required],
			lName: ['', Validators.required]
		});
		
	}

	register() {
		let data = this.regform.value;
		let names = {
			fName: data.fName,
			lName: data.lName
		};
		this.navCtrl.setRoot(HomePage);
	}

	
}
