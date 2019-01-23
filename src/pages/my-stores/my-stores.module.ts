import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStoresPage } from './my-stores';

@NgModule({
  declarations: [
    MyStoresPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStoresPage),
  ],
})
export class MyStoresPageModule {}
