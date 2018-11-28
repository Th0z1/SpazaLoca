import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourPlacesPage } from './your-places';

@NgModule({
  declarations: [
    YourPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(YourPlacesPage),
  ],
})
export class YourPlacesPageModule {}
