import { Component } from '@angular/core';
import { Nav, Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { WordpressListPage } from '../wordpress/list/wordpress.list.page';

import { AskPage } from '../ask/ask';

import { Tile } from './models/tile.model';
import { EmailService } from '../../services/email.service';
import { CallService } from '../../services/call.service';
import { MapsService } from '../../services/maps.service';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';
import { Post } from '../wordpress/models/post.model';
import { WordpressItemPage } from '../wordpress/item/wordpress.item.page';
import { WordpressService } from '../wordpress/wordpress.service';
import { AuthService } from '../../services/auth.service';


@Component({
	templateUrl: 'home.html',
	providers: [WordpressService]
})
export class HomePage {
	public tiles: Tile[][];
	public posts = [];

	questionsList=[];
	loader;
	private emailService: EmailService;
	private callService: CallService;
	private mapsService: MapsService;
	private browserService: InAppBrowserService;
	private nav: Nav;
	private wordpressService: WordpressService;

	constructor(
		emailService: EmailService,
		callService: CallService,
		mapsService: MapsService,
		browserService: InAppBrowserService,
		nav: Nav,
		public events: Events,
		wordpressService: WordpressService,
		private auth: AuthService,
		public loadingCtrl: LoadingController
	) {
		this.emailService = emailService;
		this.callService = callService;
		this.mapsService = mapsService;
		this.browserService = browserService;
		this.nav = nav;
		this.wordpressService = wordpressService;
		this.posts = [];
		this.init();
	}

	presentLoading() {
		if(!this.loader){
			this.loader = this.loadingCtrl.create({
			content: "Please wait..."
		});
		this.loader.present();
		}
		
	}

	dismissLoader(){
		if(this.loader){
		 this.loader.dismiss();
		 this.loader=null;
		}
	}

	init(): void {
		let self = this;
		this.posts = [];
		this.presentLoading();
		this.events.subscribe('questions:fetched', (questionData) => {
			this.dismissLoader();
		  this.posts = [];
			for(let propName in questionData) {
				if(questionData.hasOwnProperty(propName)) {
					let propValue = questionData[propName];
					if (propValue.question) {
						this.posts.push({
							questionId: propValue.questionId,
							question: propValue.question,
							email: propValue.user ? propValue.user.split("@")[0] : '',
							date: propValue.date
						});
					}
					// do something with each element here
				}
			}
			this.posts.reverse();
		});
		this.auth.retrieveQuestions();
	}

	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
	}

	public getDirections() {
		this.mapsService.openMapsApp(data.officeLocation);
	}

	public sendEmail() {
		this.emailService.sendEmail(data.email);
	}

	public openFacebookPage() {
		this.browserService.open(data.facebook);
	}

	public callUs() {
		this.callService.call(data.phoneNumber);
	}

	public askQuestion() {
		this.nav.push(AskPage);
	}
	public displayDetails(item){
		this.nav.push(WordpressItemPage, {
			item: item
		});
	}
}
