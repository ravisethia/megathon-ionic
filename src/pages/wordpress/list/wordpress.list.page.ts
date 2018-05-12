import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordpressService } from './../wordpress.service';
import { WordpressItemPage } from '../item/wordpress.item.page';
import { Post } from '../models/post.model';
import { LoadingController } from 'ionic-angular';

@Component({
	templateUrl: 'wordpress.list.html',
	styleUrls: ['/list/wordpress.list.page.scss'],
	providers: [WordpressService]
})
export class WordpressListPage implements OnInit {
	public posts: Post[];
	likeCount = 0;
	dislikeCount = 0;

	private wordpressService: WordpressService;													
	private nav: NavController;

	constructor(wordpressService: WordpressService,public loadingCtrl: LoadingController, nav: NavController) {
		this.wordpressService = wordpressService;
		this.nav = nav;
	}
	presentLoading() {
		let loader = this.loadingCtrl.create({
		  content: "Please wait...",
		  duration: 3000
		});
		loader.present();
	  }
	ngOnInit(): void {
		this.presentLoading();
		this.wordpressService.getPosts()
			.subscribe(posts => {
				this.posts = posts;
			});
	}

	public itemTapped(item) {
		this.nav.push(WordpressItemPage, {
			item: item
		});
	}

	increamentFunction(count): void {
		if(count === "likeCount"){
			this.likeCount++;
		}else{
			this.dislikeCount++;
		}
	}
}
