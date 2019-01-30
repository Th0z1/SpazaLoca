import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  allSpazasList = [];
  spazaListCategory = [];
  searchItems = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator, private altCtrl: AlertController, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.getAllSpazas()
    console.log('ionViewDidLoad HomePage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchItems = this.searchItems.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems(): any {
    for(let index = 0; index < this.spazaListCategory.length; index++){
      console.log(this.spazaListCategory[index])
      // this.searchItems.push(this.spazaListCategory[index].spazaName)
    }
  }


  contributions(){
    this.navCtrl.push("MyStoresPage")
  }

  addSpaza(){
    console.log("Clicked")
    this.navCtrl.push('AddSpazaPage');
  }

  getAllSpazas(){
    // Array<{spazaName: string, latlog: any ,spazaIndex: number}>

    var mySpazasRef;
    
    var usersRef = firebase.database().ref("users/").on("value", (snapshot) => {
      snapshot.forEach(usersElement => {
        mySpazasRef = usersElement.key;
        /*var customMarker = L.Marker.extend({
            options: { 
              spazaName: '',//element.val().spazaName,
              cityName: '',//element.val().cityName,
              streetName: ''//element.val().streetName
            }
        });*/
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value",(snap) => {
          snap.forEach(element => {
            var theSpaza = {
              cityName :element.val().cityName,
              latitude_coord : element.val().latitude_coord,
              longitude_coord : element.val().longitude_coord,
              spazaName : element.val().spazaName,
              streetName : element.val().streetName,
            };
            this.searchItems.push(theSpaza.spazaName)
            this.allSpazasList.push(theSpaza);
            console.log(element)
              
          });  // --> End If

            //----------------------------------------
            /*var myMarker1 = new customMarker([-25.547611, 28.0981053], { 
              spazaName: 'Takalani',
              cityName: element.val().cityName,
              streetName: element.val().streetName
            });
            myMarker1.on('click', function(e){
              console.log(myMarker1.options.spazaName)
              console.log('works')
            }).addTo(this.mymap);

            var myMarker2 = new customMarker([-25.5385517, 28.0990344], { 
              spazaName: 'Nkukhu Box',
              cityName: element.val().cityName,
              streetName: element.val().streetName
            });
            myMarker2.on('click', function(e){
              console.log(myMarker2.options.spazaName)
              console.log('works')
            }).addTo(this.mymap);*/
            //--------------------------------------
  
          });
        })
        this.spazaListCategory = this.allSpazasList;
        this.initializeItems();
      });
  }

  showConfirm(spazaInfor/*,userCoords*/){
    const confirm = this.altCtrl.create({
      title:'Spaza Name : '+ spazaInfor.options.spazaName,
      message: '<b>Street :</b> '+spazaInfor.options.streetName+'<br><b>Township : </b>'+spazaInfor.options.cityName+'<br><br> Do you want to?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Go',
          handler: () => {
            console.log(spazaInfor.getLatLng().lat)
            this.launchNavigator.navigate([spazaInfor.getLatLng().lat,spazaInfor.getLatLng().lat ], {
              // start: userCoords.userCoords.latitude+','+ userCoords.userCoords.longitude
              start:'-25.5385517,28.0990344'
            });
          }
        }
      ]
    });
    confirm.present();
  }

  getCurrentCoords(spazaInfor){
    let options = {timeout : 5000, enableHighAccuracy: true, maximumAge: Infinity};
    //let options : GeolocationOptions = {timeout : 5000, enableHighAccuracy : false, maximumAge : 2000}
    
    console.log('inside getCurrentCoords method');

    this.geolocation.getCurrentPosition(options).then(resp => {
      console.log('inside Promise');
      console.log('Resp =>>>'+resp);
      console.log(resp);
      this.launchNavigator.navigate([spazaInfor.latitude_coord,spazaInfor.longitude_coord], {
        // start: userCoords.userCoords.latitude+','+ userCoords.userCoords.longitude
        //start:'-25.5385517,28.0990344'
        start: resp.coords.latitude + ',' + resp.coords.longitude
      });
      //this.showMap(resp.coords.latitude, resp.coords.longitude);

      //this.getAllSpazas({userCoords:{latitude:resp.coords.latitude,longitude: resp.coords.longitude}});    // --> Show all spazas on a map
     })/*.catch((error) => {
      const alert = this.altCtrl.create({
        title: 'We Couldn\'t Get Your Location!',
        subTitle: 'SpazaLoca needs to know your laction. <br> Please turn/switch on your location.',
        buttons: ['OK']
      });
      alert.present();

       console.log('Error getting location', error);
     });*/

     
  }

}
