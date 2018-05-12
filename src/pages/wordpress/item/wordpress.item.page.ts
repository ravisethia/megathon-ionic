import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AskPage } from '../../../pages/ask/ask';

@Component({
	templateUrl: 'wordpress.item.html'
})
export class WordpressItemPage {
	private nav: NavController;
	post = {};

	constructor(navParams: NavParams,nav: NavController) {
		this.post = navParams.get('item');
		this.nav = nav;
	}
	answerQuestion(){
		this.nav.push(AskPage, {
			isAnswer: true
		});
	}
}
