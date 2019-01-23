import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  cities:any;
  
  text: string;

  constructor(public viewCtrl:ViewController) {
  this.cities = [
    {item:'Pretoria'},
    {item:'Johannesburg'},
    {item:'Cape Town'}
  ]

  }


  itemsclick(item){
    this.viewCtrl.dismiss(item);
  }
  
}
