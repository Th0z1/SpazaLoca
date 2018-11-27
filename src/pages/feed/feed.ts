import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  searchQuery: string = '';
  items: string[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    
    this.initializeItems();

  }

  initializeItems() {
    this.items = [
     
      
    ];
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true,'myMenu');
    console.log('ionViewDidLoad FeedPage');
  }
  menu(){
    this.menuCtrl.enable(true,'myMenu');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }}
}
