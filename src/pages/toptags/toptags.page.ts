import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home.page';
import { Post } from '../wordpress/models/post.model';
import { WordpressService } from '../wordpress/wordpress.service';

@Component({
	templateUrl: 'toptags.html',
	providers: [WordpressService]
})
export class TopTagsPage {
	public posts: Post[];
	public items: any[];
	regform: FormGroup;
	private wordpressService: WordpressService;	

	constructor(
		private navCtrl: NavController,
		wordpressService: WordpressService,
		fb: FormBuilder
	) {
		this.regform = fb.group({
			fName: ['', Validators.required],
			lName: ['', Validators.required]
		});
		this.wordpressService = wordpressService;
	}
	ngOnInit(): void {
		this.wordpressService.getPosts()
			.subscribe(posts => {
				this.posts = posts;
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
