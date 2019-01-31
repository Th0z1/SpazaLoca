import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    SelectSearchableModule,
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
