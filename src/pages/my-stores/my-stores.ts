import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyStoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  declare var firebase;
@IonicPage()
@Component({
  selector: 'page-my-stores',
  templateUrl: 'my-stores.html',
})
export class MyStoresPage {
  mySpazas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getDataFromDB();
  }

  getDataFromDB(){
    this.mySpazas = [];
    /*let loading = this.loadingCtrl.create({
      duration: 9000,
      content: 'Getting Events. Please wait...',
      //dismissOnPageChange: true
    });*/

    //loading.present();
    var currentUser = firebase.auth().currentUser;
    firebase.database().ref("/users/"+currentUser.uid+"/mySpazas/").once('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Adding Item to itemsList
        
        this.mySpazas.push({_key : snap.key, spazaName: snap.val().spazaName, cityName: snap.val().cityName, streetName:snap.val().streetName});
        return false;
      });
      this.mySpazas.reverse();
      //this.categoryList = this.eventsList;
    });
  }


  addSpaza(){
    console.log("Clicked")
    this.navCtrl.push('AddSpazaPage');
  }

}
