import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    namespaza:'',
    cityNum:'',
    street:''
  };

person : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder) {
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

  addSpaza(){
    this.navCtrl.push('MyStoresPage',{variable:this.spazaName,namespaza:this.city,cityNum:this.streetName});
    // this.arrData=[];
    console.log(this.spazaName);
    console.log(this.city);
    console.log(this.streetName);

    //pass to database
    this.mySpazas.namespaza=this.spazaName;
    this.mySpazas.cityNum=this.city;
    this.mySpazas.street=this.streetName;

    var currentUser = firebase.auth().currentUser;
    var database=firebase.database();
    database.ref("/users/"+currentUser.uid+"/mySpazas/").push(this.mySpazas);

  }
  onSubmitPerson({value, valid}:{value:any,valid}){
    console.log(value);
  }
}
