import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private Fb: FormBuilder,private geolocation : Geolocation, public alertCtrl: AlertController, private  actionSheetCtrl: ActionSheetController) {
  //   var currentUser = firebase.auth().currentUser;

    this.person = Fb.group({
      namespaza: ['',Validators.required],
      cityNum: ['',[Validators.required]],
      street: ['',[Validators.required]],
      houseNO: ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSpazaPage');
  }

  /*updateProfilePic(){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Complete action using..',
      buttons: [
        {
          text: 'Camera',
          //role: 'destructive',
          icon: 'ios-camera',
          handler: () => {
            this.takePhoto(1);
            console.log('Destructive clicked');
          }
        },{
          text: 'Gallery  ',
          icon: 'images',
          handler: () => {
            this.takePhoto(0);
            console.log('Archive clicked');
          }
        }
        // ,{
        //   text: 'Cancel',
        //   role: 'cancel',
        //   handler: () => {
        //     console.log('Cancel clicked');
        //   }
        // }
      ]
    });
    actionSheet.present();
  }*/

  /*takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      targetWidth : 240,
      targetHeight : 240,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
      allowEdit: true
    }

    this.camera.getPicture(options).then((imagePath) => {
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (this.platform.is('android') && options.sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
           console.log("file Path =========== "+ filePath)
           this.imageURI = filePath;
           if(filePath != null){

            this.saveImgToFireStorage()
           }
          });
      } else {
        console.log("Image Path =========== "+ imagePath)
        this.imageURI = imagePath;

        if(this.imageURI != null && imagePath != null){
          this.saveImgToFireStorage();
        }
      }
    }, (err) => {
     // this.presentToast('Error while selecting image.');
    });
  }*/

  addSpaza(latitude_coord, longitude_coord){
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
      //this.addSpaza("-25.5476061","28.0981053");
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     
  }

  onSubmitPerson({value, valid}:{value:any,valid}){
    console.log(value);
  }
}
