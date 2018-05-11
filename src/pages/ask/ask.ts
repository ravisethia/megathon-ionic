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
  private question : String;
  private nav: Nav;

  constructor(public navCtrl: NavController, public navParams: NavParams, nav: Nav,
    private auth: AuthService, public toastCtrl: ToastController,
    private uuid: UUIDService
  ) {
      this.nav = nav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskPage');
  }

  postQuestion() {
    let questionData = {};

    let toast = this.toastCtrl.create({
      message: 'Your question is posted',
      duration: 3000
    });

    questionData = {
      questionId : this.uuid.getUUID(),
      question : this.question
    };

    if (questionData) {
      this.auth.addQuestion(questionData);

      toast.present();
      this.nav.pop();
    }
  }
}
