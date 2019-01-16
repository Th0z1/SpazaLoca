import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddSpazaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-add-spaza',
  templateUrl: 'add-spaza.html',
})
export class AddSpazaPage {
  spazaName:string;
  city:string;
  streetName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSpazaPage');
  }

  addSpaza(){
    var currentUser = firebase.auth().currentUser;

    firebase.database().ref("/users/"+currentUser.uid+"/mySpazas/").push(
     {
      spazaName: this.spazaName,
      city: this.city,
      streetName: this.streetName,
     } 
    );

  }

}
