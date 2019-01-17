import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyStoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-stores',
  templateUrl: 'my-stores.html',
})
export class MyStoresPage {
  spazaName:string;
  city:string;
  streetName:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyStoresPage');
  }

  addSpaza(){
    console.log("Clicked")
    this.navCtrl.push('AddSpazaPage');
  }

}
