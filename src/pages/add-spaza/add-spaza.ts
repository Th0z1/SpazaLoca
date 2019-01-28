import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';

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
  streetName:any;

  // arrData=[{
  //   name:'',
  //   keyname:''
  // }];

  mySpazas={
    spazaName:'',
    cityName:'',
    streetName:''
  };

person : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder,private geolocation : Geolocation, public alertCtrl: AlertController) {
    var currentUser = firebase.auth().currentUser;

    this.person = Fb.group({
      namespaza: ['',Validators.required],
      cityNum: ['',[Validators.required]],
      street: ['',[Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSpazaPage');
  }

  addSpaza(latitude_coord: number , longitude_coord : number){
    // this.navCtrl.push('MyStoresPage',{variable:this.spazaName,namespaza:this.city,cityNum:this.streetName});
    // // this.arrData=[];
    // console.log(this.spazaName);
    // console.log(this.city);
    // console.log(this.streetName);

    //pass to database
    /*this.mySpazas.spazaName=this.spazaName;
    this.mySpazas.cityName=this.city;
    this.mySpazas.streetName=this.streetName;*/

    var currentUser = firebase.auth().currentUser;
    var database=firebase.database();
    database.ref("/users/"+currentUser.uid+"/mySpazas/").push({
      //Email:this.spazaShop.value.email,
      spazaName: this.person.value.namespaza,
      cityName: this.person.value.cityNum,
      streetName: this.person.value.street,
      latitude_coord: latitude_coord,
      longitude_coord: longitude_coord
    }).then( result =>{
      this.navCtrl.setRoot("MyStoresPage");
    });
  }

  showConfirm(){
    const confirm = this.alertCtrl.create({
      title: 'SpazaLoc Needs To Know Your Location',
      message: '<b>N.B</b> It is recommended to register at your shop',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Continue',
          handler: () => {
            this.getCurrentCoords();
          }
        }
      ]
    });
    confirm.present();
  }

  getCurrentCoords(){
    let options = {timeout : 5000, enableHighAccuracy: true, maximumAge: Infinity};
    //let options : GeolocationOptions = {timeout : 5000, enableHighAccuracy : false, maximumAge : 2000}
    
    console.log('inside getCurrentCoords method');

    this.geolocation.getCurrentPosition(options).then(resp => {
      console.log('inside Promise');
      console.log('Resp =>>>'+resp);
      console.log(resp);
      this.addSpaza(resp.coords.latitude,resp.coords.longitude);
      /*this.mySpazas.latitude_coord = resp.coords.latitude;
      this.mySpazas.longitude_coord = resp.coords.longitude;*/
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     
  }

  onSubmitPerson({value, valid}:{value:any,valid}){
    console.log(value);
  }
}
