import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MyStoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
  declare var firebase;
@IonicPage()
@Component({
  selector: 'page-my-stores',
  templateUrl: 'my-stores.html',
})
export class MyStoresPage {
  mySpazas = [];

  users={
    _key:'',
    name:'',
    surname:''
  }
  currentUser: any;
  spaza:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {      
    this.getDataFromDB();

    var currentUser = firebase.auth().currentUser;
    console.log(currentUser.uid);
    firebase.database().ref("/users/"+currentUser.uid).once('value', (snapshot) =>
    {

        console.log(snapshot.val().name);
        this.users._key = snapshot.key;
        this.users.name =snapshot.val().name;
        this.users.surname = snapshot.val().surname;
        console.log("Done")
      });
       console.log(this.users.name);
        return false;
   
  }

  getDataFromDB(){

    this.mySpazas = [];

    /*let loading = this.loadingCtrl.create({
      duration: 9000,
      content: 'Getting Events. Please wait...',
      //dismissOnPageChange: true
    });*/

    //loading.present();
    this.currentUser = firebase.auth().currentUser;
    firebase.database().ref("/users/"+this.currentUser.uid+"/mySpazas/").once('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Adding Item to itemsList
        
        this.mySpazas.push({_key : snap.key, spazaName: snap.val().spazaName, cityName: snap.val().cityName, streetName:snap.val().streetName});
       
        return false;

      

      });
      this.mySpazas.reverse();
      //this.categoryList = this.eventsList;
    }, error => {
      alert("dfssd");
      this.navCtrl.push("LoginPage")
    });
   
  }

  addSpaza(){
    console.log("Clicked")
    this.navCtrl.push('AddSpazaPage');
  }
  update(spaza){
    // console.log(this.item)

  let alert = this.alertCtrl.create({
    title: 'Update Your Store Information',
    inputs: [
      {
        name: 'spazaName',
        placeholder: 'Update Store Name',
        type:'text'
      },
      {
        name: 'city',
        placeholder: 'Update Store City/TownShip',
        type:'text'
      },
      {
        name: 'streetName',
        placeholder: 'Update Store Street',
        type:'text'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: ()=> {
          console.log('Cancel clicked');
        }
      },

      {
        text: 'Update',
        handler: (data)=> {
          console.log(data)
          var database=firebase.database();
          database.ref('users/'+this.currentUser.uid+'/mySpazas/' + spaza._key).set({spazaName:data.spazaName,cityName:data.city, streetName: data.streetName}).then(updateResult => {
            console.log(spaza._key)
            console.log(updateResult)
            this.getDataFromDB();
          });
        }
      },
    
    
    ]
    });
    alert.present();
  }
  Delete(spaza) {
    //console.log(this.item)

  let alert = this.alertCtrl.create({
    title: 'Delete Your Store Information',
    message: 'Do you want to Delete your Shop?',
    // inputs: [
    //   {
    //     name: 'Update',
    //     // placeholder: 'DELETE',
    //     type:'text'
    //   }
    //],
      buttons: [
        {
          text: 'Cancel',
          handler: ()=> {
            console.log('Cancel clicked');
          }
        },
  
        {
          text: 'Delete',
          handler: (data)=> {
            var database=firebase.database();
            database.ref('users/'+this.currentUser.uid+'/mySpazas/' + spaza._key).remove().then(result => {
              this.getDataFromDB();
            });
          }
        },
      
      
      ]
      });
      alert.present();
  }

  showConfirm($event,spaza) {
    const confirm = this.alertCtrl.create({
      title: 'MY-STORE',
      message: 'Do you want to Update or Delete Your Store ?',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            this.update(spaza);
            console.log('update clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.Delete(spaza);
            console.log('Delete clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  logout(){
    this.navCtrl.push("LoginPage");
  }
}
