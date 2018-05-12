import { Component } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

import { NavController } from 'ionic-angular';
import { AskPage } from '../../../pages/ask/ask';

import { AuthService } from '../../../services/auth.service';

@Component({
	templateUrl: 'wordpress.item.html'
})
export class WordpressItemPage {
	
	private nav: NavController;
	private post = {
		questionId: '',
		question: ''
	};
	private answers = [];

	constructor(navParams: NavParams, nav: NavController, private auth: AuthService, public events: Events) {
		this.post = navParams.get('item');
		this.nav = nav;
	}

	ngOnInit() {
		let self = this;
		this.auth.retriveAnswer(this.post.questionId);

		this.events.subscribe('answer:fetched', (answerData) => {
			if( answerData ) {
				let answers = {
					answerId: answerData.answerId,
					answer: answerData.answer
				};

				self.answers.push(answers);

				console.log(self.answers);
			}
		});
	}

	answerQuestion(): void {
		this.nav.push(AskPage, {isAnswer: true, questionId: this.post.questionId});
	}
}
