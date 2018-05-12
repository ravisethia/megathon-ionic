import { Component } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams, ToastController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';
import { UUIDService } from '../../services/uuid.service';

/**
 * Generated class for the AskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ask',
  templateUrl: 'ask.html',
  providers: [UUIDService]
})
export class AskPage {
  private inputData : String;
  private nav: Nav;
  isAnswer = false;
  title='Question';
  description='Ask your question here';

  constructor(public navCtrl: NavController, public navParams: NavParams, nav: Nav,
    private auth: AuthService, public toastCtrl: ToastController,
    private uuid: UUIDService
  ) {
      this.nav = nav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskPage');
    this.isAnswer = this.navParams.get('isAnswer');
    this.title= this.isAnswer ? 'Answer': this.title;
    this.description = this.isAnswer ? 'Write your answer here..' : this.description;
  }

  postInput() {

    let toastOpts = {
      duration: 3000,
      message: ''
    };

    if(this.isAnswer){
      let answerData = {
        answerId: this.uuid.getUUID(),
        questionId: this.navParams.get('questionId'),
        answer: this.inputData,
        upvote: 0,
        downvote: 0
      }

      if (answerData.answer.length > 2) {
        this.auth.postAnswer(answerData);

        toastOpts.message = 'Your answer is posted';

        this.nav.pop();
      }
    } else {

      let questionData = {
        questionId : this.uuid.getUUID(),
        question : this.inputData
      };

      if (questionData.question.length > 2) {
        this.auth.addQuestion(questionData);

        toastOpts.message = 'Your question is posted';

        this.nav.pop();
      }
    }

    let toast = this.toastCtrl.create(toastOpts);

    toast.present();
  }
}
