import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
spazaShop:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder,public loadingCtrl: LoadingController) {
    this.spazaShop = Fb.group({
      name: ['',Validators.compose([Validators.pattern('[a-zA-Z ]*'),Validators.minLength(4),Validators.maxLength(30),Validators.required])],
      surname : [,Validators.compose([Validators.pattern('[a-zA-Z ]*'),Validators.minLength(4),Validators.maxLength(30),Validators.required])],
      gender: ['',Validators.required],
      // typeOfUser: ['',Validators.required],
      email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      password: ['',Validators.compose([ Validators.minLength(6),Validators.maxLength(12),Validators.required])],
      //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),

    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  register({value, valid}:{value:any,valid}){
    
  
    let loader = this.loadingCtrl.create({
      spinner: "ios",
      content:"Please Wait!",
      duration:5000

   });
  
   loader.present();
    console.log(value);
      firebase.auth().createUserWithEmailAndPassword(this.spazaShop.value.email,this.spazaShop.value.password).then(data=>{
     console.log(this.spazaShop.value.email);
    
      

      /*if(this.spazaShop.value.typeOfUser == "customer"){
        firebase.database().ref('/users/' + (data.user.uid)).set(
          {
            email:this.spazaShop.value.email,
            name:this.spazaShop.value.name,
            surname:this.spazaShop.value.surname,
            gender:this.spazaShop.value.gender,
            typeOfUser:this.spazaShop.value.typeOfUser
          }
        ).then(result => {
          this.navCtrl.push("FeedPage");
          this.spazaShop.reset();
        });
      }else if(this.spazaShop.value.typeOfUser == "Owner"){
        firebase.database().ref('/users/' + (data.user.uid)).set(
          {
            email:this.spazaShop.value.email,
            name:this.spazaShop.value.name,
            surname:this.spazaShop.value.surname,
            gender:this.spazaShop.value.gender,
            typeOfUser:this.spazaShop.value.typeOfUser,
            mySpazas: {}
          }
        ).then(result => {
          this.navCtrl.push("MyStoresPage");
          this.spazaShop.reset();
        });
      }*/
    
      firebase.database().ref('/users/' + (data.user.uid)).set(
        {
          email: this.spazaShop.value.email,
          name:this.spazaShop.value.name,
          surname:this.spazaShop.value.surname,
          gender:this.spazaShop.value.gender,
          typeOfUser:'Customer'
          //typeOfUser:'Admin'
        }
      ).then(result => {
        this.navCtrl.push("HomePage");
        this.spazaShop.reset();
      });
      
    })
    }
}