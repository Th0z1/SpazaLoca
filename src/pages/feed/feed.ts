import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var L;
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  searchQuery: string = '';
  items: string[];

  b_show_der : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private geolocation : Geolocation) {
    
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
    this.getCurrentCoords();
    console.log('ionViewDidLoad FeedPage');
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
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     
  }

  showMap(lat : number, log : number){
    L.mapbox.accessToken = 'pk.eyJ1IjoicmVhbHNhbmVsZSIsImEiOiJjanAybWZ2enUwODIxM3dwaGo2cDU4bWNxIn0.Q0PkSHqlG4VV6CNw1c_zcA';
    var mymap = L.map('mapid',{zoomControl:false}).setView([lat,log],13);
    var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
      keepOpen: true, autocomplete: true
  });

  geocoderControl.addTo(mymap);

  geocoderControl.on('select', function(res) {
    console.log(res)
    
    var location = L.marker([res.feature.center[1], res.feature.center[0]],9).addTo(mymap);
    console.log(location);
    
    console.log("b_show_der = "+ this.b_show_der);
    var circle = L.circle([res.feature.center[1], res.feature.center[0]], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 20
  }).addTo(mymap);

    this.b_show_der = 1;
    //mSouth@2011
  });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xpZmZvcmRzY216b2JlIiwiYSI6ImNqanlhc2d3aDNpMGMzcGxlbDZpbzVmMXMifQ.4Hg1wM44HKbuH5H05n0Jag', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
     id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

  var marker = L.marker([lat, log],13).addTo(mymap);
  var circle = L.circle([lat, log], {
    color: 'green',
    fillColor: '#00802b',
    fillOpacity: 0.5,
    radius: 20
  }).addTo(mymap);

  /*var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);

  var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(mymap);*/ 
  
  marker.bindPopup("<b>My location.</b>").openPopup();
  /*circle.bindPopup("I am a circle.");
  polygon.bindPopup("I am a polygon.");

  var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);*/
  }
}
