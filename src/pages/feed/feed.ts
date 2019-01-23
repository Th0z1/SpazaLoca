import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var L;
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  searchQuery: string = '';
  items: string[];
  spazaList = [];
  b_show_der : number = 0;
  mymap:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private geolocation : Geolocation, private altCtrl: AlertController) {
    
    this.initializeItems();

  }

  initializeItems() {
    this.items = [
     
      
    ];
  }

  ionViewDidLoad() {
    // this.b_show_der = 1;
    console.log("b_show_der = "+ this.b_show_der);
    this.menuCtrl.enable(true,'myMenu');
    this.getCurrentCoords();    // --> user Maker coordinate
    //this.getAllSpazas();    //show all spazas on the map
    console.log('ionViewDidLoad FeedPage');
  }

  getAllSpazas(){
    // Array<{spazaName: string, latlog: any ,spazaIndex: number}>

    var mySpazasRef;
    
    var usersRef = firebase.database().ref("users/").on("value", (snapshot) => {
      snapshot.forEach(usersElement => {
        mySpazasRef = usersElement.key;
        var customCircleMarker = L.Marker.extend({
                options: { 
                  spazaName: '',//element.val().spazaName,
                  cityName: '',//element.val().cityName,
                  streetName: ''//element.val().streetName
                }
            });
        firebase.database().ref("users/"+mySpazasRef+"/mySpazas").once("value",(snap) => {
          snap.forEach(element => {
            //var marker = L.marker([element.val().latitude_coord, element.val().longitude_coord],10).addTo(this.mymap);
            // var marker = L.marker([-25.7487246, 28.2671659],10).on('click', this.onClick).addTo(this.mymap);
            // var marker = L.marker([element.val().latitude_coord, element.val().longitude_coord],10).on('click', function(e){
            //   console.log('works')
            // }).addTo(this.mymap);
            
            var myMarker = new customCircleMarker([element.val().latitude_coord, element.val().longitude_coord], { 
              /*title: 'unselected',
              radius: 20,*/
              spazaName: element.val().spazaName,
              cityName: element.val().cityName,
              streetName: element.val().streetName
            });
            myMarker.on('click', function(e){
              console.log(myMarker.options.spazaName)
              console.log('works')
            }).addTo(this.mymap);
          });
        })
      });
    });
  }

  onClick(): any {
    //console.log(element);
    console.log("Marker clicked!")
  }

  menu(){
    this.menuCtrl.enable(true,'myMenu');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getCurrentCoords(){
    let options = {timeout : 5000, enableHighAccuracy: true, maximumAge: Infinity};
    //let options : GeolocationOptions = {timeout : 5000, enableHighAccuracy : false, maximumAge : 2000}
    
    console.log('inside getCurrentCoords method');

    this.geolocation.getCurrentPosition(options).then(resp => {
      console.log('inside Promise');
      console.log('Resp =>>>'+resp);
      console.log(resp);
      this.showMap(resp.coords.latitude, resp.coords.longitude);

      this.getAllSpazas();    // --> Show all spazas on a map
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     
  }

  showMap(lat : number, log : number){
    L.mapbox.accessToken = 'pk.eyJ1IjoicmVhbHNhbmVsZSIsImEiOiJjanAybWZ2enUwODIxM3dwaGo2cDU4bWNxIn0.Q0PkSHqlG4VV6CNw1c_zcA';
    this.mymap = L.map('mapid',{zoomControl:false}).setView([lat,log],13);
    var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
      keepOpen: true, autocomplete: true
  });

  geocoderControl.addTo(this.mymap);

  geocoderControl.on('select', function(res) {
    console.log(res)
    
    var location = L.marker([res.feature.center[1], res.feature.center[0]],9).addTo(this.mymap);
    console.log(location);
    
    console.log("b_show_der = "+ this.b_show_der);
    var circle = L.circle([res.feature.center[1], res.feature.center[0]], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 20
  }).addTo(this.mymap);

    this.b_show_der = 1;
    //mSouth@2011 --> mLab wifi password
  });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xpZmZvcmRzY216b2JlIiwiYSI6ImNqanlhc2d3aDNpMGMzcGxlbDZpbzVmMXMifQ.4Hg1wM44HKbuH5H05n0Jag', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
     id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(this.mymap);

  var marker = L.marker([lat, log],10,).addTo(this.mymap);

  var circle = L.circle([lat, log], {
    color: 'green',
    fillColor: '#00802b',
    fillOpacity: 0.5,
    radius: 20
  }).addTo(this.mymap);
  
  marker.bindPopup("<b>I'm Here</b>").openPopup();
  }
}
