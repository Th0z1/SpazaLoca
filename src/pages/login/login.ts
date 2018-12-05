import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder,public loadingCtrl: LoadingController,private alertCtrl: AlertController ) {
    this.spazaShop = Fb.group({
      Email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      password: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(12),Validators.required])],
    });
  }
  ionViewDidLoad() {
    
  }

  login({value, valid}:{value:any,valid}){
    let loader = this.loadingCtrl.create({
      spinner: "ios",
      content:"Please Wait!",
      duration:5000
   });
  
   loader.present();
    console.log(value);
    console.log(value.Email);
    console.log(value.password);
    firebase.auth().signInWithEmailAndPassword(value.Email,value.password).then(user=>{
      this.navCtrl.setRoot('FeedPage');
    
    this.spazaShop.reset();
    });
  }
signup(spazaShop){
    this.navCtrl.push("SignUpPage");
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

  // showPrompt() {

  //   let alert = this.alertCtrl.create({
  //     subTitle : "Reset Password",
  //     message : "A link to reset your password will be sent to your email",
  //     inputs: [
  //       {
  //         name: 'email',
  //         placeholder: 'e.g user@mail.com',
  //         type : "email"
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Reset',
  //         handler: data => {
  //           console.log(this.ResetPass);            
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}

 



