import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { profilePage } from './profile.page';

@NgModule({
	imports: [IonicModule],
	declarations: [profilePage],
	entryComponents: [profilePage]
})
export class profileModule {

}
