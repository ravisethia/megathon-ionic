import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileAppPage } from './profile-app';

@NgModule({
  declarations: [
    ProfileAppPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileAppPage),
  ],
})
export class ProfileAppPageModule {}
