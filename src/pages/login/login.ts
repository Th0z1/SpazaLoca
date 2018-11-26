import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
spazaShop:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder) {
    this.spazaShop = Fb.group({
      Email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      password: ['',Validators.compose([ Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(6),Validators.maxLength(12),Validators.required])],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    // firebase.database().ref('/users/').push(
    //   {
    //    Email:this.spazaShop.value.Email,
    //    password:this.spazaShop.value.name,
      
    //   }
    // );
  }
  login({value, valid}:{value:any,valid}){
    console.log(value);
    console.log(value.Email);
    console.log(value.password);
    firebase.auth().signInWithEmailAndPassword(value.Email,value.password).then(user=>{
    this.navCtrl.push("SlidesPage");
    
    this.spazaShop.reset();
    });
  }
signup(spazaShop){
    this.navCtrl.push("SignUpPage");
  }
}