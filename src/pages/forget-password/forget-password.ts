import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }
  presentToast(position: string) {
    let toast = this.toastCtrl.create({
      message: 'Mail sent to your registerd email-id to RESET the password.',
      duration: 3000,
      position: position
    });
    toast.present();
  }
  navigateToLogin(){
    this.presentToast('bottom');
    this.navCtrl.push(LoginPage);
  }

}
