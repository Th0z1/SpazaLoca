import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the ShopsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shops',
  templateUrl: 'shops.html'
})
export class ShopsComponent {
  shops:any;
  text: string;

  constructor(public viewCtrl:ViewController) {
    this.shops = [
      {items:'mamezalaShop'},
      {items:'MalelezaTuck Shop'},
      {items:'Greatest shop'},
  
    ]
  }
  itemclick(items){
    this.viewCtrl.dismiss(items);
  }
}
