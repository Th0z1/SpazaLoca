import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the RateSpazaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate-spaza',
  templateUrl: 'rate-spaza.html',
})
export class RateSpazaPage {

  rating = [1,1,1,1,1];
  rate_value ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    events.subscribe('star-rating:changed', (starRating) => {console.log(starRating)});
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateSpazaPage');
  }

  update(x){
  
    this.rate_value = x + 1;
    console.log("got rated " + this.rate_value + "/5");
    this.reset();
    for(let i = 0 ; i <= x; i++){
      this.rating[i] = 0;
    }
  }

  reset(){
    for(let i = 0 ; i <= 4; i++){
      this.rating[i] = 1;
    }
  }

}
