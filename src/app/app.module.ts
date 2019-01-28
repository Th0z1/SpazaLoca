import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { StarRatingModule } from 'ionic3-star-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PopoverComponent } from '../components/popover/popover';
import { ShopsComponent } from '../components/shops/shops';

@NgModule({
  declarations: [
    MyApp,
    PopoverComponent,
    ShopsComponent
    
   
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverComponent,
    ShopsComponent
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
