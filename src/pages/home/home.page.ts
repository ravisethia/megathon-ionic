import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { WordpressListPage } from '../wordpress/list/wordpress.list.page';

import { AskPage } from '../ask/ask';

import { Tile } from './models/tile.model';
import { EmailService } from '../../services/email.service';
import { CallService } from '../../services/call.service';
import { MapsService } from '../../services/maps.service';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';
import { Post } from '../wordpress/models/post.model';

@Component({
	templateUrl: 'home.html',
	providers: []
})
export class HomePage {
	public tiles: Tile[][];
	post: Post;

	private emailService: EmailService;
	private callService: CallService;
	private mapsService: MapsService;
	private browserService: InAppBrowserService;
	private nav: Nav;

	constructor(
		emailService: EmailService,
		callService: CallService,
		mapsService: MapsService,
		browserService: InAppBrowserService,
		nav: Nav,
		navParams: NavParams
	) {
		this.emailService = emailService;
		this.callService = callService;
		this.mapsService = mapsService;
		this.browserService = browserService;
		this.nav = nav;
		this.post = <Post>navParams.get('item');
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

	// ngOnInit(): void {
	// 	this.wordpressService.getPosts()
	// 		.subscribe(posts => {
	// 			this.posts = posts;
	// 		});
	// }
}
