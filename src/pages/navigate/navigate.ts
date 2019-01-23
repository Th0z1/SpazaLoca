import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
/**
 * Generated class for the NavigatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navigate',
  templateUrl: 'navigate.html',
})
export class NavigatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigatePage');
  }

  navigate(){
    this.launchNavigator.navigate([50.279306, -5.163158], {
      start: "50.342847, -4.749904"
    });
  }

}
