import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
	templateUrl: 'wordpress.item.html'
})
export class WordpressItemPage {
	
	post = {};

	constructor(navParams: NavParams) {
		this.post = navParams.get('item');
		console.log("item",this.post);
	}
}
