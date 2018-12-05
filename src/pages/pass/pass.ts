import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the PassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-pass',
  templateUrl: 'pass.html',
})
export class PassPage {

  spazaShop:FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private Fb: FormBuilder) {
    this.spazaShop = Fb.group({
      Email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassPage');
  }
  ResetPass({value, valid}:{value:any,valid}){
    console.log(value.Email);
    var auth = firebase.auth();
    var emailAddress = value.Email;
    
    auth.sendPasswordResetEmail(value.Email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
   
      }
}
