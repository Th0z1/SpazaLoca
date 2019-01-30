import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "HomePage"; //"SlidesPage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Back To Search', component: "FeedPage" },
      { title: 'Your Places', component: "YourPlacesPage" },
     
      { title: 'Rate App', component: "RateSpazaPage" },
      { title: 'Send Spaza Location', component: "SendSpazaLocationPage" },
      { title: 'Logout', component: "LoginPage"},

      
     
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Logout" ){
      const alert = this.alertCtrl.create({
        title: 'App termination',
        message: 'Do you want to close the app?',
        buttons: [{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('Application exit prevented!');
            }
        },{
            text: 'Logout',
            role: 'exitApp()',
            handler: () => {
            
              this.nav.setRoot(page.component); // Close this application
                console.log("out!");
            }
        }]
    });
    alert.present();
    }
else{
  this.nav.setRoot(page.component);
}


    
  }
}
