import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import {AdMob} from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();

      interface AdMobType {
        banner:string,
        interstitial:string
      }

      // Do any necessary cordova or native calls here now that the platform is ready
      var admobid:AdMobType;

      console.log('ready!!')
      // select the right Ad Id according to platform
      if( /(android)/i.test(navigator.userAgent) ) { 
          console.log('android ready!!')
          admobid = { // for Android
              banner: 'ca-app-pub-5062366829669199/4222071462',
              interstitial: 'ca-app-pub-5062366829669199/4222071462'
          };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
          console.log('ios ready!!')
          admobid = { // for iOS
              banner: 'ca-app-pub-5062366829669199/4222071462',
              interstitial: 'ca-app-pub-5062366829669199/4222071462'
          };
      } else {
          console.log('else ready!!')
          admobid = { // for Windows Phone
              banner: 'ca-app-pub-5062366829669199/4222071462',
              interstitial: 'ca-app-pub-5062366829669199/4222071462'
          };
      }
      console.log('ready done!!')

      if(AdMob) AdMob.createBanner( {
        adId:admobid.banner,
        isTesting:true, 
        //position:AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow:true} );
    });
  }
}
